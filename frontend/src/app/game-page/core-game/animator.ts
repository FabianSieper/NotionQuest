import { WritableSignal } from '@angular/core';
import { Game } from '../model/game.model';

export class Animator {
  public static animateGame(gameSignal: WritableSignal<Game | undefined>) {
    gameSignal()?.player.animate();
    gameSignal()?.enemies.forEach((enemy) => enemy.animate());
    // TODO: animate playing board?
  }
}
