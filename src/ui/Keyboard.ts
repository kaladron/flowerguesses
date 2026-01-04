/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

export class Keyboard {
  private container: HTMLElement;
  private keys: Map<string, HTMLButtonElement> = new Map();
  private onKeyPress: (letter: string) => void;

  private readonly KEYBOARD_LAYOUT = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  constructor(containerId: string, onKeyPress: (letter: string) => void) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.container = element;
    this.onKeyPress = onKeyPress;
    this.createKeyboard();
    this.setupPhysicalKeyboard();
  }

  /**
   * Create on-screen keyboard
   */
  private createKeyboard(): void {
    this.container.innerHTML = '';
    this.container.classList.add('keyboard');

    this.KEYBOARD_LAYOUT.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('keyboard-row');

      row.forEach(letter => {
        const key = document.createElement('button');
        key.textContent = letter;
        key.classList.add('key');
        key.setAttribute('data-key', letter);
        key.setAttribute('aria-label', `Letter ${letter}`);
        key.addEventListener('click', () => this.handleKeyPress(letter));

        this.keys.set(letter, key);
        rowElement.appendChild(key);
      });

      this.container.appendChild(rowElement);
    });
  }

  /**
   * Setup physical keyboard support
   */
  private setupPhysicalKeyboard(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const letter = event.key.toUpperCase();
      if (this.keys.has(letter)) {
        event.preventDefault();
        this.handleKeyPress(letter);
      }
    });
  }

  /**
   * Handle key press
   */
  private handleKeyPress(letter: string): void {
    const key = this.keys.get(letter);
    if (key && !key.disabled) {
      this.onKeyPress(letter);
    }
  }

  /**
   * Mark key as correct
   */
  markCorrect(letter: string): void {
    const key = this.keys.get(letter.toUpperCase());
    if (key) {
      key.classList.add('correct');
      key.disabled = true;
    }
  }

  /**
   * Mark key as incorrect
   */
  markIncorrect(letter: string): void {
    const key = this.keys.get(letter.toUpperCase());
    if (key) {
      key.classList.add('incorrect');
      key.disabled = true;
    }
  }

  /**
   * Reset keyboard
   */
  reset(): void {
    this.keys.forEach(key => {
      key.classList.remove('correct', 'incorrect');
      key.disabled = false;
    });
  }

  /**
   * Disable all keys
   */
  disable(): void {
    this.keys.forEach(key => {
      key.disabled = true;
    });
  }

  /**
   * Enable all keys
   */
  enable(): void {
    this.keys.forEach(key => {
      if (
        !key.classList.contains('correct') &&
        !key.classList.contains('incorrect')
      ) {
        key.disabled = false;
      }
    });
  }
}
