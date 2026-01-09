import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-music-button-component',
  imports: [MatIconModule],
  template: `
    <audio #bgAudio [src]="src()" loop></audio>
    <button mat-icon-button type="button" class="nes-btn icon-only" (click)="toggleMusic()">
      @if(isMusicPlaying()){
      <mat-icon>volume_up</mat-icon>
      } @else {
      <mat-icon>volume_off</mat-icon>
      }
    </button>
  `,
  styleUrl: './music-button.component.scss',
})
export class MusicButtonComponent {
  private readonly logger = inject(NGXLogger);

  readonly src = input.required<string>();

  private readonly musicComponent = viewChild<ElementRef<HTMLAudioElement>>('bgAudio');
  protected readonly isMusicPlaying = signal(false);

  protected async toggleMusic() {
    if (this.isMusicPlaying()) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  private async playMusic() {
    if (!this.isMusicComponentDefined()) return;
    try {
      await this.musicComponent()?.nativeElement.play();
      this.isMusicPlaying.set(true);
    } catch (error) {
      this.logger.warn('Failed to start music.');
    }
  }

  private async pauseMusic() {
    if (!this.isMusicComponentDefined()) return;
    try {
      await this.musicComponent()?.nativeElement.pause();
      this.isMusicPlaying.set(false);
    } catch (error) {
      this.logger.warn('Failed to stop music.');
    }
  }

  private isMusicComponentDefined() {
    return !!this.musicComponent()?.nativeElement;
  }
}
