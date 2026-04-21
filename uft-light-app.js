// uft-light-app.js
// UFT Light App core logic

// --- UI Tab Switching ---
const tabs = ['play', 'visualize', 'protocols', 'settings', 'about'];
tabs.forEach(tab => {
  document.getElementById(`tab-${tab}`).addEventListener('click', () => {
    tabs.forEach(t => {
      document.getElementById(`tab-${t}`).classList.remove('active');
      document.getElementById(`section-${t}`).classList.remove('active');
    });
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`section-${tab}`).classList.add('active');
  });
});

// --- Audio Device Selection ---
async function populateAudioDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  const outputSelect = document.getElementById('output-select');
  const inputSelect = document.getElementById('input-select');
  outputSelect.innerHTML = '';
  inputSelect.innerHTML = '';
  devices.forEach(device => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.textContent = device.label || `${device.kind} ${device.deviceId}`;
    if (device.kind === 'audiooutput') outputSelect.appendChild(option);
    if (device.kind === 'audioinput') inputSelect.appendChild(option);
  });
}

populateAudioDevices();
navigator.mediaDevices.addEventListener('devicechange', populateAudioDevices);

// --- Play Tab: Scales & Proto-Words ---
const scaleData = {
  solar432: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Proto1', 'Proto2'],
  lunar: [
    'Lunar 1', 'Lunar 2', 'Lunar 3', 'Lunar 4', 'Lunar 5', 'Lunar 6', 'Lunar 7', 'Lunar 8', 'Lunar 9', 'Lunar 10', 'Lunar 11', 'Lunar 12', 'Lunar 13',
    'Proto-Word A', 'Proto-Word B', 'Proto-Word C'
  ],
  cosmic: ['State1', 'State2', 'State3', 'MusicEngine', 'ProtoWords', 'RealtimeMapping'],
  tuning: ['432Hz', '440Hz', 'Moon', 'TUNING_ROOTS', 'ZERO_POINT_HZ'],
};
const noteSelect = document.getElementById('note-select');
const scaleSelect = document.getElementById('scale-select');

function populateScaleDropdown() {
  scaleSelect.innerHTML = '';
  const scaleLabels = {
    solar432: 'Solar 432 Hz',
    lunar: 'Lunar',
    cosmic: 'Cosmic Translator',
    tuning: 'Tuning Systems',
  };
  Object.keys(scaleData).forEach((key, idx) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = scaleLabels[key] || key;
    if (idx === 0) opt.selected = true;
    scaleSelect.appendChild(opt);
  });
}

function updateNotes() {
  const scale = scaleSelect.value;
  noteSelect.innerHTML = '';
  const notes = scaleData[scale] || [];
  notes.forEach((note, idx) => {
    const opt = document.createElement('option');
    opt.value = note;
    opt.textContent = note;
    if (idx === 0) opt.selected = true;
    noteSelect.appendChild(opt);
  });
}

scaleSelect.addEventListener('change', updateNotes);

// Ensure dropdowns are populated on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    populateScaleDropdown();
    updateNotes();
  });
} else {
  populateScaleDropdown();
  updateNotes();
}

// --- Audio Playback ---
let audioCtx;
let currentOsc;
let continuousPlaying = false;
let continuousGain = null;
async function playFrequency(freq, duration = 1, outputDeviceId = null, continuous = false) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (currentOsc) currentOsc.stop();
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.2;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  currentOsc = osc;
  if (continuous) {
    continuousPlaying = true;
    continuousGain = gain;
    // Don't stop automatically
  } else {
    setTimeout(() => osc.stop(), duration * 1000);
  }
  // Output device selection (if supported)
  if (outputDeviceId && gain.connect && gain.context.createMediaStreamDestination) {
    try {
      const dest = gain.context.createMediaStreamDestination();
      gain.connect(dest);
      if (dest.stream && HTMLMediaElement.prototype.setSinkId) {
        const audio = new Audio();
        audio.srcObject = dest.stream;
        await audio.setSinkId(outputDeviceId);
        audio.play();
      }
    } catch (e) { /* fallback to default */ }
  }
}

function stopContinuousSound() {
  if (currentOsc) {
    currentOsc.stop();
    currentOsc = null;
    continuousPlaying = false;
    if (continuousGain) {
      continuousGain.disconnect();
      continuousGain = null;
    }
  }
}

// Example frequency mapping (replace with canonical values)
const noteFreqs = {
  C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392.00, A: 432.00, B: 493.88,
  Proto1: 528.00, Proto2: 639.00,
  'Lunar 1': 210.42, 'Lunar 2': 224.54, 'Lunar 3': 237.82, 'Lunar 4': 251.23, 'Lunar 5': 264.79, 'Lunar 6': 278.48, 'Lunar 7': 292.31, 'Lunar 8': 306.28, 'Lunar 9': 320.39, 'Lunar 10': 334.64, 'Lunar 11': 349.03, 'Lunar 12': 363.56, 'Lunar 13': 378.23,
  'Proto-Word A': 400.00, 'Proto-Word B': 420.00, 'Proto-Word C': 440.00,
  State1: 111.00, State2: 222.00, State3: 333.00, MusicEngine: 444.00, ProtoWords: 555.00, RealtimeMapping: 666.00,
  '432Hz': 432.00, '440Hz': 440.00, 'Moon': 210.42, TUNING_ROOTS: 111.11, ZERO_POINT_HZ: 0.00
};

document.getElementById('play-btn').addEventListener('click', async () => {
  const note = noteSelect.value;
  const freq = noteFreqs[note] || 432;
  const outputDeviceId = document.getElementById('output-select').value || null;
  await playFrequency(freq, 1, outputDeviceId, false);
  drawVisualization(document.getElementById('play-visualization'), freq);
});

// Play continuous button
document.getElementById('play-continuous-btn').addEventListener('click', async () => {
  const note = noteSelect.value;
  const freq = noteFreqs[note] || 432;
  const outputDeviceId = document.getElementById('output-select').value || null;
  await playFrequency(freq, 1, outputDeviceId, true);
  drawVisualization(document.getElementById('play-visualization'), freq);
  document.getElementById('play-continuous-btn').style.display = 'none';
  document.getElementById('stop-btn').style.display = '';
});

// Stop button
document.getElementById('stop-btn').addEventListener('click', () => {
  stopContinuousSound();
  document.getElementById('play-continuous-btn').style.display = '';
  document.getElementById('stop-btn').style.display = 'none';
});

// --- Visualize Tab ---
document.getElementById('vis-play-btn').addEventListener('click', async () => {
  const freq = parseFloat(document.getElementById('vis-frequency').value) || 432;
  const outputDeviceId = document.getElementById('output-select').value || null;
  await playFrequency(freq, 1, outputDeviceId);
  drawVisualization(document.getElementById('vis-visualization'), freq);
});

// --- Visualization (simple sine wave) ---
function drawVisualization(canvasDiv, freq) {
  canvasDiv.innerHTML = '';
  const w = canvasDiv.offsetWidth, h = canvasDiv.offsetHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvasDiv.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  // Torus parameters
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.35; // major radius
  const r = R * 0.45; // minor radius
  const points = 400;
  // Draw torus cross-section (donut)
  ctx.save();
  ctx.translate(cx, cy);
  // Outer ring
  ctx.beginPath();
  ctx.arc(0, 0, R + r, 0, 2 * Math.PI);
  ctx.strokeStyle = '#ffe066'; // yellow
  ctx.lineWidth = 4;
  ctx.shadowColor = '#a259f7';
  ctx.shadowBlur = 16;
  ctx.stroke();
  // Inner ring
  ctx.beginPath();
  ctx.arc(0, 0, R - r, 0, 2 * Math.PI);
  ctx.strokeStyle = '#ff4d6d'; // red
  ctx.lineWidth = 2;
  ctx.shadowColor = '#ff4d6d';
  ctx.shadowBlur = 8;
  ctx.stroke();
  // Torus surface (parametric lines)
  ctx.shadowBlur = 0;
  for (let j = 0; j < 12; j++) {
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * 2 * Math.PI;
      const phi = (j / 12) * 2 * Math.PI;
      const x = (R + r * Math.cos(theta)) * Math.cos(theta + phi);
      const y = (R + r * Math.cos(theta)) * Math.sin(theta + phi);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#a259f7'; // violet
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }
  ctx.restore();
  // Credit
  ctx.save();
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#ffe066';
  ctx.textAlign = 'center';
  ctx.fillText('Torus representation', w/2, h-8);
  ctx.restore();
}

// --- Protocols Tab ---
const protocolSteps = {
  water: [
    'Fill a glass with water.',
    'Place the glass near your device’s speaker.',
    'Select a UFT scale and play a sequence of notes for 1–3 minutes.',
    'Observe and taste the water. Record any changes.'
  ],
  plant: [
    'Place your plant near your device’s speaker.',
    'Select the Plant Test protocol.',
    'Play the recommended frequency sequence daily for 5–10 minutes.',
    'Track growth and share your observations.'
  ],
  bio: [
    'Sit comfortably near your device’s speaker.',
    'Select a UFT scale and play proto-words or notes.',
    'Focus on sensations or effects in your body.',
    'Record your experience.'
  ]
};
const protocolSelect = document.getElementById('protocol-select');
const protocolStepsDiv = document.getElementById('protocol-steps');
function updateProtocolSteps() {
  const val = protocolSelect.value;
  protocolStepsDiv.innerHTML = '';
  protocolSteps[val].forEach((step, i) => {
    const p = document.createElement('p');
    p.textContent = `Step ${i+1}: ${step}`;
    protocolStepsDiv.appendChild(p);
  });
}
protocolSelect.addEventListener('change', updateProtocolSteps);
updateProtocolSteps();

// --- Feedback Link ---
document.getElementById('feedback-link').addEventListener('click', e => {
  e.preventDefault();
  window.open('https://github.com/UFT-Project/community', '_blank');
});
