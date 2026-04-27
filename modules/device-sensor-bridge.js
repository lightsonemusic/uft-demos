/**
 * DEVICE SENSOR BRIDGE v1.0
 * Uses built-in smartphone/laptop sensors as bioelectric measurement proxies
 * 
 * Maps:
 * - Microphone audio frequency → Bioelectric Potential (mV)
 * - Accelerometer vibration → Electrode Impedance (kΩ)
 * - Light sensor / ambient brightness → Plant Coherency (%)
 * 
 * Works on: Android Chrome, iOS Safari (limited), Desktop Chrome/Edge
 */

class DeviceSensorBridge {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.mediaStream = null;
    this.accelerometerActive = false;
    this.lightSensorActive = false;
    this.isListening = false;
    
    // Sensor calibration values
    this.audioFreqMin = 0;
    this.audioFreqMax = 5000; // Hz
    this.accelMin = 0;
    this.accelMax = 10; // m/s²
    
    // Current readings
    this.lastBioelectricPotential = 0; // mV
    this.lastImpedance = 25000; // Ω (baseline ~25kΩ)
    this.lastCoherency = 65; // %
  }

  /**
   * MICROPHONE SENSOR: Capture audio and convert to bioelectric potential
   * Frequency analysis: Low frequencies = stable; High frequencies = activity
   */
  async initMicrophone() {
    try {
      // Request microphone permission
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Create analyser
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.85;
      source.connect(this.analyser);
      
      this.isListening = true;
      console.log('✓ Microphone sensor initialized');
      return true;
    } catch (error) {
      console.warn('❌ Microphone access denied:', error.message);
      return false;
    }
  }

  /**
   * Read microphone: Convert audio frequency to bioelectric potential
   * 
   * Mapping logic:
   * - 0-500 Hz (low bass) = Dormant phase, bioelectric: -20 to 0 mV
   * - 500-1500 Hz (mid) = Rising/Descending phase, bioelectric: 0 to +30 mV
   * - 1500-3000 Hz (high) = Peak/Resonance phase, bioelectric: +30 to +80 mV
   * - 3000+ Hz (very high) = Stress/Alert state, bioelectric: +80 to +100 mV
   */
  readMicrophoneFrequency() {
    if (!this.analyser) return 0;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Find dominant frequency
    let maxEnergy = 0;
    let dominantBin = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > maxEnergy) {
        maxEnergy = dataArray[i];
        dominantBin = i;
      }
    }

    // Convert bin to Hz
    const nyquist = this.audioContext.sampleRate / 2;
    const binHz = (dominantBin / this.analyser.frequencyBinCount) * nyquist;

    // Map frequency to bioelectric potential (-50 to +100 mV range)
    let bioelectricPotential = 0;
    
    if (binHz < 300) {
      // Dormant/resting
      bioelectricPotential = -30;
    } else if (binHz < 800) {
      // Rising energy
      bioelectricPotential = -10 + (binHz / 800) * 20;
    } else if (binHz < 2000) {
      // Active growth
      bioelectricPotential = 10 + ((binHz - 800) / 1200) * 40;
    } else if (binHz < 4000) {
      // Peak resonance
      bioelectricPotential = 50 + ((binHz - 2000) / 2000) * 30;
    } else {
      // Stress/alert
      bioelectricPotential = 80;
    }

    // Add slight noise for realism
    bioelectricPotential += (Math.random() - 0.5) * 5;

    // Smooth over last 3 readings
    this.lastBioelectricPotential = 
      this.lastBioelectricPotential * 0.7 + bioelectricPotential * 0.3;

    return {
      frequency_hz: binHz.toFixed(1),
      bioelectric_potential_mv: this.lastBioelectricPotential.toFixed(2),
      energy_db: (maxEnergy / 255 * 100).toFixed(1)
    };
  }

  /**
   * ACCELEROMETER SENSOR: Detect soil vibrations
   * Maps acceleration to electrode impedance variation
   * 
   * Logic:
   * - No vibration (0 m/s²) = Dry soil, impedance ~35 kΩ
   * - Slight vibration (0-2 m/s²) = Normal soil, impedance ~25 kΩ
   * - Medium vibration (2-5 m/s²) = Moist soil, impedance ~18 kΩ
   * - High vibration (5+ m/s²) = Saturated soil, impedance ~10 kΩ
   */
  async initAccelerometer() {
    try {
      // Request device motion permission (iOS 13+)
      if (typeof DeviceMotionEvent !== 'undefined' && DeviceMotionEvent.requestPermission) {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== 'granted') {
          console.warn('❌ Device motion permission denied');
          return false;
        }
      }

      window.addEventListener('devicemotion', (event) => {
        if (!event.acceleration) return;

        const accel = event.acceleration;
        const magnitude = Math.sqrt(
          accel.x ** 2 + accel.y ** 2 + accel.z ** 2
        );

        // Map acceleration to impedance (inverse relationship with vibration)
        let impedance = 35000; // baseline (dry soil)
        
        if (magnitude < 1) {
          impedance = 35000; // Dry
        } else if (magnitude < 3) {
          impedance = 35000 - (magnitude / 3) * 10000; // Normal
        } else if (magnitude < 6) {
          impedance = 25000 - ((magnitude - 3) / 3) * 7000; // Moist
        } else {
          impedance = 18000 - Math.min((magnitude - 6) / 5, 1) * 8000; // Saturated
        }

        this.lastImpedance = impedance + (Math.random() - 0.5) * 2000;
      });

      this.accelerometerActive = true;
      console.log('✓ Accelerometer sensor initialized');
      return true;
    } catch (error) {
      console.warn('❌ Accelerometer unavailable:', error.message);
      return false;
    }
  }

  /**
   * LIGHT SENSOR / AMBIENT BRIGHTNESS
   * Maps light level to plant coherency percentage
   * 
   * Uses screen brightness or ambient light sensor
   * - Dim (< 30 lux) = Low coherency 20%
   * - Medium (30-100 lux) = Good coherency 65%
   * - Bright (100+ lux) = High coherency 95%
   */
  async initLightSensor() {
    try {
      // Check for Ambient Light Sensor API
      if ('AmbientLightSensor' in window) {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener('reading', () => {
          const lux = sensor.illuminance;
          
          // Map lux to coherency (0-100%)
          let coherency = 0;
          if (lux < 30) {
            coherency = 20 + (lux / 30) * 20; // 20-40%
          } else if (lux < 100) {
            coherency = 40 + ((lux - 30) / 70) * 35; // 40-75%
          } else if (lux < 500) {
            coherency = 75 + ((lux - 100) / 400) * 15; // 75-90%
          } else {
            coherency = 90 + Math.min((lux - 500) / 500, 1) * 10; // 90-100%
          }
          
          this.lastCoherency = coherency;
        });
        sensor.start();
        this.lightSensorActive = true;
        console.log('✓ Ambient Light Sensor initialized');
        return true;
      } else {
        console.warn('⚠️ Ambient Light Sensor not supported, using fallback');
        // Fallback: Use screen brightness estimation via canvas
        this.initCanvasLightFallback();
        return true;
      }
    } catch (error) {
      console.warn('❌ Light sensor error:', error.message);
      return false;
    }
  }

  /**
   * Fallback: Estimate light via canvas pixel analysis
   * Point camera at plant, analyze average pixel brightness
   */
  async initCanvasLightFallback() {
    try {
      const video = document.createElement('video');
      video.width = 320;
      video.height = 240;

      // Request camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');

      // Sample brightness every 500ms
      setInterval(() => {
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let totalBrightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          totalBrightness += (r + g + b) / 3;
        }

        const avgBrightness = totalBrightness / (canvas.width * canvas.height); // 0-255
        
        // Map brightness to coherency
        this.lastCoherency = (avgBrightness / 255) * 100;
      }, 500);

      console.log('✓ Canvas light fallback initialized');
    } catch (error) {
      console.warn('❌ Camera fallback failed:', error.message);
    }
  }

  /**
   * GET COMPLETE BIOELECTRIC READING
   * Returns object matching electrode sensor format
   */
  getBioelectricReading() {
    const micReading = this.readMicrophoneFrequency();
    
    return {
      sensor_type: 'device_bridge',
      timestamp: new Date().toISOString(),
      bioelectric_potential_mv: micReading.bioelectric_potential_mv,
      electrode_impedance_ohms: this.lastImpedance.toFixed(0),
      dominant_frequency_hz: micReading.frequency_hz,
      energy_db: micReading.energy_db,
      plant_coherency_percent: this.lastCoherency.toFixed(0),
      soil_moisture_estimate: this.estimateSoilMoisture(),
      status: this.isListening ? '🟢 Active' : '🔴 Idle'
    };
  }

  /**
   * Estimate soil moisture from impedance
   * Inverse relationship: lower impedance = more water
   */
  estimateSoilMoisture() {
    // Map impedance to moisture percentage
    // 35 kΩ = dry (0%), 10 kΩ = saturated (100%)
    const moisture = Math.max(0, Math.min(100, 
      ((35000 - this.lastImpedance) / (35000 - 10000)) * 100
    ));
    return moisture.toFixed(0);
  }

  /**
   * Start all sensors
   */
  async startAllSensors() {
    console.log('🎬 Starting device sensor bridge...');
    
    const microSuccess = await this.initMicrophone();
    const accelSuccess = await this.initAccelerometer();
    const lightSuccess = await this.initLightSensor();
    
    if (microSuccess || accelSuccess || lightSuccess) {
      console.log('✅ Device Sensor Bridge READY');
      return true;
    } else {
      console.error('❌ No sensors could be initialized');
      return false;
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.isListening = false;
    console.log('⏹ Device sensors stopped');
  }
}

// Export for use in HTML
window.DeviceSensorBridge = DeviceSensorBridge;
