import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { StartupService } from '@core';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(public settings: SettingsService, public config: StartupService) {
  }
}
