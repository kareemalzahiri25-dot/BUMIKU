/**
 * KenaliModel.js
 * Model data materi sains interaktif "Kenali Bumi" (SDG 4 & 13) bersama Maskot Awa.
 */
export class KenaliModel {
  constructor() {
    this.modules = {
      rumahKaca: {
        id: 'rumahKaca',
        tag: 'Konsep Sains 1',
        title: 'Eksperimen Interaktif: Efek Rumah Kaca & Selimut Bumi',
        mascot: 'awa',
        story: `Bayangkan kamu tidur memakai 1 selimut lembut. Rasanya hangat dan nyaman, kan? Itulah fungsi asli <strong>gas rumah kaca</strong>!<br><br>
        Namun saat kita membakar terlalu banyak batubara dan bensin kendaraan, lapisan selimut CO₂ menebal hingga 10 lapis! Panas matahari terperangkap dan bumi menjadi demam.`,
        question: 'Apa fungsi utama gas rumah kaca yang seimbang bagi bumi?',
        optA: 'Menjaga bumi tetap hangat dan ramah untuk makhluk hidup',
        optB: 'Membuat bumi menjadi gelap gulita tanpa cahaya',
        correctIsA: true,
        speech: 'Gas rumah kaca sebenarnya seperti selimut bumi. Tapi kalau terlalu tebal karena polusi, bumi kita akan kepanasan!'
      },
      pemanasanGlobal: {
        id: 'pemanasanGlobal',
        tag: 'Konsep Sains 2',
        title: 'Pemanasan Global: Mengapa Es Kutub Mencair?',
        mascot: 'awa',
        story: `Ketika suhu rata-rata bumi naik, rumah beruang kutub dan penguin di kutub utara serta selatan mulai mencair.<br><br>
        Air lelehan es mengalir ke samudera dan menyebabkan permukaan air laut naik, mengancam pulau-pulau indah di pesisir Indonesia!`,
        question: 'Apa akibat utama jika es di kutub utara dan selatan terus mencair?',
        optA: 'Permukaan air laut naik dan mengancam pulau-pulau pesisir',
        optB: 'Hewan kutub akan berkembang biak dua kali lipat',
        correctIsA: true,
        speech: 'Pemanasan global membuat es kutub mencair dan permukaan air laut perlahan naik mengancam pesisir pantai!'
      },
      energiBersih: {
        id: 'energiBersih',
        tag: 'Konsep Sains 3',
        title: 'Energi Bersih Terbarukan: Hadiah Tanpa Habis dari Alam',
        mascot: 'nala',
        story: `Matahari memancarkan sinar hangat, angin berhembus sejuk, dan air sungai terus mengalir. Ini adalah energi terbarukan!<br><br>
        Berbeda dengan batubara atau minyak bumi, energi matahari dan kincir angin tidak menghasilkan asap hitam pembawa polusi.`,
        question: 'Manakah contoh energi bersih yang ramah lingkungan?',
        optA: 'Sinar matahari dan kincir angin',
        optB: 'Membakar plastik dan bensin fosil',
        correctIsA: true,
        speech: 'Matahari dan angin adalah energi bersih yang tidak pernah habis dan bebas asap polusi!'
      },
      bijakSampah: {
        id: 'bijakSampah',
        tag: 'Konsep Sains 4',
        title: 'Bijak Sampah: Jurus 3R (Reduce, Reuse, Recycle)',
        mascot: 'pila',
        story: `Kantong plastik butuh waktu ratusan tahun untuk terurai di tanah.<br><br>
        Dengan membawa botol minum sendiri (tumbler) dan memilah sampah botol plastik untuk didaur ulang, kamu mencegah tumpukan gas metana di tempat pembuangan akhir!`,
        question: 'Langkah apa yang paling tepat untuk mengurangi sampah plastik di sekolah?',
        optA: 'Membawa botol minum dan kotak makan sendiri dari rumah',
        optB: 'Membeli minuman kemasan plastik baru setiap jam istirahat',
        correctIsA: true,
        speech: 'Bawa botol minum sendiri dari rumah agar sampah plastik tidak menumpuk di bumi kita!'
      }
    };
  }

  getModule(key) {
    return this.modules[key] || this.modules['rumahKaca'];
  }

  getAllKeys() {
    return Object.keys(this.modules);
  }
}

export const kenaliModel = new KenaliModel();
