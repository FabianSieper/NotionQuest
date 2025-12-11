import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-message',
  template: ` <section class="nes-container is-rounded landing-shell info-section">
    <div class="info-section-text">
      <h3>{{ header() }}</h3>
      <div>{{ message() }}</div>
    </div>
  </section>`,
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent {
  readonly header = input<string>('Watch out!');
  readonly message = input.required<string>();
}
