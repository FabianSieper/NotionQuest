import { Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component';
import { MusicButtonContainer } from '../components/music-button/music-button.container';
import { VersionContainer } from '../components/version/version.container';
import { DialogType } from '../model/dialog-type.model';

@Component({
  selector: 'app-landing-page-component',
  imports: [InfoDialogComponent, MusicButtonContainer, VersionContainer, FormsModule],
  template: `
    @if (!displayDialogType()) {
    <section class="nes-container is-rounded landing-shell is-dark">
      <h1>Welcome to NotionQuest!</h1>
      <textarea [(ngModel)]="gameField"></textarea>
    </section>
    <div>
      <button class="nes-btn feedback-button" (click)="openFeedbackPackge.emit()">Feedback</button>
    </div>

    <app-version-container />
    <app-music-button-container />
    }

    <app-info-dialog-component
      [displayDialogType]="displayDialogType()"
      loadingHeaderAppendix="from Notion"
      (resetActiveDialogType)="resetActiveDialogType.emit()"
      (loadGame)="loadGame.emit()"
      (overwriteGame)="overwriteGame.emit()"
    />
  `,
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  readonly displayDialogType = input.required<DialogType | undefined>();

  readonly gameField = model<string>();
  readonly submitQuest = output<void>();
  readonly overwriteGame = output<void>();
  readonly loadGame = output<void>();
  readonly resetActiveDialogType = output();
  readonly openFeedbackPackge = output();
  protected readonly showInputError = signal(false);

  protected onSubmitClicked(): void {
    // TODO

    this.showInputError.set(false);
    this.submitQuest.emit();
  }
}
