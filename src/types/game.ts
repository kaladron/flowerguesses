/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameConfig {
  maxAttempts: number;
  difficulty: Difficulty;
}

export interface GameStateData {
  word: string;
  guessedLetters: Set<string>;
  remainingAttempts: number;
  status: GameStatus;
  difficulty: Difficulty;
  startTime: number;
  endTime?: number;
}

export interface WordData {
  word: string;
  difficulty: Difficulty;
  hint?: string;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  currentStreak: number;
  maxStreak: number;
  winRate: number;
}
