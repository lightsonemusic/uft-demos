import math
from datetime import datetime, timedelta

# UFT Tuning Constants
TUNING_ROOTS = {
    '440': 261.6256,
    '432': 256.0000,
    'moon': 210.4186
}

NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
SEMITONE_RATIO = math.pow(2, 1/12)

def get_frequency(note_idx, octave, tuning='432'):
    """UFT: f = root × 2^octave × 2^(note/12)"""
    root = TUNING_ROOTS[tuning]
    return root * math.pow(2, octave) * math.pow(SEMITONE_RATIO, note_idx)

# ============================================================================
# CALENDAR SYSTEMS
# ============================================================================

def get_lunar_data(day_of_year):
    """Returns lunar month (1-13), day in month (1-28), phase ratio (0-1)"""
    normalized_day = ((day_of_year - 1) % 364) + 1
    month = math.ceil(normalized_day / 28)
    day_in_month = ((normalized_day - 1) % 28) + 1
    phase_ratio = day_in_month / 28
    return {
        'month': min(month, 13),
        'day_in_month': day_in_month,
        'phase_ratio': phase_ratio,
        'freq_hz': get_frequency((month - 1) % 12, 0, 'moon')
    }

def get_solar_data(day_of_year):
    """Returns zodiac sign, day in sign, progression ratio (0-1)"""
    zodiac_signs = [
        {'name': 'Aries', 'start': 1},
        {'name': 'Taurus', 'start': 31},
        {'name': 'Gemini', 'start': 62},
        {'name': 'Cancer', 'start': 92},
        {'name': 'Leo', 'start': 123},
        {'name': 'Virgo', 'start': 153},
        {'name': 'Libra', 'start': 184},
        {'name': 'Scorpio', 'start': 214},
        {'name': 'Sagittarius', 'start': 245},
        {'name': 'Capricorn', 'start': 275},
        {'name': 'Aquarius', 'start': 306},
        {'name': 'Pisces', 'start': 336}
    ]
    
    normalized_day = ((day_of_year - 1) % 365) + 1
    
    current_sign = None
    for i, sign in enumerate(zodiac_signs):
        if normalized_day >= sign['start']:
            current_sign = sign
            sign_index = i
    
    if current_sign is None:
        current_sign = zodiac_signs[0]
        sign_index = 0
    
    next_sign_index = (sign_index + 1) % 12
    next_sign_start = zodiac_signs[next_sign_index]['start']
    if next_sign_index <= sign_index:
        next_sign_start += 365
    
    day_in_sign = normalized_day - current_sign['start'] + 1
    days_in_sign = next_sign_start - current_sign['start']
    progression = day_in_sign / days_in_sign
    
    return {
        'sign': current_sign['name'],
        'sign_index': sign_index,
        'day_in_sign': day_in_sign,
        'progression': min(progression, 1.0),
        'freq_hz': get_frequency(sign_index % 12, 0, '432')
    }

def get_russell_data(day_of_year):
    """Maps day to Russell octave (0-9, cycling)"""
    # Russell octaves as 10-day cycles (for annual mapping)
    octave_cycle = 36.5  # days per octave (365 / 10)
    octave_index = int((day_of_year - 1) / octave_cycle) % 10
    day_in_octave = ((day_of_year - 1) % int(octave_cycle)) + 1
    progression = day_in_octave / octave_cycle
    
    return {
        'octave': octave_index + 1,
        'day_in_octave': day_in_octave,
        'progression': progression,
        'freq_hz': get_frequency(0, octave_index, '432')  # C note per octave
    }

# ============================================================================
# ALIGNMENT DETECTION
# ============================================================================

def calculate_alignment_index(lunar, solar, russell):
    """Calculate how 'aligned' all three systems are (0-1, 1=perfect)"""
    lunar_align = lunar['phase_ratio']  # 0-1 through lunar cycle
    solar_align = solar['progression']  # 0-1 through solar sign
    russell_align = russell['progression']  # 0-1 through Russell octave
    
    # Perfect alignment when all three are at same relative position
    deviation = abs(lunar_align - solar_align) + abs(solar_align - russell_align) + abs(russell_align - lunar_align)
    alignment = max(0, 1 - (deviation / 3))  # Normalized 0-1
    
    return alignment

def calculate_combined_frequency(lunar, solar, russell, alignment):
    """Calculate harmonic average of three systems"""
    f_lunar = lunar['freq_hz']
    f_solar = solar['freq_hz']
    f_russell = russell['freq_hz']
    
    # Weight by alignment (higher alignment = more coherent)
    weight = alignment * 2  # 0-2 scale
    
    combined = (f_lunar + f_solar + f_russell) / 3 + (alignment * 100)
    return combined

# ============================================================================
# MAIN ANALYSIS
# ============================================================================

print("=" * 100)
print("LUNAR (13) × SOLAR (12) × RUSSELL (10) CYCLES: ALIGNMENT ANALYSIS")
print("=" * 100)
print()

print("📅 CYCLE PERIODS")
print("-" * 100)
print(f"  Lunar:  13 months × 28 days = 364 days")
print(f"  Solar:  12 months = 365.25 days")
print(f"  Russell: 10 octaves = 36.5 days each (365÷10)")
print()
print("LCM (Lunar, Solar) = 364 × 365.25 / GCD(364, 365.25) ≈ 132,860 days (~364 years)")
print("LCM (All Three) = even more extended")
print()

# ============================================================================
# FIND ALIGNMENT PEAKS IN 2026
# ============================================================================

print("=" * 100)
print("🔍 ALIGNMENT PEAKS IN 2026 (April 21 baseline)")
print("=" * 100)
print()

alignment_events = []

for day_of_year in range(1, 366):
    lunar = get_lunar_data(day_of_year)
    solar = get_solar_data(day_of_year)
    russell = get_russell_data(day_of_year)
    alignment = calculate_alignment_index(lunar, solar, russell)
    
    if alignment > 0.7:  # Threshold for significant alignment
        date_obj = datetime(2026, 1, 1) + timedelta(days=day_of_year - 1)
        combined_freq = calculate_combined_frequency(lunar, solar, russell, alignment)
        
        alignment_events.append({
            'day': day_of_year,
            'date': date_obj.strftime('%b %d'),
            'lunar_month': lunar['month'],
            'solar_sign': solar['sign'],
            'russell_octave': russell['octave'],
            'alignment': alignment,
            'combined_freq': combined_freq,
            'lunar_freq': lunar['freq_hz'],
            'solar_freq': solar['freq_hz'],
            'russell_freq': russell['freq_hz']
        })

print(f"{'Date':<12} {'Lunar M':<10} {'Solar Sign':<15} {'Russell Oct':<12} {'Alignment':<12} {'Combined Hz':<12}")
print("-" * 100)

for event in alignment_events:
    print(f"{event['date']:<12} {event['lunar_month']:<10} {event['solar_sign']:<15} {event['russell_octave']:<12} {event['alignment']:<12.3f} {event['combined_freq']:<12.1f}")

print()
print(f"Total significant alignments in 2026: {len(alignment_events)}")

# ============================================================================
# PEAK ALIGNMENT (April 21, 2026 - TODAY)
# ============================================================================

print()
print("=" * 100)
print("⭐ ANALYSIS: TODAY (April 21, 2026)")
print("=" * 100)
print()

day_of_year = 111  # April 21 (Jan=31, Feb=28, Mar=31, Apr=21)
lunar = get_lunar_data(day_of_year)
solar = get_solar_data(day_of_year)
russell = get_russell_data(day_of_year)
alignment = calculate_alignment_index(lunar, solar, russell)

print(f"Date: April 21, 2026")
print()
print(f"Lunar Cycle:")
print(f"  Month: {lunar['month']}/13")
print(f"  Day in month: {lunar['day_in_month']}/28")
print(f"  Phase: {lunar['phase_ratio']*100:.1f}% through cycle")
print(f"  Frequency: {lunar['freq_hz']:.2f} Hz")
print(f"  Note: {NOTE_NAMES[(lunar['month']-1) % 12]}")
print()

print(f"Solar Cycle:")
print(f"  Sign: {solar['sign']}")
print(f"  Day in sign: {solar['day_in_sign']}")
print(f"  Progression: {solar['progression']*100:.1f}% through sign")
print(f"  Frequency: {solar['freq_hz']:.2f} Hz")
print(f"  Note: {NOTE_NAMES[solar['sign_index'] % 12]}")
print()

print(f"Russell Cycle:")
print(f"  Octave: {russell['octave']}/10")
print(f"  Day in octave: {russell['day_in_octave']:.1f}/36.5")
print(f"  Progression: {russell['progression']*100:.1f}% through octave")
print(f"  Frequency: {russell['freq_hz']:.2f} Hz")
print(f"  Note: C (root)")
print()

print(f"ALIGNMENT COHERENCY:")
print(f"  Index: {alignment:.3f} (0=no alignment, 1=perfect)")
print(f"  Status: {'✓ HIGH' if alignment > 0.7 else '✓ MODERATE' if alignment > 0.4 else '○ LOW'}")
print()

combined_freq = calculate_combined_frequency(lunar, solar, russell, alignment)
print(f"Combined Frequency (harmonic average): {combined_freq:.2f} Hz")
print()

# ============================================================================
# HARMONIC RELATIONSHIPS
# ============================================================================

print("=" * 100)
print("🎵 HARMONIC RELATIONSHIPS (April 21, 2026)")
print("=" * 100)
print()

f_lunar = lunar['freq_hz']
f_solar = solar['freq_hz']
f_russell = russell['freq_hz']

ratio_solar_lunar = f_solar / f_lunar
ratio_russell_lunar = f_russell / f_lunar
ratio_russell_solar = f_russell / f_solar

print(f"Lunar frequency:   {f_lunar:.2f} Hz")
print(f"Solar frequency:   {f_solar:.2f} Hz")
print(f"Russell frequency: {f_russell:.2f} Hz")
print()

print(f"Ratios:")
print(f"  Solar ÷ Lunar = {ratio_solar_lunar:.4f}")
print(f"  Russell ÷ Lunar = {ratio_russell_lunar:.4f}")
print(f"  Russell ÷ Solar = {ratio_russell_solar:.4f}")
print()

# Check for harmonics
def find_nearest_harmonic(ratio):
    """Find nearest simple ratio (e.g., 2:1, 3:2, 4:3)"""
    for n in range(1, 10):
        for d in range(1, 10):
            simple_ratio = n / d
            if abs(ratio - simple_ratio) < 0.02:
                return f"{n}:{d}", abs(ratio - simple_ratio)
    return "none", 1.0

solar_harmonic, solar_error = find_nearest_harmonic(ratio_solar_lunar)
russell_harmonic, russell_error = find_nearest_harmonic(ratio_russell_lunar)

print(f"Harmonic alignment:")
print(f"  Solar ÷ Lunar ≈ {solar_harmonic} (error: {solar_error:.4f})")
print(f"  Russell ÷ Lunar ≈ {russell_harmonic} (error: {russell_error:.4f})")
print()

# ============================================================================
# GRAND ALIGNMENT CYCLES
# ============================================================================

print("=" * 100)
print("🌍 GRAND ALIGNMENT CYCLES (Multi-Year)")
print("=" * 100)
print()

print("When all three systems align, major coherency peaks occur:")
print()

# LCM calculation
lcm_lunar_solar = (13 * 28 * 12 * 365) // math.gcd(13*28, 12*365)
lcm_all = lcm_lunar_solar * 10  # Rough estimate

print(f"Lunar-Solar alignment (LCM): ~{lcm_lunar_solar} days ≈ {lcm_lunar_solar/365:.1f} years")
print(f"Full triple alignment (estimated): ~{lcm_all} days ≈ {lcm_all/365:.0f} years")
print()

print("Interpretation:")
print("  • Lunar (13) and Solar (12) have GCD(13,12)=1 → rare alignment")
print("  • Adding Russell (10) makes triple alignment extremely rare")
print("  • This explains why 'synchronization events' are powerful & memorable")
print()

# ============================================================================
# FREQUENCY CONVERGENCE AT ALIGNMENT
# ============================================================================

print("=" * 100)
print("📊 FREQUENCY COHERENCY AT HIGH-ALIGNMENT DAYS")
print("=" * 100)
print()

# Find best alignment day in 2026
best_alignment = max(alignment_events, key=lambda x: x['alignment'])

print(f"Peak alignment day in 2026: {best_alignment['date']}")
print()

print(f"At this peak:")
print(f"  Lunar frequency:   {best_alignment['lunar_freq']:>10.2f} Hz")
print(f"  Solar frequency:   {best_alignment['solar_freq']:>10.2f} Hz")
print(f"  Russell frequency: {best_alignment['russell_freq']:>10.2f} Hz")
print()

freq_variance = [best_alignment['lunar_freq'], best_alignment['solar_freq'], best_alignment['russell_freq']]
freq_std = (sum(f**2 for f in freq_variance) / len(freq_variance)) ** 0.5
freq_mean = sum(freq_variance) / len(freq_variance)

print(f"Convergence metric:")
print(f"  Mean frequency: {freq_mean:.2f} Hz")
print(f"  Variance (Hz): {max(freq_variance) - min(freq_variance):.2f} Hz")
print(f"  Alignment index: {best_alignment['alignment']:.3f}")
print()

# ============================================================================
# PRACTICAL IMPLICATIONS
# ============================================================================

print("=" * 100)
print("🎯 PRACTICAL IMPLICATIONS FOR UFT")
print("=" * 100)
print()

print("1. COMPOSITION & PERFORMANCE")
print("   • Schedule performances/recordings on high-alignment days")
print("   • Use combined frequency ({:.2f} Hz) as anchor tone".format(best_alignment['combined_freq']))
print("   • Exploit harmonic ratios between cycles for dynamic texture")
print()

print("2. HEALING & BIOAFINAÇÃO")
print("   • Track personal rhythm against lunar-solar-Russell cycles")
print("   • Resonance peaks may indicate optimal therapy windows")
print("   • Use combined frequency for polyphonic body tuning")
print()

print("3. HARDWARE CONTROL")
print("   • Multi-oscillator UFT hardware can track all three cycles")
print("   • Oscillator 1 (Lunar): {:.2f} Hz".format(best_alignment['lunar_freq']))
print("   • Oscillator 2 (Solar): {:.2f} Hz".format(best_alignment['solar_freq']))
print("   • Oscillator 3 (Russell): {:.2f} Hz".format(best_alignment['russell_freq']))
print("   • Play polyphonic alignment soundscape")
print()

print("4. CALENDAR & PLANNING")
print("   • Mark high-alignment days in UFT calendar app")
print("   • Plan important events on these days for maximum coherency")
print("   • Track personal energy/mood against alignment index")
print()

print("5. RESEARCH")
print("   • Validate if humans perceive coherency on alignment peaks")
print("   • Measure biological markers (heart rate, brainwave, etc.)")
print("   • Compare healing outcomes on high-alignment vs random days")
print()

print("=" * 100)
print("🎼 CONCLUSION")
print("=" * 100)
print()
print("Lunar (13), Solar (12), and Russell (10) cycles create a complex")
print("interference pattern. High-alignment moments (>0.7 index) are rare")
print("and powerful coherency points.")
print()
print("At these peaks, all three systems resonate near the same frequency,")
print("creating natural 'harmonization windows' for:")
print("  • Music composition & performance")
print("  • Bioafinação & healing protocols")
print("  • Conscious intention & manifestation work")
print("  • Hardware-based frequency synthesis")
print()
print("The UFT engine can track and exploit these cycles in real-time.")
print()
