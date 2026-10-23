/**
 * StateModel.js
 * Model penyimpan status global pemain (Poin Hijau, Suhu Bumi, CO2 dicegah, Lencana, Target Usia).
 * Menggunakan pola Observer (Pub/Sub) agar View langsung terupdate saat data berubah,
 * serta menyimpan status ke LocalStorage agar tidak hilang saat halaman di-refresh.
 */

const STORAGE_KEY = 'bumikita_game_state_v1';

const DEFAULT_STATE = {
  ecoPoints: 160,
  earthTemp: 1.35, // +1.35°C di atas batas pra-industri
  co2SavedKg: 2.4,
  treesCount: 4,
  badges: ['sahabat_bumi', 'hemat_energi', 'pilah_sampah'],
  userLevel: 'Level 2: Sahabat Bumi',
  userMode: 'sd', // 'sd' (Penjelajah Cilik) | 'smp' (Peneliti Muda)
  nextLevelPoints: 250
};

export class StateModel {
  constructor() {
    this.state = this.loadFromStorage();
    this.updateUserLevelTitle();
    this.listeners = [];
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return { ...DEFAULT_STATE };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Gagal memuat state dari localStorage, menggunakan default:', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Gagal menyimpan state ke localStorage:', e);
    }
  }

  getState() {
    return { ...this.state };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  updateUserLevelTitle() {
    const pts = this.state.ecoPoints;
    if (this.state.userMode === 'smp') {
      if (pts < 100) {
        this.state.userLevel = 'Level 1: Analis Pemula';
        this.state.nextLevelPoints = 100;
      } else if (pts < 250) {
        this.state.userLevel = 'Level 2: Peneliti Pratama';
        this.state.nextLevelPoints = 250;
      } else {
        this.state.userLevel = 'Level 3: Ahli Keberlanjutan';
        this.state.nextLevelPoints = 500;
      }
    } else {
      if (pts < 100) {
        this.state.userLevel = 'Level 1: Penjaga Tunas';
        this.state.nextLevelPoints = 100;
      } else if (pts < 250) {
        this.state.userLevel = 'Level 2: Sahabat Bumi';
        this.state.nextLevelPoints = 250;
      } else {
        this.state.userLevel = 'Level 3: Pahlawan Rimba';
        this.state.nextLevelPoints = 500;
      }
    }
  }

  setUserMode(mode) {
    if (mode !== 'sd' && mode !== 'smp') return;
    this.state.userMode = mode;
    this.updateUserLevelTitle();
    this.saveToStorage();
    this.notify();
  }

  addEcoPoints(pts) {
    this.state.ecoPoints += pts;
    this.updateUserLevelTitle();
    this.saveToStorage();
    this.notify();
  }

  reduceEarthTemp(deg) {
    this.state.earthTemp = Math.max(1.0, +(this.state.earthTemp - deg).toFixed(2));
    this.saveToStorage();
    this.notify();
  }

  addCo2Saved(kg) {
    this.state.co2SavedKg = +(this.state.co2SavedKg + kg).toFixed(2);
    this.saveToStorage();
    this.notify();
  }

  incrementTrees() {
    this.state.treesCount += 1;
    this.saveToStorage();
    this.notify();
  }

  unlockBadge(badgeId) {
    if (!this.state.badges.includes(badgeId)) {
      this.state.badges.push(badgeId);
      this.saveToStorage();
      this.notify();
      return true;
    }
    return false;
  }

  hasBadge(badgeId) {
    return this.state.badges.includes(badgeId);
  }

  getProgressPercent() {
    const pts = this.state.ecoPoints;
    const target = this.state.nextLevelPoints || 250;
    return Math.min(100, Math.round((pts / target) * 100));
  }
}

export const globalState = new StateModel();
