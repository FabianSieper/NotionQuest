import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnDestroy,
  output,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { GameStatus } from '../../model/game.model';
import { GameService } from '../../services/game.service';
import { GameComponent } from './game.component';

@Component({
  selector: 'app-game-container',
  providers: [GameComponent],
  imports: [GameComponent],
  template: ` <app-game-component [gameStatus]="gameService.status()" /> `,
})
export class GameContainer implements OnDestroy, AfterViewInit {
  readonly gameService = inject(GameService);
  private readonly logger = inject(NGXLogger);

  readonly gameWon = output<void>();
  readonly gameLost = output<void>();

  // The request Animation Frame Id to stop animating
  private rafId: number | undefined = undefined;

  // The context for rendering on the canvas
  private readonly ctx: WritableSignal<CanvasRenderingContext2D | undefined> = signal(undefined);

  private readonly gameComponent = viewChild(GameComponent);

  ngAfterViewInit(): void {
    const gameComponent = this.gameComponent();
    if (!gameComponent) return;

    this.ctx.set(gameComponent.playfield?.getContext('2d') ?? undefined);
  }

  private readonly stopAnimationLoopEffect = effect(() => {
    if (GameStatus.LOST === this.gameService.status()) {
      if (this.rafId) {
        this.logger.info('Stopping animation loop because game was lost.');

        // Stop animatino/computation loop
        cancelAnimationFrame(this.rafId);
        this.rafId = undefined;

        // Content of canvas should become grey
        this.turnContentOfCanvasToGrey();

        // Reset game state and related variables
        this.gameService.reset();

        // Trigger display of lost dialog
        this.gameLost.emit();
      }
    }
  });

  private readonly startAnimationLoopEffect = effect(() => {
    if (!this.ctx() || !this.gameService.isGameDefined()) return;
    this.logger.info('Starting animation loop');
    this.startAnimationLoop();
  });

  private turnContentOfCanvasToGrey() {
    const ctx = this.ctx();
    if (!ctx) return;

    const img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = gray; // keep alpha (data[i+3])
    }

    this.ctx()?.putImageData(img, 0, 0);
  }

  private startAnimationLoop() {
    const loop = () => {
      this.gameService.computationStep(this.ctx());
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
