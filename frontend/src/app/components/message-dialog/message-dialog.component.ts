import { Component, input, ViewChild } from '@angular/core';
import { UnifiedDialogComponent } from '../unified-dialog/unified-dialog.component';

@Component({
  selector: 'app-message-dialog-component',
  imports: [UnifiedDialogComponent],
  template: `
    <app-unified-dialog-component [addOkButtonForClosing]="addOkButtonForClosing()">
      <div>
        @if (title()) {
        <h1>
          {{ title() }}
        </h1>
        } @if(body()) {
        <p>{{ body() }}</p>
        }
      </div>
    </app-unified-dialog-component>
  `,
  styleUrl: './message-dialog.component.scss',
})
export class MessageDialogComponent {
  readonly title = input.required<string | undefined>();
  readonly body = input.required<string | undefined>();
  readonly addOkButtonForClosing = input<boolean>(false);

  @ViewChild(UnifiedDialogComponent)
  private _unifiedDialog?: UnifiedDialogComponent;

  get unifiedDialog(): HTMLDialogElement | undefined {
    return this._unifiedDialog?.dialog;
  }
}
