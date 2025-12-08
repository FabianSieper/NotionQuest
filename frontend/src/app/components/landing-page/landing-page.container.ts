import { Component, signal } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-landing-page',
  imports: [LandingPageComponent],
  template: ` <app-landing-page [(notionUrl)]="notionUrl" (submitQuest)="handleEnterClick()" /> `,
})
export class LandingPageContainer {
  protected readonly notionUrl = signal<string>('');

  protected handleEnterClick() {
    // TODO
  }
}
