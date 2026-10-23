/**
 * QuizModel.js
 * Model bank soal kuis iklim dan daftar lencana penghargaan (SDG 4 & 13).
 */
export class QuizModel {
  constructor() {
    this.badges = [
      {
        id: 'sahabat_bumi',
        name: 'Sahabat Bumi',
        icon: '🌱',
        category: 'Awal Petualangan',
        desc: 'Memulai langkah pertama menjaga kelestarian bumi.',
        level: 1
      },
      {
        id: 'hemat_energi',
        name: 'Pahlawan Hemat Energi',
        icon: '💡',
        category: 'Aksi Nyata',
        desc: 'Membiasakan mematikan lampu dan mencabut colokan listrik.',
        level: 2
      },
      {
        id: 'pilah_sampah',
        name: 'Master Pilah Sampah',
        icon: '♻️',
        category: 'Aksi Nyata',
        desc: 'Paham memilah sampah organik dan botol plastik anorganik.',
        level: 2
      },
      {
        id: 'arsitek_taman',
        name: 'Arsitek Taman Asri',
        icon: '🌳',
        category: 'Simulasi Spesial',
        desc: 'Mencapai target 100% kebersihan di Taman Aksi Hijau!',
        level: 3
      },
      {
        id: 'duta_sdg13',
        name: 'Duta Iklim Cilik SDG 13',
        icon: '🏅',
        category: 'Prestasi Tertinggi',
        desc: 'Menjawab kuis aksi iklim dengan pemahaman sains sempurna.',
        level: 3
      }
    ];

    this.questions = [
      {
        q: 'Manakah sumber energi bersih yang TIDAK menghasilkan asap polusi ke langit?',
        opts: [
          'Panel Surya & Kincir Angin',
          'Pembangkit Listrik Batubara',
          'Membakar Sampah Plastik',
          'Bensin Kendaraan Fosil'
        ],
        answer: 0,
        exp: 'Benar! Matahari dan angin adalah sumber energi terbarukan tanpa emisi karbon!'
      },
      {
        q: 'Apa yang bisa kita lakukan di rumah untuk mencegah pemanasan bumi?',
        opts: [
          'Membiarkan lampu dan TV menyala seharian',
          'Mematikan keran air & mencabut charger saat tidak dipakai',
          'Menyalakan AC 16°C dengan pintu kamar terbuka lebar',
          'Membuang sampah plastik ke selokan air'
        ],
        answer: 1,
        exp: 'Tepat sekali! Menghemat listrik dan air menghemat pembakaran energi fosil.'
      },
      {
        q: 'Mengapa menanam pohon sangat penting untuk melawan krisis iklim (SDG 13)?',
        opts: [
          'Pohon menyerap gas karbon dioksida (CO₂) dan menghasilkan oksigen segar',
          'Pohon membuat asap hitam pekat',
          'Pohon menaikkan suhu bumi menjadi panas',
          'Pohon menghabiskan semua udara bumi'
        ],
        answer: 0,
        exp: 'Hebat! Pohon adalah paru-paru bumi yang menyerap gas rumah kaca.'
      }
    ];
  }

  getBadges() {
    return this.badges;
  }

  getQuestions() {
    return this.questions;
  }
}

export const quizModel = new QuizModel();
