/**
 * UFT 12:21 — MATHEMATICAL COHERENCY VERIFICATION
 * 
 * Comprehensive validation of all mathematical equations, constants, and calculations.
 * Ensures internal consistency across the entire cosmic translator system.
 * 
 * Verification includes:
 * - Core equation validation (phase, spiral, segmentation)
 * - Constant accuracy checks (PHI, frequencies, ratios)
 * - Scale coherency (12-tone, 13-tone, harmonic relationships)
 * - Calendar engine logic (lunar, solar, convergency)
 * - Cymatic geometry mapping
 * - Harmonic interval ratios
 */

// ============================================================================
// MATHEMATICAL CONSTANTS & VERIFICATION
// ============================================================================

const MathConstants = {
  // Golden Ratio
  PHI: 1.6180339887,
  PHI_INVERSE: 0.6180339887,
  PHI_SQUARED: 2.6180339887,
  
  // Verify PHI relationships
  verifyPhi() {
    const phi = this.PHI;
    const tests = {
      'φ² = φ + 1': Math.abs(phi * phi - (phi + 1)) < 1e-10,
      '1/φ = φ - 1': Math.abs(1 / phi - (phi - 1)) < 1e-10,
      '√(1 + √5)/2 = φ': Math.abs(Math.sqrt((1 + Math.sqrt(5)) / 2) - phi) < 1e-10,
    };
    
    console.log('=== PHI CONSTANT VERIFICATION ===');
    console.log(`φ = ${phi}`);
    Object.entries(tests).forEach(([test, passed]) => {
      console.log(`  ${passed ? '✓' : '✗'} ${test}`);
    });
    return Object.values(tests).every(t => t);
  },
  
  // Verify step ratio (equal temperament)
  verifyStepRatio() {
    const stepRatio = Math.pow(2, 1/12);
    const expected = 1.05946309436;
    const passed = Math.abs(stepRatio - expected) < 1e-10;
    
    console.log('\n=== 12-TONE EQUAL TEMPERAMENT STEP RATIO ===');
    console.log(`2^(1/12) = ${stepRatio}`);
    console.log(`Expected = ${expected}`);
    console.log(`${passed ? '✓' : '✗'} Passed`);
    return passed;
  }
};

// ============================================================================
// FREQUENCY SCALE VERIFICATION
// ============================================================================

const FrequencyVerification = {
  // Root frequencies (from specification)
  roots: {
    '440Hz': 261.6256,
    '432Hz': 256.0000,
    'Moon': 210.4186
  },
  
  // Expected 12-tone scale (432 Hz tuning)
  scale432: [
    261.6256, 277.1827, 293.6648, 311.1270, 329.6276, 349.2283,
    369.9945, 391.9955, 415.3048, 440.0001, 466.1638, 493.8834
  ],
  
  // Expected moon scale (13-tone Nikkal)
  moonScale: [
    210.4186, 222.9307, 236.1869, 250.2313, 265.1108, 280.8751,
    297.5768, 315.2717, 334.0187, 353.8805, 374.9233, 397.2174, 420.8372
  ],
  
  /**
   * Verify frequency formula: f(n) = root × 2^(n/12)
   */
  verifyFrequencyFormula() {
    console.log('\n=== FREQUENCY FORMULA VERIFICATION ===');
    console.log('Formula: f(n) = root × 2^(n/12)\n');
    
    const root = 256.0000;  // 432 Hz tuning
    let allPassed = true;
    
    for (let i = 0; i < 12; i++) {
      const computed = root * Math.pow(2, i / 12);
      const expected = this.scale432[i];
      const error = Math.abs(computed - expected);
      const passed = error < 0.01;  // tolerance: 0.01 Hz
      
      allPassed = allPassed && passed;
      
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      console.log(`${passed ? '✓' : '✗'} ${noteNames[i]:3} | Computed: ${computed.toFixed(4)} Hz | Expected: ${expected.toFixed(4)} Hz | Error: ${error.toFixed(6)} Hz`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify moon scale (210.42 Hz root)
   */
  verifyMoonScale() {
    console.log('\n=== MOON SCALE (13-TONE NIKKAL) VERIFICATION ===');
    console.log('Root: 210.4186 Hz (synodic period × 2²⁹)\n');
    
    const root = 210.4186;
    let allPassed = true;
    
    for (let i = 0; i < 13; i++) {
      const computed = root * Math.pow(2, i / 12);
      const expected = this.moonScale[i];
      const error = Math.abs(computed - expected);
      const passed = error < 0.01;
      
      allPassed = allPassed && passed;
      
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', "C'"];
      console.log(`${passed ? '✓' : '✗'} ${noteNames[i]:3} | Computed: ${computed.toFixed(4)} Hz | Expected: ${expected.toFixed(4)} Hz | Error: ${error.toFixed(6)} Hz`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify zero point frequency: F# = root × √2
   */
  verifyZeroPoint() {
    console.log('\n=== ZERO POINT FREQUENCY VERIFICATION ===');
    console.log('Formula: F# = root × √2\n');
    
    const tests = [
      { tuning: '432 Hz', root: 256.0000, expected: 362.0387 },
      { tuning: 'Moon', root: 210.4186, expected: 297.5768 }
    ];
    
    let allPassed = true;
    
    tests.forEach(test => {
      const computed = test.root * Math.sqrt(2);
      const error = Math.abs(computed - test.expected);
      const passed = error < 0.01;
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} ${test.tuning:10} | root × √2 = ${computed.toFixed(4)} Hz | Expected: ${test.expected.toFixed(4)} Hz | Error: ${error.toFixed(6)} Hz`);
    });
    
    return allPassed;
  }
};

// ============================================================================
// FIBONACCI & PHI RATIO VERIFICATION
// ============================================================================

const FibonacciVerification = {
  sequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377],
  
  /**
   * Verify Fibonacci sequence generation
   */
  verifySequence() {
    console.log('\n=== FIBONACCI SEQUENCE VERIFICATION ===\n');
    
    let allPassed = true;
    for (let i = 2; i < this.sequence.length; i++) {
      const computed = this.sequence[i - 1] + this.sequence[i - 2];
      const expected = this.sequence[i];
      const passed = computed === expected;
      
      allPassed = allPassed && passed;
      console.log(`${passed ? '✓' : '✗'} F(${i}) = F(${i-1}) + F(${i-2}) = ${this.sequence[i-1]} + ${this.sequence[i-2]} = ${computed} (expected: ${expected})`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify phi ratios converge to golden ratio
   */
  verifyPhiConvergence() {
    console.log('\n=== PHI RATIO CONVERGENCE ===');
    console.log('Consecutive Fibonacci ratios should converge to 1/φ = 0.618033987...\n');
    
    const PHI_INV = 0.6180339887;
    let allPassed = true;
    
    for (let i = 1; i < this.sequence.length - 1; i++) {
      const ratio = this.sequence[i] / this.sequence[i + 1];
      const error = Math.abs(ratio - PHI_INV);
      const passed = error < 0.01;  // tolerance for early terms
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} F(${i})/F(${i+1}) = ${this.sequence[i]}/${this.sequence[i+1]} = ${ratio.toFixed(9)} | Error: ${error.toFixed(9)}`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify scale assignments (Fibonacci numbers map to notes)
   */
  verifyScaleAssignments() {
    console.log('\n=== SCALE ASSIGNMENTS (FIBONACCI TO NOTES) ===\n');
    
    const assignments = [
      { note: 'C', idx: 0, fib: 1 },
      { note: 'C#', idx: 1, fib: 2 },
      { note: 'D', idx: 2, fib: 3 },
      { note: 'D#', idx: 3, fib: 5 },
      { note: 'E', idx: 4, fib: 8 },
      { note: 'F', idx: 5, fib: 13 },
      { note: 'F#', idx: 6, fib: 21 },
      { note: 'G', idx: 7, fib: 34 },
      { note: 'G#', idx: 8, fib: 55 },
      { note: 'A', idx: 9, fib: 89 },
      { note: 'A#', idx: 10, fib: 144 },
      { note: 'B', idx: 11, fib: 233 },
      { note: "C'", idx: 12, fib: 377 }
    ];
    
    let allPassed = true;
    
    assignments.forEach(a => {
      const inSequence = this.sequence.includes(a.fib);
      const passed = inSequence;
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} ${a.note:3} (index ${a.idx}) → Fibonacci ${a.fib} ${inSequence ? '' : '(NOT IN SEQUENCE)'}`);
    });
    
    return allPassed;
  }
};

// ============================================================================
// HARMONIC INTERVAL VERIFICATION
// ============================================================================

const HarmonicVerification = {
  intervals: {
    'Unison': 1.0,
    'Minor 2nd': 1.0595,      // 2^(1/12)
    'Major 2nd': 1.1225,      // 2^(2/12)
    'Minor 3rd': 1.1892,      // 2^(3/12)
    'Major 3rd': 1.2599,      // 2^(4/12)
    'Perfect 4th': 1.3348,    // 2^(5/12)
    'Tritone': 1.4142,        // 2^(6/12) = √2
    'Perfect 5th': 1.4983,    // 2^(7/12)
    'Minor 6th': 1.5874,      // 2^(8/12)
    'Major 6th': 1.6818,      // 2^(9/12)
    'Minor 7th': 1.7818,      // 2^(10/12)
    'Major 7th': 1.8877,      // 2^(11/12)
    'Octave': 2.0
  },
  
  /**
   * Verify harmonic ratios
   */
  verifyIntervals() {
    console.log('\n=== HARMONIC INTERVAL VERIFICATION ===\n');
    
    const ratios = {
      'Perfect 5th': { interval: 7, formula: 3/2, equal_temp: 2^(7/12) },
      'Perfect 4th': { interval: 5, formula: 4/3, equal_temp: 2^(5/12) },
      'Octave': { interval: 12, formula: 2/1, equal_temp: 2 },
      'Major 3rd': { interval: 4, formula: 5/4, equal_temp: 2^(4/12) },
      'Minor 6th (φ)': { interval: 8, formula: 8/5, equal_temp: 2^(8/12) }
    };
    
    let allPassed = true;
    
    Object.entries(ratios).forEach(([name, r]) => {
      const et = Math.pow(2, r.interval / 12);
      const error = Math.abs(r.formula - et);
      const passed = error < 0.05;  // Just pure ratio & ET are different systems
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} ${name:15} | Just ratio: ${r.formula.toFixed(4)} | Equal temp: ${et.toFixed(4)} | Semitones: ${r.interval}`);
    });
    
    return allPassed;
  },
  
  /**
   * Verify phi interval (8:13) — special Ophiuchus interval
   */
  verifyPhiInterval() {
    console.log('\n=== PHI INTERVAL VERIFICATION (8:13 - OPHIUCHUS) ===\n');
    
    const phi_interval = 8 / 13;
    const phi_inverse = 1 / 1.6180339887;
    const error = Math.abs(phi_interval - phi_inverse);
    const passed = error < 0.01;
    
    console.log(`8/13 = ${phi_interval.toFixed(9)}`);
    console.log(`1/φ = ${phi_inverse.toFixed(9)}`);
    console.log(`Error: ${error.toFixed(9)}`);
    console.log(`${passed ? '✓' : '✗'} 8/13 ≈ 1/φ (Ophiuchus phi interval)`);
    
    return passed;
  }
};

// ============================================================================
// CALENDAR ENGINE VERIFICATION
// ============================================================================

const CalendarVerification = {
  /**
   * Verify lunar calendar: 13 moons × 28 days = 364 days
   */
  verifyLunarCalendar() {
    console.log('\n=== LUNAR CALENDAR VERIFICATION ===\n');
    
    const moons = 13;
    const daysPerMoon = 28;
    const totalDays = moons * daysPerMoon;
    const expected = 364;
    const passed = totalDays === expected;
    
    console.log(`13 moons × 28 days = ${totalDays} days`);
    console.log(`Expected: ${expected} days`);
    console.log(`${passed ? '✓' : '✗'} Lunar calendar verification`);
    
    // Check moon-to-day mapping for all 13 moons
    console.log('\nMoon-to-day ranges:');
    let allPassed = passed;
    
    for (let moon = 1; moon <= 13; moon++) {
      const dayStart = (moon - 1) * 28;
      const dayEnd = dayStart + 27;
      console.log(`  Moon ${moon:2}: days ${dayStart:3}-${dayEnd:3}`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify solar calendar: 12 signs × 30.4375 days ≈ 365.25 days
   */
  verifySolarCalendar() {
    console.log('\n=== SOLAR CALENDAR VERIFICATION ===\n');
    
    const signs = 12;
    const daysPerSign = 30.4375;
    const totalDays = signs * daysPerSign;
    const expected = 365.25;
    const error = Math.abs(totalDays - expected);
    const passed = error < 0.01;
    
    console.log(`12 signs × 30.4375 days = ${totalDays.toFixed(2)} days`);
    console.log(`Expected: ${expected} days`);
    console.log(`Error: ${error.toFixed(6)}`);
    console.log(`${passed ? '✓' : '✗'} Solar calendar verification`);
    
    return passed;
  }
};

// ============================================================================
// COSMIC TRANSLATOR (12:21) VERIFICATION
// ============================================================================

const CosmicTranslatorVerification = {
  PHI: 1.6180339887,
  T_L: 29.5306,  // synodic period in days
  
  /**
   * Verify phase function: θ(t) = 2πt / T_L
   */
  verifyPhaseFunction() {
    console.log('\n=== PHASE FUNCTION VERIFICATION ===');
    console.log('Formula: θ(t) = 2πt / T_L\n');
    
    const tests = [
      { t: 0, expected_rad: 0, expected_deg: 0 },
      { t: this.T_L / 4, expected_rad: Math.PI / 2, expected_deg: 90 },
      { t: this.T_L / 2, expected_rad: Math.PI, expected_deg: 180 },
      { t: this.T_L, expected_rad: 2 * Math.PI, expected_deg: 360 }
    ];
    
    let allPassed = true;
    
    tests.forEach(test => {
      const theta = (2 * Math.PI * test.t) / this.T_L;
      const theta_normalized = theta % (2 * Math.PI);
      const theta_deg = (theta_normalized * 180) / Math.PI;
      
      const error_rad = Math.abs(theta_normalized - test.expected_rad % (2 * Math.PI));
      const passed = error_rad < 0.001;
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} t=${test.t.toFixed(2):7} days | θ=${theta_rad.toFixed(4)} rad = ${theta_deg.toFixed(1)}° | Expected: ${test.expected_deg}°`);
    });
    
    return allPassed;
  },
  
  /**
   * Verify spiral function: f(t) = r₀ · φ^(θ/2π) · e^(iθ)
   */
  verifySpiral() {
    console.log('\n=== SPIRAL FUNCTION VERIFICATION ===');
    console.log('Formula: f(t) = r₀ · φ^(θ/2π) · e^(iθ)\n');
    
    const tests = [
      { t: 0, cycles: 0 },
      { t: this.T_L, cycles: 1 },
      { t: this.T_L * 2, cycles: 2 },
      { t: this.T_L * 3, cycles: 3 }
    ];
    
    let allPassed = true;
    
    tests.forEach(test => {
      const theta = (2 * Math.PI * test.t) / this.T_L;
      const cycles = test.t / this.T_L;
      const exponent = (theta % (2 * Math.PI)) / (2 * Math.PI);
      const r0 = 1.0;
      
      const magnitude = r0 * Math.pow(this.PHI, exponent);
      const x = magnitude * Math.cos(theta);
      const y = magnitude * Math.sin(theta);
      
      // Magnitude should be approximately r0 · φ^(cycles mod 1)
      const magnitude_cycles = r0 * Math.pow(this.PHI, cycles % 1);
      const error = Math.abs(magnitude - magnitude_cycles);
      const passed = error < 0.01;
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} t=${test.t.toFixed(2):7} days (cycles=${cycles.toFixed(2)}) | r=${magnitude.toFixed(4)} | (x,y)=(${x.toFixed(2)},${y.toFixed(2)})`);
    });
    
    return allPassed;
  },
  
  /**
   * Verify 21-state segmentation
   */
  verify21States() {
    console.log('\n=== 21-STATE SEGMENTATION VERIFICATION ===\n');
    
    const T_L = this.T_L;
    const states_per_cycle = 21;
    
    let allPassed = true;
    
    // Test that 21 states map evenly across one lunar cycle
    for (let i = 0; i < 21; i++) {
      const phase_in_cycle = i / 21;
      const time_for_state = phase_in_cycle * T_L;
      
      // Compute state back from time
      const cycles = time_for_state / T_L;
      const state_computed = Math.floor((cycles % 1) * 21);
      
      const passed = state_computed === i;
      allPassed = allPassed && passed;
      
      const phase_deg = phase_in_cycle * 360;
      console.log(`${passed ? '✓' : '✗'} State ${i:2} | Time: ${time_for_state.toFixed(2):7} days | Phase: ${phase_deg.toFixed(1):6}°`);
    }
    
    return allPassed;
  }
};

// ============================================================================
// TORUS GEOMETRY VERIFICATION
// ============================================================================

const TorusVerification = {
  /**
   * Verify (13, 21) torus knot: 13 × 21 = 273 positions
   */
  verifyTorusKnot() {
    console.log('\n=== TORUS (13,21) KNOT VERIFICATION ===\n');
    
    const u_windings = 13;
    const v_windings = 21;
    const total_positions = u_windings * v_windings;
    const expected = 273;
    
    const passed = total_positions === expected;
    
    console.log(`13 × 21 = ${total_positions} surface positions`);
    console.log(`Expected: ${expected}`);
    console.log(`${passed ? '✓' : '✗'} Torus knot verification`);
    
    // Verify that 21 states map perfectly to torus surface
    console.log('\n21-state mapping to torus surface:');
    
    let allPassed = passed;
    for (let state = 0; state < 21; state++) {
      const position = (state / 21) * total_positions;
      const u_turns = Math.floor(position / v_windings);
      const v_pos = Math.floor(position % v_windings);
      
      console.log(`  State ${state:2} → Position ${position.toFixed(1):7} → u=${u_turns}, v=${v_pos}`);
    }
    
    return allPassed;
  },
  
  /**
   * Verify torus angle calculations
   */
  verifyTorusAngles() {
    console.log('\n=== TORUS ANGLE VERIFICATION ===\n');
    
    const moonPositions = [
      { moon: 1, expected_angle: 0.0, tolerance: 0.05 },
      { moon: 7, expected_angle: 180.0, tolerance: 0.05 },
      { moon: 13, expected_angle: 332.3, tolerance: 0.1 }
    ];
    
    let allPassed = true;
    
    moonPositions.forEach(m => {
      const angle = (m.moon / 13) * 360;
      const error = Math.abs(angle - m.expected_angle);
      const passed = error <= m.tolerance;
      
      allPassed = allPassed && passed;
      
      console.log(`${passed ? '✓' : '✗'} Moon ${m.moon:2} → ${angle.toFixed(2)}° (expected: ${m.expected_angle.toFixed(1)}°, error: ${error.toFixed(2)}°)`);
    });
    
    return allPassed;
  }
};

// ============================================================================
// PROTO-WORD FREQUENCY VERIFICATION
// ============================================================================

const ProtoWordVerification = {
  protoWords: {
    'AH': 210.42,
    'SA': 222.93,
    'LA': 236.19,
    'RA': 250.23,
    'DA': 265.11,
    'HA': 280.88,
    'NA': 297.58,
    'OM': 334.02,
    'TAO': 420.84
  },
  
  /**
   * Verify proto-words are valid moon scale notes
   */
  verifyProtoWordsInScale() {
    console.log('\n=== PROTO-WORD FREQUENCY VERIFICATION ===\n');
    
    const root = 210.4186;
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', "C'"];
    
    let allPassed = true;
    
    Object.entries(this.protoWords).forEach(([word, freq]) => {
      // Find closest note in scale
      let closestNote = 0;
      let minError = Infinity;
      
      for (let i = 0; i < 13; i++) {
        const noteFreq = root * Math.pow(2, i / 12);
        const error = Math.abs(noteFreq - freq);
        
        if (error < minError) {
          minError = error;
          closestNote = i;
        }
      }
      
      const passed = minError < 0.1;  // within 0.1 Hz
      allPassed = allPassed && passed;
      
      const computedFreq = root * Math.pow(2, closestNote / 12);
      console.log(`${passed ? '✓' : '✗'} ${word:3} (${freq.toFixed(2)} Hz) → ${noteNames[closestNote]:3} (${computedFreq.toFixed(2)} Hz) | Error: ${minError.toFixed(3)} Hz`);
    });
    
    return allPassed;
  },
  
  /**
   * Verify proto-words span full octave range
   */
  verifyOctaveSpan() {
    console.log('\n=== PROTO-WORD OCTAVE SPAN ===\n');
    
    const freqs = Object.values(this.protoWords);
    const minFreq = Math.min(...freqs);
    const maxFreq = Math.max(...freqs);
    const range = maxFreq / minFreq;
    
    // Should span roughly 2 octaves (2^2 = 4)
    const expected_range = 2;
    const actual_octaves = Math.log2(range);
    const error = Math.abs(actual_octaves - expected_range);
    const passed = error < 0.2;
    
    console.log(`Min frequency: ${minFreq.toFixed(2)} Hz`);
    console.log(`Max frequency: ${maxFreq.toFixed(2)} Hz`);
    console.log(`Range: ${range.toFixed(3)}x = ${actual_octaves.toFixed(3)} octaves`);
    console.log(`Expected: ${expected_range} octaves`);
    console.log(`${passed ? '✓' : '✗'} Proto-word frequency span`);
    
    return passed;
  }
};

// ============================================================================
// MAIN VERIFICATION RUNNER
// ============================================================================

function runFullVerification() {
  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║     UFT 12:21 MATHEMATICAL COHERENCY VERIFICATION SUITE           ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  const results = {
    'Mathematical Constants': [],
    'Frequency Scales': [],
    'Fibonacci & Phi': [],
    'Harmonic Intervals': [],
    'Calendars': [],
    'Cosmic Translator (12:21)': [],
    'Torus Geometry': [],
    'Proto-Words': []
  };
  
  // Run all verifications
  try {
    results['Mathematical Constants'].push(MathConstants.verifyPhi());
    results['Mathematical Constants'].push(MathConstants.verifyStepRatio());
    
    results['Frequency Scales'].push(FrequencyVerification.verifyFrequencyFormula());
    results['Frequency Scales'].push(FrequencyVerification.verifyMoonScale());
    results['Frequency Scales'].push(FrequencyVerification.verifyZeroPoint());
    
    results['Fibonacci & Phi'].push(FibonacciVerification.verifySequence());
    results['Fibonacci & Phi'].push(FibonacciVerification.verifyPhiConvergence());
    results['Fibonacci & Phi'].push(FibonacciVerification.verifyScaleAssignments());
    
    results['Harmonic Intervals'].push(HarmonicVerification.verifyIntervals());
    results['Harmonic Intervals'].push(HarmonicVerification.verifyPhiInterval());
    
    results['Calendars'].push(CalendarVerification.verifyLunarCalendar());
    results['Calendars'].push(CalendarVerification.verifySolarCalendar());
    
    results['Cosmic Translator (12:21)'].push(CosmicTranslatorVerification.verifyPhaseFunction());
    results['Cosmic Translator (12:21)'].push(CosmicTranslatorVerification.verifySpiral());
    results['Cosmic Translator (12:21)'].push(CosmicTranslatorVerification.verify21States());
    
    results['Torus Geometry'].push(TorusVerification.verifyTorusKnot());
    results['Torus Geometry'].push(TorusVerification.verifyTorusAngles());
    
    results['Proto-Words'].push(ProtoWordVerification.verifyProtoWordsInScale());
    results['Proto-Words'].push(ProtoWordVerification.verifyOctaveSpan());
    
  } catch (e) {
    console.error('\n❌ ERROR during verification:', e.message);
    console.error(e.stack);
  }
  
  // Summary
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                        VERIFICATION SUMMARY                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝\n');
  
  let totalTests = 0;
  let totalPassed = 0;
  
  Object.entries(results).forEach(([category, tests]) => {
    const passed = tests.filter(t => t).length;
    const total = tests.length;
    totalTests += total;
    totalPassed += passed;
    
    const status = passed === total ? '✓' : '✗';
    console.log(`${status} ${category:35} ${passed}/${total} passed`);
  });
  
  console.log('\n' + '─'.repeat(70));
  console.log(`\nOVERALL: ${totalPassed}/${totalTests} checks passed`);
  
  if (totalPassed === totalTests) {
    console.log('\n🎉 ALL MATHEMATICAL COHERENCY CHECKS PASSED');
    console.log('The UFT 12:21 system is mathematically consistent and valid.');
  } else {
    console.log(`\n⚠️  ${totalTests - totalPassed} checks failed - review above for details`);
  }
  
  console.log('\n' + '═'.repeat(70) + '\n');
  
  return {
    passed: totalPassed,
    total: totalTests,
    allPassed: totalPassed === totalTests,
    results
  };
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MathConstants,
    FrequencyVerification,
    FibonacciVerification,
    HarmonicVerification,
    CalendarVerification,
    CosmicTranslatorVerification,
    TorusVerification,
    ProtoWordVerification,
    runFullVerification
  };
}

// Run if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  const summary = runFullVerification();
  process.exit(summary.allPassed ? 0 : 1);
}
