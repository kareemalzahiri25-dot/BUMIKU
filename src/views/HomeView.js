/**
 * HomeView.js
 * View untuk halaman beranda petualangan iklim BumiKita (SDGs 4 & 13)
 * Dirombak total mengadopsi WonderLearn Visual Design System:
 * - 3D Panoramic Fantasy Hero (Pohon Raksasa, Observatorium Awan, Balon Udara)
 * - Trust Bar Jaminan Belajar Ramah Anak
 * - Eksplorasi (Kenali Bumi, Pilih Aksimu, Bangun Kota Hijau, Misi dan Lencana)
 * - Tantangan Harian & Streak Api (Duolingo-style Streak Tracker, EXP Progres & 4 Daily Eco-Quests)
 */
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';

export class HomeView {
  constructor(appController) {
    this.appController = appController;
  }

  render(container) {
    const state = globalState.getState();
    const progressPct = globalState.getProgressPercent();

    container.innerHTML = `
      <section class="space-y-8 md:space-y-12">
        ${this.renderSdMode(state, progressPct)}
      </section>
    `;

    this.bindEvents(container);
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * RENDER TAMPILAN BERANDA (WONDERLEARN AESTHETIC - PENJELAJAH CILIK)
   */
  renderSdMode(state, progressPct) {
    return `
      <!-- ========================================================
           HERO SECTION: WONDERLEARN 3D PANORAMA OBSERVATORY
      ======================================================== -->
      <div class="relative overflow-hidden -mt-3 sm:-mt-5 md:-mt-8 -mx-3 sm:-mx-5 md:-mx-8 rounded-b-[36px] md:rounded-b-[48px] shadow-lg border-b border-sky-200/80 bg-[#bae6fd]">
        
        <!-- Background 3D Cinematic Panoramic Image (Full Aspect 1376x768 - No Bottom Cropping) -->
        <div class="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-0 md:aspect-[1376/768] overflow-hidden">
          <img 
            src="public/images/hero_bumikita_wonderlearn.png" 
            alt="BumiKita Sky Observatory" 
            class="w-full h-full object-cover object-[62%_top] sm:object-top filter saturate-105"
          />
          
          <!-- Soft Sky White Blend at top to seamlessly merge with moving clouds -->
          <div class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none z-10"></div>

          <!-- Soft Atmospheric Vignette for Headline Readability (Focused on upper sky, keeps bottom deck bright) -->
          <div class="absolute inset-0 bg-gradient-to-b from-sky-950/35 via-transparent to-transparent pointer-events-none"></div>

          <!-- Hero Text Overlay & CTA (Placed in upper sky & middle so characters and deck are fully visible) -->
          <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-3 sm:px-4 md:px-8 space-y-2.5 sm:space-y-4 md:space-y-5 z-10 pt-8 sm:pt-14 md:pt-16 lg:pt-20">
            
            <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-[0_4px_12px_rgba(15,23,42,0.45)] max-w-4xl">
              Biarkan Rasa Ingin Tahu <br class="hidden sm:inline" />
              <span class="text-[#fef08a] drop-shadow-[0_4px_12px_rgba(202,138,4,0.5)]">Memimpin Langkahmu!</span>
            </h1>

            <p class="text-xs sm:text-sm md:text-base font-semibold text-white drop-shadow-[0_2px_8px_rgba(15,23,42,0.6)] max-w-xl leading-relaxed px-2 sm:px-0">
              Dunia ajaib di mana belajar sains dan aksi iklim terasa seperti petualangan nyata! Ayo bergabung bersama para pahlawan cilik penjaga bumi.
            </p>

            <div class="pt-1 sm:pt-2 flex flex-wrap items-center justify-center gap-3">
              <!-- Golden Yellow Pill CTA (WonderLearn signature) -->
              <button id="btnHeroStart" class="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e293b] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm md:text-base flex items-center space-x-2 shadow-xl shadow-amber-500/30 tactile-btn border border-yellow-200">
                <span>Mulai Menjelajah</span>
                <span class="text-lg">✨</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <!-- ========================================================
           EKSPLORASI (4 Pintu Utama Modul Petualangan)
      ======================================================== -->
      <div class="space-y-5 pt-4">
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
              Eksplorasi
            </h3>
            <p class="text-xs font-semibold text-slate-400">Jelajahi modul petualangan iklim interaktif dan kumpulkan poin hijau!</p>
          </div>
        </div>

        <!-- 4 Exploration Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Kartu 1: Kenali Bumi -->
          <div id="cardExploreKenali" class="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center overflow-hidden border-b border-sky-100">
              <!-- Tempat gambar: ganti path src sesuai kebutuhan -->
              <img 
                src="public/images/characters/awa_standing.png" 
                alt="Kenali Bumi" 
                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-sky-600 transition-colors font-display">
                Kenali Bumi
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Pahami rahasia sains iklim, efek rumah kaca, dan atmosfer pelindung bumi.
              </p>
            </div>
          </div>

          <!-- Kartu 2: Pilih Aksimu -->
          <div id="cardExplorePilihAksi" class="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-amber-50 to-amber-200 flex items-center justify-center overflow-hidden border-b border-amber-100">
              <!-- Tempat gambar: ganti path src sesuai kebutuhan -->
              <img 
                src="public/images/characters/pila_holding_can.png" 
                alt="Pilih Aksimu" 
                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-amber-600 transition-colors font-display">
                Pilih Aksimu
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Lakukan aksi nyata memilah sampah, hemat listrik, dan gaya hidup ramah lingkungan.
              </p>
            </div>
          </div>

          <!-- Kartu 3: Bangun Kota Hijau -->
          <div id="cardExploreKotaHijau" class="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-emerald-50 to-emerald-200 flex items-center justify-center overflow-hidden border-b border-emerald-100">
              <!-- Tempat gambar: ganti path src sesuai kebutuhan -->
              <img 
                src="public/images/characters/tata_helmet_sprout.png" 
                alt="Bangun Kota Hijau" 
                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors font-display">
                Bangun Kota Hijau
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Rancang ruang terbuka hijau, tanam pohon, dan ciptakan lingkungan kota yang asri.
              </p>
            </div>
          </div>

          <!-- Kartu 4: Misi dan Lencana -->
          <div id="cardExploreMisi" class="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-purple-50 to-purple-200 flex items-center justify-center overflow-hidden border-b border-purple-100">
              <!-- Tempat gambar: ganti path src sesuai kebutuhan -->
              <img 
                src="public/images/characters/terra_happy.png" 
                alt="Misi dan Lencana" 
                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-purple-600 transition-colors font-display">
                Misi dan Lencana
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Selesaikan tantangan iklim harian, ikuti kuis seru, dan raih piala lencana pahlawan.
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- ========================================================
           TANTANGAN HARIAN & STREAK API (DAILY ECO-QUESTS)
      ======================================================== -->
      <div class="space-y-6 pt-4">
        
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider mb-1.5">
              <span>🔥</span>
              <span>Tantangan Harian & Streak Api</span>
            </div>
            <h3 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
              Tantangan Pahlawan Cilik
            </h3>
            <p class="text-xs font-semibold text-slate-500">
              Selesaikan misi nyata di rumah, jaga api streak-mu membara, dan raih EXP untuk naik level!
            </p>
          </div>
          <button id="btnOpenMisiPage" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 tactile-btn flex items-center space-x-2 self-start sm:self-auto shrink-0 transition-all">
            <span>Buka Lemari Misi & Lencana</span>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Duolingo-style Streak & EXP Level Progress Banner -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <!-- Streak Fire Card (Duolingo Style) -->
          <div class="md:col-span-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden flex flex-col justify-between">
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div class="flex items-start justify-between relative z-10">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner animate-pulse">
                  🔥
                </div>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-amber-100 block">Streak Harian</span>
                  <div class="text-2xl sm:text-3xl font-black font-display tracking-tight leading-none mt-0.5">
                    ${state.streakDays || 3} Hari Beruntun!
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/25 text-white backdrop-blur-xs">
                Membara ✨
              </span>
            </div>

            <p class="text-xs font-semibold text-amber-100 mt-3 relative z-10">
              Hebat! Kamu konsisten menjaga bumi. Jangan biarkan apimu padam hari ini!
            </p>

            <!-- 7-Day Flame Track -->
            <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between relative z-10">
              ${['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => {
                const isActive = (state.streakWeek && state.streakWeek[idx]) || idx < (state.streakDays || 3);
                return `
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full ${isActive ? 'bg-white text-orange-600 shadow-md font-black' : 'bg-white/15 text-white/50 border border-white/20 font-bold'} flex items-center justify-center text-xs transition-transform hover:scale-110">
                      ${isActive ? '🔥' : '·'}
                    </div>
                    <span class="text-[10px] font-bold ${isActive ? 'text-white' : 'text-amber-200/70'} mt-1">${day}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Level & EXP Progress Card -->
          <div class="md:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm flex flex-col justify-between">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-600 flex items-center justify-center text-2xl sm:text-3xl shadow-2xs border border-emerald-200">
                  🌱
                </div>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">Peringkat Pahlawan</span>
                  <h4 class="text-lg sm:text-xl font-black text-slate-800 font-display">
                    ${state.userLevel || 'Level 2: Sahabat Bumi'}
                  </h4>
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  ${state.ecoPoints} EXP
                </span>
              </div>
            </div>

            <!-- EXP Bar -->
            <div class="my-3 space-y-2">
              <div class="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Progres Menuju Level Berikutnya</span>
                <span class="text-emerald-700 font-black">${progressPct}%</span>
              </div>
              <div class="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 shadow-inner" style="width: ${progressPct}%"></div>
              </div>
              <p class="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                <span>${state.ecoPoints} / ${state.nextLevelPoints} Poin EXP</span>
                <span class="text-emerald-600 font-bold">+${Math.max(0, state.nextLevelPoints - state.ecoPoints)} EXP lagi</span>
              </p>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Selesaikan tantangan di bawah untuk panen EXP!</span>
              <span class="text-emerald-600 font-black">Level Cepat ⚡</span>
            </div>
          </div>

        </div>

        <!-- 4 Quick Quest Action Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Quest 1: Matikan Lampu -->
          <div class="bg-white rounded-3xl p-4 sm:p-5 border-2 ${globalState.isMissionCompleted('quest_lampu') ? 'border-emerald-200 bg-emerald-50/20' : 'border-amber-200/80'} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  💡
                </div>
                <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  +15 EXP • 🔥 +1
                </span>
              </div>
              <h5 class="text-sm font-extrabold text-slate-800 font-display">Matikan Lampu Siang</h5>
              <p class="text-xs font-semibold text-slate-500 mt-1">
                Matikan lampu belajar saat kamar sudah terang benderang oleh matahari.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100">
              ${globalState.isMissionCompleted('quest_lampu') 
                ? `<button disabled class="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center space-x-1 cursor-default">
                    <span>Selesai ✓</span>
                  </button>`
                : `<button id="btnQuestLampu" class="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs tactile-btn flex items-center justify-center space-x-1">
                    <span>Sudah Kulakukan! ⚡</span>
                  </button>`
              }
            </div>
          </div>

          <!-- Quest 2: Tutup Keran Air -->
          <div class="bg-white rounded-3xl p-4 sm:p-5 border-2 ${globalState.isMissionCompleted('quest_keran') ? 'border-emerald-200 bg-emerald-50/20' : 'border-sky-200/80'} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  💧
                </div>
                <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  +15 EXP • 🔥 +1
                </span>
              </div>
              <h5 class="text-sm font-extrabold text-slate-800 font-display">Tutup Rapat Keran Air</h5>
              <p class="text-xs font-semibold text-slate-500 mt-1">
                Pastikan keran wastafel terkunci rapat dan tidak ada tetesan air terbuang.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100">
              ${globalState.isMissionCompleted('quest_keran') 
                ? `<button disabled class="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center space-x-1 cursor-default">
                    <span>Selesai ✓</span>
                  </button>`
                : `<button id="btnQuestKeran" class="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-xs tactile-btn flex items-center justify-center space-x-1">
                    <span>Sudah Kulakukan! 💧</span>
                  </button>`
              }
            </div>
          </div>

          <!-- Quest 3: Botol Minum Tumbler -->
          <div class="bg-white rounded-3xl p-4 sm:p-5 border-2 ${globalState.isMissionCompleted('quest_tumbler') ? 'border-emerald-200 bg-emerald-50/20' : 'border-teal-200/80'} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  🥤
                </div>
                <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  +20 EXP • 🔥 +1
                </span>
              </div>
              <h5 class="text-sm font-extrabold text-slate-800 font-display">Gunakan Botol Tumbler</h5>
              <p class="text-xs font-semibold text-slate-500 mt-1">
                Gunakan botol minum isi ulang saat bermain untuk kurangi sampah plastik.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100">
              ${globalState.isMissionCompleted('quest_tumbler') 
                ? `<button disabled class="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center space-x-1 cursor-default">
                    <span>Selesai ✓</span>
                  </button>`
                : `<button id="btnQuestTumbler" class="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs tactile-btn flex items-center justify-center space-x-1">
                    <span>Sudah Kulakukan! 🥤</span>
                  </button>`
              }
            </div>
          </div>

          <!-- Quest 4: Kuis Pengetahuan Iklim -->
          <div class="bg-white rounded-3xl p-4 sm:p-5 border-2 border-purple-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  🧠
                </div>
                <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  +30 EXP • 🏆 Lencana
                </span>
              </div>
              <h5 class="text-sm font-extrabold text-slate-800 font-display">Tantangan Kuis Sains</h5>
              <p class="text-xs font-semibold text-slate-500 mt-1">
                Uji wawasan iklim bersama Awa & Terra dan buka piala lencana baru!
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100">
              <button id="btnQuestKuis" class="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs tactile-btn flex items-center justify-center space-x-1">
                <span>Mulai Kuis ⚡</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  /**
   * BIND EVENT LISTENERS UNTUK SELURUH ELEMEN INTERAKTIF
   */
  bindEvents(container) {
    // Hero CTA: Diarahkan ke Modul 1: Sains Kenali Bumi
    container.querySelector('#btnHeroStart')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    // Exploration Cards Navigation
    container.querySelector('#cardExploreKenali')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#cardExplorePilihAksi')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#cardExploreKotaHijau')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#cardExploreMisi')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    // Quick Quests & Streak Navigation
    container.querySelector('#btnOpenMisiPage')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    container.querySelector('#btnQuestKuis')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    // Interactive Quests Handler
    const handleQuestAction = (btnId, questId, expReward) => {
      const btn = container.querySelector(btnId);
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const success = globalState.completeMission(questId, expReward);
        if (success) {
          sound.playCelebration();
          if (typeof confetti === 'function') {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          }
          // Re-render view to refresh EXP, streak, and badges
          this.render(container);
        }
      });
    };

    handleQuestAction('#btnQuestLampu', 'quest_lampu', 15);
    handleQuestAction('#btnQuestKeran', 'quest_keran', 15);
    handleQuestAction('#btnQuestTumbler', 'quest_tumbler', 20);
  }

  /**
   * UPDATE STATUS DINAMIS JIKA DATA GLOBAL BERUBAH TANPA RE-RENDER TOTAL
   */
  updateStats(state) {
    // Hook pembaruan dinamis jika dibutuhkan di masa mendatang
  }
}
