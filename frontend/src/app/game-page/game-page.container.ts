import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { GamePageComponent } from './game-page.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-game-page-container',
  imports: [GamePageComponent],
  template: ` <app-game-page-component
    [isInitialGameStateLoading]="isInitialGameStateLoading()"
    [warning]="warning()"
  />`,
})
export class GamePageContainer {
  private readonly logger = inject(NGXLogger);
  private readonly route = inject(ActivatedRoute);
  private readonly backendService = inject(BackendService);
  private readonly gameService = inject(GameService);

  protected readonly isInitialGameStateLoading = signal(false);
  protected readonly warning = signal<string | undefined>(undefined);

  private readonly gameId: Signal<string | undefined> = toSignal(
    this.route.paramMap.pipe(map((map) => map.get('gameId') ?? undefined))
  );

  loadGameOnGameIdChange = effect(async () => {
    const gameId = this.gameId();

    if (!gameId) {
      this.logger.warn('Game id is undefined; Not loading game.');
      return;
    }

    this.isInitialGameStateLoading.set(true);

    try {
      this.logger.info(`Loading game with game id ${gameId}`);
      const loadedGame = await this.backendService.loadGameStateFromCache(gameId);
      this.gameService.setGameState(loadedGame);
      this.logger.info(`Successfully loaded game with ${gameId}`);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        // TODO: remov
        if (error.status == 404) {
          this.logger.error(`Game with gameId ${gameId} was not found.`);
          this.warning.set(`Game with gameId \n'${gameId}'\nwas not found.`);
        }
      } else {
        this.logger.error(
          `Failed to load game with game id ${gameId}. Received error: ${JSON.stringify(error)}`
        );
      }
    }

    this.isInitialGameStateLoading.set(false);
  });
}
