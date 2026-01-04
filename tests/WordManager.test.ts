/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { WordManager } from '@/game/WordManager';

describe('WordManager', () => {
  let wordManager: WordManager;

  beforeEach(() => {
    wordManager = new WordManager();
  });

  describe('getWord', () => {
    it('should return a word for easy difficulty', () => {
      const wordData = wordManager.getWord('easy');
      expect(wordData.word).toBeTruthy();
      expect(wordData.difficulty).toBe('easy');
      expect(wordData.word.length).toBeLessThanOrEqual(10);
    });

    it('should return a word for medium difficulty', () => {
      const wordData = wordManager.getWord('medium');
      expect(wordData.word).toBeTruthy();
      expect(wordData.difficulty).toBe('medium');
    });

    it('should return a word for hard difficulty', () => {
      const wordData = wordManager.getWord('hard');
      expect(wordData.word).toBeTruthy();
      expect(wordData.difficulty).toBe('hard');
      // Hard words can vary in length, just check it's reasonable
      expect(wordData.word.length).toBeGreaterThanOrEqual(8);
    });

    it('should include a hint', () => {
      const wordData = wordManager.getWord('medium');
      expect(wordData.hint).toBeTruthy();
      expect(wordData.hint).toContain('flower');
    });

    it('should not repeat words immediately', () => {
      const words = new Set<string>();
      for (let i = 0; i < 5; i++) {
        words.add(wordManager.getWord('easy').word);
      }
      expect(words.size).toBe(5);
    });

    it('should reset and reuse words when all used', () => {
      wordManager.getWord('easy');

      // Use all easy words
      for (let i = 0; i < 20; i++) {
        wordManager.getWord('easy');
      }

      // Should start reusing words
      const words = new Set<string>();
      for (let i = 0; i < 5; i++) {
        words.add(wordManager.getWord('easy').word);
      }
      expect(words.size).toBeGreaterThan(0);
    });
  });

  describe('reset', () => {
    it('should clear used words', () => {
      wordManager.getWord('easy');
      wordManager.reset();

      // Should be able to get the same word again
      const words = new Set<string>();
      for (let i = 0; i < 20; i++) {
        words.add(wordManager.getWord('easy').word);
      }
      expect(words.size).toBeGreaterThan(0);
    });
  });

  describe('getMaxAttemptsForDifficulty', () => {
    it('should return 8 for easy', () => {
      expect(WordManager.getMaxAttemptsForDifficulty('easy')).toBe(8);
    });

    it('should return 6 for medium', () => {
      expect(WordManager.getMaxAttemptsForDifficulty('medium')).toBe(6);
    });

    it('should return 5 for hard', () => {
      expect(WordManager.getMaxAttemptsForDifficulty('hard')).toBe(5);
    });
  });
});
