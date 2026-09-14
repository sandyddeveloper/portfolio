"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  public isEnabled: boolean = false;
  private thunderAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.thunderAudio = new Audio("/audio/thunder.mp3");
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initCtx();
      this.playBeep(880, 0.08, 0.05);
    }
    return this.isEnabled;
  }

  public playBeep(freq = 440, duration = 0.1, gain = 0.05) {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // ignore
    }
  }

  public playBlast() {
    if (!this.isEnabled) return;
    if (this.thunderAudio) {
      this.thunderAudio.currentTime = 0;
      this.thunderAudio.volume = 0.4;
      this.thunderAudio.play().catch(() => {});
    } else {
      this.playBeep(120, 0.5, 0.2);
    }
  }
}

export const soundManager = new SoundManager();
