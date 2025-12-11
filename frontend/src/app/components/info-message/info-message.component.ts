import { Component, input } from '@angular/core';
import { InfoMessageDetail } from '../../model/info-message.model';

@Component({
  selector: 'app-info-message',
  template: ` <section class="nes-container is-rounded landing-shell info-section">
    <div class="info-section-text">
      <h3>{{ infoMessageDetails().header }}</h3>
      <div>{{ infoMessageDetails().message }}</div>
    </div>
  </section>`,
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent {
  // TODO: mind criticality
  readonly infoMessageDetails = input.required<InfoMessageDetail>();
}
