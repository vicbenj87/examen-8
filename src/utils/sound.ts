type AudioCtor = typeof AudioContext;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientNodes: Array<OscillatorNode | GainNode> = [];
  private muted = false;
  private ambientRunning = false;

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor: AudioCtor | undefined =
        window.AudioContext || (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => undefined);
    }
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) this.stopAmbient();
    else if (this.ambientRunning) this.startAmbient();
  }

  isMuted() {
    return this.muted;
  }

  private tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.12) {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0, ctx.currentTime + start);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + duration + 0.05);
  }

  click() {
    this.tone(520, 0, 0.08, 'triangle', 0.07);
  }

  popup() {
    this.tone(392, 0, 0.16, 'sine', 0.09);
    this.tone(587.33, 0.09, 0.22, 'sine', 0.07);
  }

  correct() {
    this.tone(523.25, 0, 0.14, 'sine', 0.12);
    this.tone(659.25, 0.1, 0.14, 'sine', 0.11);
    this.tone(783.99, 0.2, 0.28, 'sine', 0.13);
  }

  incorrect() {
    this.tone(233, 0, 0.22, 'sawtooth', 0.08);
    this.tone(174.6, 0.14, 0.28, 'sawtooth', 0.08);
  }

  tick() {
    this.tone(880, 0, 0.03, 'square', 0.02);
  }

  tock() {
    this.tone(300, 0, 0.08, 'sine', 0.05);
  }

  complete() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, i * 0.16, 0.32, 'sine', 0.12));
  }

  startAmbient() {
    this.ambientRunning = true;
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    this.stopAmbient(false);
    const freqs = [110, 164.81, 220];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      gain.gain.value = 0.015 + i * 0.004;

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.04 + i * 0.015;
      lfoGain.gain.value = 0.01;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain).connect(ctx.destination);
      osc.start();
      lfo.start();
      this.ambientNodes.push(osc, gain, lfo, lfoGain);
    });
  }

  stopAmbient(markStopped = true) {
    if (markStopped) this.ambientRunning = false;
    this.ambientNodes.forEach((node) => {
      try {
        if ('stop' in node) (node as OscillatorNode).stop();
        node.disconnect();
      } catch {
        /* ignore */
      }
    });
    this.ambientNodes = [];
  }
}

export const sound = new SoundEngine();
