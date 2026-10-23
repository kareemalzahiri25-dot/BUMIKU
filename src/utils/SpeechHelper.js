/**
 * SpeechHelper.js
 * Utilitas Text-to-Speech (TTS) bahasa Indonesia untuk mempermudah anak usia 5-15 tahun belajar.
 */
export class SpeechHelper {
  static speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92;
      utterance.pitch = 1.1; // Sedikit lebih ceria dan ramah anak
      window.speechSynthesis.speak(utterance);
    }
  }

  static stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
