import { Component, input, model, output } from '@angular/core';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { InfoMessageDetail } from '../../landing-page/model/info-message.model';

@Component({
  selector: 'app-landing-page-component',
  imports: [InfoMessageComponent, OverlayComponent],
  template: `
    <section class="nes-container is-rounded landing-shell">
      <h1>Welcome to NotionQuest!</h1>

      <div class="nes-field">
        <label for="quest-input" class="label-input">Pitch your quest</label>
        <div class="input-line">
          <input
            id="quest-input"
            type="text"
            class="nes-input"
            placeholder="Enter public Notion Page URL"
            [value]="notionUrl()"
            (input)="onNotionUrlInput($event)"
          />
          <button type="button" (click)="submitQuest.emit()" class="pixel-button"></button>
        </div>
      </div>
      @if (infoMessageDetails(); as details) {
      <app-info-message [infoMessageDetails]="details" />
      }
    </section>
    @if (isLoading()) {
    <app-overlay>
      <h1 class="loading-text translateUp" slot="slot">{{ 'Loading your quest' }}</h1>
    </app-overlay>
    } @else if (loadedSuccessfully()) {
    <app-overlay>
      <h1 class="translateUp" slot="slot">{{ 'Loaded with Success!' }}</h1>
    </app-overlay>
    }
  `,
})
export class LandingPageComponent {
  readonly isLoading = input.required<boolean>();
  readonly loadedSuccessfully = input.required<boolean>();
  readonly notionUrl = model.required<string>();
  readonly infoMessageDetails = input<InfoMessageDetail | undefined>(undefined);
  readonly submitQuest = output<void>();

  protected onNotionUrlInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.notionUrl.set(value);
  }
}
