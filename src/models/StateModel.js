/**
 * StateModel.js
 * Model penyimpan status global pemain (Poin Hijau, Suhu Bumi, CO2 dicegah, Lencana).
 * Menggunakan pola Observer (Pub/Sub) agar View langsung terupdate saat data berubah.
 */
export class StateModel {
  constructor() {
    this.state = {
      ecoPoints: 160,
      earthTemp: 1.35, // +1.35°C di atas batas pra-industri
      co2SavedKg: 2.4,
      treesCount: 4,
      badges: ['sahabat_bumi', 'hemat_energi', 'pilah_sampah'],
      userLevel: 'Level 2 Sahabat Bumi'
    };
    this.listeners = [];
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

  addEcoPoints(pts) {
    this.state.ecoPoints += pts;
    this.notify();
  }

  reduceEarthTemp(deg) {
    this.state.earthTemp = Math.max(1.0, +(this.state.earthTemp - deg).toFixed(2));
    this.notify();
  }

  addCo2Saved(kg) {
    this.state.co2SavedKg = +(this.state.co2SavedKg + kg).toFixed(2);
    this.notify();
  }

  incrementTrees() {
    this.state.treesCount += 1;
    this.notify();
  }

  unlockBadge(badgeId) {
    if (!this.state.badges.includes(badgeId)) {
      this.state.badges.push(badgeId);
      this.notify();
      return true;
    }
    return false;
  }

  hasBadge(badgeId) {
    return this.state.badges.includes(badgeId);
  }
}

export const globalState = new StateModel();
