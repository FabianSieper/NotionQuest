import { Component, computed, input } from '@angular/core';
import { InfoMessageComponent } from '../components/info-message/info-message.component';
import { LoadingYourQuestOverlayComponent } from '../components/loading-your-quest-overlay/loading-your-quest-overlay.component';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { Criticality, InfoMessageDetail } from '../landing-page/model/info-message.model';
import { GameContainer } from './components/game/game.container';

@Component({
  selector: 'app-game-page-component',
  styleUrl: 'game-page.component.scss',
  imports: [
    InfoMessageComponent,
    OverlayComponent,
    GameContainer,
    LoadingYourQuestOverlayComponent,
  ],
  template: `
    @if (warning()) {
    <app-overlay>
      <div class="warning-message">
        <app-info-message [infoMessageDetails]="warningDetails()" />
      </div>
    </app-overlay>
    } @else if (isInitialGameStateLoading()) {
    <app-loading-your-quest-overlay-component />
    } @else {
    <div class="playing-board">
      <app-game-container />
    </div>
    }
  `,
})
export class GamePageComponent {
  readonly isInitialGameStateLoading = input.required<boolean>();
  readonly warning = input.required<string | undefined>();

  protected readonly warningDetails = computed<InfoMessageDetail>(() => ({
    header: 'Upsi Daisy',
    message: this.warning() ?? 'The game ID used does not seem to exist.',
    criticality: Criticality.ERROR,
  }));
}
