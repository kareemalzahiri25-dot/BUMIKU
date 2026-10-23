/**
 * ParkGameModel.js
 * Model data untuk game simulasi interaktif "Taman Aksi Hijau".
 * Mengelola daftar objek interaktif (sampah, kendaraan berasap, penanaman pohon, revitalisasi kolam),
 * serta menghitung persentase kebersihan menuju target 100%.
 */
export class ParkGameModel {
  constructor() {
    this.initialItems = [
      // 5 Sampah Tercecer (Misi bersama Pila)
      {
        id: 'trash_1',
        type: 'trash',
        name: 'Botol Plastik Sekali Pakai',
        icon: '🍶',
        desc: 'Botol plastik butuh 450 tahun untuk terurai. Masukkan ke tong anorganik Pila!',
        x: 36,
        y: 60,
        cleaned: false,
        points: 15,
        tempDrop: 0.03,
        co2: 0.15,
        mascot: 'pila',
        speech: 'Bagus! Botol plastik akan didaur ulang menjadi barang bermanfaat!'
      },
      {
        id: 'trash_2',
        type: 'trash',
        name: 'Kaleng Minuman Bekas',
        icon: '🥫',
        desc: 'Kaleng aluminium bisa dilebur kembali menjadi kaleng baru.',
        x: 72,
        y: 63,
        cleaned: false,
        points: 15,
        tempDrop: 0.02,
        co2: 0.15,
        mascot: 'pila',
        speech: 'Hebat! Kaleng bekas ini aman masuk ke wadah daur ulang Pila!'
      },
      {
        id: 'trash_3',
        type: 'trash',
        name: 'Kantong Plastik Kresek',
        icon: '🛍️',
        desc: 'Kresek plastik bisa menyumbat saluran air dan merusak tanah taman.',
        x: 21,
        y: 62,
        cleaned: false,
        points: 15,
        tempDrop: 0.03,
        co2: 0.2,
        mascot: 'pila',
        speech: 'Juara! Hindari kantong kresek, yuk pakai tas kain ramah lingkungan!'
      },
      {
        id: 'trash_4',
        type: 'trash',
        name: 'Kemasan Makanan Kertas',
        icon: '📦',
        desc: 'Kardus dan kertas bisa diolah menjadi bubur kertas daur ulang.',
        x: 52,
        y: 75,
        cleaned: false,
        points: 15,
        tempDrop: 0.02,
        co2: 0.1,
        mascot: 'pila',
        speech: 'Tepat sekali! Kertas terpilah rapi di sabuk kuning Pila!'
      },
      {
        id: 'trash_5',
        type: 'trash',
        name: 'Gelas Plastik di Jalan',
        icon: '🥤',
        desc: 'Sampah tercecer di jalan raya membahayakan pesepeda dan pejalan kaki.',
        x: 64,
        y: 92,
        cleaned: false,
        points: 15,
        tempDrop: 0.03,
        co2: 0.15,
        mascot: 'pila',
        speech: 'Jalanan jadi bersih dan aman untuk semua pejalan kaki!'
      },

      // 2 Kendaraan Berasap (Misi bersama Nala)
      {
        id: 'veh_1',
        type: 'vehicle',
        name: 'Motor Knalpot Berasap Hitam',
        icon: '🛵💨',
        cleanedIcon: '🚲✨',
        desc: 'Asap knalpot motor membakar bensin dan mencemari udara sejuk taman.',
        actionPrompt: 'Ganti perjalanan jarak dekat dengan Gowes Sepeda Sehat di jalur hijau!',
        x: 18,
        y: 90,
        cleaned: false,
        points: 30,
        tempDrop: 0.05,
        co2: 0.4,
        mascot: 'nala',
        speech: 'Hore! Jalur sepeda hijau sekarang ramai dan udaranya segar tanpa asap knalpot!'
      },
      {
        id: 'veh_2',
        type: 'vehicle',
        name: 'Mobil Pribadi Boros Bahan Bakar',
        icon: '🚗💨',
        cleanedIcon: '🚌⚡',
        desc: 'Mobil berbahan bakar minyak menghasilkan emisi karbon dioksida tinggi.',
        actionPrompt: 'Beralih ke Bus Listrik Sekolah ramah lingkungan!',
        x: 82,
        y: 90,
        cleaned: false,
        points: 30,
        tempDrop: 0.05,
        co2: 0.45,
        mascot: 'nala',
        speech: 'Keren! Bus listrik mengangkut banyak siswa sekaligus dengan emisi nol!'
      },

      // 3 Revitalisasi Hijau & Air (Misi bersama Tata)
      {
        id: 'green_1',
        type: 'nature',
        name: 'Lahan Gersang Kiri',
        icon: '🍂',
        cleanedIcon: '🌳',
        desc: 'Tanah kering butuh pohon peneduh untuk menyerap air hujan dan karbon.',
        actionPrompt: 'Ajak Arsitek Tata menanam bibit pohon trembesi rindang!',
        x: 48,
        y: 26,
        cleaned: false,
        points: 25,
        tempDrop: 0.04,
        co2: 0.35,
        mascot: 'tata',
        speech: 'Pohon trembesi berdiri kokoh! Udara sekitar taman menjadi sejuk berangin.'
      },
      {
        id: 'green_2',
        type: 'nature',
        name: 'Tanaman Bunga Mati',
        icon: '🥀',
        cleanedIcon: '🌺',
        desc: 'Tanaman kering perlu disiram dan diganti bunga mekar untuk lebah & kupu-kupu.',
        actionPrompt: 'Siram dan rawat taman bunga warna-warni!',
        x: 9,
        y: 64,
        cleaned: false,
        points: 20,
        tempDrop: 0.03,
        co2: 0.2,
        mascot: 'tata',
        speech: 'Bunga-bunga bermekaran indah! Kupu-kupu kembali menari di taman.'
      },
      {
        id: 'green_3',
        type: 'pond',
        name: 'Kolam Air Keruh & Mengering',
        icon: '🟤',
        cleanedIcon: '💧✨',
        desc: 'Air kolam kotor dan tidak ada ikan. Mari jernihkan air kolam taman!',
        actionPrompt: 'Jernihkan air kolam dan aktifkan pancuran tenaga surya!',
        x: 83,
        y: 53,
        cleaned: false,
        points: 35,
        tempDrop: 0.05,
        co2: 0.4,
        mascot: 'tata',
        speech: 'Luar biasa! Kolam air kembali biru berkilau dan jernih memantulkan langit!'
      }
    ];

    this.items = JSON.parse(JSON.stringify(this.initialItems));
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.getItems(), this.getProgress()));
  }

  getItems() {
    return this.items;
  }

  getItemById(id) {
    return this.items.find(item => item.id === id);
  }

  getProgress() {
    const total = this.items.length;
    const cleanedCount = this.items.filter(item => item.cleaned).length;
    const percentage = Math.round((cleanedCount / total) * 100);

    return {
      total,
      cleanedCount,
      remainingCount: total - cleanedCount,
      percentage,
      isCompleted: cleanedCount === total
    };
  }

  cleanItem(id) {
    const item = this.getItemById(id);
    if (item && !item.cleaned) {
      item.cleaned = true;
      this.notify();
      return item;
    }
    return null;
  }

  reset() {
    this.items = JSON.parse(JSON.stringify(this.initialItems));
    this.notify();
  }
}

export const parkGameModel = new ParkGameModel();
