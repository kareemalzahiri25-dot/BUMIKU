/**
 * MisiPahlawanView.js
 * View untuk modul 3: Misi & Lemari Lencana Pahlawan Iklim (SDG 4 & 13).
 */
export class MisiPahlawanView {
  constructor(quizController, appController) {
    this.quizController = quizController;
    this.appController = appController;
  }

  render(container) {
    container.innerHTML = `
      <section class="space-y-6">

        <!-- HERO TROPHY VAULT BANNER -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 lg:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-left">
            <span class="text-xs font-black uppercase tracking-wider text-emerald-200">Prestasi SDG 13 & SDG 4</span>
            <div class="flex items-center justify-center md:justify-start space-x-3">
              <span class="text-4xl">🏆</span>
              <span class="text-2xl lg:text-3xl font-black">Lemari Lencana Penjaga Bumi</span>
            </div>
            <p class="text-xs md:text-sm font-semibold text-emerald-100 max-w-xl">
              Kumpulkan piala penghargaan dengan menyelesaikan simulasi di Taman Aksi Hijau dan menjawab kuis sains iklim!
            </p>
          </div>

          <button id="btnStartClimateQuiz" class="bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg tactile-btn flex items-center space-x-2 shrink-0">
            <span>Ikuti Kuis Iklim (+30 🌿)</span>
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
          </button>
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
            <h4 class="text-sm font-black text-slate-800">Misi Harian Pahlawan Berkelanjutan</h4>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Reset Tiap Hari</span>
          </div>

          <div class="space-y-3">
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">⚡</span>
                <div>
                  <h5 class="text-xs font-black text-slate-800">Misi Hemat Energi Rumah</h5>
                  <p class="text-[11px] font-semibold text-slate-500">Matikan lampu belajar saat meninggalkan kamar tidur</p>
                </div>
              </div>
              <span class="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Selesai ✓</span>
            </div>

            <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">🌳</span>
                <div>
                  <h5 class="text-xs font-black text-slate-800">Misi Bersih Taman Kota</h5>
                  <p class="text-[11px] font-semibold text-slate-500">Capai 100% target kebersihan di game Taman Aksi Hijau</p>
                </div>
              </div>
              <button id="btnQuestGoTaman" class="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-black text-xs tactile-btn">
                Mainkan 🎮
              </button>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📚</span>
                <div>
                  <h5 class="text-xs font-black text-slate-800">Misi Cerdas Sains Iklim</h5>
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
  }

  bindEvents(container) {
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
