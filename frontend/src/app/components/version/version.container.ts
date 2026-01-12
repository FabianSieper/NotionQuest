import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { VersionComponent } from './version.component';

@Component({
  selector: 'app-version-container',
  imports: [VersionComponent],
  template: ` <app-version-component version="test" /> `,
})
export class VersionContainer implements OnInit {
  private readonly backendService = inject(BackendService);

  ngOnInit(): void {}

  // private async loadVersion() {
  //   try {
  //     const version = await this.backendService.getProjectVersion();
  //     this.version.set(version);
  //   } catch (error) {
  //     this.logger.warn(`Failed to load version. Received error: ${error}`);
  //   }
  // }
}
