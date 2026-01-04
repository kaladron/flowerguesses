/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '@/game/GameState';
import type { GameConfig } from '@/types/game';

describe('GameState', () => {
  let gameState: GameState;
  let config: GameConfig;

  beforeEach(() => {
    config = {
      maxAttempts: 6,
      difficulty: 'medium',
    };
    gameState = new GameState('ROSE', config);
  });

  describe('initialization', () => {
    it('should initialize with correct word', () => {
      expect(gameState.getWord()).toBe('ROSE');
    });

    it('should start with playing status', () => {
      expect(gameState.getStatus()).toBe('playing');
    });

    it('should have correct remaining attempts', () => {
      expect(gameState.getRemainingAttempts()).toBe(6);
    });

    it('should have correct difficulty', () => {
      expect(gameState.getDifficulty()).toBe('medium');
    });
  });

  describe('guessLetter', () => {
    it('should return true for correct guess', () => {
      expect(gameState.guessLetter('R')).toBe(true);
    });

    it('should return false for incorrect guess', () => {
      expect(gameState.guessLetter('X')).toBe(false);
    });

    it('should return false for duplicate guess', () => {
      gameState.guessLetter('R');
      expect(gameState.guessLetter('R')).toBe(false);
    });

    it('should decrease attempts on incorrect guess', () => {
      gameState.guessLetter('X');
      expect(gameState.getRemainingAttempts()).toBe(5);
    });

    it('should not decrease attempts on correct guess', () => {
      gameState.guessLetter('R');
      expect(gameState.getRemainingAttempts()).toBe(6);
    });

    it('should handle lowercase letters', () => {
      expect(gameState.guessLetter('r')).toBe(true);
    });
  });

  describe('game status', () => {
    it('should set status to won when all letters guessed', () => {
      gameState.guessLetter('R');
      gameState.guessLetter('O');
      gameState.guessLetter('S');
      gameState.guessLetter('E');
      expect(gameState.getStatus()).toBe('won');
    });

    it('should set status to lost when out of attempts', () => {
      'XYZWVT'.split('').forEach(letter => gameState.guessLetter(letter));
      expect(gameState.getStatus()).toBe('lost');
    });

    it('should not allow guesses after game ends', () => {
      'XYZWVT'.split('').forEach(letter => gameState.guessLetter(letter));
      expect(gameState.guessLetter('R')).toBe(false);
    });
  });

  describe('getRevealedWord', () => {
    it('should show underscores for unguessed letters', () => {
      expect(gameState.getRevealedWord()).toBe('_ _ _ _');
    });

    it('should reveal correct letters', () => {
      gameState.guessLetter('R');
      expect(gameState.getRevealedWord()).toBe('R _ _ _');
    });

    it('should reveal all instances of a letter', () => {
      const gs = new GameState('LILLY', config);
      gs.guessLetter('L');
      expect(gs.getRevealedWord()).toBe('L _ L L _');
    });
  });

  describe('getIncorrectGuesses', () => {
    it('should return empty array initially', () => {
      expect(gameState.getIncorrectGuesses()).toEqual([]);
    });

    it('should track incorrect guesses', () => {
      gameState.guessLetter('X');
      gameState.guessLetter('Y');
      expect(gameState.getIncorrectGuesses()).toEqual(['X', 'Y']);
    });

    it('should not include correct guesses', () => {
      gameState.guessLetter('R');
      gameState.guessLetter('X');
      expect(gameState.getIncorrectGuesses()).toEqual(['X']);
    });
  });

  describe('getDuration', () => {
    it('should return a positive duration', () => {
      expect(gameState.getDuration()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('state subscription', () => {
    it('should notify subscribers on state change', () => {
      let notified = false;
      gameState.subscribe(() => {
        notified = true;
      });
      gameState.guessLetter('R');
      expect(notified).toBe(true);
    });

    it('should allow unsubscribe', () => {
      let count = 0;
      const unsubscribe = gameState.subscribe(() => {
        count++;
      });
      gameState.guessLetter('R');
      unsubscribe();
      gameState.guessLetter('O');
      expect(count).toBe(1);
    });
  });
});
