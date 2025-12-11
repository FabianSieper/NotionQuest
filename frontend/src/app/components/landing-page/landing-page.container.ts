import { Component, inject, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Criticality, InfoMessageDetail } from '../../model/info-message.model';
import { BackendService } from '../../services/backend.service';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-landing-page-container',
  imports: [LandingPageComponent],
  template: `
    <app-landing-page-component
      [(notionUrl)]="notionUrl"
      [isLoading]="isLoading()"
      [infoMessageDetails]="infoMessageDetails()"
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
  protected readonly infoMessageDetails = signal<InfoMessageDetail | undefined>(undefined);

  protected async handleEnterClick() {
    this.infoMessageDetails.set(undefined);
    this.logger.info('Notion URL submitted:', this.notionUrl());

    if (this.isNotionUrlEmpty()) {
      this.logger.warn('Provided Notion URL is empty:', this.notionUrl());
      this.setNotionUrlEmptyInfo();
      return;
    }

    if (!this.isNotionUrlValid()) {
      this.logger.warn('Provided Notion URL is not valid:', this.notionUrl());
      this.setInvalidUrlInfo();
      return;
    }

    await this.requestLoadingInitialPlayingBoard();
  }

  private async requestLoadingInitialPlayingBoard() {
    try {
      this.isLoading.set(true);

      this.logger.info('Sending request to load initial playing board...');
      const response = await this.backendService.loadInitialPlayingBoard(this.notionUrl());

      this.logger.info('Successfully loaded initial playing board. Received Response: ', response);
    } catch (error) {
      this.handleError(error as Error);
    } finally {
      this.isLoading.set(false);
    }

    this.notionUrl.set('');
  }

  private handleError(error: Error) {
    this.logger.warn('Error loading initial playing board:', error);

    // HTTP 409 indicates that there is already a game for the provided Notion page
    if (error.message.includes('409')) {
      this.setDuplicateGameInfo();
    } else {
      this.setErrorRequestInfo();
    }
  }

  private setDuplicateGameInfo() {
    this.infoMessageDetails.set({
      ...this.getBaseInfoMessageDetails(),
      message:
        'A Quest for the provided Notion page was already loaded in the past. Please provide a different Notion URL.',
      criticality: Criticality.WARNING,
    });
  }

  private setErrorRequestInfo() {
    this.infoMessageDetails.set({
      ...this.getBaseInfoMessageDetails(),
      message: 'An error occurred while loading your quest. Did you enter a valid Notion URL?',
      criticality: Criticality.ERROR,
    });
  }

  private isNotionUrlEmpty(): boolean {
    return this.notionUrl().trim().length === 0;
  }

  private setNotionUrlEmptyInfo() {
    this.infoMessageDetails.set({
      ...this.getBaseInfoMessageDetails(),
      message: 'The Notion URL cannot be empty.',
      criticality: Criticality.ERROR,
    });
  }

  private isNotionUrlValid(): boolean {
    return this.notionUrl().includes('.notion.site/');
  }

  private setInvalidUrlInfo() {
    this.infoMessageDetails.set({
      ...this.getBaseInfoMessageDetails(),
      message: 'The provided URL does not seem to be a valid public Notion page URL.',
      criticality: Criticality.ERROR,
    });
  }

  private getBaseInfoMessageDetails(): InfoMessageDetail {
    return {
      header: 'Watch out!',
      message: '',
      criticality: Criticality.WARNING,
    };
  }
}
