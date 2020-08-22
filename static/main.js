/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

 import { Flower } from '/static/flower.js';

let a = new Flower('/static/secondflower.svg');
a.getFlower();

let showButton = document.getElementById('show');
let hideButton = document.getElementById('hide');
hideButton.addEventListener('click', function() { a.hideFlower() });
showButton.addEventListener('click', function() { a.showFlower() });
