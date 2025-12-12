import { Component, input } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-loading-text',
  providers: [OverlayComponent],
  template: ` @if (isLoading()) {
    <app-overlay>
      <h1 class="loading-text" slot="slot">{{ text() }}</h1>
    </app-overlay>
    }`,
  styleUrls: ['./loading-text.component.scss'],
  imports: [OverlayComponent],
})
export class LoadingTextComponent {
  readonly isLoading = input.required<boolean>();
  readonly text = input<string>('Loading your quest');
}
