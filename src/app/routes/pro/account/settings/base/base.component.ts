import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@services'
import { User } from '@domain'
import { StartupService } from '@core';

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit {
  avatar = '';
  userLoading = true;
  actionUrl: string;
  user: User;

  constructor(private config: StartupService, private http: _HttpClient, private cdr: ChangeDetectorRef, private userService: UserService, private msg: NzMessageService) {
    this.actionUrl = `${this.config.getConfig('uri')}/user/uploadImage`;
  }

  ngOnInit(): void {
    this.userService.currentUser().subscribe(res => {
      this.userLoading = false;
      this.user = res;
      this.avatar = this.config.getConfig('fastdfsuri') + this.user.avatar;
      this.cdr.detectChanges();
    })
  }

  beforeUpload = (file: UploadFile): boolean => {
    if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp')) {
      this.msg.warning('只能上传jpg、bmp、png格式的图片');
      return false;
    } else {
      return true;
    }
  }

  save() {
    this.userService.update(this.user).subscribe(res => {
      this.user = res;
      this.avatar = this.config.getConfig('fastdfsuri') + this.user.avatar;
      this.cdr.detectChanges();
    })
  }
}
