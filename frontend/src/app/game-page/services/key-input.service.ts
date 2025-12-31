import { Injectable, WritableSignal } from '@angular/core';
import { Game } from '../model/game.model';

/**
 * This service handles user keyboard input for controlling the game.
 */
@Injectable({ providedIn: 'root' })
export class KeyInputService {
  private lastKeyPressed: string | undefined = undefined;

  private constructor() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event: KeyboardEvent) {
    this.lastKeyPressed = event.key;
  }

  /**
   * Reacting on user input should be instant. This also includes moving the player character.
   */
  public reactOnUserInput(game: WritableSignal<Game | undefined>) {
    if (!this.lastKeyPressed || !game()) return;

    // TODO: user should not be able to move into walls
    switch (this.lastKeyPressed) {
      case 'ArrowUp':
        game()?.player.moveUp();
        break;
      case 'ArrowDown':
        game()?.player.moveDown();
        break;
      case 'ArrowLeft':
        game()?.player.moveLeft();
        break;
      case 'ArrowRight':
        game()?.player.moveRight();
        break;
      default:
        break;
    }

    this.lastKeyPressed = undefined;
  }
}
