import { GameElement } from '../../model/game.model';
import { Entity } from './entity';

export class Enemy extends Entity {
  constructor(enemy: GameElement) {
    super(enemy);
  }

  lookUp() {
    this.gameElement.visuals.animationDetails.nextRow = 0;
  }

  lookDown() {
    this.gameElement.visuals.animationDetails.nextRow = 1;
  }

  lookRight() {
    this.gameElement.visuals.animationDetails.nextRow = 2;
  }

  lookLeft() {
    this.gameElement.visuals.animationDetails.nextRow = 3;
  }

  setIdleAnimation() {
    this.gameElement.visuals.animationDetails.nextCol = 4;
  }
}
