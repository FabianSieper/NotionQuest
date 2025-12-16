import { Component, ElementRef, OnDestroy, OnInit, output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-dialog-component',
  imports: [],
  template: `
    <dialog #loadingDialog class="nes-dialog is-dark">
      <form method="dialog">
        <div class="title">
          Loading<span class="loading-dots">{{ dots() }}</span>
        </div>
      </form>
    </dialog>
  `,
  styleUrl: './loading-dialog.component.scss',
})
export class LoadingDialogComponent implements OnInit, OnDestroy {
  readonly overwriteGame = output<void>();
  readonly loadGame = output<void>();

  protected dots = signal('');

  private animationChar = '.';
  private maxAnimationLength = 3;
  private increasingAnimation = true;
  private animationIntervalid: number | undefined = undefined;

  @ViewChild('loadingDialog')
  private loadingDialog?: ElementRef<HTMLDialogElement>;

  get dialog(): HTMLDialogElement | undefined {
    return this.loadingDialog?.nativeElement;
  }

  ngOnInit(): void {
    this.animationIntervalid = setInterval(() => {
      if (this.increasingAnimation) {
        this.dots.update((dots) => dots + this.animationChar);
      } else {
        this.dots.update((dots) => dots.slice(0, -1));
      }

      // If either max length or zero length
      if (this.dots().length % this.maxAnimationLength == 0) {
        this.increasingAnimation = !this.increasingAnimation;
      }
    }, 120);
  }

  ngOnDestroy(): void {
    clearInterval(this.animationIntervalid);
  }
}
