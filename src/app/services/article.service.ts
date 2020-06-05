import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartupService } from '@core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '@domain'
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ArticleService {
  private readonly domain = 'article';

  constructor(private config: StartupService, private http: HttpClient, private msg: NzMessageService) {
  }

  // 获取所有的文章   
  allArticles(data): Observable<Article[]> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/allArticles`;
    return this.http.post(uri, data).pipe(map(res => {
      if (res['code'] === 1) {
        return res['data'];
      }
    }));
  }

  // 创建文章   
  create(data): Observable<Article> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/create`;
    return this.http.post(uri, data).pipe(map(res => {
      if (res['code'] === 1) {
        this.msg.success("创建成功")
        return res['data'];
      } else {
        this.msg.success("创建失败")
        return data
      }
    }));
  }

  //获取本人的文章
  allArticlesByUser(data): Observable<Article[]> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/allArticlesByUser`;
    return this.http.post(uri, data).pipe(map(res => {
      if (res['code'] === 1) {
        return res['data'];
      }
    }));
  }

  //删除
  delete(data): Observable<Article> {
    const uri = `${this.config.getConfig('uri')}/${this.domain}/delete`;
    return this.http.post(uri, data).pipe(map(res => {
      if (res['code'] === 1) {
        this.msg.success("删除成功")
        return res['data'];
      }
    }));
  }
}
