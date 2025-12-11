import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-landing-page-component',
  imports: [],
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
    </section>

    @if (isLoading()) {
    <div class="landing-overlay">
      <div class="spinner"></div>
      <h1 class="loading-text">Loading your quest</h1>
    </div>
    }
  `,
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  readonly isLoading = input.required<boolean>();
  readonly notionUrl = model.required<string>();
  readonly submitQuest = output<void>();

  protected onNotionUrlInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.notionUrl.set(value);
  }
}
