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

    const scrollContainer = document.getElementById('scrollViewport') || mainContainer;
    scrollContainer.scrollTop = 0;

    // Header, Footer, dan Mobile Bottom Bar hanya ditampilkan di Beranda (viewHome).
    // Saat membuka modul lain (Kenali Bumi, Taman Aksi, Misi), sembunyikan agar halaman fokus dan menggunakan tombol kembali (back button).
    const isHome = (viewId === 'viewHome');
    const appHeader = document.querySelector('header');
    const appFooter = document.getElementById('appFooter');
    const mobileNav = document.querySelector('nav.md\\:hidden');

    if (appHeader) {
      if (isHome) {
        appHeader.classList.remove('hidden');
      } else {
        appHeader.classList.add('hidden');
      }
    }

    if (appFooter) {
      if (isHome) {
        appFooter.classList.remove('hidden');
      } else {
        appFooter.classList.add('hidden');
      }
    }

    if (mobileNav) {
      if (isHome) {
        mobileNav.classList.remove('hidden');
      } else {
        mobileNav.classList.add('hidden');
      }
    }

    // Render view yang sesuai
    if (this.views[viewId]) {
      this.views[viewId].render(mainContainer);
    }

    // Update active state di Top Navbar Desktop
    const navMap = {
      viewHome: 'topNavHome',
      viewKenaliBumi: 'topNavKenali',
      viewTamanAksi: 'topNavTamanAksi',
      viewMisiPahlawan: 'topNavMisi'
    };

    document.querySelectorAll('.top-nav-btn').forEach(btn => {
      btn.className = 'top-nav-btn flex items-center space-x-1.5 px-3.5 lg:px-4 py-2 rounded-full font-bold text-xs lg:text-sm text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-all tactile-btn';
    });

    const activeTopBtn = document.getElementById(navMap[viewId]);
    if (activeTopBtn) {
      activeTopBtn.className = 'top-nav-btn flex items-center space-x-1.5 px-3.5 lg:px-4 py-2 rounded-full font-bold text-xs lg:text-sm text-[#0284c7] bg-white shadow-xs transition-all tactile-btn';
    }

    // Fallback support untuk Sidebar jika masih ada
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

  setUserMode(mode) {
    sound.playPop();
    globalState.setUserMode(mode);
    if (this.currentViewId === 'viewHome' && this.views.viewHome) {
      const mainContainer = document.getElementById('mainViewport');
      if (mainContainer) {
        this.views.viewHome.render(mainContainer);
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  updateHeaderStats(state) {
    // Update active state Mode Switcher di Header (SD vs SMP)
    const isSD = (state.userMode !== 'smp');
    const btnSD = document.getElementById('btnModeSD');
    const btnSMP = document.getElementById('btnModeSMP');
    if (btnSD && btnSMP) {
      if (isSD) {
        btnSD.className = 'px-2.5 sm:px-3.5 lg:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all tactile-btn flex items-center space-x-1 sm:space-x-1.5 bg-[#fbbf24] text-slate-900 shadow-xs';
        btnSMP.className = 'px-2.5 sm:px-3.5 lg:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all tactile-btn flex items-center space-x-1 sm:space-x-1.5 text-slate-500 hover:text-slate-800';
      } else {
        btnSD.className = 'px-2.5 sm:px-3.5 lg:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all tactile-btn flex items-center space-x-1 sm:space-x-1.5 text-slate-500 hover:text-slate-800';
        btnSMP.className = 'px-2.5 sm:px-3.5 lg:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all tactile-btn flex items-center space-x-1 sm:space-x-1.5 bg-indigo-900 text-white shadow-xs';
      }
    }

    // Update Widget Gamifikasi di Header Kanan
    const headerPtsEl = document.getElementById('headerEcoPoints');
    if (headerPtsEl) headerPtsEl.textContent = state.ecoPoints;

    const headerLevelEl = document.getElementById('headerUserLevel');
    if (headerLevelEl) headerLevelEl.textContent = state.userLevel;

    const headerModeEl = document.getElementById('headerUserModeBadge');
    if (headerModeEl) {
      if (state.userMode === 'smp') {
        headerModeEl.textContent = 'SMP • Riset';
        headerModeEl.className = 'text-[9px] font-black tracking-wide text-indigo-800 bg-indigo-100/90 px-1.5 py-0.5 rounded leading-none inline-block';
      } else {
        headerModeEl.textContent = 'SD • Cilik';
        headerModeEl.className = 'text-[9px] font-black tracking-wide text-cyan-800 bg-cyan-100/80 px-1.5 py-0.5 rounded leading-none inline-block';
      }
    }

    // Fallback elemen lama (jika ada di komponen lain)
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
    // Tombol Navigasi Top Navbar Desktop
    document.getElementById('topNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('topNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('topNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('topNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));
    document.getElementById('topBrandLogo')?.addEventListener('click', () => this.switchView('viewHome'));

    // Mode Switcher Header (Target Belajar Siswa: SD vs SMP)
    document.getElementById('btnModeSD')?.addEventListener('click', () => {
      this.setUserMode('sd');
    });
    document.getElementById('btnModeSMP')?.addEventListener('click', () => {
      this.setUserMode('smp');
    });

    // WonderLearn Header Action Buttons
    document.getElementById('btnHeaderJoin')?.addEventListener('click', () => {
      sound.playFanfare();
      this.switchView('viewMisiPahlawan');
    });
    document.getElementById('btnHeaderLogin')?.addEventListener('click', () => {
      sound.playPop();
      document.getElementById('infoModal')?.classList.remove('hidden');
    });
    document.getElementById('btnNavSearch')?.addEventListener('click', () => {
      sound.playPop();
      SpeechHelper.speak('Ayo jelajahi topik iklim di bawah atau pilih game kesukaanmu!');
    });

    // Tombol Navigasi Footer
    document.getElementById('footerNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('footerNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('footerNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('footerNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));
    document.getElementById('footerBrandLogo')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('btnFooterTerraGreeting')?.addEventListener('click', () => this.speakTerraGreeting());
    document.getElementById('btnFooterInfoModal')?.addEventListener('click', () => {
      sound.playPop();
      document.getElementById('infoModal')?.classList.remove('hidden');
    });

    // Fallback Tombol Navigasi Desktop Sidebar (jika ada)
    document.getElementById('sideNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('sideNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('sideNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('sideNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));
    document.getElementById('sideBrandLogo')?.addEventListener('click', () => this.switchView('viewHome'));

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
