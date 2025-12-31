import { GameElement } from '../../model/game.model';

// TODO: also add enemies which extend Entity

export class Entity {
  constructor(protected gameElement: GameElement) {}

  getVisuals() {
    return this.gameElement.visuals;
  }

  getPosition() {
    return this.gameElement.position;
  }

  animate() {
    this.gameElement.visuals.animationDetails.nextCol =
      (this.gameElement.visuals.animationDetails.nextCol + 1) %
      this.gameElement.visuals.spriteDetails.amountCols;
  }
}
