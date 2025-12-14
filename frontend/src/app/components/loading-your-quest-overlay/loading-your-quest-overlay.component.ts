import { Component, input } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-loading-your-quest-overlay-component',
  styleUrl: 'loading-your-quest-overlay.component.scss',
  imports: [OverlayComponent],
  template: `
    <app-overlay>
      <h1 class="loading-text" [style.transform]="'translateY(' + translateY() + 'px)'" slot="slot">
        {{ 'Loading your quest' }}
      </h1>
    </app-overlay>
  `,
})
export class LoadingYourQuestOverlayComponent {
  translateY = input<number>(0);
}
