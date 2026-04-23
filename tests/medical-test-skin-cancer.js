/**
 * UFT 12:21 — TEST SUITE
 * 
 * Medical Frequency Case Study: Skin Cancer
 * 
 * This test emulates a patient with skin cancer frequency and generates:
 * 1. Diagnostic frequency analysis
 * 2. Cosmic translator output (state, music, geometry)
 * 3. Healing protocol (counter-frequencies, proto-words)
 * 4. Visual output (HTML/canvas rendering instructions)
 */

// Import the cosmic translator (in browser, this would be loaded as script)
// For Node.js: const { CosmicTranslator, States21, MusicEngine, RealtimeMapping, ProtoWords } = require('./cosmic-translator-12-21.js');

// ============================================================================
// MEDICAL FREQUENCY DATA
// ============================================================================

const MedicalFrequencies = {
  // Rife frequencies and biofrequency associations
  // Source: Rife research and holistic medicine databases
  
  conditions: {
    'skin_cancer': {
      name: 'Melanoma / Skin Cancer',
      problematic_frequencies: [2128, 2008, 784],  // Hz (Rife protocol)
      chakra: 'Root (Muladhara)',
      element: 'Earth',
      organs: ['Skin', 'Immune system'],
      emotional_root: 'Boundary issues, unprocessed trauma, deep fear',
      harmonizing_frequency: 210.42  // UFT Moon root
    }
  }
};

// ============================================================================
// PATIENT PROFILE
// ============================================================================

const PatientCase = {
  id: 'CASE-001-SKIN-CANCER-TEST',
  name: 'Simulated Patient: Skin Cancer',
  condition: 'Melanoma (Stage diagnosis)',
  
  // Current problematic frequency (what the affected tissue resonates at)
  problematic_frequency: 2128,  // Hz
  
  // Medical timeline
  diagnosed: '2026-01-15',
  currentDate: '2026-04-16',
  daysElapsed: 91,
  
  // Baseline vital frequency (healthy state)
  baseline_frequency: 210.42,  // Moon root - healthy resonance
  
  /**
   * Normalize medical frequency to UFT scale
   * Since UFT uses 210-420 Hz (lunar octave), we need to reduce the problematic frequency
   * into the UFT harmonically relevant range
   */
  normalizeToUFT() {
    const problematic = this.problematic_frequency;
    
    // Reduce octaves until we're in UFT range (210-420 Hz)
    let normalized = problematic;
    while (normalized > 420) {
      normalized = normalized / 2;
    }
    while (normalized < 210) {
      normalized = normalized * 2;
    }
    
    return {
      original: problematic,
      normalized,
      octaves_reduced: Math.log2(problematic / normalized)
    };
  },
  
  /**
   * Calculate deviation from healthy baseline
   */
  calculateDeviation() {
    const normalized = this.normalizeToUFT().normalized;
    const baseline = this.baseline_frequency;
    const deviation_hz = Math.abs(normalized - baseline);
    const deviation_percent = (deviation_hz / baseline) * 100;
    
    return {
      baseline_hz: baseline,
      current_hz: normalized,
      deviation_hz,
      deviation_percent,
      status: deviation_percent > 20 ? 'CRITICAL DISHARMONY' : 'MODERATE IMBALANCE'
    };
  }
};

// ============================================================================
// PROCESS THROUGH COSMIC TRANSLATOR
// ============================================================================

/**
 * Step 1: Analyze the problematic frequency
 */
function analyzeProblematicFrequency() {
  const normalization = PatientCase.normalizeToUFT();
  const deviation = PatientCase.calculateDeviation();
  
  console.log('=== FREQUENCY ANALYSIS ===');
  console.log('Original problematic frequency:', normalization.original, 'Hz');
  console.log('Normalized to UFT scale:', normalization.normalized.toFixed(2), 'Hz');
  console.log('Baseline healthy frequency:', deviation.baseline_hz, 'Hz');
  console.log('Deviation:', deviation.deviation_hz.toFixed(2), 'Hz', `(${deviation.deviation_percent.toFixed(1)}%)`);
  console.log('Status:', deviation.status);
  console.log('');
  
  return {
    normalization,
    deviation
  };
}

/**
 * Step 2: Find closest proto-word (healing frequency)
 */
function findHealingProtoWord() {
  const normalized = PatientCase.normalizeToUFT().normalized;
  const healingWord = ProtoWords.getWordByFrequency(normalized);
  
  console.log('=== HEALING PROTO-WORD ===');
  console.log('Closest healing word:', healingWord.word);
  console.log('Frequency:', healingWord.frequency, 'Hz');
  console.log('Geometry:', healingWord.geometry);
  console.log('Planetary association:', healingWord.planet);
  console.log('Significance:', healingWord.significance);
  console.log('');
  
  return healingWord;
}

/**
 * Step 3: Map to 21-state cycle
 */
function mapToStatesCycle() {
  const daysElapsed = PatientCase.daysElapsed;
  const stateIdx = CosmicTranslator.segmentationFunction(daysElapsed);
  const state = States21.getState(stateIdx);
  
  console.log('=== 21-STATE CYCLE MAPPING ===');
  console.log('Days elapsed:', daysElapsed);
  console.log('Current state index:', stateIdx);
  console.log('State name:', state.name);
  console.log('Phase:', state.phase);
  console.log('Quality:', state.quality);
  console.log('Color:', state.color);
  console.log('Is Zero Point:', state.isZeroPoint ? 'YES - liminal threshold' : 'NO');
  console.log('');
  
  return state;
}

/**
 * Step 4: Generate full cosmic translator output
 */
function generateCosmicOutput() {
  const daysElapsed = PatientCase.daysElapsed;
  const normalized = PatientCase.normalizeToUFT().normalized;
  
  const output = RealtimeMapping.translate({
    time_days: daysElapsed,
    lunarPhase: CosmicTranslator.phaseFunction(daysElapsed),
    energyLevel: 0.6,  // patient's energy level (moderate)
    userGesture: 0.5
  });
  
  console.log('=== COSMIC TRANSLATOR OUTPUT ===');
  console.log('Pitch note:', output.pitch.note);
  console.log('Frequency:', output.pitch.frequency.toFixed(2), 'Hz');
  console.log('Tempo:', output.tempo.bpm.toFixed(1), 'BPM');
  console.log('Harmonic richness:', output.harmonics.harmonicRichness.toFixed(2));
  console.log('Overtone count:', output.harmonics.overtoneCount);
  console.log('Dynamics volume:', output.dynamics.volume.toFixed(2));
  console.log('');
  
  return output;
}

/**
 * Step 5: Generate cymatic geometry
 */
function generateCymaticGeometry() {
  const normalized = PatientCase.normalizeToUFT().normalized;
  const cymatic = ProtoWords.generateCymaticPattern(normalized, 0.7);
  
  console.log('=== CYMATIC GEOMETRY ===');
  console.log('Proto-word:', cymatic.word);
  console.log('Geometry type:', cymatic.geometry);
  console.log('Frequency:', cymatic.frequency.toFixed(2), 'Hz');
  console.log('Amplitude:', cymatic.amplitude);
  console.log('Pattern complexity:', cymatic.complexity);
  console.log('Resonance points:', cymatic.resonancePoints.length);
  console.log('');
  
  return cymatic;
}

/**
 * Step 6: Generate healing protocol
 */
function generateHealingProtocol() {
  const state = mapToStatesCycle();
  const healingWord = findHealingProtoWord();
  const output = generateCosmicOutput();
  
  console.log('=== HEALING PROTOCOL ===');
  console.log('Primary healing frequency:', healingWord.frequency, 'Hz');
  console.log('Primary proto-word:', healingWord.word);
  console.log('Cymatics geometry:', healingWord.geometry);
  console.log('Duration per session: 21 minutes (one lunar cycle segment)');
  console.log('Frequency: Daily at ' + output.tempo.bpm.toFixed(0) + ' BPM');
  console.log('Recommended volume: ' + (output.dynamics.volume * 100).toFixed(0) + '%');
  console.log('');
  
  // Generate counter-frequencies (harmonizing intervals)
  const counterFrequencies = generateCounterFrequencies(healingWord.frequency);
  console.log('Counter-frequencies (harmonic support):');
  counterFrequencies.forEach((cf, idx) => {
    console.log(`  ${idx + 1}. ${cf.frequency.toFixed(2)} Hz (${cf.interval})`);
  });
  console.log('');
  
  return {
    primary: healingWord,
    tempo: output.tempo,
    dynamics: output.dynamics,
    counterFrequencies
  };
}

/**
 * Generate counter-frequencies (Perfect 5th, Perfect 4th, Octave, etc.)
 */
function generateCounterFrequencies(fundamental) {
  const intervals = [
    { ratio: 2/1, name: 'Octave (2:1)' },
    { ratio: 3/2, name: 'Perfect 5th (3:2)' },
    { ratio: 4/3, name: 'Perfect 4th (4:3)' },
    { ratio: 5/4, name: 'Major 3rd (5:4)' },
    { ratio: 8/5, name: 'Minor 6th (8:5) - φ interval' }
  ];
  
  return intervals.map(iv => ({
    frequency: fundamental * iv.ratio,
    interval: iv.name,
    ratio: iv.ratio
  }));
}

// ============================================================================
// VISUAL OUTPUT GENERATION
// ============================================================================

/**
 * Generate HTML/Canvas visualization instructions
 */
function generateVisualOutput() {
  const state = mapToStatesCycle();
  const cymatic = generateCymaticGeometry();
  const protocol = generateHealingProtocol();
  const output = generateCosmicOutput();
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UFT 12:21 Medical Frequency Test - Skin Cancer Healing Protocol</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #ecf0f1;
      padding: 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1, h2 { margin-top: 20px; margin-bottom: 10px; }
    h1 { font-size: 28px; color: #00d4ff; }
    h2 { font-size: 18px; color: #1abc9c; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(26, 188, 156, 0.3);
      border-radius: 8px;
      padding: 20px;
      backdrop-filter: blur(10px);
    }
    .card.critical { border-color: #e74c3c; background: rgba(231, 76, 60, 0.1); }
    .card.healing { border-color: #1abc9c; background: rgba(26, 188, 156, 0.1); }
    .stat {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .stat:last-child { border-bottom: none; }
    .value { font-weight: bold; color: #00d4ff; }
    .status-critical { color: #e74c3c; font-weight: bold; }
    .status-healing { color: #1abc9c; font-weight: bold; }
    
    canvas {
      width: 100%;
      max-width: 400px;
      height: 400px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      display: block;
      margin: 20px auto;
    }
    
    .canvas-container {
      text-align: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(26, 188, 156, 0.3);
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    
    .frequency-bar {
      width: 100%;
      height: 40px;
      background: linear-gradient(90deg, #e74c3c 0%, #f39c12 50%, #1abc9c 100%);
      border-radius: 4px;
      margin: 10px 0;
      position: relative;
      overflow: hidden;
    }
    
    .frequency-marker {
      position: absolute;
      width: 3px;
      height: 100%;
      background: white;
      top: 0;
    }
    
    .legend {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin: 20px 0;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌙 UFT 12:21 Medical Frequency Test</h1>
    <p style="color: #bdc3c7; margin-bottom: 20px;">Case: Skin Cancer Healing Protocol</p>
    
    <!-- DIAGNOSTIC ANALYSIS -->
    <div class="grid">
      <div class="card critical">
        <h2>Problematic Frequency</h2>
        <div class="stat">
          <span>Original frequency:</span>
          <span class="value">${PatientCase.problematic_frequency} Hz</span>
        </div>
        <div class="stat">
          <span>Normalized (UFT):</span>
          <span class="value">${PatientCase.normalizeToUFT().normalized.toFixed(2)} Hz</span>
        </div>
        <div class="stat">
          <span>Deviation from baseline:</span>
          <span class="status-critical">${PatientCase.calculateDeviation().deviation_percent.toFixed(1)}%</span>
        </div>
        <div class="stat">
          <span>Status:</span>
          <span class="status-critical">${PatientCase.calculateDeviation().status}</span>
        </div>
      </div>
      
      <div class="card healing">
        <h2>Healing Protocol</h2>
        <div class="stat">
          <span>Primary frequency:</span>
          <span class="value">${protocol.primary.frequency} Hz</span>
        </div>
        <div class="stat">
          <span>Proto-word:</span>
          <span class="status-healing">${protocol.primary.word}</span>
        </div>
        <div class="stat">
          <span>Planet association:</span>
          <span class="value">${protocol.primary.planet}</span>
        </div>
        <div class="stat">
          <span>Cymatics pattern:</span>
          <span class="value">${protocol.primary.geometry.replace(/_/g, ' ')}</span>
        </div>
      </div>
    </div>
    
    <!-- CURRENT STATE -->
    <div class="grid">
      <div class="card" style="border-color: ${state.color}22;">
        <h2>Current 21-State Position</h2>
        <div class="stat">
          <span>State:</span>
          <span class="value">${state.name}</span>
        </div>
        <div class="stat">
          <span>Phase:</span>
          <span class="value">${state.phase}</span>
        </div>
        <div class="stat">
          <span>Quality:</span>
          <span class="value">${state.quality}</span>
        </div>
        <div class="stat" style="border-color: ${state.color}44;">
          <span style="color: ${state.color};">Zero Point:</span>
          <span class="value" style="color: ${state.color};">${state.isZeroPoint ? '⭐ YES' : 'No'}</span>
        </div>
      </div>
      
      <div class="card">
        <h2>Music Parameters</h2>
        <div class="stat">
          <span>Note:</span>
          <span class="value">${output.pitch.note}</span>
        </div>
        <div class="stat">
          <span>Frequency:</span>
          <span class="value">${output.pitch.frequency.toFixed(2)} Hz</span>
        </div>
        <div class="stat">
          <span>Tempo:</span>
          <span class="value">${protocol.tempo.bpm.toFixed(1)} BPM</span>
        </div>
        <div class="stat">
          <span>Volume:</span>
          <span class="value">${(protocol.dynamics.volume * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
    
    <!-- FREQUENCY SPECTRUM VISUALIZATION -->
    <div class="canvas-container">
      <h2>Frequency Spectrum</h2>
      <div class="frequency-bar">
        <div class="frequency-marker" style="left: ${((PatientCase.calculateDeviation().current_hz - 200) / 220) * 100}%; background: ${state.color};"></div>
      </div>
      <p style="font-size: 12px; color: #95a5a6;">Problematic ← → Baseline → Healing</p>
    </div>
    
    <!-- CYMATIC GEOMETRY -->
    <div class="canvas-container">
      <h2>Cymatic Geometry: ${cymatic.word} (${cymatic.geometry.replace(/_/g, ' ')})</h2>
      <canvas id="cymaticCanvas" width="400" height="400"></canvas>
    </div>
    
    <!-- COUNTER-FREQUENCIES -->
    <div class="card healing">
      <h2>Harmonic Support Frequencies</h2>
      ${protocol.counterFrequencies.map(cf => `
        <div class="stat">
          <span>${cf.interval}:</span>
          <span class="value">${cf.frequency.toFixed(2)} Hz</span>
        </div>
      `).join('')}
    </div>
    
    <!-- HEALING PROTOCOL -->
    <div class="card" style="border-color: #9b59b6; margin-top: 30px;">
      <h2 style="color: #9b59b6;">Recommended Healing Protocol</h2>
      <div class="stat">
        <span>Duration per session:</span>
        <span class="value">21 minutes</span>
      </div>
      <div class="stat">
        <span>Frequency:</span>
        <span class="value">Daily</span>
      </div>
      <div class="stat">
        <span>Primary frequency:</span>
        <span class="value">${protocol.primary.frequency} Hz (${protocol.primary.word})</span>
      </div>
      <div class="stat">
        <span>Recommended tempo:</span>
        <span class="value">${protocol.tempo.bpm.toFixed(0)} BPM</span>
      </div>
      <div class="stat">
        <span>Volume level:</span>
        <span class="value">${(protocol.dynamics.volume * 100).toFixed(0)}%</span>
      </div>
      <p style="margin-top: 15px; font-size: 13px; color: #bdc3c7; line-height: 1.6;">
        <strong>Protocol description:</strong> Play the primary frequency (${protocol.primary.word} - ${protocol.primary.frequency} Hz) 
        at ${protocol.tempo.bpm.toFixed(0)} BPM for 21 minutes daily. Visualize the ${cymatic.geometry.replace(/_/g, ' ')} 
        cymatic pattern forming on the affected skin area. As the pattern stabilizes, the body's frequency returns toward baseline health.
      </p>
    </div>
  </div>
  
  <!-- CYMATIC CANVAS RENDERER -->
  <script>
    function drawCymaticPattern() {
      const canvas = document.getElementById('cymaticCanvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const geometry = '${cymatic.geometry}';
      const complexity = ${cymatic.complexity};
      const amplitude = ${cymatic.amplitude};
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(26, 188, 156, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw resonance points
      const points = ${JSON.stringify(cymatic.resonancePoints)};
      
      ctx.strokeStyle = '${state.color}';
      ctx.fillStyle = '${state.color}';
      ctx.lineWidth = 2;
      
      // Draw spiral from center
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x = centerX + p.x;
        const y = centerY + p.y;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Draw resonance nodes
      points.forEach(p => {
        const x = centerX + p.x;
        const y = centerY + p.y;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      // Draw center point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Render on load
    window.addEventListener('load', drawCymaticPattern);
  </script>
</body>
</html>
`;
  
  return html;
}

// ============================================================================
// RUN FULL TEST
// ============================================================================

function runFullTest() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  UFT 12:21 MEDICAL FREQUENCY TEST - SKIN CANCER CASE STUDY     ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  // Run all analysis steps
  analyzeProblematicFrequency();
  findHealingProtoWord();
  mapToStatesCycle();
  generateCosmicOutput();
  generateCymaticGeometry();
  generateHealingProtocol();
  
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  TEST COMPLETE - Generating HTML visualization...             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
}

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PatientCase,
    MedicalFrequencies,
    analyzeProblematicFrequency,
    findHealingProtoWord,
    mapToStatesCycle,
    generateCosmicOutput,
    generateCymaticGeometry,
    generateHealingProtocol,
    generateVisualOutput,
    runFullTest
  };
}

// Run test if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runFullTest();
  const html = generateVisualOutput();
  require('fs').writeFileSync('/tmp/uft_test_output.html', html);
  console.log('\n✓ HTML output saved to: /tmp/uft_test_output.html');
}
