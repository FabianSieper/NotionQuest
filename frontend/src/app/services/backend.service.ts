import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoadGameStateFromNotionRequest } from '../model/load-game-state-from-notion-request.model';
import { LoadGameStateFromNotionResponse } from '../model/load-game-state-from-notion-response.model';
import { GameState } from '../model/load-game-state-response.model';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private baseUrl: string = 'http://localhost:8080';

  private httpClient = inject(HttpClient);

  loadGameStateFromNotion(
    notionUrl: string,
    overwrite: boolean
  ): Promise<LoadGameStateFromNotionResponse> {
    const body: LoadGameStateFromNotionRequest = { notionUrl };
    const params = new HttpParams().set('overwrite', overwrite ? 'true' : 'false');
    return firstValueFrom(
      this.httpClient.post<LoadGameStateFromNotionResponse>(
        this.getLoadGameStateFromNotionUrl(),
        body,
        { params }
      )
    );
  }

  loadGameStateFromCache(gameId: string): Promise<GameState> {
    return firstValueFrom(
      this.httpClient.get<GameState>(this.getLoadGameStateFromCacheUrl() + gameId)
    );
  }

  getLoadGameStateFromCacheUrl() {
    return `${this.baseUrl}/api/loadGameStateFromCache/`;
  }

  getLoadGameStateFromNotionUrl() {
    return `${this.baseUrl}/api/loadGameStateFromNotion`;
  }
}
