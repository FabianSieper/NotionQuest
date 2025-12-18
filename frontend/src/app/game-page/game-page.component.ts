import { Component, input } from '@angular/core';
import { InfoDialogComponent } from '../components/loading-your-quest-overlay/info-dialog/info-dialog.component';
import { LoadingYourQuestOverlayComponent } from '../components/loading-your-quest-overlay/loading-your-quest-overlay.component';
import { GameContainer } from './components/game/game.container';

// TODO: move to own model file
export enum DialogType {
  LOADING,
  NOT_FOUND,
  BACKEND_ERROR,
  SUCCESS,
  DUPLICATE_FOUND,
  NOTION_URL_EMPTY,
  INVALID_NOTION_URL,
}

@Component({
  selector: 'app-game-page-component',
  styleUrl: 'game-page.component.scss',
  imports: [GameContainer, LoadingYourQuestOverlayComponent, InfoDialogComponent],
  template: `
    <app-info-dialog-component [displayDialogType]="displayDialogType()" />

    <!-- TODO: use dialog isntead of overlay -->
    @if (isInitialGameStateLoading()) {
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
  readonly displayDialogType = input.required<DialogType | undefined>();
}
