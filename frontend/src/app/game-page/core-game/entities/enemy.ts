import { GameElement } from '../../model/game.model';
import { Actor } from './Actor';

export class Enemy extends Actor {
  constructor(enemy: GameElement) {
    super(enemy);
  }

  protected lookUp() {
    this.gameElement.visuals.animationDetails.nextRow = 0;
  }

  protected lookDown() {
    this.gameElement.visuals.animationDetails.nextRow = 1;
  }

  protected lookRight() {
    this.gameElement.visuals.animationDetails.nextRow = 2;
  }

  protected lookLeft() {
    this.gameElement.visuals.animationDetails.nextRow = 3;
  }

  protected setIdleAnimation() {
    this.gameElement.visuals.animationDetails.nextCol = 4;
  }
}
