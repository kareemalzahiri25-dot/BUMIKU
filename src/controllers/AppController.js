/**
 * AppController.js
 * Koordinator utama aplikasi SPA BumiKita berbasis arsitektur MVC.
 * Mengatur routing navigasi view, sinkronisasi state global ke header, dan inisialisasi aplikasi.
 */
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';
import { SpeechHelper } from '../utils/SpeechHelper.js';

export class AppController {
  constructor() {
    this.currentViewId = 'viewHome';
    this.views = {};
  }

  registerViews(views) {
    this.views = views;
  }

  init() {
    // Berlangganan perubahan globalState untuk update header secara reaktif
    globalState.subscribe(state => this.updateHeaderStats(state));

    // Render tampilan awal
    this.updateHeaderStats(globalState.getState());
    this.bindGlobalEvents();
    this.switchView('viewHome');
  }

  switchView(viewId) {
    sound.playPop();
    this.currentViewId = viewId;

    const mainContainer = document.getElementById('mainViewport');
    if (!mainContainer) return;

    mainContainer.scrollTop = 0;

    // Render view yang sesuai
    if (this.views[viewId]) {
      this.views[viewId].render(mainContainer);
    }

    // Update active state di Sidebar Desktop
    const sideMap = {
      viewHome: 'sideNavHome',
      viewKenaliBumi: 'sideNavKenali',
      viewTamanAksi: 'sideNavTamanAksi',
      viewMisiPahlawan: 'sideNavMisi'
    };

    document.querySelectorAll('.side-nav-btn').forEach(btn => {
      btn.className = 'side-nav-btn w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all tactile-btn';
    });

    const activeSideBtn = document.getElementById(sideMap[viewId]);
    if (activeSideBtn) {
      activeSideBtn.className = 'side-nav-btn w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl font-black text-sm text-[#0097a7] bg-[#e0f7fa] transition-all tactile-btn shadow-xs';
    }

    // Update active state di Bottom Nav Mobile
    const mobileMap = {
      viewHome: 'mobileNavHome',
      viewKenaliBumi: 'mobileNavKenali',
      viewTamanAksi: 'mobileNavTamanAksi',
      viewMisiPahlawan: 'mobileNavMisi'
    };

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.remove('text-[#0097a7]');
      btn.classList.add('text-slate-400');
    });

    const activeMobileBtn = document.getElementById(mobileMap[viewId]);
    if (activeMobileBtn) {
      activeMobileBtn.classList.add('text-[#0097a7]');
      activeMobileBtn.classList.remove('text-slate-400');
    }

    // Refresh Lucide icons setelah DOM view baru terpasang
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  updateHeaderStats(state) {
    const tempEl = document.getElementById('earthTempDisplay');
    if (tempEl) tempEl.textContent = `+${state.earthTemp.toFixed(2)}°C`;

    const ptsEl = document.getElementById('ecoPointCount');
    if (ptsEl) ptsEl.textContent = state.ecoPoints;

    const treesEl = document.getElementById('treeCountDisplay');
    if (treesEl) treesEl.textContent = state.treesCount;

    const badgesEl = document.getElementById('badgeCountDisplay');
    if (badgesEl) badgesEl.textContent = state.badges.length;

    // Jika View Home sedang aktif, perbarui pula statistiknya
    if (this.currentViewId === 'viewHome' && this.views.viewHome) {
      this.views.viewHome.updateStats(state);
    }
  }

  bindGlobalEvents() {
    // Tombol Navigasi Desktop Sidebar
    document.getElementById('sideNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('sideNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('sideNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('sideNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));

    // Tombol Navigasi Mobile
    document.getElementById('mobileNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('mobileNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('mobileNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('mobileNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));

    // Mute Audio Toggle
    document.getElementById('btnAudioToggle')?.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      const btn = document.getElementById('btnAudioToggle');
      if (btn) {
        btn.innerHTML = isMuted
          ? '<i data-lucide="volume-x" class="w-4 h-4 text-rose-500"></i>'
          : '<i data-lucide="volume-2" class="w-4 h-4 text-slate-600"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Peringatan Suhu Global
    document.getElementById('earthTempPill')?.addEventListener('click', () => {
      sound.playPop();
      const state = globalState.getState();
      SpeechHelper.speak(
        `Suhu bumi rata-rata saat ini naik positif ${state.earthTemp.toFixed(2)} derajat Celsius. Ayo kita turunkan lewat aksi ramah lingkungan!`
      );
    });

    // Modal Info SDG 4 & 13
    document.getElementById('btnInfoModalTrigger')?.addEventListener('click', () => {
      sound.playPop();
      document.getElementById('infoModal')?.classList.toggle('hidden');
    });

    document.getElementById('btnCloseInfoModal')?.addEventListener('click', () => {
      sound.playPop();
      document.getElementById('infoModal')?.classList.add('hidden');
    });
  }

  speakTerraGreeting() {
    sound.playPop();
    SpeechHelper.speak(
      'Halo Sahabat Cilik! Aku Terra si Bumi. Ayo bantu aku menurunkan suhu bumi dan bersihkan taman kota kita!'
    );
  }
}

export const appController = new AppController();
