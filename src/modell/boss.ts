'use strict';

import { Character } from './character';
import { Map } from './map';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class Boss extends Character {

  constructor(id: number, map: Map) {
    super();
    this.id = id;
    this.level = map.level;
    this.maxHp = (2 * this.level * this.rollDice()) + this.rollDice();
    this.currentHP = this.maxHp;
    this.dp = ((this.level / 2) * this.rollDice()) + (this.rollDice() / 2);
    this.sp = (this.level * this.rollDice()) + this.level;
    this.avatar = document.getElementById('boss') as HTMLImageElement;
    do {
      this.xPos = Math.floor(Math.random() * 10) * 72;
      this.yPos = Math.floor(Math.random() * 10) * 72;

    } while (map.isWall(this.yPos / (canvas.width / 10), this.xPos / (canvas.width / 10)))

  }

  moveRight() { };
  moveLeft() { };
  moveUp() { };
  moveDown() { };


  getHp(): number {
    return this.currentHP;
  }

  getDp(): number {
    return this.dp;
  }

  getSp(): number {
    return this.sp;
  }

  isDead(): boolean {
    if (this.currentHP < 1) {
      return true;
    } else {
      return false;
    }
  }

  getX() {
    return this.xPos;
  }

  getY() {
    return this.yPos
  }

  draw() {
    ctx.drawImage(this.avatar, this.xPos, this.yPos, 72, 72)
  }
}
