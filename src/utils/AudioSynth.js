/**
 * AudioSynth.js
 * Generator efek suara sintetis ramah anak menggunakan Web Audio API.
 */
export class AudioSynth {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.12, type = 'sine', volume = 0.15) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.debug('Audio error:', e);
    }
  }

  playPop() {
    this.playTone(560, 0.08, 'sine', 0.15);
  }

  playCoin() {
    this.playTone(987.77, 0.1, 'sine', 0.18);
    setTimeout(() => this.playTone(1318.51, 0.22, 'sine', 0.18), 75);
  }

  playTrashDump() {
    // Sound when trash enters bin (descending pleasant thud)
    this.playTone(420, 0.08, 'triangle', 0.2);
    setTimeout(() => this.playTone(280, 0.12, 'sine', 0.22), 70);
  }

  playBikeBell() {
    // Ring-ring sound for bike
    this.playTone(1760, 0.06, 'sine', 0.12);
    setTimeout(() => this.playTone(1760, 0.08, 'sine', 0.12), 100);
  }

  playPlantTree() {
    // Rustling leafy chime
    this.playTone(523.25, 0.1, 'sine', 0.15);
    setTimeout(() => this.playTone(659.25, 0.12, 'triangle', 0.16), 80);
    setTimeout(() => this.playTone(783.99, 0.18, 'sine', 0.18), 160);
  }

  playCelebration() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((pitch, idx) => {
      setTimeout(() => this.playTone(pitch, 0.25, 'triangle', 0.2), idx * 85);
    });
  }

  playWrong() {
    this.playTone(220, 0.25, 'sawtooth', 0.15);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const sound = new AudioSynth();
