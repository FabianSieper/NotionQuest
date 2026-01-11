import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-music-button-component',
  imports: [MatIconModule],
  template: `
    <button type="button" class="nes-btn icon-only" (click)="toggleMusic.emit()">
      @if(isMusicPlaying()){
      <mat-icon>volume_up</mat-icon>
      } @else {
      <mat-icon>volume_off</mat-icon>
      }
    </button>
  `,
})
export class MusicButtonComponent {
  readonly isMusicPlaying = input.required<boolean>();
  readonly toggleMusic = output();
}
