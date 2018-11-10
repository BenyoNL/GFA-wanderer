'use strict';
import { Hero } from '../modell/hero';
import { Map } from '../modell/map';
import { Skeleton } from '../modell/skeleton';
import { Character } from '../modell/character';
import { Boss } from '../modell/boss';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class Display {
  map: Map;
  hero: Hero;
  enemies: Character[];
  boss: Boss;
  constructor() {
    // this.map = new Map();
    this.hero = new Hero();
    this.newEnemy();
    // this.enemies = [];
    // for (let i: number = 0; i < Math.floor(3 + Math.random() * 6); i++) {
    //   this.enemies.push(new Skeleton(i, this.map));
    //   if (i === 0) {
    //     this.enemies[i].hasKey = true;
    //   }
    // }
    // this.enemies.push(new Boss(this.enemies.length, this.map));
  }

  newEnemy () {
    this.map = new Map();
    this.enemies= [];
    for (let i: number = 0; i < Math.floor(3 + Math.random() * 6); i++) {
      this.enemies.push(new Skeleton(i, this.map));
      if (i === 0) {
        this.enemies[i].hasKey = true;
      }
    }
    this.enemies.push(new Boss(this.enemies.length, this.map));
  }

  renderGame() {
    if (this.hero.currentHP < 1) {
      this.toggleDefeat();
    } else if (this.enemies.length === 0 && this.hero.currentHP > 0) {
      this.nextLevel();
    }
    this.renderMap();
    this.hero.draw();
  }

  renderMap() {
    this.writeToDoc();
    this.map.draw();
    this.enemies.forEach((element) => element.draw());
    if (this.checkEnemy() > -1) {
      document.getElementById('hud2').innerHTML = `
      <h3> The Enemy </h3>
      <p>--------------------------------</p>
      <p>Enemey level: ${this.enemies[this.checkEnemy()].level}</p>
      <p>Enemey HP: ${this.enemies[this.checkEnemy()].getHp()}/${this.enemies[this.checkEnemy()].maxHp}</p>
      <p>Enemey DP: ${this.enemies[this.checkEnemy()].getDp()}</p>
      <p>Enemey SP: ${this.enemies[this.checkEnemy()].getSp()}</p>
      <p>--------------------------------</p>`;
    }
  }



  writeToDoc() {
    document.getElementById('hud1').innerHTML = `
    <h3>| The Hero </h3>
    <p>|--------------------------------</p>
    <p>|Hero level: ${this.hero.level}</p>
    <p>|Hero HP: ${this.hero.getHp()}/${this.hero.maxHp}</p>
    <p>|Hero DP: ${this.hero.getDp()}</p>
    <p>|Hero SP: ${this.hero.getSp()}</p>
    <p>|--------------------------------</p>`;
    document.getElementById('hud2').innerHTML = `
    <h3> The Enemy </h3>
    <p>--------------------------------</p>`;
  }

  battle(id: number) {
    let heroDMG = this.hero.sp + (2* this.hero.rollDice());
    let enemyDMG = this.enemies[id].sp + (2 * this.enemies[id].rollDice());
    if (this.hero.currentHP > 0) {
      if (heroDMG > this.enemies[id].dp) {
        this.enemies[id].currentHP -= heroDMG;
        if (this.hero.dp < enemyDMG) {
          this.hero.currentHP -= enemyDMG;
        }
        if (this.enemies[id].isDead()) {
          if(this.enemies[id].hasKey) {
            this.hero.hasKey = true;
          }
          if (this.enemies[id] instanceof Boss) {
            this.hero.killedBoss();
          }
          this.enemies[id].avatar = document.getElementById('tombstone') as HTMLImageElement;
          this.hero.levelUp();
          this.enemies.splice(id, 1);
        } 
      }
    }

  }

  checkEnemy(): number {
    let id: number = -1;
    for (let i: number = 0; i < this.enemies.length; i++) {
      if (this.hero.xPos === this.enemies[i].getX() && this.hero.yPos === this.enemies[i].getY()) {
        id = i;
        return id;
      }
    }

  }

  getAttackableEnemy() {
    let attackableEnemies: Character[] = this.enemies.filter((e) => this.hero.xPos === e.getX() && this.hero.yPos === e.getY());

    if (this.checkEnemy() >= 0) {
      if (this.enemies[this.checkEnemy()].currentHP !== 0) {
        this.battle(this.checkEnemy());
      }
    }
  }

  toggleDefeat() {
    let defeatContainer = document.getElementById('defeat-container') as HTMLImageElement;
    let defeat = document.getElementById('defeat') as HTMLImageElement;
    if (defeatContainer.style.display === 'flex') {
        defeatContainer.style.display = 'none';
    } else {
        defeatContainer.style.display = 'flex';
    }
  }

  toggleKey() {
  let keyContainer = document.getElementById('key-container') as HTMLImageElement;
  let key = document.getElementById('key') as HTMLImageElement;
  }

  nextLevel() {
    this.hero.xPos = 0;
    this.hero.yPos = 0;
    if(this.healRoller() === 1) {
      this.hero.currentHP = this.hero.maxHp;
    } else if (this.healRoller() === 0.5){
      this.hero.currentHP += Math.floor(this.hero.maxHp / 3);
    } else if (this.healRoller() === 0.1) {
      this.hero.currentHP += Math.floor((this.hero.maxHp / 100) * 10);
    }
    this.map.level++; 
    this.newEnemy();
  }

  healRoller() {
    let roll = Math.random();
    let betterRoll = Math.round(roll*10)/10
    return betterRoll;
  }
}
