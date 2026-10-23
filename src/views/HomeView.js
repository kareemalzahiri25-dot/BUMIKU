/**
 * HomeView.js
 * View untuk halaman beranda petualangan iklim BumiKita.
 * Menampilkan maskot Terra asli, banner edukasi SDG 4 & 13, serta pintu masuk modul belajar.
 */
export class HomeView {
  constructor(appController) {
    this.appController = appController;
  }

  render(container) {
    container.innerHTML = `
      <section class="space-y-6">

        <!-- HERO BANNER DENGAN MASKOT TERRA ASLI -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-50 to-sky-100 p-6 lg:p-8 border border-emerald-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="relative z-10 max-w-xl space-y-3 text-center md:text-left">
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/95 text-xs font-black text-emerald-800 shadow-xs">
                <span>🌍</span>
                <span>SDG 13: Aksi Penanganan Iklim</span>
              </span>
              <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-teal-100/90 text-[11px] font-black text-teal-900">
                <span>📚</span>
                <span>SDG 4: Edukasi Inovatif 5–15 Tahun</span>
              </span>
            </div>

            <h2 class="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Selamatkan Rumah Kita: Bumi Sedang Demam!
            </h2>
            <p class="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
              Tahukah kamu? Suhu bumi terus naik karena polusi asap, sampah plastik, dan pohon yang ditebang. 
              Ayo pelajari rahasia sainsnya bersama para sahabat pahlawan, lalu bersihkan dan bangun taman kota impianmu!
            </p>

            <div class="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button id="btnHeroStart" class="bg-[#0097a7] hover:bg-[#00838f] text-white px-6 py-3 rounded-full font-black text-xs md:text-sm flex items-center space-x-2 shadow-md shadow-cyan-900/15 tactile-btn transition-transform active:scale-95">
                <span>Mulai Simulasi Taman Hijau</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
              <button id="btnHeroTerraVoice" class="bg-white/90 hover:bg-white text-slate-700 px-4 py-3 rounded-full font-bold text-xs md:text-sm flex items-center space-x-2 tactile-btn border border-slate-200">
                <i data-lucide="volume-2" class="w-4 h-4 text-emerald-600"></i>
                <span>Sapaan Suara Terra</span>
              </button>
            </div>
          </div>

          <!-- MASKOT TERRA DARI INDIVIDUAL SPRITE -->
          <div class="relative w-44 h-44 lg:w-56 lg:h-56 shrink-0 flex items-center justify-center">
            <div class="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/80 backdrop-blur-xs p-3 shadow-xl border-4 border-emerald-200 flex items-center justify-center overflow-hidden animate-gentle-bounce">
              <img src="public/images/characters/terra_waving.png" alt="Maskot Terra Bumi" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div class="absolute -bottom-1 bg-white/95 px-3 py-1 rounded-full text-[11px] font-black text-emerald-800 shadow-md border border-emerald-200 flex items-center space-x-1">
              <span>🌱 Terra si Bumi</span>
            </div>
          </div>
        </div>

        <!-- 3 PINTU UTAMA MODUL PEMBELAJARAN INTERAKTIF -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-emerald-500 text-lg">✦</span>
              <h3 class="text-lg font-black text-slate-800 tracking-tight">Jelajahi Misi Penjaga Bumi</h3>
            </div>
            <span class="text-xs font-bold text-slate-400">Pilih modul pembelajaran favoritmu</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <!-- 1. KENALI BUMI BERSAMA AWA -->
            <div id="cardKenaliBumi" class="bg-[#e0f7fa] hover:bg-[#b2ebf2] rounded-3xl p-5 flex flex-col justify-between cursor-pointer border border-cyan-200 hover:shadow-lg transition-all duration-200 tactile-btn group">
              <div class="flex items-start justify-between">
                <div class="w-14 h-14 rounded-2xl bg-white shadow-xs overflow-hidden p-1 flex items-center justify-center">
                  <img src="public/images/characters/awa_waving.png" alt="Awa Awan" class="w-full h-full object-contain" />
                </div>
                <span class="text-[10px] font-black text-cyan-800 bg-cyan-200/80 px-2.5 py-1 rounded-full">Modul 1: Sains</span>
              </div>
              <div class="my-3">
                <h4 class="text-base font-black text-slate-800 group-hover:text-[#00838f] transition-colors">1. Kenali Bumi</h4>
                <p class="text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
                  Eksperimen interaktif ketebalan selimut atmosfer, gas rumah kaca, dan mengapa es kutub mencair bersama Awa.
                </p>
              </div>
              <div class="flex items-center space-x-1 text-xs font-black text-cyan-900">
                <span>Mulai Eksperimen Sains</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </div>
            </div>

            <!-- 2. TAMAN AKSI HIJAU (GABUNGAN FITUR UTAMA) -->
            <div id="cardTamanAksi" class="bg-gradient-to-br from-[#e8f8f5] to-[#d1fae5] hover:to-[#a7f3d0] rounded-3xl p-5 flex flex-col justify-between cursor-pointer border-2 border-emerald-300 hover:shadow-lg transition-all duration-200 tactile-btn relative overflow-hidden group">
              <span class="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl shadow-xs">
                ⭐ Game Utama
              </span>
              <div class="flex items-start justify-between">
                <div class="flex -space-x-2">
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-xs overflow-hidden p-1 border-2 border-white">
                    <img src="public/images/characters/pila_lid_open_yay.png" alt="Pila" class="w-full h-full object-contain" />
                  </div>
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-xs overflow-hidden p-1 border-2 border-white">
                    <img src="public/images/characters/tata_helmet_sprout.png" alt="Tata" class="w-full h-full object-contain" />
                  </div>
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-xs overflow-hidden p-1 border-2 border-white">
                    <img src="public/images/characters/nala_floating_joy.png" alt="Nala" class="w-full h-full object-contain" />
                  </div>
                </div>
                <span class="text-[10px] font-black text-emerald-900 bg-emerald-200/90 px-2.5 py-1 rounded-full mt-4">Simulasi Interaktif</span>
              </div>
              <div class="my-3">
                <h4 class="text-base font-black text-slate-900 group-hover:text-emerald-800 transition-colors">2. Taman Aksi Hijau</h4>
                <p class="text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
                  Pungut sampah, ganti kendaraan berasap dengan sepeda, dan tanam pohon hingga taman bersih 100%!
                </p>
              </div>
              <div class="flex items-center space-x-1 text-xs font-black text-emerald-800">
                <span>Masuk ke Arena Taman</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </div>
            </div>

            <!-- 3. MISI & LENCANA IKHLAS -->
            <div id="cardMisiPahlawan" class="bg-[#fff3e0] hover:bg-[#ffe0b2] rounded-3xl p-5 flex flex-col justify-between cursor-pointer border border-orange-200 hover:shadow-lg transition-all duration-200 tactile-btn group">
              <div class="flex items-start justify-between">
                <div class="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl">
                  🏆
                </div>
                <span class="text-[10px] font-black text-orange-900 bg-orange-200/80 px-2.5 py-1 rounded-full">Modul 3: Evaluasi</span>
              </div>
              <div class="my-3">
                <h4 class="text-base font-black text-slate-800 group-hover:text-orange-900 transition-colors">3. Misi & Lencana</h4>
                <p class="text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
                  Uji pemahamanmu lewat Kuis Pahlawan Iklim, kumpulkan lencana SDG 13, dan pantau prestasimu di sini!
                </p>
              </div>
              <div class="flex items-center space-x-1 text-xs font-black text-orange-900">
                <span>Buka Lemari Lencana</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </div>
            </div>

          </div>
        </div>

        <!-- DUA KARTU PENDUKUNG: TANTANGAN KILAT & INDIKATOR DAMPAK -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div id="quickChallengeBanner" class="lg:col-span-2 rounded-3xl bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 p-6 border border-emerald-200 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all tactile-btn">
            <div class="space-y-2 max-w-md">
              <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-200/90 text-emerald-950 font-black text-xs">
                <span>💡</span>
                <span>Tantangan Aksi Cepat Harian</span>
              </div>
              <h4 class="text-lg md:text-xl font-black text-slate-900 leading-tight">Kamarmu Terang tapi Sedang Kosong?</h4>
              <p class="text-xs md:text-sm font-semibold text-slate-600">
                Mematikan lampu dan kipas angin saat ke luar kamar bisa menghemat 15% energi dan mendinginkan suhu bumi kita!
              </p>
              <div class="pt-2">
                <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs shadow-sm flex items-center space-x-2">
                  <span>Mulai Aksi di Taman (+25 🌿)</span>
                  <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>

            <div class="w-24 h-24 lg:w-32 lg:h-32 shrink-0 flex items-center justify-center p-1">
              <img src="public/images/characters/nala_sleeping_plug.png" alt="Nala" class="w-full h-full object-contain animate-gentle-bounce filter drop-shadow-md" />
            </div>
          </div>

          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-black text-slate-800">Dampak Aksi Nyatamu</h4>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Real-Time</span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                <span class="flex items-center space-x-1.5">
                  <span>📉</span>
                  <span>CO₂ Berhasil Dicegah:</span>
                </span>
                <span id="homeCo2Saved" class="text-emerald-700 font-black">2.4 kg</span>
              </div>
              <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                <span class="flex items-center space-x-1.5">
                  <span>🌿</span>
                  <span>Total Poin Hijau:</span>
                </span>
                <span id="homePoints" class="text-cyan-700 font-black">160 Poin</span>
              </div>
              <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                <span class="flex items-center space-x-1.5">
                  <span>🌳</span>
                  <span>Pohon & Alam Terawat:</span>
                </span>
                <span id="homeTrees" class="text-emerald-600 font-black">4 Titik Asri</span>
              </div>
            </div>

            <button id="btnGoToTamanDirect" class="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-xs tactile-btn border border-emerald-200 flex items-center justify-center space-x-1">
              <span>Buka Game Taman Aksi Hijau →</span>
            </button>
          </div>

        </div>

      </section>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    container.querySelector('#btnHeroStart')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#btnHeroTerraVoice')?.addEventListener('click', () => {
      this.appController.speakTerraGreeting();
    });

    container.querySelector('#cardKenaliBumi')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#cardTamanAksi')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#cardMisiPahlawan')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    container.querySelector('#quickChallengeBanner')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#btnGoToTamanDirect')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });
  }

  updateStats(state) {
    const co2El = document.getElementById('homeCo2Saved');
    if (co2El) co2El.textContent = `${state.co2SavedKg} kg`;

    const ptsEl = document.getElementById('homePoints');
    if (ptsEl) ptsEl.textContent = `${state.ecoPoints} Poin`;

    const treesEl = document.getElementById('homeTrees');
    if (treesEl) treesEl.textContent = `${state.treesCount} Titik Asri`;
  }
}
