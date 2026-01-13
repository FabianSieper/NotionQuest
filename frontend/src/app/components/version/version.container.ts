import { Component, inject, OnInit } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { VersionComponent } from './version.component';

@Component({
  selector: 'app-version-container',
  imports: [VersionComponent],
  template: ` <app-version-component [version]="versionService.getVersion()" /> `,
})
export class VersionContainer implements OnInit {
  protected readonly versionService = inject(VersionService);

  ngOnInit(): void {
    this.versionService.fetchVersion();
  }
}
