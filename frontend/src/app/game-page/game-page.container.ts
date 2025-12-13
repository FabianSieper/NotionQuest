import { Component, effect, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs';
import { GameState } from '../model/load-game-state-response.model';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-game-page-container',
  imports: [],
  template: ``,
})
export class GamePageContainer {
  private readonly logger = inject(NGXLogger);
  private readonly route = inject(ActivatedRoute);
  private readonly backendService = inject(BackendService);

  private readonly isGameLoading = signal(false);
  private readonly loadedGame = signal<GameState | undefined>(undefined);

  private readonly gameId: Signal<string | undefined> = toSignal(
    this.route.paramMap.pipe(map((map) => map.get('gameId') ?? undefined))
  );

  loadGameOnGameIdChange = effect(async () => {
    const gameId = this.gameId();

    if (!gameId) {
      this.logger.warn('Game id is undefined; Not loading game.');
      return;
    }

    this.isGameLoading.set(true);

    try {
      this.logger.info(`Loading game with game id ${gameId}`);
      const loadedGame = await this.backendService.getGameState(gameId);
      this.loadedGame.set(loadedGame);
      this.logger.info(`Successfully loaded game with ${gameId}`);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          this.logger.error(`Game with gameId ${gameId} was not found.`);
        }
      } else {
        this.logger.error(
          `Failed to load game with game id ${gameId}. Received error: ${JSON.stringify(error)}`
        );
      }
      // TODO: catch http 404
      // TODO: add response error message
    }

    this.isGameLoading.set(false);
  });
}
