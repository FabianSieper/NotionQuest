import { WritableSignal } from '@angular/core';
import { Game, GameElement } from '../model/game.model';

export class Animator {
  public static animateGame(gameSignal: WritableSignal<Game | undefined>) {
    gameSignal.update((game) => {
      if (!game) return game;

      return {
        ...game,
        player: Animator.animateGameElement(game.player),
        enemies: game.enemies.map((enemy) => Animator.animateGameElement(enemy)),
        // TODO: animate playing board?
      };
    });
  }

  private static animateGameElement(gameElement: GameElement): GameElement {
    gameElement.visuals.animationDetails.nextCol =
      (gameElement.visuals.animationDetails.nextCol + 1) %
      gameElement.visuals.spriteDetails.amountCols;
    return gameElement;
  }
}
