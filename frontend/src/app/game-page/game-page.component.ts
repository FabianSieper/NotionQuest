import { Component, computed, input } from '@angular/core';
import { InfoMessageComponent } from '../components/info-message/info-message.component';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { Criticality, InfoMessageDetail } from '../landing-page/model/info-message.model';
import { GameState } from '../model/load-game-state-response.model';

@Component({
  selector: 'app-game-page-component',
  styleUrl: 'game-page.component.scss',
  imports: [InfoMessageComponent, OverlayComponent],
  template: `
    @if (warning()) {
    <app-overlay>
      <div class="warning-message">
        <app-info-message [infoMessageDetails]="warningDetails()" />
      </div>
    </app-overlay>
    } @else if (!loadedGame()) {
    <app-overlay>
      <h1 class="loading-text translateUp" slot="slot">Loading your quest</h1>
    </app-overlay>
    }
  `,
})
export class GamePageComponent {
  readonly loadedGame = input.required<GameState | undefined>();
  readonly warning = input.required<string | undefined>();

  protected readonly warningDetails = computed<InfoMessageDetail>(() => ({
    header: 'Upsi Daisy',
    message: this.warning() ?? 'The game ID used does not seem to exist.',
    criticality: Criticality.ERROR,
  }));
}
