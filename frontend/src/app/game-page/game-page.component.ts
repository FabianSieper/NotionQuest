import { Component, input, output, signal, viewChild } from '@angular/core';
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component';
import { DialogType } from '../model/dialog-type.model';
import { GameContainer } from './components/game/game.container';
import { LostOrWonDialogComponent } from './components/lost-or-won-dialog/lost-or-won-dialog.component';

@Component({
  selector: 'app-game-page-component',
  styleUrl: 'game-page.component.scss',
  imports: [GameContainer, InfoDialogComponent, LostOrWonDialogComponent],
  template: `
    <app-info-dialog-component
      [displayDialogType]="displayDialogType()"
      (resetActiveDialogType)="resetActiveDialogType.emit()"
      (noClicked)="noClicked.emit()"
      (yesClicked)="backToMenu.emit()"
    />

    <app-lost-or-won-dialog-component
      [gameWon]="gameWon()"
      (restartClicked)="reloadGame.emit()"
      (backToMenuClicked)="backToMenu.emit()"
    />

    <!-- Display playing field as soon as no dialog status is set, like loading or errors -->
    @if (!displayDialogType()) {
    <div class="playing-board">
      <h1 class="is-dark">You can do it!</h1>
      <app-game-container
        (reloadGame)="reloadGame.emit()"
        (gameLost)="displayLostOrWonDialog(false)"
        (gameWon)="displayLostOrWonDialog(true)"
      />
      <button (click)="backClicked.emit()" class="nes-btn">Take me back</button>
    </div>
    }
  `,
})
export class GamePageComponent {
  readonly displayDialogType = input.required<DialogType | undefined>();
  readonly resetActiveDialogType = output();
  readonly backClicked = output();
  readonly noClicked = output();
  readonly reloadGame = output();
  readonly backToMenu = output();

  protected readonly gameWon = signal(false);
  private readonly lostOrWonDialogComponent = viewChild(LostOrWonDialogComponent);

  protected displayLostOrWonDialog(won: boolean) {
    this.gameWon.set(won);
    this.lostOrWonDialogComponent()?.dialog?.showModal();
  }
}
