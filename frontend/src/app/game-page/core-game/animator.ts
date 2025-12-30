import { Game, GameElement } from '../model/game.model';

export class Animator {
  public static animateGame(game: Game | undefined) {
    if (!game) return;
    this.animatePlayer(game);
    this.animateEnemies(game);

    // TODO: animate playing board?
  }

  private static animatePlayer(game: Game) {
    this.animateGameElement(game.player);
  }

  private static animateEnemies(game: Game) {
    game.enemies.forEach((enemy) => this.animateGameElement(enemy));
  }

  private static animateGameElement(gameElement: GameElement) {
    // Move from left to right and back within a sprite row
    gameElement.visuals.animationDetails.nextCol =
      (gameElement.visuals.animationDetails.nextCol + 1) %
      gameElement.visuals.spriteDetails.amountCols;
  }
}
