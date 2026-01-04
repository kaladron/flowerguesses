/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

export class FlowerDisplay {
  private container: HTMLElement;
  private petals: SVGElement[] = [];
  private currentPetalIndex = 0;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.container = element;
    this.createFlower();
  }

  /**
   * Create SVG flower
   */
  private createFlower(): void {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.classList.add('flower-svg');

    // Create center circle (always visible)
    const center = this.createCircle(100, 100, 15, '#FFD700');
    svg.appendChild(center);

    // Create 8 petals in a circular pattern
    const petalCount = 8;
    const angleStep = (2 * Math.PI) / petalCount;

    for (let i = 0; i < petalCount; i++) {
      const angle = i * angleStep;
      const petal = this.createPetal(angle, i);
      petal.style.display = 'none'; // Start hidden
      this.petals.push(petal);
      svg.appendChild(petal);
    }

    this.container.appendChild(svg);
  }

  /**
   * Create a petal element
   */
  private createPetal(angle: number, index: number): SVGElement {
    const distance = 50;
    const cx = 100 + distance * Math.cos(angle);
    const cy = 100 + distance * Math.sin(angle);

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('petal');
    group.setAttribute('data-index', index.toString());

    // Create petal shape (ellipse)
    const petal = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'ellipse'
    );
    petal.setAttribute('cx', cx.toString());
    petal.setAttribute('cy', cy.toString());
    petal.setAttribute('rx', '20');
    petal.setAttribute('ry', '35');
    petal.setAttribute('fill', this.getPetalColor(index));
    petal.setAttribute(
      'transform',
      `rotate(${(angle * 180) / Math.PI} ${cx} ${cy})`
    );

    group.appendChild(petal);
    return group;
  }

  /**
   * Create a circle element
   */
  private createCircle(
    cx: number,
    cy: number,
    r: number,
    fill: string
  ): SVGElement {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', r.toString());
    circle.setAttribute('fill', fill);
    return circle;
  }

  /**
   * Get petal color based on index
   */
  private getPetalColor(index: number): string {
    const colors = [
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
    ];
    return colors[index % colors.length];
  }

  /**
   * Show next petal (for incorrect guess)
   */
  showNextPetal(): void {
    if (this.currentPetalIndex < this.petals.length) {
      const petal = this.petals[this.currentPetalIndex];
      petal.style.display = 'inline';
      petal.classList.add('petal-reveal');
      this.currentPetalIndex++;
    }
  }

  /**
   * Reset flower to initial state
   */
  reset(): void {
    this.petals.forEach(petal => {
      petal.style.display = 'none';
      petal.classList.remove('petal-reveal');
    });
    this.currentPetalIndex = 0;
  }

  /**
   * Get number of petals shown
   */
  getPetalsShown(): number {
    return this.currentPetalIndex;
  }

  /**
   * Get total number of petals
   */
  getTotalPetals(): number {
    return this.petals.length;
  }
}
