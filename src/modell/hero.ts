'use strict';
import { Character } from './character';
import { Map } from './map';
import { Skeleton } from './skeleton';
import { Display } from '../view/display';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class Hero extends Character {
  left: HTMLImageElement;
  right: HTMLImageElement;
  up: HTMLImageElement;
  down: HTMLImageElement;
  map: Map;
  floor: HTMLImageElement;
  display: Display;
  bossIsKilled: boolean;
  constructor() {
    super();
    this.maxHp = 20 + (3 * this.rollDice());
    this.currentHP = this.maxHp;
    this.dp = 2 * this.rollDice();
    this.sp = 5 + this.rollDice();
    this.damage = this.sp + 2 * this.rollDice();
    this.down = document.getElementById('hero-down') as HTMLImageElement;
    this.left = document.getElementById('hero-left') as HTMLImageElement;
    this.right = document.getElementById('hero-right') as HTMLImageElement;
    this.up = document.getElementById('hero-up') as HTMLImageElement;
    this.floor = document.getElementById('floor') as HTMLImageElement;
    this.xPos = 0;
    this.yPos = 0;
    this.level = 1;
    this.hasKey = false;
    this.bossIsKilled = false;
    this.map = new Map();
  }
  // Movin right => collosion detection with canvas and walls
  moveRight() {
    if (this.xPos < canvas.width - canvas.width / 10 && this.map.mapArray[Math.round(this.yPos / (canvas.width / 10))][Math.round((this.xPos + canvas.width / 10)) / (canvas.width / 10)] === 0) {
      ctx.drawImage(this.floor, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
      this.xPos += canvas.width / 10;
      ctx.drawImage(this.right, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
    }
  }
  // Movin left => collosion detection with canvas and walls
  moveLeft() {
    if (this.xPos > 0 && this.map.mapArray[Math.round(this.yPos / (canvas.width / 10))][Math.round((this.xPos - canvas.width / 10)) / (canvas.width / 10)] === 0) {
      ctx.drawImage(this.floor, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
      this.xPos -= canvas.width / 10;
      ctx.drawImage(this.left, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
    }
  }
  // Movin up => collosion detection with canvas and walls
  moveUp() {
    if (this.yPos > 0 && this.map.mapArray[Math.round(this.yPos / (canvas.width / 10)) - 1][Math.round((this.xPos - canvas.width / 10)) / (canvas.width / 10) + 1] === 0) {
      ctx.drawImage(this.floor, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
      this.yPos -= canvas.width / 10;
      ctx.drawImage(this.up, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
    }
  }
  // Movin down => collosion detection with canvas and walls
  moveDown() {
    if (this.yPos < canvas.height - canvas.height / 10 && this.map.mapArray[Math.round(this.yPos / (canvas.width / 10)) + 1][Math.round((this.xPos - canvas.width / 10)) / (canvas.width / 10) + 1] === 0) {
      ctx.drawImage(this.floor, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
      this.yPos += canvas.width / 10;
      ctx.drawImage(this.down, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
    }
  }

  levelUp() {
    this.level++;
    this.maxHp += this.rollDice();
    this.dp += this.rollDice();
    this.sp += this.rollDice();
  }

  getHp(): number {
    return this.currentHP;
  }

  getDp(): number {
    return this.dp;
  }

  getSp(): number {
    return this.sp;
  }

  killedBoss () {
    this.bossIsKilled = true;
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
    ctx.drawImage(this.down, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
  }

  drawUp() {
    ctx.drawImage(this.up, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
  }

  drawLeft() {
    ctx.drawImage(this.left, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
  }

  drawRight() {
    ctx.drawImage(this.right, this.xPos, this.yPos, canvas.width / 10, canvas.width / 10);
  }
}
