import { GameElement } from '../../model/game.model';
import { Entity } from './entity';

/**
 * An actor is a an entity which can perform actions in the game, like a player or a NPC.
 */
export abstract class Actor extends Entity {
  constructor(gameElement: GameElement) {
    super(gameElement);
  }

  moveUp() {
    this.lookUp();
    this.gameElement.position.y -= 1;
  }

  moveDown() {
    this.lookDown();
    this.gameElement.position.y += 1;
  }

  moveLeft() {
    this.lookLeft();
    this.gameElement.position.x -= 1;
  }
  moveRight() {
    this.lookRight();
    this.gameElement.position.x += 1;
  }

  protected abstract lookUp(): void;
  protected abstract lookDown(): void;
  protected abstract lookRight(): void;
  protected abstract lookLeft(): void;
  protected abstract setIdleAnimation(): void;
}
