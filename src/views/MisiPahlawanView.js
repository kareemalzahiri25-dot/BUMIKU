/**
 * MisiPahlawanView.js
 * View untuk modul 3: Misi & Lemari Lencana Pahlawan Iklim (SDG 4 & 13).
 * Dilengkapi Duolingo-style Streak Tracker, EXP & Level Progress HUD, serta Quest Harian Interaktif.
 */
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';

export class MisiPahlawanView {
  constructor(quizController, appController) {
    this.quizController = quizController;
    this.appController = appController;
  }

  render(container) {
    const state = globalState.getState();
    const progressPct = globalState.getProgressPercent();

    container.innerHTML = `
      <section class="space-y-6">

        <!-- HERO TROPHY VAULT BANNER -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 lg:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center space-x-4">
            <button id="btnBackHomeFromMisi" class="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-xs tactile-btn shrink-0" title="Kembali ke Beranda">
              <i data-lucide="arrow-left" class="w-5 h-5"></i>
            </button>
            <div class="space-y-1 text-left">
              <span class="text-xs font-black uppercase tracking-wider text-emerald-200">Prestasi SDG 13 & SDG 4</span>
              <div class="flex items-center space-x-2 sm:space-x-3">
                <span class="text-2xl sm:text-3xl lg:text-4xl">🏆</span>
                <span class="text-lg sm:text-2xl lg:text-3xl font-black">Lemari Lencana Penjaga Bumi</span>
              </div>
              <p class="text-xs md:text-sm font-semibold text-emerald-100 max-w-xl">
                Kumpulkan piala penghargaan dengan menyelesaikan simulasi di Taman Aksi Hijau dan menjawab kuis sains iklim!
              </p>
            </div>
          </div>

          <button id="btnStartClimateQuiz" class="bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg tactile-btn flex items-center space-x-2 shrink-0">
            <span>Ikuti Kuis Iklim (+30 🌿)</span>
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
          </button>
        </div>

        <!-- STREAK & LEVEL PROGRESS HUD (Duolingo Style) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <!-- 7-Day Flame Streak Card -->
          <div class="md:col-span-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden flex flex-col justify-between">
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div class="flex items-start justify-between relative z-10">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner animate-pulse">
                  🔥
                </div>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-amber-100 block">Streak Harian Pahlawan</span>
                  <div class="text-2xl sm:text-3xl font-black font-display tracking-tight leading-none mt-0.5">
                    ${state.streakDays || 3} Hari Beruntun!
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-black px-3 py-1 rounded-full bg-white/25 text-white backdrop-blur-xs">
                Status: Membara ✨
              </span>
            </div>

            <p class="text-xs font-semibold text-amber-100 mt-3 relative z-10">
              Hebat! Pertahankan rantai aksimu setiap hari agar api pelindung iklim tidak padam.
            </p>

            <!-- 7-Day Flame Calendar -->
            <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between relative z-10">
              ${['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => {
                const isActive = (state.streakWeek && state.streakWeek[idx]) || idx < (state.streakDays || 3);
                return `
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full ${isActive ? 'bg-white text-orange-600 shadow-md font-black scale-105 ring-2 ring-amber-300' : 'bg-white/15 text-white/50 border border-white/20 font-bold'} flex items-center justify-center text-xs transition-transform hover:scale-110">
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
                  <span class="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">Status Level Pemain</span>
                  <h4 class="text-lg sm:text-xl font-black text-slate-800 font-display">
                    ${state.userLevel || 'Level 2: Sahabat Bumi'}
                  </h4>
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  ${state.ecoPoints} EXP Terkumpul
                </span>
              </div>
            </div>

            <!-- EXP Bar -->
            <div class="my-3 space-y-2">
              <div class="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Progres EXP Menuju Naik Peringkat</span>
                <span class="text-emerald-700 font-black">${progressPct}%</span>
              </div>
              <div class="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 shadow-inner" style="width: ${progressPct}%"></div>
              </div>
              <p class="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                <span>Target: ${state.nextLevelPoints} EXP</span>
                <span class="text-emerald-600 font-bold">+${Math.max(0, state.nextLevelPoints - state.ecoPoints)} EXP lagi</span>
              </p>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Selesaikan tantangan harian untuk naik level!</span>
              <span class="text-emerald-600 font-black">Level Up 🚀</span>
            </div>
          </div>

        </div>

        <!-- DAFTAR LENCANA DI LEMARI -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-amber-500 text-lg">✦</span>
              <h4 class="text-sm md:text-base font-black text-slate-800">Koleksi Lencana Pahlawan Cilik</h4>
            </div>
            <span id="badgeVaultStats" class="text-xs font-bold text-slate-400">3 dari 5 Lencana Terbuka</span>
          </div>

          <div id="badgesGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Dynamically populated via JavaScript -->
          </div>
        </div>

        <!-- MISI AKTIF HARIAN -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-black text-slate-800">Misi Harian Pahlawan Berkelanjutan</h4>
              <p class="text-xs font-semibold text-slate-400">Selesaikan aksi nyata untuk panen EXP dan perpanjang streak apimu</p>
            </div>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Reset Tiap Hari</span>
          </div>

          <div class="space-y-3">
            <!-- Misi 1: Matikan Lampu -->
            <div class="p-4 rounded-2xl ${globalState.isMissionCompleted('quest_lampu') ? 'bg-emerald-50/60 border-emerald-200/80' : 'bg-slate-50/80 border-slate-200/80'} border flex items-center justify-between transition-all">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                  ⚡
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h5 class="text-xs font-black text-slate-800">Misi Hemat Energi Rumah</h5>
                    <span class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+15 EXP</span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500">Matikan lampu belajar saat meninggalkan kamar tidur</p>
                </div>
              </div>
              ${globalState.isMissionCompleted('quest_lampu')
                ? `<span class="text-xs font-black text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full flex items-center space-x-1">
                    <span>Selesai</span>
                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                  </span>`
                : `<button id="btnMisiPageLampu" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-black text-xs tactile-btn shadow-xs">
                    Lakukan ⚡
                  </button>`
              }
            </div>

            <!-- Misi 2: Tutup Keran Air -->
            <div class="p-4 rounded-2xl ${globalState.isMissionCompleted('quest_keran') ? 'bg-emerald-50/60 border-emerald-200/80' : 'bg-slate-50/80 border-slate-200/80'} border flex items-center justify-between transition-all">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl font-bold">
                  💧
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h5 class="text-xs font-black text-slate-800">Misi Hemat Air Bersih</h5>
                    <span class="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">+15 EXP</span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500">Kunci rapat keran wastafel agar air tidak bocor</p>
                </div>
              </div>
              ${globalState.isMissionCompleted('quest_keran')
                ? `<span class="text-xs font-black text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full flex items-center space-x-1">
                    <span>Selesai</span>
                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                  </span>`
                : `<button id="btnMisiPageKeran" class="px-4 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-black text-xs tactile-btn shadow-xs">
                    Lakukan 💧
                  </button>`
              }
            </div>

            <!-- Misi 3: Botol Tumbler -->
            <div class="p-4 rounded-2xl ${globalState.isMissionCompleted('quest_tumbler') ? 'bg-emerald-50/60 border-emerald-200/80' : 'bg-slate-50/80 border-slate-200/80'} border flex items-center justify-between transition-all">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold">
                  🥤
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h5 class="text-xs font-black text-slate-800">Misi Kurangi Sampah Plastik</h5>
                    <span class="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">+20 EXP</span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500">Gunakan botol tumbler isi ulang saat beraktivitas</p>
                </div>
              </div>
              ${globalState.isMissionCompleted('quest_tumbler')
                ? `<span class="text-xs font-black text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full flex items-center space-x-1">
                    <span>Selesai</span>
                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                  </span>`
                : `<button id="btnMisiPageTumbler" class="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-black text-xs tactile-btn shadow-xs">
                    Lakukan 🥤
                  </button>`
              }
            </div>

            <!-- Misi 4: Bersih Taman -->
            <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                  🌳
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h5 class="text-xs font-black text-slate-800">Misi Bersih Taman Kota</h5>
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+25 EXP</span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500">Capai 100% target kebersihan di game Taman Aksi Hijau</p>
                </div>
              </div>
              <button id="btnQuestGoTaman" class="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-black text-xs tactile-btn">
                Mainkan 🎮
              </button>
            </div>

            <!-- Misi 5: Kuis Sains -->
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                  📚
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h5 class="text-xs font-black text-slate-800">Misi Cerdas Sains Iklim</h5>
                    <span class="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">+30 EXP</span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500">Jawab kuis iklim dengan benar bersama Awa & Terra</p>
                </div>
              </div>
              <button id="btnQuestStartQuiz" class="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-black text-xs tactile-btn">
                Mulai Kuis ⚡
              </button>
            </div>
          </div>
        </div>

        <!-- MODAL KUIS IKLIM -->
        <div id="quizModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center space-x-2">
                <span class="text-2xl">🌱</span>
                <h3 class="text-base font-black text-slate-800">Kuis Pahlawan Iklim (SDG 13)</h3>
              </div>
              <button id="btnCloseQuizModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center tactile-btn">
                ✕
              </button>
            </div>

            <div class="space-y-3">
              <span id="quizNumberBadge" class="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Soal 1 dari 3
              </span>
              <h4 id="quizQuestionText" class="text-sm md:text-base font-black text-slate-900 leading-snug">
                <!-- Question -->
              </h4>
            </div>

            <div id="quizOptionsList" class="space-y-2">
              <!-- Options rendered dynamically -->
            </div>

            <div id="quizResultMsg" class="hidden text-xs font-bold p-3 rounded-2xl">
              <!-- Feedback message -->
            </div>
          </div>
        </div>

      </section>
    `;

    this.bindEvents(container);
    this.renderBadges();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  bindEvents(container) {
    container.querySelector('#btnBackHomeFromMisi')?.addEventListener('click', () => {
      this.appController.switchView('viewHome');
    });

    container.querySelector('#btnStartClimateQuiz')?.addEventListener('click', () => {
      this.quizController.startQuiz();
    });

    container.querySelector('#btnQuestStartQuiz')?.addEventListener('click', () => {
      this.quizController.startQuiz();
    });

    container.querySelector('#btnQuestGoTaman')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#btnCloseQuizModal')?.addEventListener('click', () => {
      this.quizController.closeQuiz();
    });

    // Event listeners untuk menyelesaikan misi harian di halaman Misi
    const handleMissionAction = (btnId, missionId, expReward) => {
      const btn = container.querySelector(btnId);
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const success = globalState.completeMission(missionId, expReward);
        if (success) {
          sound.playCelebration();
          if (typeof confetti === 'function') {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          }
          this.render(container);
        }
      });
    };

    handleMissionAction('#btnMisiPageLampu', 'quest_lampu', 15);
    handleMissionAction('#btnMisiPageKeran', 'quest_keran', 15);
    handleMissionAction('#btnMisiPageTumbler', 'quest_tumbler', 20);
  }

  renderBadges() {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;

    const allBadges = this.quizController.getAllBadges();
    const unlockedIds = this.quizController.getUnlockedBadgeIds();

    grid.innerHTML = '';
    allBadges.forEach(b => {
      const isUnlocked = unlockedIds.includes(b.id);
      const card = document.createElement('div');
      card.className = `p-5 rounded-3xl border transition-all duration-200 ${
        isUnlocked 
          ? 'bg-white border-slate-200 shadow-sm' 
          : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
      }`;

      card.innerHTML = `
        <div class="flex items-start justify-between">
          <div class="w-14 h-14 rounded-2xl ${isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-400'} flex items-center justify-center text-3xl shadow-xs">
            ${b.icon}
          </div>
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full ${isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}">
            ${isUnlocked ? 'Terbuka ✓' : 'Terkunci 🔒'}
          </span>
        </div>
        <div class="mt-3">
          <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">${b.category}</span>
          <h5 class="text-sm font-black text-slate-800">${b.name}</h5>
          <p class="text-xs font-semibold text-slate-500 mt-1">${b.desc}</p>
        </div>
      `;

      grid.appendChild(card);
    });

    const stats = document.getElementById('badgeVaultStats');
    if (stats) {
      stats.textContent = `${unlockedIds.length} dari ${allBadges.length} Lencana Terbuka`;
    }
  }
}
