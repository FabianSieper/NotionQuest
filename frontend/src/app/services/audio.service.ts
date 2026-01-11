import { inject, Injectable, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly logger = inject(NGXLogger);

  private _isMusicPlaying = signal(false);
  private audio: HTMLAudioElement | undefined;

  isAudioDefined() {
    return !!this.audio;
  }

  isAudioPlaying() {
    return this._isMusicPlaying();
  }

  setAudioSrc(src: string, loop = false) {
    this.audio = new Audio(src);
    this.audio.loop = loop;
  }

  async toggleMusic() {
    if (this._isMusicPlaying()) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  private async playMusic() {
    try {
      await this.audio?.play();
      this._isMusicPlaying.set(true);
    } catch (error) {
      this.logger.warn('Failed to start music.');
    }
  }

  private async pauseMusic() {
    try {
      await this.audio?.pause();
      this._isMusicPlaying.set(false);
    } catch (error) {
      this.logger.warn('Failed to stop music.');
    }
  }
}
