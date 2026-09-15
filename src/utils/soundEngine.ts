// Web Audio API based Realistic Engine & Exhaust Synthesizer
// Completely client-side, zero external audio files needed

export type EngineProfileType = 'v8' | 'turbo' | 'diesel' | 'electric' | 'classic';

class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private currentProfile: EngineProfileType = 'v8';
  private currentRpm = 800; // idle
  private masterGain: GainNode | null = null;

  // Synthesis Nodes
  private oscMain: OscillatorNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private oscTurbo: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;
  private filterLow: BiquadFilterNode | null = null;
  private distortion: WaveShaperNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create a subtle saturation curve for realistic exhaust rasp
  private makeDistortionCurve(amount = 20) {
    const k = typeof amount === 'number' ? amount : 50;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public start(profile: EngineProfileType = 'v8') {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentProfile = profile;
    this.isRunning = true;
    this.currentRpm = 850;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.1);
    this.masterGain.connect(ctx.destination);

    // Distortion
    this.distortion = ctx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(profile === 'v8' || profile === 'classic' ? 25 : 10);
    this.distortion.oversample = '2x';

    // Lowpass filter (exhaust muffler / resonance)
    this.filterLow = ctx.createBiquadFilter();
    this.filterLow.type = 'lowpass';
    this.filterLow.frequency.setValueAtTime(profile === 'electric' ? 2500 : 350, now);
    this.filterLow.Q.setValueAtTime(profile === 'v8' ? 4 : 2, now);

    this.distortion.connect(this.filterLow);
    this.filterLow.connect(this.masterGain);

    if (profile === 'electric') {
      this.setupElectricEngine();
    } else {
      this.setupCombustionEngine(profile);
    }
  }

  private setupCombustionEngine(profile: EngineProfileType) {
    if (!this.ctx || !this.distortion) return;
    const ctx = this.ctx;

    // Main fundamental cylinder firing rate
    this.oscMain = ctx.createOscillator();
    this.oscMain.type = profile === 'v8' || profile === 'classic' ? 'sawtooth' : 'triangle';
    this.oscMain.frequency.setValueAtTime(this.calcFrequency(this.currentRpm, profile), ctx.currentTime);

    // Sub rumble oscillator
    this.oscSub = ctx.createOscillator();
    this.oscSub.type = 'sine';
    this.oscSub.frequency.setValueAtTime(this.calcFrequency(this.currentRpm, profile) * 0.5, ctx.currentTime);

    // High harmonic growl oscillator
    this.oscHarmonic = ctx.createOscillator();
    this.oscHarmonic.type = 'sawtooth';
    this.oscHarmonic.frequency.setValueAtTime(this.calcFrequency(this.currentRpm, profile) * 2, ctx.currentTime);

    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.5;

    const subGain = ctx.createGain();
    subGain.gain.value = profile === 'diesel' ? 0.7 : 0.4;

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = profile === 'v8' ? 0.45 : 0.25;

    this.oscMain.connect(mainGain);
    this.oscSub.connect(subGain);
    this.oscHarmonic.connect(harmonicGain);

    mainGain.connect(this.distortion);
    subGain.connect(this.distortion);
    harmonicGain.connect(this.distortion);

    // Turbo spool oscillator if applicable
    if (profile === 'turbo') {
      this.oscTurbo = ctx.createOscillator();
      this.oscTurbo.type = 'sine';
      this.oscTurbo.frequency.setValueAtTime(1400, ctx.currentTime);

      this.turboGain = ctx.createGain();
      this.turboGain.gain.setValueAtTime(0.01, ctx.currentTime);

      this.oscTurbo.connect(this.turboGain);
      this.turboGain.connect(this.filterLow!);
      this.oscTurbo.start();
    }

    this.oscMain.start();
    this.oscSub.start();
    this.oscHarmonic.start();
  }

  private setupElectricEngine() {
    if (!this.ctx || !this.filterLow) return;
    const ctx = this.ctx;

    // High tech electric motor whine (dual sine sweep)
    this.oscMain = ctx.createOscillator();
    this.oscMain.type = 'sine';
    this.oscMain.frequency.setValueAtTime(220, ctx.currentTime);

    this.oscSub = ctx.createOscillator();
    this.oscSub.type = 'triangle';
    this.oscSub.frequency.setValueAtTime(440, ctx.currentTime);

    const gain1 = ctx.createGain();
    gain1.gain.value = 0.35;

    const gain2 = ctx.createGain();
    gain2.gain.value = 0.15;

    this.oscMain.connect(gain1);
    this.oscSub.connect(gain2);

    gain1.connect(this.filterLow);
    gain2.connect(this.filterLow);

    this.oscMain.start();
    this.oscSub.start();
  }

  private calcFrequency(rpm: number, profile: EngineProfileType): number {
    // rpm to firing frequency: (rpm / 60) * (cylinders / 2)
    const cylinders = profile === 'v8' ? 8 : profile === 'classic' ? 6 : 4;
    const fundamental = (rpm / 60) * (cylinders / 2);
    return Math.max(25, fundamental * 0.85);
  }

  public setRpm(targetRpm: number, transitionTime = 0.08) {
    if (!this.isRunning || !this.ctx) return;
    this.currentRpm = Math.min(8000, Math.max(800, targetRpm));
    const now = this.ctx.currentTime;
    const freq = this.calcFrequency(this.currentRpm, this.currentProfile);

    if (this.currentProfile === 'electric') {
      // Electric pitch scales linearly with RPM
      const electricPitch = 200 + (this.currentRpm - 800) * 0.22;
      this.oscMain?.frequency.setTargetAtTime(electricPitch, now, transitionTime);
      this.oscSub?.frequency.setTargetAtTime(electricPitch * 1.5, now, transitionTime);
      this.filterLow?.frequency.setTargetAtTime(1500 + (this.currentRpm - 800) * 0.4, now, transitionTime);
      return;
    }

    // Combustion
    this.oscMain?.frequency.setTargetAtTime(freq, now, transitionTime);
    this.oscSub?.frequency.setTargetAtTime(freq * 0.5, now, transitionTime);
    this.oscHarmonic?.frequency.setTargetAtTime(freq * 2, now, transitionTime);

    // Open low-pass filter as throttle opens
    const filterFreq = 300 + (this.currentRpm - 800) * 0.35;
    this.filterLow?.frequency.setTargetAtTime(filterFreq, now, transitionTime);

    // Turbo spool volume and pitch
    if (this.currentProfile === 'turbo' && this.oscTurbo && this.turboGain) {
      const turboFreq = 1200 + (this.currentRpm - 800) * 0.45;
      const turboVol = Math.max(0.01, (this.currentRpm - 1500) / 7000) * 0.12;
      this.oscTurbo.frequency.setTargetAtTime(turboFreq, now, transitionTime);
      this.turboGain.gain.setTargetAtTime(turboVol, now, transitionTime);
    }
  }

  // Trigger aggressive exhaust crackles and pops
  public triggerPop() {
    if (!this.ctx || !this.isRunning) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const delay = i * 0.07 + Math.random() * 0.04;
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Noise burst
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.2));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const popFilter = ctx.createBiquadFilter();
      popFilter.type = 'bandpass';
      popFilter.frequency.value = 180 + Math.random() * 140;
      popFilter.Q.value = 3;

      const popGain = ctx.createGain();
      popGain.gain.setValueAtTime(0.4 + Math.random() * 0.3, now + delay);
      popGain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.05);

      whiteNoise.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(ctx.destination);

      whiteNoise.start(now + delay);
    }
  }

  // Turbo blow-off valve sound (pssshhhh)
  public triggerBlowOff() {
    if (!this.ctx || !this.isRunning || this.currentProfile !== 'turbo') return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.35;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + duration);
    filter.Q.value = 4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        setTimeout(() => {
          this.oscMain?.stop();
          this.oscSub?.stop();
          this.oscHarmonic?.stop();
          this.oscTurbo?.stop();
          this.oscMain?.disconnect();
          this.oscSub?.disconnect();
          this.oscHarmonic?.disconnect();
          this.oscTurbo?.disconnect();
        }, 120);
      } catch {
        // Safe cleanup
      }
    }
  }

  public getActive(): boolean {
    return this.isRunning;
  }
}

export const soundEngine = new EngineSoundEngine();

// Helper to determine engine profile from car data
export function getCarEngineProfile(car: { fuelType: string; engine: string; brand: string }): EngineProfileType {
  const fuel = car.fuelType.toLowerCase();
  const engine = car.engine.toLowerCase();
  const brand = car.brand.toLowerCase();

  if (fuel.includes('elektrik') || engine.includes('elektrik') || engine.includes('çift elektrikli')) {
    return 'electric';
  }
  if (fuel.includes('dizel') || engine.includes('multijet') || engine.includes('tdi')) {
    return 'diesel';
  }
  if (brand.includes('tofaş') || engine.includes('v8') || brand.includes('bmw') || brand.includes('mercedes')) {
    return 'v8';
  }
  return 'turbo';
}
