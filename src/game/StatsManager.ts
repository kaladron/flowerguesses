/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import type { GameStats } from '@/types/game';

const STATS_KEY = 'flowerguesses_stats';

export class StatsManager {
  private stats: GameStats;

  constructor() {
    this.stats = this.loadStats();
  }

  /**
   * Load stats from localStorage
   */
  private loadStats(): GameStats {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }

    return {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      currentStreak: 0,
      maxStreak: 0,
      winRate: 0,
    };
  }

  /**
   * Save stats to localStorage
   */
  private saveStats(): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  /**
   * Record a game win
   */
  recordWin(): void {
    this.stats.gamesPlayed++;
    this.stats.gamesWon++;
    this.stats.currentStreak++;
    this.stats.maxStreak = Math.max(
      this.stats.maxStreak,
      this.stats.currentStreak
    );
    this.updateWinRate();
    this.saveStats();
  }

  /**
   * Record a game loss
   */
  recordLoss(): void {
    this.stats.gamesPlayed++;
    this.stats.gamesLost++;
    this.stats.currentStreak = 0;
    this.updateWinRate();
    this.saveStats();
  }

  /**
   * Update win rate
   */
  private updateWinRate(): void {
    if (this.stats.gamesPlayed > 0) {
      this.stats.winRate = this.stats.gamesWon / this.stats.gamesPlayed;
    }
  }

  /**
   * Get current stats
   */
  getStats(): GameStats {
    return { ...this.stats };
  }

  /**
   * Reset all stats
   */
  reset(): void {
    this.stats = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      currentStreak: 0,
      maxStreak: 0,
      winRate: 0,
    };
    this.saveStats();
  }
}
