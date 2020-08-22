/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

export class Flower {
    #showCursor = 0;
    #filename;

    constructor(filename) {
        this.#filename = filename;
    }


    hideFlower() {
        let layer1 = document.getElementById('layer1');
        let flowerPieces = layer1.children;
        for (let i = 0; i < flowerPieces.length; i++) {
            flowerPieces[i].style.display = 'none';
        }
        this.#showCursor = 0;
    }

    showFlower() {
        let layer1 = document.getElementById('layer1');
        let flowerPieces = layer1.children;
        flowerPieces[this.#showCursor].style.display = 'inline';
        this.#showCursor++;
    }

    getFlower() {
        fetch(this.#filename)
            .then(data => data.text())
            .then(html => document.getElementById('flower').innerHTML = html);
    }

}