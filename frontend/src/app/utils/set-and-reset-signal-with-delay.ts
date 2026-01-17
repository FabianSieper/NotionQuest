import { WritableSignal } from '@angular/core';

export function setAndResetSignalWithDelay<T>(
  signal: WritableSignal<T>,
  setValueNow: T,
  setValueDelayed: T,
  delayMs: number
) {
  signal.set(setValueNow);
  setTimeout(() => {
    signal.set(setValueDelayed);
  }, delayMs);
}
