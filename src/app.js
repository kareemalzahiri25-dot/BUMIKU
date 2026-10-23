/**
 * app.js
 * Titik masuk utama aplikasi (Application Bootstrap).
 * Menginisialisasi komponen Model, View, dan Controller dalam satu kesatuan sistem modular.
 */
import { appController } from './controllers/AppController.js';
import { parkGameController } from './controllers/ParkGameController.js';
import { kenaliController } from './controllers/KenaliController.js';
import { quizController } from './controllers/QuizController.js';

import { HomeView } from './views/HomeView.js';
import { KenaliBumiView } from './views/KenaliBumiView.js';
import { TamanAksiView } from './views/TamanAksiView.js';
import { MisiPahlawanView } from './views/MisiPahlawanView.js';

// Inisialisasi Views dengan Dependency Injection Controller
const homeView = new HomeView(appController);
const kenaliBumiView = new KenaliBumiView(kenaliController, appController);
const tamanAksiView = new TamanAksiView(parkGameController, appController);
const misiPahlawanView = new MisiPahlawanView(quizController, appController);

// Hubungkan balik View ke Controller terkait
parkGameController.setView(tamanAksiView);
quizController.setView(misiPahlawanView);

// Daftarkan seluruh View ke AppController
appController.registerViews({
  viewHome: homeView,
  viewKenaliBumi: kenaliBumiView,
  viewTamanAksi: tamanAksiView,
  viewMisiPahlawan: misiPahlawanView
});

// Jalankan aplikasi saat dokumen siap
window.addEventListener('DOMContentLoaded', () => {
  appController.init();
});
