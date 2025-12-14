import { computed, Injectable, signal } from '@angular/core';
import { GameState } from '../../model/load-game-state-response.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly gameState = signal<GameState | undefined>(undefined);

  setGameState(gameState: GameState) {
    this.gameState.set(gameState);
  }

  drawFrame(ctx: CanvasRenderingContext2D | undefined) {
    if (!ctx) return;

    console.log('Here we go');
    // clear canvas, draw tiles, sprites, etc.
  }

  getGameState = computed(() => this.gameState());
}
