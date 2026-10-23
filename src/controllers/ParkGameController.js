/**
 * ParkGameController.js
 * Controller untuk mengendalikan jalannya game "Taman Aksi Hijau".
 * Menangani klik item interaktif, menghitung persentase kebersihan, memicu suara audio,
 * memperbarui state global, dan mengevaluasi target 100%.
 */
import { parkGameModel } from '../models/ParkGameModel.js';
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';
import { SpeechHelper } from '../utils/SpeechHelper.js';

export class ParkGameController {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  getItems() {
    return parkGameModel.getItems();
  }

  getProgress() {
    return parkGameModel.getProgress();
  }

  handleItemClick(itemId, el) {
    const item = parkGameModel.getItemById(itemId);
    if (!item || item.cleaned) return;

    // Bersihkan item di model
    const cleanedItem = parkGameModel.cleanItem(itemId);
    if (!cleanedItem) return;

    // 1. Putar efek suara yang relevan
    if (cleanedItem.type === 'trash') {
      sound.playTrashDump();
      setTimeout(() => sound.playCoin(), 120);
    } else if (cleanedItem.type === 'vehicle') {
      sound.playBikeBell();
      setTimeout(() => sound.playCoin(), 150);
    } else {
      sound.playPlantTree();
      setTimeout(() => sound.playCoin(), 200);
      globalState.incrementTrees();
    }

    // 2. Efek konfeti di layar
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.55 }
      });
    }

    // 3. Perbarui State Global (Poin, Suhu Bumi, CO2 dicegah)
    globalState.addEcoPoints(cleanedItem.points);
    globalState.reduceEarthTemp(cleanedItem.tempDrop);
    globalState.addCo2Saved(cleanedItem.co2);

    // 4. Ucapkan suara edukatif ramah anak
    SpeechHelper.speak(cleanedItem.speech);

    // 5. Perbarui tampilan di View
    const progress = parkGameModel.getProgress();
    if (this.view) {
      this.view.showMascotSpeech(cleanedItem.mascot, cleanedItem.name, cleanedItem.speech);
      this.view.updateProgress(progress);
    }

    // 6. Evaluasi jika target 100% kebersihan tercapai
    if (progress.isCompleted) {
      this.handleTargetAchieved();
    }
  }

  handleTargetAchieved() {
    sound.playCelebration();
    globalState.unlockBadge('arsitek_taman');
    globalState.addEcoPoints(50);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }

    setTimeout(() => {
      SpeechHelper.speak(
        'Hore! Selamat! Kamu berhasil mencapai target 100% kebersihan di Taman Aksi Hijau! Lencana Arsitek Taman Asri kini menjadi milikmu!'
      );
    }, 400);
  }

  resetGame() {
    sound.playPop();
    parkGameModel.reset();
    const progress = parkGameModel.getProgress();
    if (this.view) {
      this.view.updateProgress(progress);
      this.view.showMascotSpeech(
        'terra',
        'Simulasi Diatur Ulang',
        'Taman kembali membutuhkan bantuanmu. Ayo bersihkan sampah dan tanam pohon lagi!'
      );
    }
    SpeechHelper.speak('Simulasi taman diatur ulang. Ayo selamatkan taman kota lagi!');
  }
}

export const parkGameController = new ParkGameController();
