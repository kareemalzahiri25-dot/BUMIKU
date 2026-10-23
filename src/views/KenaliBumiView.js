/**
 * KenaliBumiView.js
 * View untuk modul 1: Kenali Bumi bersama Maskot Awa.
 * Eksperimen interaktif ketebalan selimut gas rumah kaca, narasi audio, dan mini kuis.
 */
export class KenaliBumiView {
  constructor(kenaliController, appController) {
    this.kenaliController = kenaliController;
    this.appController = appController;
  }

  render(container) {
    container.innerHTML = `
      <section class="space-y-6">

        <!-- HEADER SUB-NAVIGASI -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3 w-full md:w-auto">
            <button id="btnBackHomeFromKenali" class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 tactile-btn">
              <i data-lucide="arrow-left" class="w-5 h-5"></i>
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 p-1 shrink-0 overflow-hidden">
                <img src="public/images/characters/awa_standing.png" alt="Awa" class="w-full h-full object-contain" />
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-base font-black text-slate-800">1. Kenali Bumi Kita bersama Awa</h3>
                  <span class="text-[10px] font-black text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full">SDG 4 & 13</span>
                </div>
                <p class="text-xs font-semibold text-slate-400">Pahami mengapa suhu bumi memanas dengan bahasa yang mudah dipahami anak!</p>
              </div>
            </div>
          </div>

          <!-- SUBJECT TABS -->
          <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button data-tab="rumahKaca" class="kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-black bg-[#0097a7] text-white tactile-btn shadow-xs">
              🏠 Selimut Rumah Kaca
            </button>
            <button data-tab="pemanasanGlobal" class="kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 tactile-btn">
              🌡️ Pemanasan Global
            </button>
            <button data-tab="energiBersih" class="kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 tactile-btn">
              ☀️ Energi Bersih
            </button>
            <button data-tab="bijakSampah" class="kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 tactile-btn">
              ♻️ Bijak Sampah
            </button>
          </div>
        </div>

        <!-- DYNAMIC CONTENT BOX -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- KIRI: EKSPERIMEN INTERAKTIF (7 Kolom) -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-6 border border-cyan-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <span id="kenaliBadgeTag" class="px-2.5 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-800">Konsep Sains 1</span>
                  <h4 id="kenaliVisualTitle" class="text-base font-black text-slate-800">Eksperimen Interaktif: Ketebalan Gas Rumah Kaca</h4>
                </div>
                <button id="btnReadKenaliSpeech" class="px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-900 text-xs font-black tactile-btn flex items-center space-x-1.5 border border-cyan-200 hover:bg-cyan-100">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5 text-cyan-700"></i>
                  <span>Dengar Penjelasan</span>
                </button>
              </div>

              <!-- Interactive Atmosphere Canvas -->
              <div class="w-full aspect-[16/10] bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-2xl border border-cyan-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <svg viewBox="0 0 320 200" class="w-full h-full max-h-[260px]">
                  <!-- Sun -->
                  <circle cx="45" cy="40" r="22" fill="#fbbf24" class="animate-pulse" />
                  <circle cx="45" cy="40" r="15" fill="#f59e0b" />
                  <path d="M 65 55 L 120 110" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4" />
                  <path d="M 50 65 L 90 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" />

                  <!-- Atmospheric Blanket Layer -->
                  <path id="greenhouseBlanketPath" d="M 20 80 Q 160 40 300 80" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.65" />
                  <text x="160" y="55" text-anchor="middle" font-size="11" font-weight="800" fill="#0284c7">Lapisan Gas Rumah Kaca (Atmosfer Awa)</text>

                  <!-- Bouncing Heat Rays -->
                  <path id="heatBounceRay" d="M 120 110 L 160 70 L 190 115" stroke="#ef4444" stroke-width="3" stroke-dasharray="3,3" />
                  <polygon points="190,115 182,108 192,105" fill="#ef4444" />
                  <path id="escapingHeatRay" d="M 160 70 L 195 20" stroke="#f97316" stroke-width="2" stroke-dasharray="2,2" />

                  <!-- Earth Surface -->
                  <ellipse cx="160" cy="185" rx="150" ry="40" fill="#22c55e" />
                  <ellipse cx="160" cy="180" rx="140" ry="30" fill="#4ade80" />
                  <text x="70" y="165" font-size="20">🌳</text>
                  <text x="120" y="165" font-size="18">🏡</text>
                  <text x="160" y="165" font-size="24">🌍</text>
                  <text x="210" y="165" font-size="18">🚲</text>
                  <text x="245" y="165" font-size="20">🌳</text>
                </svg>
              </div>
            </div>

            <!-- Interactive Slider -->
            <div class="bg-cyan-50/70 rounded-2xl p-4 border border-cyan-100 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Geser Ketebalan Polusi / Asap (CO₂):</span>
                <span id="sliderBlanketLabel" class="text-cyan-800 font-black">Sedang (Normal Seimbang)</span>
              </div>
              <input id="blanketSlider" type="range" min="1" max="3" value="2" class="w-full accent-[#0097a7] cursor-pointer">
              <div class="flex justify-between text-[11px] font-bold text-slate-500">
                <span>🟢 Tipis (Dingin)</span>
                <span>🟡 Pas (Seimbang Nyaman)</span>
                <span>🔴 Tebal (Bumi Kepanasan!)</span>
              </div>
            </div>
          </div>

          <!-- KANAN: PENJELASAN RAMAH ANAK & MINI KUIS (5 Kolom) -->
          <div class="lg:col-span-5 space-y-4">
            
            <!-- CERITA BERSAMA MASKOT AWA -->
            <div class="bg-gradient-to-br from-[#e0f7fa] to-[#cffafe] rounded-3xl p-6 border border-cyan-200 shadow-sm space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-white p-1 overflow-hidden shadow-xs border border-cyan-200 shrink-0">
                  <img id="kenaliStoryMascot" src="public/images/characters/awa_cold_blanket.png" alt="Awa" class="w-full h-full object-contain" />
                </div>
                <h5 class="text-base font-black text-slate-800">Cerita Sains: "Bumi Pakai Selimut"</h5>
              </div>
              <p id="kenaliStoryParagraph" class="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                Bayangkan kamu tidur memakai 1 selimut lembut. Rasanya hangat dan nyaman, kan? Itulah fungsi asli <strong>gas rumah kaca</strong>!<br><br>
                Namun saat kita membakar terlalu banyak batubara dan bensin kendaraan, lapisan selimut CO₂ menebal hingga 10 lapis! Panas matahari terperangkap dan bumi menjadi demam.
              </p>
              <div class="pt-2 flex items-center justify-between border-t border-cyan-200/70 text-xs font-bold text-cyan-900">
                <span>💡 Kata Kunci: CO₂, Metana, Atmosfer</span>
                <span class="bg-white/80 px-2.5 py-1 rounded-full text-[11px] font-black">+15 Poin Edukasi</span>
              </div>
            </div>

            <!-- MINI KUIS CEK PEMAHAMAN -->
            <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <h5 class="text-xs font-black text-slate-800">Cek Pemahaman Cepat</h5>
                <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+10 Poin 🌿</span>
              </div>
              <p id="kenaliMiniQuestion" class="text-xs font-bold text-slate-700">Apa fungsi utama gas rumah kaca yang seimbang bagi bumi?</p>

              <div id="kenaliMiniOptionsContainer" class="space-y-2">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <!-- TOMBOL MENUJU TAMAN AKSI HIJAU -->
            <button id="btnGoToTamanFromKenali" class="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs shadow-md shadow-emerald-900/15 tactile-btn flex items-center justify-center space-x-2">
              <span>Sekarang Praktikkan di: 2. Taman Aksi Hijau</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>

          </div>

        </div>

      </section>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    container.querySelector('#btnBackHomeFromKenali')?.addEventListener('click', () => {
      this.appController.switchView('viewHome');
    });

    container.querySelector('#btnGoToTamanFromKenali')?.addEventListener('click', () => {
      this.appController.switchView('viewTamanAksi');
    });

    container.querySelectorAll('.kenali-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.dataset.tab;
        this.kenaliController.selectTab(tabKey, this);
      });
    });

    const slider = container.querySelector('#blanketSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.kenaliController.updateBlanketSlider(e.target.value);
      });
    }

    container.querySelector('#btnReadKenaliSpeech')?.addEventListener('click', () => {
      this.kenaliController.readSpeech();
    });
  }
}
