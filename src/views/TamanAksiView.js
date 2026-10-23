/**
 * TamanAksiView.js
 * View untuk halaman gabungan "Taman Aksi Hijau" (Menggabungkan Pilih Aksimu! & Bangun Kota Hijau).
 * Menampilkan simulasi interaktif transformasi Taman Kotor -> Taman Bersih dengan target persentase kebersihan (0% - 100%).
 */
export class TamanAksiView {
  constructor(parkGameController, appController) {
    this.parkGameController = parkGameController;
    this.appController = appController;
  }

  render(container) {
    container.innerHTML = `
      <section class="space-y-6">

        <!-- HEADER SUB-NAVIGASI & TARGET STATUS HUD -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3 w-full md:w-auto">
            <button id="btnBackHomeFromTaman" class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 tactile-btn shrink-0">
              <i data-lucide="arrow-left" class="w-5 h-5"></i>
            </button>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-base font-black text-slate-800">2. Taman Aksi Hijau — Simulasi Kota Asri</h3>
                <span class="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">SDG 11 & 13</span>
              </div>
              <p class="text-xs font-semibold text-slate-500">Klik sampah, ganti kendaraan berpolusi, dan tanam pohon untuk mencapai target bersih 100%!</p>
            </div>
          </div>

          <!-- TARGET PROGRESS METER HUD -->
          <div class="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end bg-emerald-50/70 border border-emerald-200/80 px-4 py-2.5 rounded-2xl">
            <div class="space-y-1">
              <div class="flex items-center justify-between space-x-3 text-xs font-black">
                <span class="text-emerald-900">Target Kebersihan:</span>
                <span id="tamanCleanPercent" class="text-emerald-700 tnum">0% Bersih</span>
              </div>
              <div class="w-36 lg:w-48 h-3 bg-emerald-200/60 rounded-full overflow-hidden p-0.5">
                <div id="tamanProgressBar" class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" style="width: 0%;"></div>
              </div>
            </div>

            <button id="btnResetTaman" class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs tactile-btn flex items-center space-x-1" title="Atur Ulang Taman">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Ulangi</span>
            </button>
          </div>
        </div>

        <!-- 3 TIM PAHLAWAN PENDAMPING (PILA, NALA, TATA) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Pila Tracker -->
          <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 p-1 shrink-0 overflow-hidden">
              <img src="public/images/characters/pila_arms_open.png" alt="Pila" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Pila • Pilah Sampah</span>
              <div class="flex items-center justify-between text-xs font-black text-slate-800">
                <span>Sampah Tercecer:</span>
                <span id="trackerTrashCount" class="text-emerald-600 tnum">0 / 5 Bersih</span>
              </div>
            </div>
          </div>

          <!-- Nala Tracker -->
          <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 p-1 shrink-0 overflow-hidden">
              <img src="public/images/characters/nala_floating_smile.png" alt="Nala" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Nala • Transportasi Bersih</span>
              <div class="flex items-center justify-between text-xs font-black text-slate-800">
                <span>Bebas Asap Polusi:</span>
                <span id="trackerVehicleCount" class="text-amber-600 tnum">0 / 2 Bersih</span>
              </div>
            </div>
          </div>

          <!-- Tata Tracker -->
          <div class="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 p-1 shrink-0 overflow-hidden">
              <img src="public/images/characters/tata_architect_thumb.png" alt="Tata" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-black uppercase tracking-wider text-teal-700 block">Tata • Tata Penghijauan</span>
              <div class="flex items-center justify-between text-xs font-black text-slate-800">
                <span>Pohon & Air Asri:</span>
                <span id="trackerNatureCount" class="text-teal-600 tnum">0 / 3 Asri</span>
              </div>
            </div>
          </div>

        </div>

        <!-- STAGE GAME SIMULASI TAMAN INTERAKTIF -->
        <div class="relative w-full rounded-3xl overflow-hidden shadow-xl border-4 border-slate-200 bg-slate-900 group select-none">
          
          <!-- RATIO CONTAINER (16:9) -->
          <div class="relative w-full aspect-[16/9] min-h-[380px] md:min-h-[520px] max-h-[700px]">
            
            <!-- LAYER 1 (BASE): TAMAN KOTOR (0%) -->
            <img 
              src="public/images/Taman Kotor.png" 
              alt="Taman Kota Rusak & Kotor" 
              class="absolute inset-0 w-full h-full object-cover pointer-events-none" 
            />

            <!-- LAYER 2 (OVERLAY): TAMAN BERSIH (TRANSISI SEIRING NAIKNYA PERSENTASE) -->
            <img 
              id="tamanBersihOverlay"
              src="public/images/Taman Bersih.png" 
              alt="Taman Kota Bersih & Asri" 
              class="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-out" 
              style="opacity: 0;"
            />

            <!-- LAYER 3: HOTSPOT OBJEK INTERAKTIF -->
            <div id="tamanHotspotsContainer" class="absolute inset-0 w-full h-full pointer-events-auto">
              <!-- Dynamically injected via JavaScript -->
            </div>

            <!-- FLOATING GUIDE BANNER -->
            <div id="tamanGuideBanner" class="absolute top-4 left-4 right-4 md:right-auto md:max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-emerald-200 shadow-lg flex items-center space-x-3 pointer-events-none transition-all duration-300">
              <div id="guideMascotImg" class="w-12 h-12 rounded-xl bg-emerald-100 p-1 shrink-0 overflow-hidden">
                <img src="public/images/characters/terra_waving.png" alt="Guide" class="w-full h-full object-contain" />
              </div>
              <div>
                <h5 id="guideMascotName" class="text-xs font-black text-slate-800">Misi Dimulai: Bersihkan Taman!</h5>
                <p id="guideMascotText" class="text-[11px] font-semibold text-slate-600 line-clamp-2">
                  Sentuh sampah yang tercecer di rumput dan jalanan untuk memilahnya bersama Pila!
                </p>
              </div>
            </div>

            <!-- VICTORY CELEBRATION MODAL (POP UP SAAT 100%) -->
            <div id="tamanVictoryModal" class="hidden absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-30 animate-gentle-bounce">
              <div class="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border-4 border-emerald-300">
                <div class="w-24 h-24 mx-auto bg-emerald-100 rounded-full p-2 border-2 border-emerald-300 shadow-inner flex items-center justify-center overflow-hidden">
                  <img src="public/images/characters/terra_cheering.png" alt="Terra Hore" class="w-full h-full object-contain animate-float-wiggle" />
                </div>
                <div class="space-y-1">
                  <span class="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    🎉 Target 100% Tercapai!
                  </span>
                  <h3 class="text-xl md:text-2xl font-black text-slate-900">Taman Asri Sempurna!</h3>
                  <p class="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
                    Luar biasa! Berkat aksi pedulimu, sampah telah terpilah, jalur sepeda bebas polusi, dan pepohonan tumbuh rindang.
                  </p>
                </div>

                <!-- Lencana Terbuka Reward Card -->
                <div class="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 rounded-2xl p-3 flex items-center space-x-3 text-left">
                  <span class="text-3xl">🌳</span>
                  <div>
                    <h5 class="text-xs font-black text-amber-900">Lencana Emas Terbuka!</h5>
                    <p class="text-[10px] font-bold text-emerald-800">"Arsitek Taman Asri Nusantara" (+50 🌿)</p>
                  </div>
                </div>

                <div class="flex space-x-2 pt-2">
                  <button id="btnVictoryToMisi" class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs shadow-md tactile-btn">
                    Lihat Lemari Lencana →
                  </button>
                  <button id="btnVictoryClose" class="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold text-xs tactile-btn">
                    Tutup
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>
    `;

    this.bindEvents(container);
    this.renderHotspots();
  }

  bindEvents(container) {
    container.querySelector('#btnBackHomeFromTaman')?.addEventListener('click', () => {
      this.appController.switchView('viewHome');
    });

    container.querySelector('#btnResetTaman')?.addEventListener('click', () => {
      this.parkGameController.resetGame();
    });

    container.querySelector('#btnVictoryToMisi')?.addEventListener('click', () => {
      container.querySelector('#tamanVictoryModal')?.classList.add('hidden');
      this.appController.switchView('viewMisiPahlawan');
    });

    container.querySelector('#btnVictoryClose')?.addEventListener('click', () => {
      container.querySelector('#tamanVictoryModal')?.classList.add('hidden');
    });
  }

  renderHotspots() {
    const container = document.getElementById('tamanHotspotsContainer');
    if (!container) return;

    const items = this.parkGameController.getItems();
    container.innerHTML = '';

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 tactile-btn ${item.cleaned ? 'pointer-events-none' : 'hover:scale-125 z-10'}`;
      el.style.left = `${item.x}%`;
      el.style.top = `${item.y}%`;

      if (item.cleaned) {
        // Tampilan setelah dibersihkan / diselesaikan
        if (item.type === 'trash') {
          el.innerHTML = `
            <div class="w-7 h-7 rounded-full bg-white/90 border border-emerald-300 shadow-xs flex items-center justify-center text-xs opacity-70">
              ✨
            </div>
          `;
        } else if (item.type === 'vehicle') {
          el.innerHTML = `
            <div class="px-2.5 py-1 rounded-full bg-white/95 border-2 border-emerald-400 shadow-md flex items-center space-x-1 text-xs font-black text-emerald-800 animate-gentle-bounce">
              <span>${item.cleanedIcon}</span>
              <span class="text-[10px]">Bersih</span>
            </div>
          `;
        } else {
          el.innerHTML = `
            <div class="px-2.5 py-1 rounded-full bg-white/95 border-2 border-teal-400 shadow-md flex items-center space-x-1 text-xs font-black text-teal-800 animate-gentle-bounce">
              <span>${item.cleanedIcon}</span>
              <span class="text-[10px]">Asri</span>
            </div>
          `;
        }
      } else {
        // Tampilan sebelum dibersihkan (interaktif dengan animasi getar ramah anak)
        if (item.type === 'trash') {
          el.innerHTML = `
            <div class="relative group/item">
              <div class="w-9 h-9 rounded-full bg-white/95 border-2 border-rose-300 shadow-lg flex items-center justify-center text-lg animate-gentle-bounce hover:border-emerald-500">
                ${item.icon}
              </div>
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[9px] font-bold whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity">
                ${item.name}
              </span>
            </div>
          `;
        } else if (item.type === 'vehicle') {
          el.innerHTML = `
            <div class="relative group/item">
              <div class="px-3 py-1.5 rounded-full bg-rose-50 border-2 border-rose-400 shadow-lg flex items-center space-x-1 text-sm font-black text-rose-800 animate-gentle-bounce hover:scale-110">
                <span>${item.icon}</span>
                <span class="text-[10px] hidden sm:inline">Asap!</span>
              </div>
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[9px] font-bold whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity">
                Ganti ke Sepeda/Bus Listrik
              </span>
            </div>
          `;
        } else {
          el.innerHTML = `
            <div class="relative group/item">
              <div class="px-3 py-1.5 rounded-full bg-amber-50 border-2 border-amber-400 shadow-lg flex items-center space-x-1 text-sm font-black text-amber-800 animate-gentle-bounce hover:scale-110">
                <span>${item.icon}</span>
                <span class="text-[10px] hidden sm:inline">${item.name}</span>
              </div>
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[9px] font-bold whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity">
                Ajak Tata Hijaukan Lahan!
              </span>
            </div>
          `;
        }

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.parkGameController.handleItemClick(item.id, el);
        });
      }

      container.appendChild(el);
    });
  }

  updateProgress(progress) {
    // 1. Update persentase bar
    const bar = document.getElementById('tamanProgressBar');
    if (bar) bar.style.width = `${progress.percentage}%`;

    const txt = document.getElementById('tamanCleanPercent');
    if (txt) txt.textContent = `${progress.percentage}% Bersih`;

    // 2. Update opacity overlay Taman Bersih (Transisi visual langsung!)
    const overlay = document.getElementById('tamanBersihOverlay');
    if (overlay) {
      overlay.style.opacity = (progress.percentage / 100).toString();
    }

    // 3. Update 3 Tracker Pahlawan
    const items = this.parkGameController.getItems();
    const trashCleaned = items.filter(i => i.type === 'trash' && i.cleaned).length;
    const vehCleaned = items.filter(i => i.type === 'vehicle' && i.cleaned).length;
    const natCleaned = items.filter((i => (i.type === 'nature' || i.type === 'pond') && i.cleaned)).length;

    const tTrash = document.getElementById('trackerTrashCount');
    if (tTrash) tTrash.textContent = `${trashCleaned} / 5 Bersih`;

    const tVeh = document.getElementById('trackerVehicleCount');
    if (tVeh) tVeh.textContent = `${vehCleaned} / 2 Bersih`;

    const tNat = document.getElementById('trackerNatureCount');
    if (tNat) tNat.textContent = `${natCleaned} / 3 Asri`;

    // 4. Update Hotspots view
    this.renderHotspots();

    // 5. Cek Kondisi Kemenangan (100%)
    if (progress.isCompleted) {
      const modal = document.getElementById('tamanVictoryModal');
      if (modal) modal.classList.remove('hidden');
    }
  }

  showMascotSpeech(mascotKey, title, message) {
    const banner = document.getElementById('tamanGuideBanner');
    const nameEl = document.getElementById('guideMascotName');
    const textEl = document.getElementById('guideMascotText');
    const imgEl = document.getElementById('guideMascotImg');

    if (!banner || !nameEl || !textEl || !imgEl) return;

    const mascotMap = {
      pila: { name: 'Pila • Sahabat Pilah', img: 'public/images/characters/pila_lid_open_yay.png' },
      nala: { name: 'Nala • Sahabat Energi', img: 'public/images/characters/nala_floating_joy.png' },
      tata: { name: 'Tata • Arsitek Hijau', img: 'public/images/characters/tata_helmet_sprout.png' },
      terra: { name: 'Terra • Bumi Cilik', img: 'public/images/characters/terra_happy.png' }
    };

    const target = mascotMap[mascotKey] || mascotMap.terra;
    nameEl.textContent = title || target.name;
    textEl.textContent = message;
    imgEl.innerHTML = `<img src="${target.img}" alt="${target.name}" class="w-full h-full object-contain" />`;

    banner.classList.remove('opacity-0');
    banner.classList.add('animate-gentle-bounce');
  }
}
