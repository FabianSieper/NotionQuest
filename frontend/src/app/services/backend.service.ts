import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoadGameStateFromNotionRequest } from '../model/request/load-game-state-from-notion.model';
import { LoadGameStateFromNotionResponse } from '../model/response/load-game-state-from-notion.model';
import { GameState } from '../model/response/load-game-state.model';

@Injectable({ providedIn: 'root' })
export class BackendService {
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

  sendFeedback(name: string, feedback: string): Promise<void> {
    return firstValueFrom(
      this.httpClient.post<void>(this.getSendFeedbackUrl(), { name, feedback })
    );
  }

  getProjectVersion(): Promise<string> {
    return firstValueFrom(this.httpClient.get<string>(this.getVersionUrl()));
  }

  protected getLoadGameStateFromCacheUrl() {
    return `/api/loadGameStateFromCache/`;
  }

  protected getVersionUrl() {
    return `/api/version`;
  }

  protected getSendFeedbackUrl() {
    return `/api/sendFeedback`;
  }

  protected getLoadGameStateFromNotionUrl() {
    return `/api/loadGameStateFromNotion`;
  }
}
