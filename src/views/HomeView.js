/**
 * HomeView.js
 * View untuk halaman beranda petualangan iklim BumiKita (SDGs 4 & 13)
 * Dirombak total mengadopsi WonderLearn Visual Design System:
 * - 3D Panoramic Fantasy Hero (Pohon Raksasa, Observatorium Awan, Balon Udara)
 * - Trust Bar Jaminan Belajar Ramah Anak
 * - Explore by Topic (6 Kartu Squircle Pastel diapit Maskot Awa & Plang Kayu Penunjuk)
 * - Magical Stories (Kisah Dongeng Bumi)
 * - Play & Learn (5 Game Aksi Iklim Interaktif)
 * - Featured Adventure Bento (Pulau Harapan Melayang)
 * - Loved by Parents & Teachers (Testimoni Bintang 5)
 */
import { globalState } from '../models/StateModel.js';

export class HomeView {
  constructor(appController) {
    this.appController = appController;
  }

  render(container) {
    const state = globalState.getState();
    const isSD = (state.userMode !== 'smp');
    const progressPct = globalState.getProgressPercent();

    container.innerHTML = `
      <section class="space-y-8 md:space-y-12">
        ${isSD ? this.renderSdMode(state, progressPct) : this.renderSmpMode(state, progressPct)}
      </section>
    `;

    this.bindEvents(container);
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * RENDER TAMPILAN MODE SD (WONDERLEARN AESTHETIC - PENJELAJAH CILIK)
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
           EXPLORE BY TOPIC (WonderLearn Pastel Squircles + Awa Mascot)
      ======================================================== -->
      <div class="space-y-6 pt-4 sm:pt-6">
        
        <div class="text-center space-y-1">
          <div class="inline-flex items-center space-x-2 text-amber-500 font-extrabold text-xs uppercase tracking-widest">
            <span>✦</span>
            <span>Topik Pembelajaran Iklim</span>
            <span>✦</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
            Jelajah Berdasarkan Topik
          </h2>
        </div>

        <!-- 3-Column Layout: Mascot Awa on Left, 6 Topic Cards in Center, Signpost on Right -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <!-- LEFT: 3D Mascot Awa si Awan Sarjana -->
          <div class="hidden lg:flex lg:col-span-3 flex-col items-center text-center space-y-3">
            <div class="relative w-44 h-44 animate-float-wiggle">
              <img 
                src="public/images/characters/awa_professor_book.png" 
                alt="Profesor Awa" 
                class="w-full h-full object-contain filter drop-shadow-xl"
              />
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[11px] font-black text-sky-700 shadow border border-sky-200 whitespace-nowrap">
                ☁️ Profesor Awa
              </span>
            </div>
            <p class="text-xs font-bold text-slate-500 max-w-[180px] leading-tight bg-white/80 p-2.5 rounded-2xl border border-sky-100 shadow-2xs">
              "Pilih modul iklim favoritmu dan mulai kumpulkan poin hijau!"
            </p>
          </div>

          <!-- CENTER: 6 Squircle Topic Cards -->
          <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            
            <!-- 1. Rahasia Iklim -->
            <div id="topicRahasiaIklim" class="bg-[#fef3c7] hover:bg-[#fde68a] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-amber-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                ☀️
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-amber-950 font-display">Rahasia Iklim</h4>
                <p class="text-[10px] font-bold text-amber-800/80 mt-0.5">Suhu & Pemanasan</p>
              </div>
            </div>

            <!-- 2. Lab Udara (Atmosfer) -->
            <div id="topicLabUdara" class="bg-[#e0f2fe] hover:bg-[#bae6fd] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-sky-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                🧪
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-sky-950 font-display">Lab Udara</h4>
                <p class="text-[10px] font-bold text-sky-800/80 mt-0.5">Selimut Gas Awan</p>
              </div>
            </div>

            <!-- 3. Pilah Sampah Pila -->
            <div id="topicPilahSampah" class="bg-[#dcfce7] hover:bg-[#bbf7d0] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-emerald-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                ♻️
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-emerald-950 font-display">Pilah Sampah</h4>
                <p class="text-[10px] font-bold text-emerald-800/80 mt-0.5">3 Wadah Pila</p>
              </div>
            </div>

            <!-- 4. Studio Energi Nala -->
            <div id="topicEnergiBersih" class="bg-[#fce7f3] hover:bg-[#fbcfe8] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-pink-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                💡
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-pink-950 font-display">Studio Energi</h4>
                <p class="text-[10px] font-bold text-pink-800/80 mt-0.5">Hemat Listrik & Air</p>
              </div>
            </div>

            <!-- 5. Taman Kota Hijau Tata -->
            <div id="topicKotaHijau" class="bg-[#ffedd5] hover:bg-[#fed7aa] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-orange-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                🌳
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-orange-950 font-display">Taman Kota Asri</h4>
                <p class="text-[10px] font-bold text-orange-800/80 mt-0.5">Arsitektur Tata</p>
              </div>
            </div>

            <!-- 6. Misi Pahlawan Cilik -->
            <div id="topicMisiCilik" class="bg-[#ede9fe] hover:bg-[#ddd6fe] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-purple-200/90 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all tactile-btn cursor-pointer min-h-[135px] sm:min-h-[145px] group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 shadow-2xs flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                🏆
              </div>
              <div class="mt-1.5 sm:mt-2">
                <h4 class="text-xs sm:text-sm font-extrabold text-purple-950 font-display">Misi Pahlawan</h4>
                <p class="text-[10px] font-bold text-purple-800/80 mt-0.5">Kuis & Lencana</p>
              </div>
            </div>

          </div>

          <!-- RIGHT: Directional Signpost & Mini Guide -->
          <div class="hidden lg:flex lg:col-span-2 flex-col items-center justify-center space-y-3">
            <div class="bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 text-white p-3 rounded-2xl shadow-lg border-2 border-amber-600 text-center space-y-2 w-full max-w-[150px]">
              <div class="text-xl animate-gentle-bounce">🐦</div>
              <div class="space-y-1 text-[11px] font-black uppercase tracking-wider">
                <div class="bg-amber-600/90 py-1 px-2 rounded-lg shadow-xs">Jelajah</div>
                <div class="bg-amber-500/90 py-1 px-2 rounded-lg shadow-xs">Belajar</div>
                <div class="bg-emerald-600/90 py-1 px-2 rounded-lg shadow-xs">Aksi Nyata</div>
              </div>
            </div>
            <span class="text-[10px] font-bold text-slate-400">Petunjuk Arah</span>
          </div>

        </div>

      </div>

      <!-- ========================================================
           MAGICAL STORIES (Dongeng & Cerita Inspiratif Iklim)
      ======================================================== -->
      <div class="space-y-5 pt-4">
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
              Kisah & Dongeng Bumi
            </h3>
            <p class="text-xs font-semibold text-slate-400">Cerita bergambar inspiratif seputar cinta lingkungan</p>
          </div>
          <button id="btnViewAllStories" class="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 text-sky-700 font-extrabold text-xs border border-sky-200 shadow-2xs tactile-btn flex items-center space-x-1">
            <span>Lihat Semua Cerita</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- 4 Story Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Story 1 -->
          <div class="story-card bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-indigo-900 to-sky-700 flex items-center justify-center overflow-hidden">
              <span class="text-5xl group-hover:scale-110 transition-transform">🎈</span>
              <span class="absolute top-2.5 left-2.5 bg-sky-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Persahabatan
              </span>
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-sky-600 transition-colors font-display">
                Balon Udara Bintang
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Nala dan kawan-kawan berlayar di langit malam mencari energi angin terbersih.
              </p>
            </div>
          </div>

          <!-- Story 2 -->
          <div class="story-card bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-purple-900 to-indigo-700 flex items-center justify-center overflow-hidden">
              <span class="text-5xl group-hover:scale-110 transition-transform">🌙</span>
              <span class="absolute top-2.5 left-2.5 bg-purple-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Fantasi Sains
              </span>
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-purple-600 transition-colors font-display">
                Luna & Selimut Awan
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Awa membagikan rahasia bagaimana atmosfer melindungi bumi dari panas matahari.
              </p>
            </div>
          </div>

          <!-- Story 3 -->
          <div class="story-card bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-teal-800 to-emerald-600 flex items-center justify-center overflow-hidden">
              <span class="text-5xl group-hover:scale-110 transition-transform">⛵</span>
              <span class="absolute top-2.5 left-2.5 bg-teal-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Petualangan
              </span>
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-teal-600 transition-colors font-display">
                Pelaut Cilik Terumbu
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Menyelam menjaga rumah ikan dan terumbu karang dari air laut yang kian hangat.
              </p>
            </div>
          </div>

          <!-- Story 4 -->
          <div class="story-card bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-[16/10] bg-gradient-to-tr from-amber-700 to-rose-600 flex items-center justify-center overflow-hidden">
              <span class="text-5xl group-hover:scale-110 transition-transform">🌺</span>
              <span class="absolute top-2.5 left-2.5 bg-rose-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Kebaikan
              </span>
            </div>
            <div class="p-4 space-y-1">
              <h4 class="text-sm font-extrabold text-slate-800 group-hover:text-rose-600 transition-colors font-display">
                Taman Rahasia Pahlawan
              </h4>
              <p class="text-[11px] font-semibold text-slate-500 line-clamp-2">
                Tindakan kecil menanam pohon yang menyulap lahan tandus menjadi surga hijau.
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- ========================================================
           PLAY & LEARN (5 Game Aksi Interaktif)
      ======================================================== -->
      <div class="space-y-5 pt-4">
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
              Bermain & Beraksi
            </h3>
            <p class="text-xs font-semibold text-slate-400">Game interaktif menyenangkan yang berdampak langsung pada skor bumi</p>
          </div>
          <button id="btnViewAllGames" class="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 text-emerald-700 font-extrabold text-xs border border-emerald-200 shadow-2xs tactile-btn flex items-center space-x-1">
            <span>Lihat Semua Game</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          <!-- Game 1: Taman Aksi Iklim -->
          <div id="gameTamanAksi" class="bg-white rounded-3xl p-3.5 border-2 border-emerald-200/80 shadow-xs hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-square rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center overflow-hidden">
              <img src="public/images/characters/terra_cheering.png" alt="Taman Aksi" class="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
              <button class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <i data-lucide="play" class="w-4 h-4 fill-white ml-0.5"></i>
              </button>
            </div>
            <div class="mt-2.5">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-800 font-display">Taman Aksi</h5>
              <p class="text-[10px] font-bold text-slate-400">Bersihkan & Tanam</p>
            </div>
          </div>

          <!-- Game 2: Balon Kuis Iklim -->
          <div id="gameKuisIklim" class="bg-white rounded-3xl p-3.5 border-2 border-amber-200/80 shadow-xs hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-square rounded-2xl bg-gradient-to-tr from-amber-100 to-yellow-50 flex items-center justify-center overflow-hidden">
              <span class="text-4xl group-hover:scale-110 transition-transform">🎈</span>
              <button class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <i data-lucide="play" class="w-4 h-4 fill-white ml-0.5"></i>
              </button>
            </div>
            <div class="mt-2.5">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-800 font-display">Kuis Teka-Teki</h5>
              <p class="text-[10px] font-bold text-slate-400">SDGs 4 & 13</p>
            </div>
          </div>

          <!-- Game 3: Puzzle Kota Hijau -->
          <div id="gamePuzzleKota" class="bg-white rounded-3xl p-3.5 border-2 border-sky-200/80 shadow-xs hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-square rounded-2xl bg-gradient-to-tr from-sky-100 to-indigo-50 flex items-center justify-center overflow-hidden">
              <span class="text-4xl group-hover:scale-110 transition-transform">🧩</span>
              <button class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <i data-lucide="play" class="w-4 h-4 fill-white ml-0.5"></i>
              </button>
            </div>
            <div class="mt-2.5">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-800 font-display">Puzzle Kota</h5>
              <p class="text-[10px] font-bold text-slate-400">Rancang RTH</p>
            </div>
          </div>

          <!-- Game 4: Lab Selimut Gas -->
          <div id="gameLabGas" class="bg-white rounded-3xl p-3.5 border-2 border-cyan-200/80 shadow-xs hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-col justify-between group">
            <div class="relative aspect-square rounded-2xl bg-gradient-to-tr from-cyan-100 to-teal-50 flex items-center justify-center overflow-hidden">
              <span class="text-4xl group-hover:scale-110 transition-transform">⚛️</span>
              <button class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <i data-lucide="play" class="w-4 h-4 fill-white ml-0.5"></i>
              </button>
            </div>
            <div class="mt-2.5">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-800 font-display">Lab Gas Awa</h5>
              <p class="text-[10px] font-bold text-slate-400">Simulasi Termal</p>
            </div>
          </div>

          <!-- Game 5: Kartu Memori Energi -->
          <div id="gameKartuMemori" class="col-span-2 sm:col-span-1 bg-white rounded-3xl p-3.5 border-2 border-purple-200/80 shadow-xs hover:shadow-lg transition-all tactile-btn cursor-pointer flex flex-row sm:flex-col items-center sm:items-stretch justify-between group">
            <div class="relative w-16 h-16 sm:w-auto sm:aspect-square shrink-0 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-50 flex items-center justify-center overflow-hidden">
              <span class="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">🃏</span>
              <button class="hidden sm:flex absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#10b981] text-white items-center justify-center shadow-md shadow-emerald-500/30">
                <i data-lucide="play" class="w-4 h-4 fill-white ml-0.5"></i>
              </button>
            </div>
            <div class="flex-1 sm:flex-initial ml-3 sm:ml-0 mt-0 sm:mt-2.5">
              <h5 class="text-xs sm:text-sm font-extrabold text-slate-800 font-display">Kartu Memori</h5>
              <p class="text-[10px] font-bold text-slate-400">Cocokkan Energi</p>
            </div>
            <button class="sm:hidden w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
              <i data-lucide="play" class="w-3.5 h-3.5 fill-white ml-0.5"></i>
            </button>
          </div>

        </div>

      </div>

      <!-- ========================================================
           FEATURED ADVENTURES (Pulau Harapan - Bento Panorama)
      ======================================================== -->
      <div class="relative overflow-hidden rounded-2xl sm:rounded-[32px] bg-gradient-to-r from-sky-100 via-teal-50 to-white border-2 border-sky-200 p-4 sm:p-6 md:p-10 shadow-md">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <!-- Left: 3D Illustration Image -->
          <div class="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[16/10] bg-sky-200">
            <img 
              src="public/images/featured_adventure_island.png" 
              alt="Pulau Harapan Melayang" 
              class="w-full h-full object-cover object-center filter saturate-105"
            />
          </div>

          <!-- Right: Story Details & CTA -->
          <div class="lg:col-span-6 space-y-4">
            <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
              <span>🏝️</span>
              <span>Petualangan Unggulan Minggu Ini</span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
              Pulau Harapan: <br class="hidden sm:inline" />
              <span class="text-[#0284c7]">Ekspedisi Pulau Terapung</span>
            </h3>

            <p class="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
              Bergabunglah bersama Mia, Leo, dan Aria dalam pelayaran balon udara menjelajahi pulau terapung penuh teka-teki iklim, kuis seru, dan penemuan energi terbarukan!
            </p>

            <div class="pt-2">
              <button id="btnStartAdventureIsland" class="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e293b] px-6 py-3 rounded-full font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/25 tactile-btn border border-yellow-200">
                <span>Mulai Petualangan Iklim</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Carousel Pagination Dots -->
            <div class="flex items-center space-x-2 pt-2">
              <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span class="w-6 h-2.5 rounded-full bg-[#10b981] shadow-xs"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            </div>
          </div>

        </div>
      </div>

      <!-- ========================================================
           LOVED BY PARENTS & TEACHERS (Testimonial Cards)
      ======================================================== -->
      <div class="space-y-6 pt-4">
        
        <div class="text-center space-y-1">
          <div class="inline-flex items-center space-x-2 text-amber-500 font-extrabold text-xs uppercase tracking-widest">
            <span>✦</span>
            <span>Ulasan & Testimoni</span>
            <span>✦</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
            Dicintai Guru & Orang Tua
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Testimonial 1 -->
          <div class="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
            <div class="flex items-center space-x-1 text-amber-400 text-sm">
              ⭐⭐⭐⭐⭐
            </div>
            <p class="text-xs font-semibold text-slate-600 leading-relaxed">
              "BumiKita membuat murid-murid SD saya antusias belajar iklim. Konsep sains yang tadinya sulit dijelaskan kini dipahami lewat game interaktif!"
            </p>
            <div class="flex items-center space-x-3 pt-1 border-t border-slate-100">
              <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                SM
              </div>
              <div>
                <h5 class="text-xs font-extrabold text-slate-800">Ibu Sarah M.</h5>
                <span class="text-[10px] font-bold text-slate-400">Guru Kelas 4 SDN 01</span>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
            <div class="flex items-center space-x-1 text-amber-400 text-sm">
              ⭐⭐⭐⭐⭐
            </div>
            <p class="text-xs font-semibold text-slate-600 leading-relaxed">
              "Anak saya sekarang selalu mematikan keran air dan memilah sampah plastik di rumah. Karakternya hidup dan sangat menginspirasi."
            </p>
            <div class="flex items-center space-x-3 pt-1 border-t border-slate-100">
              <div class="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-black text-xs flex items-center justify-center">
                DR
              </div>
              <div>
                <h5 class="text-xs font-extrabold text-slate-800">Pak Daniel R.</h5>
                <span class="text-[10px] font-bold text-slate-400">Orang Tua Murid</span>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
            <div class="flex items-center space-x-1 text-amber-400 text-sm">
              ⭐⭐⭐⭐⭐
            </div>
            <p class="text-xs font-semibold text-slate-600 leading-relaxed">
              "Aplikasi terbaik untuk implementasi SDG 4 dan 13 di sekolah dasar. Desainnya sangat ramah anak dan bebas dari distraksi iklan."
            </p>
            <div class="flex items-center space-x-3 pt-1 border-t border-slate-100">
              <div class="w-9 h-9 rounded-full bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">
                PS
              </div>
              <div>
                <h5 class="text-xs font-extrabold text-slate-800">Ibu Priya S.</h5>
                <span class="text-[10px] font-bold text-slate-400">Pendidik Lingkungan</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  /**
   * RENDER TAMPILAN MODE SMP (PENELITI MUDA)
   */
  renderSmpMode(state, progressPct) {
    const pointsToNext = Math.max(0, state.nextLevelPoints - state.ecoPoints);

    return `
      <!-- HERO BANNER SMP: DASHBOARD SAINS IKLIM -->
      <div class="bg-slate-900 text-white -mt-3 sm:-mt-5 md:-mt-8 -mx-3 sm:-mx-5 md:-mx-8 rounded-b-3xl md:rounded-b-[40px] p-6 lg:p-8 pt-10 md:pt-14 border-b border-slate-800 shadow-xl space-y-6">
        
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="space-y-2 max-w-xl">
            <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-300 font-mono text-[11px] border border-indigo-700/60">
              <span>●</span>
              <span>Stasiun Observasi Iklim BumiKita — Tingkat SMP</span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
              Investigasi Dinamika Karbon & Dekarbonisasi Kota
            </h2>
            <p class="text-xs md:text-sm font-medium text-slate-400 leading-relaxed">
              Menganalisis anomali suhu troposfer, efisiensi penyerapan karbon oleh RTH, dan simulasi aksi dekarbonisasi berbasis kalkulasi data riil.
            </p>
          </div>

          <!-- WIDGET INDIKATOR ANOMALI SUHU -->
          <div class="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 shrink-0 w-full lg:w-72 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Anomali Termal</span>
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${state.earthTemp > 1.2 ? 'bg-rose-900/80 text-rose-300 border border-rose-700' : 'bg-amber-900/80 text-amber-300 border border-amber-700'}">
                ${state.earthTemp > 1.2 ? 'Kritis' : 'Waspada'}
              </span>
            </div>
            <div class="flex items-baseline space-x-2">
              <span class="text-3xl font-black font-mono text-rose-400 tnum">+${state.earthTemp.toFixed(2)}°C</span>
              <span class="text-xs text-slate-400">vs Pra-Industri</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full" style="width: ${Math.min(100, (state.earthTemp / 2.0) * 100)}%"></div>
            </div>
            <p class="text-[10px] text-slate-400 italic">Batas ambang aman IPCC: di bawah +1.50°C</p>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
          <button id="btnHeroSmpSim" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow tactile-btn">
            <i data-lucide="sliders" class="w-4 h-4"></i>
            <span>Buka Laboratorium Sains Kenali Bumi</span>
          </button>
          <button id="btnSmpSimTaman" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 border border-slate-700 tactile-btn">
            <i data-lucide="trees" class="w-4 h-4 text-emerald-400"></i>
            <span>Simulasi Taman Dekarbonisasi</span>
          </button>
        </div>

      </div>

      <!-- 3 PINTU UTAMA MODUL (SMP) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div id="cardKenaliBumi" class="bg-white hover:bg-slate-50 rounded-3xl p-5 flex flex-col justify-between cursor-pointer border-2 border-slate-200 hover:border-cyan-500 shadow-sm tactile-btn">
          <div class="flex items-start justify-between">
            <div class="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-2xl">
              🌡️
            </div>
            <span class="text-[10px] font-black text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded-full">Fase 1: Sains</span>
          </div>
          <div class="my-3">
            <h4 class="text-base font-black text-slate-900 font-display">1. Termodinamika & GRK</h4>
            <p class="text-xs font-semibold text-slate-500 mt-1">
              Pelajari radiasi gelombang panjang, ketebalan gas rumah kaca, dan albedo kutub.
            </p>
          </div>
          <span class="text-xs font-black text-cyan-800 flex items-center space-x-1">
            <span>Buka Laboratorium Sains &rarr;</span>
          </span>
        </div>

        <div id="cardTamanAksi" class="bg-white hover:bg-slate-50 rounded-3xl p-5 flex flex-col justify-between cursor-pointer border-2 border-emerald-200 hover:border-emerald-500 shadow-sm tactile-btn">
          <div class="flex items-start justify-between">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl">
              🌳
            </div>
            <span class="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Fase 2: Aksi</span>
          </div>
          <div class="my-3">
            <h4 class="text-base font-black text-slate-900 font-display">2. Rekayasa RTH Kota</h4>
            <p class="text-xs font-semibold text-slate-500 mt-1">
              Simulasi intervensi penanaman vegetasi dan eliminasi sumber polusi perkotaan.
            </p>
          </div>
          <span class="text-xs font-black text-emerald-800 flex items-center space-x-1">
            <span>Jalankan Model Simulasi &rarr;</span>
          </span>
        </div>

        <div id="cardMisiPahlawan" class="bg-white hover:bg-slate-50 rounded-3xl p-5 flex flex-col justify-between cursor-pointer border-2 border-purple-200 hover:border-purple-500 shadow-sm tactile-btn">
          <div class="flex items-start justify-between">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-2xl">
              🎯
            </div>
            <span class="text-[10px] font-black text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">Fase 3: Evaluasi</span>
          </div>
          <div class="my-3">
            <h4 class="text-base font-black text-slate-900 font-display">3. Sertifikasi & Riset</h4>
            <p class="text-xs font-semibold text-slate-500 mt-1">
              Uji pemahaman komprehensif terkait mitigasi iklim dan selesaikan tantangan esai.
            </p>
          </div>
          <span class="text-xs font-black text-purple-800 flex items-center space-x-1">
            <span>Mulai Uji Kompetensi &rarr;</span>
          </span>
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

    // Hero SMP Simulation
    container.querySelector('#btnHeroSmpSim')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#btnSmpSimTaman')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    // Topic Cards Navigation
    container.querySelector('#topicRahasiaIklim')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#topicLabUdara')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#topicPilahSampah')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#topicEnergiBersih')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#topicKotaHijau')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#topicMisiCilik')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    // Story Cards & Button
    container.querySelector('#btnViewAllStories')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelectorAll('.story-card').forEach(card => {
      card.addEventListener('click', () => {
        this.appController.switchView('viewKenaliBumi');
      });
    });

    // Game Cards Navigation
    container.querySelector('#btnViewAllGames')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#gameTamanAksi')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#gameKuisIklim')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    container.querySelector('#gamePuzzleKota')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#gameLabGas')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#gameKartuMemori')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });

    // Featured Adventure Island CTA
    container.querySelector('#btnStartAdventureIsland')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    // SMP Cards Navigation
    container.querySelector('#cardKenaliBumi')?.addEventListener('click', () => {
      this.appController.switchView('viewKenaliBumi');
    });

    container.querySelector('#cardTamanAksi')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelector('#cardMisiPahlawan')?.addEventListener('click', () => {
      this.appController.switchView('viewMisiPahlawan');
    });
  }

  /**
   * UPDATE STATUS DINAMIS JIKA DATA GLOBAL BERUBAH TANPA RE-RENDER TOTAL
   */
  updateStats(state) {
    const ptsEl = document.getElementById('headerEcoPoints');
    if (ptsEl) {
      ptsEl.textContent = state.ecoPoints;
    }
  }
}
