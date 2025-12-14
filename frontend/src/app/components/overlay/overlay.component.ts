import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay">
      <ng-content id="slot"></ng-content>
    </div>
  `,
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {}
