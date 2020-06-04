import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@services'
import { User } from '@domain'
import { StartupService } from '@core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit {
  avatar = '';
  loading = false;
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

  beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('只能上传jpg和png格式的图片');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('图片大小不能超过2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.avatar = this.config.getConfig('fastdfsuri') + info.file.response.data[0].fileurl;
        this.userService.updateAvatar(this.user.id, info.file.response.data[0].fileurl, this.user.avatar).subscribe(res => {
          this.user = res;
        })
        this.loading = false;
        break;
      case 'error':
        this.msg.error('头像上传失败');
        this.loading = false;
        break;
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
