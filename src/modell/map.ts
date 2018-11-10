'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class Map {
  rndNum: number;
  mapArray: number[][];
  xPos: number;
  yPos: number;
  floor: HTMLImageElement;
  wall: HTMLImageElement;
  level: number;

  constructor () {
    this.mapArray = [
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
      [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 1, 1, 0, 0, 0]
    ];
    this.xPos = 0;
    this.yPos = 0;
    this.floor = document.getElementById('floor') as HTMLImageElement;
    this.wall = document.getElementById('wall') as HTMLImageElement;
    this.level = 1;
  }

  isWall(x: number, y: number): boolean {
    return this.mapArray[x][y] === 1;
  }

  draw() {
    for(let i: number = 0; i < this.mapArray.length; i++) {
      for(let j: number = 0; j < this.mapArray[i].length; j++) {
        if(this.mapArray[i][j] === 0) {
          ctx.drawImage(this.floor, this.xPos, this.yPos, 72, 72);
        } else if(this.mapArray[i][j] === 1) {
          ctx.drawImage(this.wall, this.xPos, this.yPos, 72, 72);
        }
        this.xPos += 72;
      }
      this.xPos = 0;
      this.yPos += 72;
    }
    this.xPos = 0;
    this.yPos = 0;
  }

}
