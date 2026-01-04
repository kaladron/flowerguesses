/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Difficulty, WordData } from '@/types/game';

/**
 * Word lists for different difficulty levels
 */
const EASY_WORDS = [
  'ROSE',
  'LILY',
  'IRIS',
  'DAISY',
  'TULIP',
  'PANSY',
  'LOTUS',
  'POPPY',
  'ASTER',
  'PEONY',
  'ORCHID',
  'VIOLET',
  'ZINNIA',
  'COSMOS',
  'DAHLIA',
  'MARIGOLD',
  'SUNFLOWER',
];

const MEDIUM_WORDS = [
  'CARNATION',
  'DAFFODIL',
  'GARDENIA',
  'JASMINE',
  'LAVENDER',
  'MAGNOLIA',
  'NARCISSUS',
  'BEGONIA',
  'CAMELLIA',
  'HIBISCUS',
  'HYACINTH',
  'PRIMROSE',
  'SNAPDRAGON',
  'BLUEBELL',
  'BUTTERCUP',
  'CYCLAMEN',
];

const HARD_WORDS = [
  'CHRYSANTHEMUM',
  'RHODODENDRON',
  'BOUGAINVILLEA',
  'DELPHINIUM',
  'FORSYTHIA',
  'GLADIOLUS',
  'POINSETTIA',
  'AMARYLLIS',
  'HELLEBORE',
  'IMPATIENS',
  'WISTERIA',
  'RANUNCULUS',
  'PROTEA',
  'FREESIA',
  'ANEMONE',
];

export class WordManager {
  private usedWords: Map<Difficulty, Set<string>> = new Map([
    ['easy', new Set()],
    ['medium', new Set()],
    ['hard', new Set()],
  ]);

  /**
   * Get a random word based on difficulty
   */
  getWord(difficulty: Difficulty): WordData {
    const wordList = this.getWordListForDifficulty(difficulty);
    const difficultyUsedWords = this.usedWords.get(difficulty)!;
    const availableWords = wordList.filter(
      word => !difficultyUsedWords.has(word)
    );

    // Reset if all words have been used for this difficulty
    if (availableWords.length === 0) {
      difficultyUsedWords.clear();
      return this.getWord(difficulty);
    }

    const word =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    difficultyUsedWords.add(word);

    return {
      word,
      difficulty,
      hint: this.getHint(word),
    };
  }

  /**
   * Get word list for a specific difficulty
   */
  private getWordListForDifficulty(difficulty: Difficulty): string[] {
    switch (difficulty) {
      case 'easy':
        return EASY_WORDS;
      case 'medium':
        return MEDIUM_WORDS;
      case 'hard':
        return HARD_WORDS;
      default:
        return MEDIUM_WORDS;
    }
  }

  /**
   * Get hint for a word
   */
  private getHint(word: string): string {
    return `A type of flower (${word.length} letters)`;
  }

  /**
   * Reset used words
   */
  reset(): void {
    this.usedWords.get('easy')!.clear();
    this.usedWords.get('medium')!.clear();
    this.usedWords.get('hard')!.clear();
  }

  /**
   * Get maximum attempts for difficulty level
   */
  static getMaxAttemptsForDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
      case 'easy':
        return 8;
      case 'medium':
        return 6;
      case 'hard':
        return 5;
      default:
        return 6;
    }
  }
}
