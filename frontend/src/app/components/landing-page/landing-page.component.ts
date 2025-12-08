import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-landing-page',
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
          />
          <button (click)="submitQuest.emit()" class="pixel-button"></button>
        </div>
      </div>
    </section>
  `,
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  readonly notionUrl = model.required<string>();
  readonly submitQuest = output<void>();
}
