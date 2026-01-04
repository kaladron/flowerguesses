/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState } from '@/game/GameState';
import { WordManager } from '@/game/WordManager';
import { StatsManager } from '@/game/StatsManager';
import { FlowerDisplay } from '@/ui/FlowerDisplay';
import { Keyboard } from '@/ui/Keyboard';
import type { Difficulty, GameStateData } from '@/types/game';

export class GameController {
  private gameState: GameState | null = null;
  private wordManager: WordManager;
  private statsManager: StatsManager;
  private flowerDisplay: FlowerDisplay;
  private keyboard: Keyboard;
  private currentDifficulty: Difficulty = 'medium';

  constructor() {
    this.wordManager = new WordManager();
    this.statsManager = new StatsManager();
    this.flowerDisplay = new FlowerDisplay('flower-container');
    this.keyboard = new Keyboard('keyboard-container', letter =>
      this.handleGuess(letter)
    );

    this.setupEventListeners();
    this.showDifficultySelection();
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // New game button
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
      newGameBtn.addEventListener('click', () =>
        this.showDifficultySelection()
      );
    }

    // Stats button
    const statsBtn = document.getElementById('stats-btn');
    if (statsBtn) {
      statsBtn.addEventListener('click', () => this.showStats());
    }

    // Difficulty buttons
    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const btn = document.getElementById(`${difficulty}-btn`);
      if (btn) {
        btn.addEventListener('click', () =>
          this.startNewGame(difficulty as Difficulty)
        );
      }
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Play again button
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        this.closeModals();
        this.showDifficultySelection();
      });
    }
  }

  /**
   * Show difficulty selection screen
   */
  private showDifficultySelection(): void {
    const modal = document.getElementById('difficulty-modal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  /**
   * Start a new game with selected difficulty
   */
  private startNewGame(difficulty: Difficulty): void {
    this.currentDifficulty = difficulty;
    this.closeModals();

    const wordData = this.wordManager.getWord(difficulty);
    const maxAttempts = WordManager.getMaxAttemptsForDifficulty(difficulty);

    this.gameState = new GameState(wordData.word, {
      maxAttempts,
      difficulty,
    });

    // Subscribe to state changes
    this.gameState.subscribe(state => this.updateUI(state));

    // Reset UI
    this.flowerDisplay.reset();
    this.keyboard.reset();
    this.keyboard.enable();

    // Update UI
    this.updateWordDisplay();
    this.updateAttemptsDisplay();
    this.updateDifficultyDisplay();
  }

  /**
   * Handle letter guess
   */
  private handleGuess(letter: string): void {
    if (!this.gameState || this.gameState.getStatus() !== 'playing') {
      return;
    }

    const isCorrect = this.gameState.guessLetter(letter);

    if (isCorrect) {
      this.keyboard.markCorrect(letter);
    } else {
      this.keyboard.markIncorrect(letter);
      this.flowerDisplay.showNextPetal();
    }

    this.updateWordDisplay();
    this.updateAttemptsDisplay();

    // Check game end
    const status = this.gameState.getStatus();
    if (status === 'won' || status === 'lost') {
      this.endGame(status);
    }
  }

  /**
   * Update word display
   */
  private updateWordDisplay(): void {
    if (!this.gameState) return;

    const wordDisplay = document.getElementById('word-display');
    if (wordDisplay) {
      wordDisplay.textContent = this.gameState.getRevealedWord();
    }
  }

  /**
   * Update attempts display
   */
  private updateAttemptsDisplay(): void {
    if (!this.gameState) return;

    const attemptsDisplay = document.getElementById('attempts-display');
    if (attemptsDisplay) {
      const remaining = this.gameState.getRemainingAttempts();
      attemptsDisplay.textContent = `Remaining attempts: ${remaining}`;
    }

    const incorrectDisplay = document.getElementById('incorrect-display');
    if (incorrectDisplay) {
      const incorrect = this.gameState.getIncorrectGuesses();
      incorrectDisplay.textContent =
        incorrect.length > 0 ? `Incorrect: ${incorrect.join(', ')}` : '';
    }
  }

  /**
   * Update difficulty display
   */
  private updateDifficultyDisplay(): void {
    const difficultyDisplay = document.getElementById('difficulty-display');
    if (difficultyDisplay) {
      difficultyDisplay.textContent = `Difficulty: ${this.currentDifficulty.toUpperCase()}`;
    }
  }

  /**
   * Update UI based on state
   */
  private updateUI(_state: GameStateData): void {
    this.updateWordDisplay();
    this.updateAttemptsDisplay();
  }

  /**
   * End game
   */
  private endGame(status: 'won' | 'lost'): void {
    if (!this.gameState) return;

    this.keyboard.disable();

    if (status === 'won') {
      this.statsManager.recordWin();
      this.showGameOverModal(true);
    } else {
      this.statsManager.recordLoss();
      this.showGameOverModal(false);
    }
  }

  /**
   * Show game over modal
   */
  private showGameOverModal(won: boolean): void {
    const modal = document.getElementById('game-over-modal');
    const title = document.getElementById('game-over-title');
    const message = document.getElementById('game-over-message');

    if (modal && title && message && this.gameState) {
      title.textContent = won ? '🌸 You Won! 🌸' : '😢 Game Over';

      const word = this.gameState.getWord();
      const duration = Math.round(this.gameState.getDuration() / 1000);

      if (won) {
        message.textContent = `Congratulations! You guessed the word "${word}" in ${duration} seconds!`;
      } else {
        message.textContent = `The word was "${word}". Better luck next time!`;
      }

      modal.style.display = 'flex';
    }
  }

  /**
   * Show stats modal
   */
  private showStats(): void {
    const modal = document.getElementById('stats-modal');
    const statsContent = document.getElementById('stats-content');

    if (modal && statsContent) {
      const stats = this.statsManager.getStats();

      statsContent.innerHTML = `
        <div class="stat-item">
          <span class="stat-label">Games Played:</span>
          <span class="stat-value">${stats.gamesPlayed}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Games Won:</span>
          <span class="stat-value">${stats.gamesWon}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Win Rate:</span>
          <span class="stat-value">${(stats.winRate * 100).toFixed(1)}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Current Streak:</span>
          <span class="stat-value">${stats.currentStreak}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Max Streak:</span>
          <span class="stat-value">${stats.maxStreak}</span>
        </div>
      `;

      modal.style.display = 'flex';
    }
  }

  /**
   * Close all modals
   */
  private closeModals(): void {
    document.querySelectorAll('.modal').forEach(modal => {
      (modal as HTMLElement).style.display = 'none';
    });
  }
}
