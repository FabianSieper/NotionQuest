import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GameState } from '../model/load-game-state-response.model';
import { LoadNotionGameRequest } from '../model/load-notion-game-request.model';
import { LoadNotionGameResponse } from '../model/load-notion-game-response.model';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private baseUrl: string = 'http://localhost:8080';

  private httpClient = inject(HttpClient);

  loadInitialPlayingBoard(notionUrl: string): Promise<LoadNotionGameResponse> {
    const body: LoadNotionGameRequest = { notionUrl };
    return firstValueFrom(
      this.httpClient.post<LoadNotionGameResponse>(this.getLoadInitialPlayingBoardUrl(), body)
    );
  }

  loadGameState(gameId: string): Promise<GameState> {
    return firstValueFrom(this.httpClient.get<GameState>(this.getLoadGameStateUrl + gameId));
  }

  getLoadGameStateUrl() {
    return `${this.baseUrl}/api/loadGameState/`;
  }

  getLoadInitialPlayingBoardUrl() {
    return `${this.baseUrl}/api/loadNotionGame`;
  }
}
