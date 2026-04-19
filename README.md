# UFT-demos

**Interactive demonstrations of the Universal Frequency Translator (UFT) framework.**

> UFT is a precision calendar instrument. It derives a 13-tone musical scale from the Moon's synodic period — a real orbital constant — and translates that math into audible frequencies. These demos let you hear and interact with that translation directly in a browser.

---

## What is MOON_ROOT?

The base frequency is not arbitrary:

$$f_{moon} = \frac{1}{T_L} \times 2^{29} = 210.4186 \text{ Hz}$$

Where $T_L = 2{,}551{,}442.4$ seconds (Moon synodic period, 29.5306 days), octave-shifted 29 times into audible range (Cousto method, 1988). Every frequency in UFT is a rational interval above this root. The OLED display on the UFT hardware device shows deviation from this root in cents — the only instrument that does this in real time against a live orbital calendar.

---

## The Demos

| # | Demo | What it shows |
|---|------|---------------|
| 1 | [Proto-Word Sound Gallery](1-proto-word-sound-gallery.html) | Hear each of the 9 proto-words at their exact Hz |
| 2 | [Frequency Converter](2-frequency-converter.html) | Input any Hz ? find closest proto-word + cosmic association |
| 3 | [Cymatic Geometry Player](3-cymatic-geometry-player.html) | Animated geometric form of each proto-word |
| 4 | [Ayurveda Water Math](4-ayurveda-water-math.html) | Lunar phase × water structure frequency mapping |
| 4 | [Hardware Signal Test](4-hardware-signal-test.html) | Signal output test for UFT hardware device |
| 5 | [Cosmic Translator Test](5-cosmic-translator-test.html) | Full UFT engine output: note, Hz, proto-word, deviation |
| 5 | [Solar Bass Immersive](5-solar-bass-immersive.html) | 12-tone solar scale with immersive bass output |
| 6 | [Bass Multilayer Nervous](6-bass-multilayer-nervous.html) | Layered nervous-system frequency response demo |
| 6 | [Bass Realtime 432](6-bass-realtime-432.html) | Real-time 432 Hz bass field generation |
| 7 | [Ayurveda Bass Reading](7-ayurveda-bass-reading.html) | Ayurvedic dosha × lunar frequency bass readings |

---

## Run Locally

```bash
# Python 3 (recommended — no install needed)
cd UFT-demos
python -m http.server 8080
# Open: http://localhost:8080
```

Or open `index.html` directly in Chrome. No build step, no dependencies, no server required for most demos.

---

## Proto-Words Reference

| Word | Hz | Lunar Note | Significance |
|------|-----|-----------|--------------|
| **AH** | 210.42 | Moon root | First breath — origin |
| **SA** | 222.93 | Moon 2 | The bridge |
| **LA** | 236.19 | Moon 3 | Proportion |
| **RA** | 250.23 | Moon 4 | Fire · Light |
| **DA** | 265.11 | Moon 5 | Will · Surge |
| **HA** | 280.88 | Moon 6 | Harmony |
| **NA** | 297.58 | Zero Point | Silence · Axis |
| **OM** | 334.02 | Moon 9 | Threshold |
| **TAO** | 420.84 | Moon 13 | Full cycle |

---

## What This Repo Contains (and Does Not Contain)

**Contains:** Standalone HTML demo files. All frequency math is self-contained in each file for transparency.

**Does not contain:** The core UFT engine (`modules/`, `core-machine/`), firmware, hardware schematics, or calibration data. Those are maintained separately.

---

## License

Copyright (C) 2026 LightsOnemusic — GPL v3.

Free for personal, educational, and research use. Any commercial product built on this framework requires a separate license. See [LICENSE](LICENSE) for full terms.
