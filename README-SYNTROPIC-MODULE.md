# 🌿 UFT Syntropic Module

**Test & Prototype** — Integrating UFT (Universal Frequency Translator) with Ernst Götsch's Syntropic Agriculture

---

## 📋 Overview

A comprehensive web application that combines harmonic frequency analysis with syntropic forest design principles. Designed for the **RMTerra Project** to explore how UFT frequencies can enhance regenerative agriculture planning and monitoring.

### Core Features

🌿 **Plant Search & Harmonic Companions**
- Database of 47 Mediterranean plants mapped to 13-note lunar Nikkal scale
- Smart layer pairing algorithm ensuring vertical stratification diversity
- Real-time harmony scoring (0-100%) based on frequency consonance

🌙 **Lunar Timing Guide**
- Syncs plant planting with optimal lunar months
- Displays sap phases and frequency alignment
- Validates planting windows for maximum harmonic resonance

📊 **Health & Healing Diagnostics**
- 4-sensor plant health assessment (conductivity, moisture, temperature, photosynthesis)
- Automatic diagnosis generation
- UFT frequency prescriptions for stress recovery
- Web Audio API sine wave synthesis for healing frequencies

🎵 **Polyculture Composer**
- 2-4 plant harmonic chord analyzer
- Overall consonance scoring for plant communities
- Auto-imports from Plant Search tab for seamless workflow

🌳 **Forest Designer (3-Layer Succession)**
- Placenta (Pioneer - 1-4 yrs) → Secundária (5-14 yrs) → Clímax (15+ yrs)
- **Syntropic Musical Staff visualization** showing frequency progression through time
- Harmonic analysis (pairwise consonance scores)
- Stratified diversity analysis across vertical layers
- Export designs as JSON for archival/sharing

🍂 **Mulching Guide**
- Complete syntropic mulching protocol
- Soil coverage strategies (10-25cm organic layers)
- Mulch types and refresh cycles
- NPK cycling documentation

📖 **Guide & Reference**
- Lunar phases and sap cycles
- Consonance scale explanation (0-39% dissonance through 80-100% perfect harmony)
- UFT frequency mapping table
- Complete workflow instructions

---

## 🎯 Technical Architecture

### Database
- **47 Mediterranean Plants** with complete metadata:
  - Portuguese & English common names + scientific names
  - Lunar month assignment (1-13)
  - Frequency in Hz (261.63-698.46 range, 13-note scale)
  - Proto-word syllables (UFT system)
  - Vertical strato layer (emergente, alto, medio, bajo)
  - Succession phase (placenta, secundaria, climax)
  - Nitrogen-fixer status (boolean)

### Core Algorithm
**Consonance Scoring:**
```javascript
ratio = log₂(f₂/f₁)
semitones = round(ratio × 12) % 12
consonance = CONSONANCE_ARRAY[|semitones|]
// CONSONANCE = [100, 83, 67, 100, 83, 100, 0, 100, 83, 67, 83, 100]
```

**Smart Layer Pairing (Companions):**
- Base harmony score from frequency consonance
- +15% bonus for different vertical strata (ensures diversity)
- Capped at 100%
- Top 6 recommendations including minimum 1 from each strata

### Visualization
- **SVG Stratified Architecture** showing physical 3D forest layers
- **SVG Musical Staff** displaying succession as harmonic progression
- Real-time UI updates on plant selection

### Export
- JSON format capturing complete design data
- Includes: plants, frequencies, consonance scores, strata, timeline
- Timestamped filename for easy organization

---

## 🚀 How to Use

### Local Testing
1. Open `syntropic-uft-master-module.html` in web browser
2. No internet connection required (fully self-contained)
3. All data stored in-memory (no localStorage)

### Workflow

**Step 1: Explore Companions**
- Navigate to 🌿 Plant Search & Companions tab
- Select any plant from dropdown
- View top 6 harmonically-compatible companions
- Note strato diversity indicators (🌍 = different layer, ➡️ = same layer)

**Step 2: Check Lunar Timing**
- Go to 🌙 Lunar Timing tab
- Select plant from Plant Search tab (or choose directly)
- Pick lunar month to see frequency alignment
- Plan planting within optimal windows

**Step 3: Monitor Health**
- Navigate to 📊 Health & Healing tab
- Adjust 4 sensors to match plant conditions
- System auto-diagnoses issues
- Play healing frequencies (5-second sine wave synthesis)

**Step 4: Compose Forest**
- Go to 🎵 Polyculture Composer tab
- Select 2-4 plants
- View overall harmonic consonance
- Verify community compatibility

**Step 5: Design Succession**
- Move to 🌳 Forest Designer tab
- Select 3 plants: Pioneer (placenta) → Secondary (5-14 yrs) → Climax (15+ yrs)
- **View syntropic musical staff** showing frequency progression
- Review harmonic pair analysis
- Check stratified diversity metrics
- **Click 📥 Export Design** to save as JSON

**Step 6: Reference Protocol**
- 🍂 Mulching Guide for complete organic protocol
- 📖 Guide & Reference for all technical details

---

## 📊 Data Sources

All plant data derived from:
- **REFERENCE.md** - UFT canonical reference with 13-note Nikkal scale mapping
- **Syntropic Agriculture Literature** - Ernst Götsch's succession models
- **Mediterranean Bioregion** - Climate-appropriate plant selection
- **UFT Frequency Mappings** - 13 lunar months → 13 distinct frequencies

---

## 🔬 Educational Value

**For Educators:**
- Demonstrates harmonic relationships in nature
- Shows practical application of frequency theory to agriculture
- Illustrates syntropic succession planning
- Interactive tool for landscape design courses

**For Researchers:**
- Testbed for UFT + Syntropic integration
- Export functionality enables data analysis
- Musical notation reveals harmonic patterns
- Provides baseline for future AI recommendations

**For Practitioners:**
- Planning tool for syntropic forest sites
- Quick companion plant lookup
- Health diagnostics with frequency prescriptions
- Exportable designs for team collaboration

---

## ⚙️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Dark teal theme with rgba transparency
- **Vanilla JavaScript (ES6)** - No external dependencies
- **Web Audio API** - Sine wave synthesis for healing frequencies
- **SVG** - Dynamic visualization (stratified architecture, musical staff)

---

## 🎵 Key Insights

### Musical Approach to Forest Design
The Forest Designer tab displays succession phases as a **musical staff progression**:
- **5 staff lines** represent vertical strata (Emergent → Ground)
- **3 notes** represent Pioneer → Secondary → Climax plants
- **Note height** shows frequency (higher Hz = higher on staff)
- **Time flow** shows succession timeline (1-4 yrs → 5-14 yrs → 15+ yrs)

This reveals that healthy forest succession can be understood as a **harmonic chord developing over time**.

### Stratification Benefits
The algorithm prioritizes **vertical diversity** (different strata) alongside harmonic compatibility because:
1. **Light capture** - Multiple layers maximize photosynthesis
2. **Resilience** - Diverse structure resists pests/disease
3. **Nutrient cycling** - Deep and shallow roots access different resources
4. **Regeneration** - Each strata supports the next phase

---

## 📄 Footer Attribution

> **🔬 Test & Prototype** — This system is a proof-of-concept developed to complement the **RMTerra Project**
>
> 🌿 Integrating **UFT (Universal Frequency Translator)** with **Ernst Götsch's Syntropic Agriculture** methodology
>
> © 2026 — Harmonic forest design for regenerative agriculture | **Educational & Research Use**

---

## 📁 File Location

```
GitHub/UFT-demos/syntropic-uft-master-module.html
```

**Single-file application** — No dependencies, no build process, ready to use immediately.

---

## 🔗 Related Resources

- **UFT Core Modules**: `/modules/12-21/cosmic-translator-12-21.js`
- **Syntropic Succession Mapper**: `syntropic-succession-mapper-v2.html`
- **Plant Encyclopedia**: `syntropic-plant-oracle-v2.html`
- **Polyculture Analysis**: `syntropic-polyculture-composer-v2.html`

---

**Last Updated:** 24 April 2026  
**Status:** ✅ Production-Ready Test Module
