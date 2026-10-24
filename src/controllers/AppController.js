/**
 * AppController.js
 * Koordinator utama aplikasi SPA BumiKita berbasis arsitektur MVC.
 * Mengatur routing navigasi view, sinkronisasi state global, dan inisialisasi aplikasi.
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
    // Render efek awan header dinamis
    this.renderAwanHeader();

    // Berlangganan perubahan globalState untuk update status secara reaktif
    globalState.subscribe(state => this.updateHeaderStats(state));

    // Render tampilan awal
    this.updateHeaderStats(globalState.getState());
    this.bindGlobalEvents();
    this.switchView('viewHome');
  }

  renderAwanHeader() {
    const POLA_VARIATIF_AWAN = [
      { w: 176, d: 28, s: 0.30 }, { w: 92, d: 15, s: 0.42 }, { w: 148, d: 23, s: 0.25 }, { w: 224, d: 33, s: 0.38 },
      { w: 108, d: 17, s: 0.22 }, { w: 184, d: 29, s: 0.33 }, { w: 76, d: 12, s: 0.45 }, { w: 156, d: 25, s: 0.27 },
      { w: 204, d: 32, s: 0.36 }, { w: 72, d: 13, s: 0.24 }
    ];
    let seg = '';
    for (const g of POLA_VARIATIF_AWAN) {
      const dep = Math.max(7, Math.round(g.d * 1));
      seg += 'c -' + Math.round(g.w * g.s) + ',' + dep + ' -' + Math.round(g.w * (1 - g.s)) + ',' + dep + ' -' + g.w + ',0 ';
    }
    const d = 'M0,0 L2880,0 L2880,6 ' + seg + seg + 'L0,0 Z';
    const el = document.getElementById('pAwan');
    if (el) el.setAttribute('d', d);
  }

  switchView(viewId) {
    sound.playPop();
    this.currentViewId = viewId;

    const mainContainer = document.getElementById('mainViewport');
    if (!mainContainer) return;

    const scrollContainer = document.getElementById('scrollViewport') || mainContainer;
    scrollContainer.scrollTop = 0;

    // Header, Footer, dan Mobile Bottom Bar hanya ditampilkan di Beranda (viewHome).
    // Saat membuka modul lain (Kenali Bumi, Taman Aksi, Misi), sembunyikan agar fokus dan menggunakan tombol kembali.
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
    // Sinkronkan status level pengguna di footer
    const footerLevelEl = document.getElementById('footerUserLevel');
    if (footerLevelEl) {
      footerLevelEl.textContent = state.userLevel;
    }

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

    // Tombol Navigasi Mobile
    document.getElementById('mobileNavHome')?.addEventListener('click', () => this.switchView('viewHome'));
    document.getElementById('mobileNavKenali')?.addEventListener('click', () => this.switchView('viewKenaliBumi'));
    document.getElementById('mobileNavTamanAksi')?.addEventListener('click', () => this.switchView('viewTamanAksi'));
    document.getElementById('mobileNavMisi')?.addEventListener('click', () => this.switchView('viewMisiPahlawan'));

    // Modal Info SDG 4 & 13
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
