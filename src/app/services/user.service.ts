import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartupService } from '@core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@domain'
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class UserService {
  private readonly domain = 'user';

  constructor(private config: StartupService, private http: HttpClient, private msg: NzMessageService) {
  }

  // 获取当前用户   
  currentUser(): Observable<User> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/currentUser`;
    return this.http.get(uri).pipe(map(res => res['code'] === 1 ? res['data'] : null));
  }

  // 更新用户信息   
  update(data): Observable<User> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/update`;
    return this.http.post(uri, data).pipe(map(res => {
      if (res['code'] === 1) {
        this.msg.success("用户信息更新成功")
        return res['data'];
      } else {
        this.msg.success("用户信息更新失败")
        return data
      }
    }));
  }

  //更新头像
  updateAvatar(id, newurl, oldurl): Observable<User> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/updateAvatar`;
    return this.http.post(uri, { 'id': id, 'newurl': newurl, 'oldurl': oldurl }).pipe(map(res => {
      if (res['code'] === 1) {
        this.msg.success("头像修改成功")
        return res['data'];
      } else {
        this.msg.success("头像修改失败")
        return res['data'];
      }
    }));
  }

  // 注册      
  // register(data): Observable<any> {
  //   const uri = `${this.config.getConfig('uri')}/${this.domain}/register`;
  //   return this.http.post(uri, {
  //     email: data.email,
  //     password: data.password,
  //     mobile: data.mobile,
  //     role_id: '1'
  //   }).pipe(
  //     map(res => res['data'])
  //   );
  // }
}
