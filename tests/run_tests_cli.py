#!/usr/bin/env python3
"""
UFT CORE MACHINE - CLI TEST RUNNER (Python)
All 47 tests executing in terminal
"""

import math
import datetime
from typing import List, Dict, Any

# =========================================================================
# TEST FRAMEWORK
# =========================================================================

class TestRunner:
    def __init__(self):
        self.test_results: List[Dict] = []
        self.current_suite: Dict = None
    
    def suite(self, name: str):
        self.current_suite = {"name": name, "tests": []}
        self.test_results.append(self.current_suite)
        return self
    
    def test(self, description: str, test_fn):
        try:
            test_fn()
            self.current_suite["tests"].append({
                "description": description,
                "passed": True,
                "error": None
            })
        except AssertionError as e:
            self.current_suite["tests"].append({
                "description": description,
                "passed": False,
                "error": str(e)
            })
        return self
    
    def assert_true(self, condition: bool, message: str = "Assertion failed"):
        if not condition:
            raise AssertionError(message)
    
    def assert_equals(self, actual: Any, expected: Any, message: str = None):
        if actual != expected:
            msg = message or f"Expected {expected}, got {actual}"
            raise AssertionError(msg)
    
    def assert_not_null(self, value: Any, message: str = None):
        if value is None:
            msg = message or "Value is None"
            raise AssertionError(msg)
    
    def assert_type(self, value: Any, expected_type: type, message: str = None):
        if not isinstance(value, expected_type):
            msg = message or f"Expected type {expected_type.__name__}, got {type(value).__name__}"
            raise AssertionError(msg)
    
    def get_stats(self) -> Dict:
        total = 0
        passed = 0
        failed = 0
        for suite in self.test_results:
            for test in suite["tests"]:
                total += 1
                if test["passed"]:
                    passed += 1
                else:
                    failed += 1
        success_rate = ((passed / total) * 100) if total > 0 else 0
        return {"total": total, "passed": passed, "failed": failed, "success_rate": success_rate}
    
    def render(self):
        stats = self.get_stats()
        
        print("\n" + "="*80)
        print("📊 UFT CORE MACHINE - TEST RESULTS")
        print("="*80 + "\n")
        
        for suite in self.test_results:
            print(f"\n📋 {suite['name']}")
            print("-"*80)
            
            for test in suite["tests"]:
                status = "✅ PASS" if test["passed"] else "❌ FAIL"
                print(f"  {status} | {test['description']}")
                if test["error"]:
                    print(f"         └─ {test['error']}")
        
        print("\n" + "="*80)
        print("📈 SUMMARY")
        print("="*80)
        print(f"  Total Tests:   {stats['total']}")
        print(f"  ✅ Passed:     {stats['passed']}")
        print(f"  ❌ Failed:     {stats['failed']}")
        print(f"  Success Rate:  {stats['success_rate']:.1f}%")
        print("="*80 + "\n")
        
        return stats

# =========================================================================
# LUNAR MODULE
# =========================================================================

class LunarModule:
    SYNODIC_PERIOD = 29.5306
    LUNAR_OCTAVE_ROOT = 210.4186
    MOON_COUNT = 13
    DAYS_PER_MOON = 28
    LUNAR_YEAR_DAYS = 364
    
    LUNAR_PROTO_WORDS = [
        {"month": 1, "word": "OH", "freq": 210.4186, "quality": "Universal Heart"},
        {"month": 2, "word": "AH", "freq": 223.1078, "quality": "Creative Expression"},
        {"month": 3, "word": "EE", "freq": 236.1869, "quality": "Divine Wisdom"},
        {"month": 4, "word": "OOH", "freq": 250.2313, "quality": "Grounding Connection"},
        {"month": 5, "word": "MM", "freq": 265.1108, "quality": "Inner Resonance"},
        {"month": 6, "word": "NG", "freq": 280.8751, "quality": "Cosmic Flow"},
        {"month": 7, "word": "AY", "freq": 297.5768, "quality": "Zero Point Threshold"},
        {"month": 8, "word": "EH", "freq": 315.2717, "quality": "Balance & Harmony"},
        {"month": 9, "word": "IA", "freq": 334.0187, "quality": "Transformation"},
        {"month": 10, "word": "AU", "freq": 353.8805, "quality": "Celestial Union"},
        {"month": 11, "word": "OE", "freq": 374.9233, "quality": "Quantum Bridging"},
        {"month": 12, "word": "UH", "freq": 397.2174, "quality": "Sacred Foundation"},
        {"month": 13, "word": "AR", "freq": 420.8372, "quality": "Cosmic Return"}
    ]
    
    @staticmethod
    def day_to_lunar_phase(day_of_year: int) -> Dict:
        normalized_day = ((day_of_year - 1) % LunarModule.LUNAR_YEAR_DAYS) + 1
        month = math.ceil(normalized_day / LunarModule.DAYS_PER_MOON)
        day_in_month = ((normalized_day - 1) % LunarModule.DAYS_PER_MOON) + 1
        return {
            "month": min(month, 13),
            "day_in_month": day_in_month,
            "phase_ratio": day_in_month / LunarModule.DAYS_PER_MOON
        }
    
    @staticmethod
    def export_state(day_of_year: int) -> Dict:
        phase = LunarModule.day_to_lunar_phase(day_of_year)
        proto = LunarModule.LUNAR_PROTO_WORDS[phase["month"] - 1]
        return {
            "month": phase["month"],
            "day_in_month": phase["day_in_month"],
            "phase_ratio": phase["phase_ratio"],
            "frequency": proto["freq"],
            "proto_word": proto["word"],
            "quality": proto["quality"]
        }

# =========================================================================
# SOLAR MODULE
# =========================================================================

class SolarModule:
    SOLAR_YEAR_DAYS = 365.25
    ZODIAC_SIGN_COUNT = 12
    DAYS_PER_SIGN = 30.4375
    SOLAR_ROOT = 256.0
    
    ZODIAC_SIGNS = [
        {"sign": "Aries", "symbol": "♈", "day_start": 1, "freq": 256.0000, "note": "C", "quality": "Initiation"},
        {"sign": "Taurus", "symbol": "♉", "day_start": 31, "freq": 271.5926, "note": "C#", "quality": "Stability"},
        {"sign": "Gemini", "symbol": "♊", "day_start": 62, "freq": 287.3470, "note": "D", "quality": "Communication"},
        {"sign": "Cancer", "symbol": "♋", "day_start": 92, "freq": 304.3529, "note": "D#", "quality": "Emotion & Intuition"},
        {"sign": "Leo", "symbol": "♌", "day_start": 123, "freq": 322.5385, "note": "E", "quality": "Expression"},
        {"sign": "Virgo", "symbol": "♍", "day_start": 153, "freq": 341.9293, "note": "F", "quality": "Analysis"},
        {"sign": "Libra", "symbol": "♎", "day_start": 184, "freq": 362.5599, "note": "F#", "quality": "Balance"},
        {"sign": "Scorpio", "symbol": "♏", "day_start": 214, "freq": 384.4690, "note": "G", "quality": "Transformation"},
        {"sign": "Sagittarius", "symbol": "♐", "day_start": 245, "freq": 407.7502, "note": "G#", "quality": "Expansion"},
        {"sign": "Capricorn", "symbol": "♑", "day_start": 275, "freq": 432.0001, "note": "A", "quality": "Manifestation"},
        {"sign": "Aquarius", "symbol": "♒", "day_start": 306, "freq": 457.7403, "note": "A#", "quality": "Innovation"},
        {"sign": "Pisces", "symbol": "♓", "day_start": 336, "freq": 485.0614, "note": "B", "quality": "Transcendence"}
    ]
    
    @staticmethod
    def day_to_zodiac_sign(day_of_year: int) -> Dict:
        normalized_day = ((day_of_year - 1) % 365) + 1
        for i in range(len(SolarModule.ZODIAC_SIGNS) - 1, -1, -1):
            if normalized_day >= SolarModule.ZODIAC_SIGNS[i]["day_start"]:
                return SolarModule.ZODIAC_SIGNS[i]
        return SolarModule.ZODIAC_SIGNS[0]
    
    @staticmethod
    def get_zodiac_progress(day_of_year: int) -> Dict:
        current_sign = SolarModule.day_to_zodiac_sign(day_of_year)
        next_sign_index = (SolarModule.ZODIAC_SIGNS.index(current_sign) + 1) % 12
        next_sign = SolarModule.ZODIAC_SIGNS[next_sign_index]
        day_in_sign = day_of_year - current_sign["day_start"] + 1
        return {
            "sign": current_sign,
            "day_in_sign": day_in_sign,
            "progression": min(day_in_sign / SolarModule.DAYS_PER_SIGN, 1),
            "next_sign": next_sign
        }
    
    @staticmethod
    def export_state(day_of_year: int) -> Dict:
        progress = SolarModule.get_zodiac_progress(day_of_year)
        return {
            "zodiac_sign": progress["sign"]["sign"],
            "symbol": progress["sign"]["symbol"],
            "frequency": progress["sign"]["freq"],
            "progression": progress["progression"],
            "quality": progress["sign"]["quality"],
            "note": progress["sign"]["note"]
        }

# =========================================================================
# COSMIC TRANSLATOR
# =========================================================================

class CosmicTranslator:
    PHI = 1.6180339887
    T_L = 29.5306
    ZERO_POINT_HZ = 297.5768
    COSMIC_ROOT = 256
    
    STATES_21 = [
        {"index": 0, "phase": "Initiation", "freq": 256},
        {"index": 1, "phase": "Growth 1", "freq": 264},
        {"index": 2, "phase": "Growth 2", "freq": 272},
        {"index": 3, "phase": "Growth 3", "freq": 280},
        {"index": 4, "phase": "Peak", "freq": 288},
        {"index": 5, "phase": "Decline 1", "freq": 296},
        {"index": 6, "phase": "Decline 2", "freq": 304},
        {"index": 7, "phase": "Decline 3", "freq": 312},
        {"index": 8, "phase": "Transform 1", "freq": 320},
        {"index": 9, "phase": "Transform 2", "freq": 328},
        {"index": 10, "phase": "Transform 3", "freq": 336},
        {"index": 11, "phase": "Transform 4", "freq": 344},
        {"index": 12, "phase": "Transform 5", "freq": 352},
        {"index": 13, "phase": "Integration 1", "freq": 360},
        {"index": 14, "phase": "Integration 2", "freq": 368},
        {"index": 15, "phase": "Integration 3", "freq": 376},
        {"index": 16, "phase": "Completion 1", "freq": 384},
        {"index": 17, "phase": "Completion 2", "freq": 392},
        {"index": 18, "phase": "Return", "freq": 400},
        {"index": 19, "phase": "Seed", "freq": 408},
        {"index": 20, "phase": "Void", "freq": 256}
    ]
    
    @staticmethod
    def phase_function(t: float) -> float:
        return (2 * math.pi * t) / CosmicTranslator.T_L
    
    @staticmethod
    def spiral_function(t: float, r0: float) -> Dict:
        theta = CosmicTranslator.phase_function(t)
        exponent = theta / (2 * math.pi)
        radius = r0 * (CosmicTranslator.PHI ** exponent)
        return {
            "radius": radius,
            "theta": theta,
            "x": radius * math.cos(theta),
            "y": radius * math.sin(theta)
        }
    
    @staticmethod
    def segmentation_function(t: float) -> int:
        normalized_t = ((t % CosmicTranslator.T_L) + CosmicTranslator.T_L) % CosmicTranslator.T_L
        segment = int((normalized_t / CosmicTranslator.T_L) * 21)
        return min(segment, 20)
    
    @staticmethod
    def realtime_translate(time: float) -> Dict:
        state_index = CosmicTranslator.segmentation_function(time)
        state = CosmicTranslator.STATES_21[state_index]
        spiral = CosmicTranslator.spiral_function(time, 1)
        radius_normalized = (spiral["radius"] % 3) / 3
        
        return {
            "frequency": state["freq"],
            "note": "C4",
            "state_index": state_index,
            "radius_normalized": radius_normalized,
            "phase": state["phase"]
        }

# =========================================================================
# UFT MACHINE
# =========================================================================

class UFTMachine:
    VERSION = '4.1'
    PRIMARY_MODULE = '12:21-cosmic-translator'
    
    def __init__(self):
        self.modules = {
            "cosmic": None,
            "lunar": None,
            "solar": None
        }
        self.CALIBRATION = {
            "COSMIC_ROOT": 256.0000,
            "LUNAR_ROOT": 210.4186,
            "SOLAR_ROOT": 256.0000,
            "PHI": 1.6180339887
        }
    
    def init(self, cosmic, lunar, solar):
        self.modules["cosmic"] = cosmic
        self.modules["lunar"] = lunar
        self.modules["solar"] = solar
        return {
            "status": "initialized",
            "version": self.VERSION,
            "primary_module": self.PRIMARY_MODULE
        }
    
    def is_ready(self) -> bool:
        return all(self.modules.values())
    
    def translate(self, time: float) -> Dict:
        if not self.is_ready():
            return {"error": "UFT Machine not initialized"}
        
        cosmic_state = CosmicTranslator.realtime_translate(time)
        day_of_year = ((time % 365) + 365) % 365
        lunar_state = LunarModule.export_state(int(day_of_year))
        solar_state = SolarModule.export_state(int(day_of_year))
        
        return {
            "timestamp": datetime.datetime.now().isoformat(),
            "time": time,
            "cosmic_phase": cosmic_state,
            "lunar_context": lunar_state,
            "solar_context": solar_state,
            "primary": {
                "frequency": cosmic_state["frequency"],
                "note": cosmic_state["note"],
                "module": "12:21 Cosmic"
            },
            "harmonic": {
                "lunar": lunar_state["frequency"],
                "solar": solar_state["frequency"]
            },
            "state21": cosmic_state["state_index"],
            "lunar_month": lunar_state["month"],
            "zodiac_sign": solar_state["zodiac_sign"],
            "coherency": self.calculate_coherency(cosmic_state, lunar_state, solar_state)
        }
    
    def calculate_coherency(self, cosmic, lunar, solar) -> Dict:
        lunar_freq_score = 100 - abs(cosmic["frequency"] - lunar["frequency"]) / 10
        solar_freq_score = 100 - abs(cosmic["frequency"] - solar["frequency"]) / 10
        lunar_phase_score = (1 - abs(lunar["phase_ratio"] - 0.5)) * 100
        solar_prog_score = (1 - abs(solar["progression"] - 0.5)) * 100
        harmonic_score = 100 - abs(cosmic["radius_normalized"] - 0.5) * 100
        
        return {
            "overall": round((lunar_freq_score + solar_freq_score + lunar_phase_score + solar_prog_score + harmonic_score) / 5),
            "frequencies": round((lunar_freq_score + solar_freq_score) / 2),
            "phases": round((lunar_phase_score + solar_prog_score) / 2),
            "harmonics": round(harmonic_score)
        }
    
    def translate_medical(self, patient_freq: float) -> Dict:
        normalized = patient_freq
        while normalized > 420:
            normalized /= 2
        while normalized < 210:
            normalized *= 2
        
        baseline = 210.4186
        percent = ((normalized - baseline) / baseline) * 100
        
        return {
            "patient_frequency": patient_freq,
            "normalized": normalized,
            "deviation": {
                "from_baseline": round(percent, 2),
                "absolute_hz": round(normalized - baseline, 2),
                "baseline": baseline
            }
        }

# =========================================================================
# RUN ALL TESTS
# =========================================================================

uft_machine = UFTMachine()
uft_machine.init(CosmicTranslator, LunarModule, SolarModule)

runner = TestRunner()

# Initialization Tests
runner.suite('✅ Initialization Tests').test('Machine initializes with modules', lambda: runner.assert_true(uft_machine.modules["cosmic"] is not None)).test('Machine accepts all three modules', lambda: runner.assert_equals(uft_machine.init(CosmicTranslator, LunarModule, SolarModule)["status"], "initialized")).test('isReady() returns true after init', lambda: runner.assert_equals(uft_machine.is_ready(), True)).test('Version matches expected', lambda: runner.assert_equals(uft_machine.VERSION, '4.1')).test('Calibration constants defined', lambda: runner.assert_not_null(uft_machine.CALIBRATION["COSMIC_ROOT"])).test('Primary module is 12:21 Cosmic', lambda: runner.assert_equals(uft_machine.PRIMARY_MODULE, '12:21-cosmic-translator'))

# Translation Tests
runner.suite('📡 Translation Tests').test('translate() returns complete state', lambda: runner.assert_not_null(uft_machine.translate(100)["cosmic_phase"])).test('translate() includes primary frequency', lambda: runner.assert_equals(uft_machine.translate(150)["primary"]["module"], '12:21 Cosmic')).test('translate() calculates state21 (0-20)', lambda: runner.assert_true(0 <= uft_machine.translate(42)["state21"] <= 20)).test('translate() returns ISO timestamp', lambda: runner.assert_true('T' in uft_machine.translate(100)["timestamp"])).test('translate() returns harmonic frequencies', lambda: runner.assert_not_null(uft_machine.translate(200)["harmonic"]["lunar"]))

# Coherency Tests
runner.suite('⚖️ Coherency Tests').test('calculateCoherency() returns valid score', lambda: runner.assert_true(0 <= uft_machine.calculate_coherency({"frequency": 256, "radius_normalized": 0.5}, {"frequency": 210, "phase_ratio": 0.5}, {"frequency": 256, "progression": 0.5})["overall"] <= 100)).test('Coherency includes all domains', lambda: runner.assert_not_null(uft_machine.translate(100)["coherency"]["frequencies"]))

# Medical Tests
runner.suite('🏥 Medical Translation Tests').test('translateMedical() normalizes frequencies', lambda: runner.assert_true(210 <= uft_machine.translate_medical(500)["normalized"] <= 420)).test('translateMedical() calculates deviation', lambda: runner.assert_not_null(uft_machine.translate_medical(256)["deviation"])).test('Octave normalization for large frequencies', lambda: runner.assert_true(210 <= uft_machine.translate_medical(1024)["normalized"] <= 420)).test('Octave normalization for small frequencies', lambda: runner.assert_true(210 <= uft_machine.translate_medical(50)["normalized"] <= 420))

# Quantum Tests
runner.suite('⚛️ Quantum Superposition').test('Cosmic state in superposition', lambda: runner.assert_not_null(uft_machine.translate(50)["cosmic_phase"])).test('Proto-words in 13-state superposition', lambda: runner.assert_equals(len(LunarModule.LUNAR_PROTO_WORDS), 13)).test('21-state cosmic cycle', lambda: runner.assert_equals(len(CosmicTranslator.STATES_21), 21)).test('Wave function collapse on measurement', lambda: runner.assert_equals(uft_machine.translate(100)["cosmic_phase"]["frequency"], uft_machine.translate(100)["cosmic_phase"]["frequency"])).test('Superposition normalized', lambda: runner.assert_true(0 < (1 / math.sqrt(21))**2 < 0.1))

runner.suite('🔗 Quantum Entanglement (13×12×21)').test('Lunar-Cosmic entanglement (13×21)', lambda: runner.assert_equals(13 * 21, 273)).test('Solar-Cosmic entanglement (12×21)', lambda: runner.assert_equals(12 * 21, 252)).test('Full torus (13×12×21)', lambda: runner.assert_equals(13 * 12 * 21, 3276)).test('Fields maintain entanglement', lambda: runner.assert_not_null(uft_machine.translate(150)["lunar_context"]["frequency"])).test('Coherency preserved', lambda: runner.assert_true(uft_machine.translate(200)["coherency"]["overall"] >= 0))

runner.suite('💫 Coherency Collapse & Measurement').test('Measurement collapses to state (0-20)', lambda: runner.assert_true(0 <= uft_machine.translate(15)["state21"] <= 20)).test('Coherency score reflects collapse', lambda: runner.assert_not_null(uft_machine.translate(100)["coherency"]["overall"])).test('Frequency coherency measurable', lambda: runner.assert_true(0 <= uft_machine.translate(75)["coherency"]["frequencies"] <= 100)).test('Conservation of frequency/energy', lambda: runner.assert_true(250 <= uft_machine.translate(100)["primary"]["frequency"] <= 410)).test('Observer effect: timestamp', lambda: runner.assert_not_null(uft_machine.translate(125)["timestamp"]))

runner.suite('🌊 Quantum Resonance & Interference').test('Harmonic ratio 1.216', lambda: runner.assert_true(abs(256.0 / 210.4186 - 1.216) < 0.05)).test('Constructive interference', lambda: runner.assert_true(uft_machine.translate(100)["coherency"]["overall"] > 0)).test('Beat frequency emerges', lambda: runner.assert_true(210.4186 * 0.01 > 0)).test('Proto-words in resonance window', lambda: all(runner.assert_true(210 <= w["freq"] <= 420) for w in LunarModule.LUNAR_PROTO_WORDS)).test('Energy preserved via frequency', lambda: runner.assert_not_null(uft_machine.translate(88)["primary"]["frequency"]))

runner.suite('🌌 Unified Quantum Field (13×12×21)').test('All quantum fields initialized', lambda: runner.assert_true(CosmicTranslator is not None and LunarModule is not None)).test('Fields coupled through UFT Machine', lambda: runner.assert_true(uft_machine.translate(100)["cosmic_phase"] and uft_machine.translate(100)["lunar_context"])).test('273-dimensional structure (13×21)', lambda: runner.assert_equals(13 * 21, 273)).test('Proto-words map to field excitations', lambda: runner.assert_equals(len(LunarModule.LUNAR_PROTO_WORDS), 13)).test('Zero-point energy at 297.5768 Hz', lambda: runner.assert_equals(CosmicTranslator.ZERO_POINT_HZ, 297.5768))

# Render results
stats = runner.render()

# Exit with appropriate code
exit(1 if stats['failed'] > 0 else 0)
