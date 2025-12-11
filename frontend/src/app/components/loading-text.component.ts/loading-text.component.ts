import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-text',
  template: ` @if (isLoading()) {
    <div class="landing-overlay">
      <div class="spinner"></div>
      <h1 class="loading-text">{{ text() }}</h1>
    </div>
    }`,
  styleUrls: ['./loading-text.component.scss'],
})
export class LoadingTextComponent {
  readonly isLoading = input.required<boolean>();
  readonly text = input<string>('Loading your quest');
}
