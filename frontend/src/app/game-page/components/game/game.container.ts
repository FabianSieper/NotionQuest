import { Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-container',
  imports: [],
  template: ` <canvas #playfield width="640" height="640"></canvas> `,
})
export class GameContainer implements OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly logger = inject(NGXLogger);

  // The interval after which new frames are rendered im ms
  private readonly frameInterval = 1000 / 3;

  // Timestamp at which the last drawing was done
  private lastDraw = 0;

  // The request Animation Frame Id to stop animating
  private rafId: number | undefined = undefined;

  // The context for rendering on the canvas
  private ctx: CanvasRenderingContext2D | undefined = undefined;

  @ViewChild('playfield', { static: true })
  private canvas?: ElementRef<HTMLCanvasElement>;

  private readonly startAnimationLoopEffect = effect(() => {
    const game = this.gameService.game();
    const canvas = this.canvas;

    if (game && canvas) {
      this.ctx = canvas.nativeElement.getContext('2d') ?? undefined;
      this.logger.info('Starting animation loop');
      this.startAnimationLoop();
    } else {
      this.logger.warn(
        `Not starint animation loop because either game or canvas is not defined. Game: ${JSON.stringify(
          game
        )}, canvas: ${JSON.stringify(canvas)}`
      );
    }
  });

  startAnimationLoop() {
    const loop = (timestamp: number) => {
      if (timestamp - this.lastDraw >= this.frameInterval) {
        this.lastDraw = timestamp;
        this.gameService.drawFrame(this.ctx);
      }
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }
  }
}
