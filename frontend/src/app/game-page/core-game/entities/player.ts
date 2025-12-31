import { GameElement } from '../../model/game.model';
import { Actor } from './Actor';

export class Player extends Actor {
  constructor(player: GameElement) {
    super(player);
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
