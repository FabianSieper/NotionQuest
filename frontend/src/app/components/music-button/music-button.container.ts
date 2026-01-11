import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { MusicButtonComponent } from './music-button.component';

@Component({
  selector: 'app-music-button-container',
  imports: [MusicButtonComponent],
  styleUrl: './music-button.container.scss',
  template: `
    <app-music-button-component
      (toggleMusic)="audioService.toggleMusic()"
      [isMusicPlaying]="audioService.isAudioPlaying()"
    />
  `,
})
export class MusicButtonContainer {
  protected readonly audioService = inject(AudioService);
}
