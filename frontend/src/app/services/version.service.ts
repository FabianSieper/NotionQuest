import { computed, inject, Injectable, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root' })
export class VersionService {
  private readonly backendService = inject(BackendService);
  private readonly logger = inject(NGXLogger);

  private readonly version = signal<string | undefined>(undefined);

  readonly getVersion = computed(() => this.version());

  async fetchVersion(reload = false) {
    if (this.version() && !reload) return;

    try {
      const version = await this.backendService.getProjectVersion();
      this.version.set(version);
    } catch (error) {
      this.logger.warn(`Failed to load version. Received error: ${error}`);
    }
  }
}
