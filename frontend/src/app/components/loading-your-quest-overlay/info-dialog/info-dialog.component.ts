import { Component, computed, effect, input, ViewChild } from '@angular/core';
import { DialogType } from '../../../game-page/game-page.component';
import { DuplicateDialogComponent } from '../../../landing-page/components/duplicate-dialog/duplicate-dialog.component';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

// TODO: transfer to own model file
interface MessageDialogInformation {
  message?: string;
  title: string;
}

@Component({
  selector: 'app-info-dialog-component',
  imports: [MessageDialogComponent, DuplicateDialogComponent],
  template: `
    <app-duplicate-dialog-component #duplicateDialog />
    <app-message-dialog-component
      [title]="getTitleForDialogType(displayDialogType())"
      [body]="getMessageForDialogType(displayDialogType())"
      [addOkButtonForClosing]="displayButtonForClosing()"
    />
  `,
})
export class InfoDialogComponent {
  readonly displayDialogType = input.required<DialogType | undefined>();
  readonly addOkButtonForClosing = input<boolean>(false);

  protected displayButtonForClosing = computed(
    () => DialogType.LOADING != this.displayDialogType()
  );

  @ViewChild(MessageDialogComponent)
  private messageDialogComponent?: MessageDialogComponent;

  @ViewChild(DuplicateDialogComponent)
  private duplicateDialogComponent?: DuplicateDialogComponent;

  private dialogMessageBasedOnType = new Map<DialogType, MessageDialogInformation>([
    [
      DialogType.NOT_FOUND,
      { message: 'The game ID used does not seem to exist.', title: 'Upsi Daisy' },
    ],
    [
      DialogType.BACKEND_ERROR,
      {
        message:
          'Something went wrong in the background. Please verify your Notion URL is correct. If so and the error still persists, please try again later, or go sacrifice a goat to tame the gods.',
        title: 'Sorry',
      },
    ],
    [DialogType.LOADING, { message: 'Please practice being patient', title: 'Loading' }],
    [DialogType.SUCCESS, { message: undefined, title: 'Success!' }],
    [
      DialogType.NOTION_URL_EMPTY,
      { message: 'It seems you have not entered anything.', title: 'Thats not how things work' },
    ],
    [
      DialogType.INVALID_NOTION_URL,
      { message: 'The URL you entered does not seem to be a valid Notion URL.', title: 'Na aaah' },
    ],
  ]);

  displayWarning = effect(() => {
    if (!this.displayDialogType()) {
      this.messageDialogComponent?.unifiedDialog?.close();
      return;
    }

    if (this.displayDialogType() == DialogType.DUPLICATE_FOUND) {
      this.duplicateDialogComponent?.dialog?.showModal();
    } else {
      this.messageDialogComponent?.unifiedDialog?.showModal();
    }
  });

  protected getTitleForDialogType(type: DialogType | undefined) {
    if (!type) return;
    return this.dialogMessageBasedOnType.get(type)?.title;
  }

  protected getMessageForDialogType(type: DialogType | undefined) {
    if (!type) return;
    return this.dialogMessageBasedOnType.get(type)?.message;
  }

  protected DialogType = DialogType;
}
