import { Component, computed, input, output, viewChild } from '@angular/core';
import { UnifiedDialogComponent } from '../../../components/unified-dialog/unified-dialog.component';

@Component({
  selector: 'app-lost-or-won-dialog-component',
  imports: [UnifiedDialogComponent],
  providers: [UnifiedDialogComponent],
  template: `
    <app-unified-dialog-component>
      <div>
        <p class="title">{{ getTitle() }}</p>
        <p>{{ getBody() }}</p>
        <menu class="dialog-menu">
          <button class="nes-btn" (click)="backToMenuClicked.emit()">Back To Menu</button>
          <button class="nes-btn is-primary" (click)="restartClicked.emit()">Restart</button>
        </menu>
      </div>
    </app-unified-dialog-component>
  `,
  styleUrl: './lost-or-won-dialog.component.scss',
})
export class LostOrWonDialogComponent {
  readonly gameWon = input.required<boolean>();

  readonly backToMenuClicked = output<void>();
  readonly restartClicked = output<void>();
  readonly resetActiveDialogType = output();

  protected readonly getTitle = computed(() => (this.gameWon() ? 'You won!' : 'You lost!'));
  protected readonly getBody = computed(() =>
    this.gameWon()
      ? 'You can be proud of yourself. How would you like to proceed?'
      : 'All your fault! How would you like to proceed?'
  );

  private readonly unifiedDialogComponent = viewChild(UnifiedDialogComponent);

  get dialog(): HTMLDialogElement | undefined {
    return this.unifiedDialogComponent()?.dialog;
  }
}
