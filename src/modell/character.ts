'use strict';

export abstract class Character {
  id: number;
  maxHp: number;
  currentHP: number;
  dp: number;
  sp: number;
  damage: number;
  avatar: HTMLImageElement;
  xPos: number;
  yPos: number;
  level: number;
  hasKey: boolean;

  constructor() {
    this.damage = (2 * this.rollDice()) + this.sp;
    this.currentHP = this.maxHp;
  }
  abstract moveRight(): void;

  abstract moveLeft(): void;

  abstract moveUp(): void;

  abstract moveDown(): void;

  abstract getHp(): number;

  abstract getDp(): number;

  abstract getSp(): number;

  abstract isDead(): boolean;

  abstract draw(): void;

  abstract getX(): number;

  abstract getY(): number;

  rollDice() {
    let d6: number = Math.floor(1 + Math.random() * 6);
    return d6;
  }

}
