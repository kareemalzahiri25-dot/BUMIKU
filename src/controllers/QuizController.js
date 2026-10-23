/**
 * QuizController.js
 * Controller untuk mengevaluasi kuis aksi iklim SDG 13 dan membuka lencana prestasi.
 */
import { quizModel } from '../models/QuizModel.js';
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';
import { SpeechHelper } from '../utils/SpeechHelper.js';

export class QuizController {
  constructor() {
    this.view = null;
    this.currentIdx = 0;
    this.score = 0;
  }

  setView(view) {
    this.view = view;
  }

  getAllBadges() {
    return quizModel.getBadges();
  }

  getUnlockedBadgeIds() {
    return globalState.getState().badges;
  }

  startQuiz() {
    sound.playPop();
    this.currentIdx = 0;
    this.score = 0;
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.remove('hidden');
    this.renderCurrentQuestion();
  }

  closeQuiz() {
    sound.playPop();
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.add('hidden');
  }

  renderCurrentQuestion() {
    const questions = quizModel.getQuestions();
    const q = questions[this.currentIdx];

    const badgeEl = document.getElementById('quizNumberBadge');
    if (badgeEl) badgeEl.textContent = `Soal ${this.currentIdx + 1} dari ${questions.length}`;

    const textEl = document.getElementById('quizQuestionText');
    if (textEl) textEl.textContent = q.q;

    const listEl = document.getElementById('quizOptionsList');
    if (!listEl) return;
    listEl.innerHTML = '';

    const msgEl = document.getElementById('quizResultMsg');
    if (msgEl) msgEl.classList.add('hidden');

    q.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full text-left p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 tactile-btn flex items-center justify-between transition-colors';
      btn.innerHTML = `
        <span>${String.fromCharCode(65 + idx)}. ${opt}</span>
        <span class="text-slate-400">⚪</span>
      `;

      btn.onclick = () => this.handleAnswer(idx, btn);
      listEl.appendChild(btn);
    });
  }

  handleAnswer(selectedIdx, btnEl) {
    const questions = quizModel.getQuestions();
    const q = questions[this.currentIdx];
    const msgEl = document.getElementById('quizResultMsg');

    if (selectedIdx === q.answer) {
      sound.playCelebration();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
      }
      this.score += 1;
      btnEl.className = 'w-full text-left p-3.5 rounded-2xl bg-emerald-500 text-white font-black text-xs tactile-btn flex items-center justify-between shadow-xs';
      btnEl.querySelector('span:last-child').textContent = '✓ Benar!';

      if (msgEl) {
        msgEl.textContent = q.exp;
        msgEl.className = 'text-xs font-bold text-emerald-800 bg-emerald-100 p-3 rounded-2xl block';
        msgEl.classList.remove('hidden');
      }

      setTimeout(() => {
        this.currentIdx++;
        if (this.currentIdx < questions.length) {
          this.renderCurrentQuestion();
        } else {
          this.finishQuiz();
        }
      }, 1200);
    } else {
      sound.playWrong();
      btnEl.className = 'w-full text-left p-3.5 rounded-2xl bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs tactile-btn flex items-center justify-between';
      btnEl.querySelector('span:last-child').textContent = 'Coba lagi!';
    }
  }

  finishQuiz() {
    sound.playCelebration();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
    }

    globalState.addEcoPoints(30);
    globalState.unlockBadge('duta_sdg13');

    if (this.view) {
      this.view.renderBadges();
    }

    SpeechHelper.speak(
      'Selamat! Kamu berhasil menjawab kuis sains iklim dan membuka Lencana Emas Duta Iklim Cilik SDG 13!'
    );

    this.closeQuiz();
  }
}

export const quizController = new QuizController();
