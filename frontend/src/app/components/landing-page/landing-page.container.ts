import { Component, inject, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BackendService } from '../../services/backend.service';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-landing-page-container',
  imports: [LandingPageComponent],
  template: `
    <app-landing-page-component [(notionUrl)]="notionUrl" (submitQuest)="handleEnterClick()" />
  `,
})
export class LandingPageContainer {
  private logger = inject(NGXLogger);
  private backendService = inject(BackendService);

  protected readonly notionUrl = signal<string>('');

  protected async handleEnterClick() {
    this.logger.info('Notion URL submitted:', this.notionUrl());

    try {
      // TODO: add loading state
      const response = await this.backendService.getInitialPlayingBoard(this.notionUrl());
      console.log(response);
    } catch (error) {
      this.logger.error('Error loading initial playing board:', error);
    } finally {
      // TODO: disable loading state
    }

    this.notionUrl.set('');
  }
}
