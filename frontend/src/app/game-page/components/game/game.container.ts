import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-container',
  imports: [],
  template: ` <canvas #playfield width="640" height="640"></canvas> `,
})
export class GameContainer implements AfterViewInit, OnDestroy {
  private readonly gameService = inject(GameService);

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

  ngAfterViewInit(): void {
    const gameState = this.gameService.getGameState();

    if (gameState && this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d') ?? undefined;
      this.startAnimationLoop();
    } else if (gameState) {
      // TODO: display error that canvas is not defined yet
    } else {
      // TODO: display error that game state is undefined
    }
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }
  }
}
