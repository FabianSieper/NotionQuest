import { Component, input } from '@angular/core';
import { InfoMessageDetail } from '../../landing-page/model/info-message.model';

@Component({
  selector: 'app-info-message',
  template: ` <section [class]="getInfoSectionClasses()">
    <div class="info-section-text">
      <h3>{{ infoMessageDetails().header }}</h3>
      <div>{{ infoMessageDetails().message }}</div>
    </div>
  </section>`,
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent {
  readonly infoMessageDetails = input.required<InfoMessageDetail>();

  protected getInfoSectionClasses() {
    const baseClasses = 'nes-container is-rounded info-section ';
    if (this.infoMessageDetails().criticality === 'ERROR') {
      return baseClasses + 'error';
    }
    return baseClasses + 'warning';
  }
}
