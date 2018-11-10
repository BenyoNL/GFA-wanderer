'use strict';
import { Character } from './character';
import { Map } from './map';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class Skeleton extends Character {
  id: number;
  hasKey: boolean;
  constructor(id: number, map: Map) {
    super();
    this.level = map.level;
    this.id = id;
    this.maxHp = 2 * this.level * this.rollDice();
    this.currentHP = this.maxHp;
    this.dp = this.level / 2 * this.rollDice();
    this.sp = this.level * this.rollDice();
    this.avatar = document.getElementById('skeleton') as HTMLImageElement;
    this.hasKey = false;
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
      this.hasKey = false;
      return true;
    } else {
      return false;
    }
  }
  getX() {
    return this.xPos;
  }

  getY() {
    return this.yPos;
  }

  draw() {
    ctx.drawImage(this.avatar, this.xPos, this.yPos, 72, 72)
  }
}
