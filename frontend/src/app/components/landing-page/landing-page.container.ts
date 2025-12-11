import { Component, inject, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BackendService } from '../../services/backend.service';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-landing-page-container',
  imports: [LandingPageComponent],
  template: `
    <app-landing-page-component
      [(notionUrl)]="notionUrl"
      [isLoading]="isLoading()"
      (submitQuest)="handleEnterClick()"
    />
  `,
})
export class LandingPageContainer {
  private logger = inject(NGXLogger);
  private backendService = inject(BackendService);

  // TODO: set to empty string by default
  protected readonly notionUrl = signal<string>(
    'https://fabiansieper.notion.site/Notion-Quest-2c25e55239fb80f78f9df3fa2c2d65d1?source=copy_link'
  );

  protected readonly isLoading = signal<boolean>(false);

  protected async handleEnterClick() {
    this.logger.info('Notion URL submitted:', this.notionUrl());

    try {
      this.isLoading.set(true);

      this.logger.info('Sending request to load initial playing board...');
      // TODO: if failing with http 409, then ask user if they want to overwrite existing game and if so, resend with overwrite flag
      const response = await this.backendService.getInitialPlayingBoard(this.notionUrl());

      this.logger.info('Successfully loaded initial playing board. Received Response: ', response);
    } catch (error) {
      this.logger.error('Error loading initial playing board:', error);
    } finally {
      this.isLoading.set(false);
    }

    this.notionUrl.set('');
  }
}
