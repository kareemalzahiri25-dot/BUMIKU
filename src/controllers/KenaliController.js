/**
 * KenaliController.js
 * Controller untuk modul pembelajaran "Kenali Bumi" bersama Awa.
 * Mengelola tab materi, simulasi slider selimut atmosfer, suara narasi, dan mini kuis.
 */
import { kenaliModel } from '../models/KenaliModel.js';
import { globalState } from '../models/StateModel.js';
import { sound } from '../utils/AudioSynth.js';
import { SpeechHelper } from '../utils/SpeechHelper.js';

export class KenaliController {
  constructor() {
    this.currentTab = 'rumahKaca';
  }

  selectTab(tabKey, view) {
    sound.playPop();
    this.currentTab = tabKey;
    const data = kenaliModel.getModule(tabKey);

    // Update active tab buttons style
    document.querySelectorAll('.kenali-tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabKey) {
        btn.className = 'kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-black bg-[#0097a7] text-white tactile-btn shadow-xs';
      } else {
        btn.className = 'kenali-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 tactile-btn';
      }
    });

    const badgeTag = document.getElementById('kenaliBadgeTag');
    if (badgeTag) badgeTag.textContent = data.tag;

    const titleEl = document.getElementById('kenaliVisualTitle');
    if (titleEl) titleEl.textContent = data.title;

    const storyEl = document.getElementById('kenaliStoryParagraph');
    if (storyEl) storyEl.innerHTML = data.story;

    const qEl = document.getElementById('kenaliMiniQuestion');
    if (qEl) qEl.textContent = data.question;

    const mascotImg = document.getElementById('kenaliStoryMascot');
    if (mascotImg) {
      const tabMascotMap = {
        rumahKaca: 'public/images/characters/awa_cold_blanket.png',
        pemanasanGlobal: 'public/images/characters/awa_surprised.png',
        energiBersih: 'public/images/characters/nala_floating_smile.png',
        bijakSampah: 'public/images/characters/pila_holding_can.png'
      };
      mascotImg.src = tabMascotMap[tabKey] || 'public/images/characters/awa_standing.png';
    }

    this.renderMiniQuiz(data);
  }

  renderMiniQuiz(data) {
    const container = document.getElementById('kenaliMiniOptionsContainer');
    if (!container) return;

    container.innerHTML = `
      <button id="btnQuizOptA" class="w-full text-left p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 tactile-btn flex items-center justify-between">
        <span>A. ${data.optA}</span>
        <span class="text-slate-400">⚪</span>
      </button>
      <button id="btnQuizOptB" class="w-full text-left p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 tactile-btn flex items-center justify-between">
        <span>B. ${data.optB}</span>
        <span class="text-slate-400">⚪</span>
      </button>
    `;

    container.querySelector('#btnQuizOptA')?.addEventListener('click', (e) => {
      this.evaluateMiniQuiz(data.correctIsA, e.currentTarget);
    });

    container.querySelector('#btnQuizOptB')?.addEventListener('click', (e) => {
      this.evaluateMiniQuiz(!data.correctIsA, e.currentTarget);
    });
  }

  evaluateMiniQuiz(isCorrect, btn) {
    if (isCorrect) {
      sound.playCelebration();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
      btn.className = 'w-full text-left p-3 rounded-2xl bg-emerald-500 text-white font-black text-xs tactile-btn flex items-center justify-between shadow-xs';
      btn.querySelector('span:last-child').textContent = '✓ Benar!';
      SpeechHelper.speak('Hebat sekali! Pemahaman sainsmu tepat!');
      globalState.addEcoPoints(10);
    } else {
      sound.playWrong();
      btn.className = 'w-full text-left p-3 rounded-2xl bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs tactile-btn flex items-center justify-between';
      btn.querySelector('span:last-child').textContent = 'Coba lagi!';
      SpeechHelper.speak('Kurang tepat, coba baca ceritanya sekali lagi ya!');
    }
  }

  updateBlanketSlider(val) {
    const path = document.getElementById('greenhouseBlanketPath');
    const label = document.getElementById('sliderBlanketLabel');
    if (!path || !label) return;

    if (val == 1) {
      path.setAttribute('stroke-width', '4');
      path.setAttribute('stroke', '#38bdf8');
      label.textContent = 'Tipis (Alami & Dingin)';
      label.className = 'text-emerald-700 font-black';
      sound.playTone(440, 0.05, 'sine');
    } else if (val == 2) {
      path.setAttribute('stroke-width', '10');
      path.setAttribute('stroke', '#0284c7');
      label.textContent = 'Sedang (Normal Seimbang)';
      label.className = 'text-cyan-800 font-black';
      sound.playTone(550, 0.05, 'sine');
    } else {
      path.setAttribute('stroke-width', '24');
      path.setAttribute('stroke', '#ef4444');
      label.textContent = 'Sangat Tebal (Pemanasan Ekstrem!)';
      label.className = 'text-rose-700 font-black';
      sound.playTone(280, 0.12, 'sawtooth');
    }
  }

  readSpeech() {
    const data = kenaliModel.getModule(this.currentTab);
    SpeechHelper.speak(data.speech);
  }
}

export const kenaliController = new KenaliController();
