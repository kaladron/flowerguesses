/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  GameConfig,
  GameStateData,
  GameStatus,
  Difficulty,
} from '@/types/game';

export class GameState {
  private state: GameStateData;
  private listeners: Set<(state: GameStateData) => void> = new Set();

  constructor(word: string, config: GameConfig) {
    this.state = {
      word: word.toUpperCase(),
      guessedLetters: new Set(),
      remainingAttempts: config.maxAttempts,
      status: 'playing',
      difficulty: config.difficulty,
      startTime: Date.now(),
    };
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: GameStateData) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state change
   */
  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * Get current game state (immutable copy)
   */
  getState(): GameStateData {
    return {
      ...this.state,
      guessedLetters: new Set(this.state.guessedLetters),
    };
  }

  /**
   * Make a guess for a letter
   */
  guessLetter(letter: string): boolean {
    if (this.state.status !== 'playing') {
      return false;
    }

    const upperLetter = letter.toUpperCase();

    // Already guessed
    if (this.state.guessedLetters.has(upperLetter)) {
      return false;
    }

    this.state.guessedLetters.add(upperLetter);

    // Check if letter is in word
    const isCorrect = this.state.word.includes(upperLetter);

    if (!isCorrect) {
      this.state.remainingAttempts--;
    }

    // Check win/loss conditions
    this.updateGameStatus();
    this.notify();

    return isCorrect;
  }

  /**
   * Update game status based on current state
   */
  private updateGameStatus(): void {
    if (this.state.remainingAttempts <= 0) {
      this.state.status = 'lost';
      this.state.endTime = Date.now();
      return;
    }

    // Check if all letters have been guessed
    const allLettersGuessed = this.state.word
      .split('')
      .every(letter => this.state.guessedLetters.has(letter));

    if (allLettersGuessed) {
      this.state.status = 'won';
      this.state.endTime = Date.now();
    }
  }

  /**
   * Get the revealed word with underscores for unguessed letters
   */
  getRevealedWord(): string {
    return this.state.word
      .split('')
      .map(letter => (this.state.guessedLetters.has(letter) ? letter : '_'))
      .join(' ');
  }

  /**
   * Get array of incorrect guesses
   */
  getIncorrectGuesses(): string[] {
    return Array.from(this.state.guessedLetters).filter(
      letter => !this.state.word.includes(letter)
    );
  }

  /**
   * Get game status
   */
  getStatus(): GameStatus {
    return this.state.status;
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(): number {
    return this.state.remainingAttempts;
  }

  /**
   * Get the actual word
   */
  getWord(): string {
    return this.state.word;
  }

  /**
   * Get difficulty level
   */
  getDifficulty(): Difficulty {
    return this.state.difficulty;
  }

  /**
   * Get game duration in milliseconds
   */
  getDuration(): number {
    const endTime = this.state.endTime || Date.now();
    return endTime - this.state.startTime;
  }
}
