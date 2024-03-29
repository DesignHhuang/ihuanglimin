import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartupService } from '@core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private readonly domain = 'auth';

  constructor(private config: StartupService, private http: HttpClient) {
  }

  // 登录    
  login(data): Observable<any> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/login`;
    return this.http.post(uri, data);
  }

  // 注册      
  register(data): Observable<any> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/register`;
    return this.http.post(uri, {
      email: data.email,
      password: data.password,
      mobile: data.mobile,
      role_id: '1'
    }).pipe(
      map(res => res['data'])
    );
  }
}
