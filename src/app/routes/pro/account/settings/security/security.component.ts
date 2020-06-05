import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-security',
  templateUrl: './security.component.html',
})
export class ProAccountSettingsSecurityComponent {
  constructor(public msg: NzMessageService, public set: SettingsService) { }
}
