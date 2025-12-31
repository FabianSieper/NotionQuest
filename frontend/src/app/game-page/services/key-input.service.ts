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
    if (!this.lastKeyPressed) return;

    switch (this.lastKeyPressed) {
      case 'ArrowUp':
        // Move player up
        break;
      case 'ArrowDown':
        // Move player down
        break;
      case 'ArrowLeft':
        // Move player left
        break;
      case 'ArrowRight':
        // Move player right
        break;
      default:
        break;
    }
  }
}
