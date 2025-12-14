import { computed, Injectable, signal } from '@angular/core';
import { GameState } from '../../model/load-game-state-response.model';
import { mapToGame } from '../mapper/game.mapper';
import { Game, Rect, SpriteDetails } from '../model/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _game = signal<Game | undefined>(undefined);
  readonly game = computed(() => this._game());

  async setGameState(gameState: GameState) {
    this._game.set(await mapToGame(gameState));
  }

  async drawFrame(ctx: CanvasRenderingContext2D | undefined) {
    if (!ctx) return;

    this.clearDrawingBoard(ctx);
    const playerGameObject = this._game()?.player;
    if (!playerGameObject) throw Error('Did not load player game object');

    const source = this.calculateSpriteSection(playerGameObject.spriteDetails);
    // TODO: calculate target details
    const target = { x: 120, y: 200, w: 1000, h: 1000 }; // canvas position/size

    this.drawSprite(ctx, playerGameObject.spriteDetails.image, source, target);
  }

  // Returns x, y, width and height within a sprite which is to be rendered
  private calculateSpriteSection(spriteDetail: SpriteDetails): Rect {
    const x = spriteDetail.frameWidth * spriteDetail.nextAnimationCol;
    const y = spriteDetail.frameHeight * spriteDetail.nextAnimationRow;

    return { x, y, w: spriteDetail.frameWidth, h: spriteDetail.frameHeight };
  }

  private drawSprite(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    source: Rect,
    target: Rect
  ) {
    ctx.drawImage(
      image,
      source.x,
      source.y,
      source.w,
      source.h,
      target.x,
      target.y,
      target.w,
      target.h
    );
  }

  private clearDrawingBoard(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
