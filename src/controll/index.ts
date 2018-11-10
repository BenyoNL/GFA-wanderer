'use strict';
import { Map } from '../modell/map';
import { Hero } from '../modell/hero';
import { Skeleton } from '../modell/skeleton';
import { Display } from '../view/display';

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let d: Display = new Display();
d.renderGame();

function onKeyPress(event: KeyboardEvent) {
  // Handle arrow keys
  switch (event.keyCode) {
    case 37:
      d.hero.moveLeft();
      d.renderMap();
      d.hero.drawLeft();
      d.enemies.forEach((element) => element.draw());
      break;
    case 38:
      d.hero.moveUp();
      d.renderMap();
      d.hero.drawUp();
      d.enemies.forEach((element) => element.draw());
      break;
    case 39:
      d.hero.moveRight();
      d.renderMap();
      d.hero.drawRight();
      d.enemies.forEach((element) => element.draw());
      break;
    case 40:
      d.hero.moveDown();
      d.renderMap();
      d.hero.draw();
      d.enemies.forEach((element) => element.draw());
      break;
    case 32:
      d.getAttackableEnemy();
      d.renderGame();
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);
