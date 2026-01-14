import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { DialogType } from '../model/dialog-type.model';
import { MusicService } from '../services/music.service';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-landing-page-container',
  imports: [LandingPageComponent],
  template: `
    <app-landing-page-component
      [(gameField)]="gameField"
      [(gameId)]="gameId"
      [displayDialogType]="displayDialogType()"
      (submitQuest)="handleEnterClick()"
      (loadGame)="loadExistingGame()"
      (resetActiveDialogType)="this.displayDialogType.set(undefined)"
      (openFeedbackPackge)="router.navigate(['/feedback'])"
    />
  `,
})
export class LandingPageContainer implements OnInit {
  private logger = inject(NGXLogger);
  protected router = inject(Router);
  protected musicService = inject(MusicService);

  // Init game id with random string
  protected readonly gameId = signal<string>(
    Array.from({ length: 12 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join(
      ''
    )
  );

  protected readonly gameField = signal<string>(`###############
#S............#
#...####...M..#
#...#......##.#
#...#..M......#
#.............#
#...####......#
#...#..Z......#
#...#.....M...#
#.............#
#.......####..#
#....M..#..#..#
#.......#..#..#
#.......####..#
###############`);

  protected readonly displayDialogType = signal<DialogType | undefined>(undefined);
  protected readonly version = signal<string | undefined>(undefined);

  async ngOnInit(): Promise<void> {
    this.initMusicService();
  }

  protected async handleEnterClick() {
    this.displayDialogType.set(undefined);
  }

  protected loadExistingGame() {
    this.logger.info('Loading existing game');
    // this.router.navigate(['/game', existingGameId]);
  }

  private initMusicService() {
    // Only set audio src if game initis the first time and not, for example,
    // when the player returns back to the main page. That transition is handled
    // differently to allow for transitions between music.
    if (!this.musicService.isMusicDefined()) {
      // Music from https://pixabay.com/music/video-games-i-love-my-8-bit-game-console-301272/
      this.musicService.setAudioSrc('assets/audio/landing-page.mp3', true);
    }
  }
}
