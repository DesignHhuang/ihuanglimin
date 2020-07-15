import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleService } from '@services';
import { StartupService } from '@core'
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '@domain';
import * as _ from 'lodash';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-account-center-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .demo-loadmore-list {
        min-height: 350px;
      }
      .loadmore {
        text-align: center;
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
      }
    `
  ]
})
export class ProAccountCenterArticlesComponent implements OnInit {
  list: any[] = [];
  loadingMore = false;
  form: FormGroup;
  submitting = false;
  pageIndex = 1;
  pageSiza = 10;
  total = 0;
  isVisible = false;
  modelname = '';
  modelid = null;
  commentcontent = null;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private articleService: ArticleService, private config: StartupService, private msg: NzMessageService) {

  }

  getData = () => {
    this.articleService.allArticlesByUser({ "pageIndex": this.pageIndex - 1, "pageSize": this.pageSiza }).pipe(
      tap(res => {
        console.log(res)
        this.list = res.content;
        this.total = res.totalElements;
        this.cdr.detectChanges();
      }),
      switchMap(data => this.articleService.likestate(data.content).pipe(
        map(res => this.list.map(article => {
          article.islike = _.find(res, { 'id': article.id }).islike;
          return article;
        }))
      ))
    )


    // this.articleService.allArticlesByUser({ "pageIndex": this.pageIndex - 1, "pageSize": this.pageSiza }).subscribe(res => {
    //   this.list = res.content;
    //   this.total = res.totalElements;
    //   this.cdr.detectChanges();
    // })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [null, [Validators.required]],
    });
    this.getData();
  }

  // ngDoCheck() {
  //   if (this.list.length != 0) {
  //     this.articleService.likestate(this.list).subscribe(res => {
  //       console.log(res)
  //       this.list.map(article => {
  //         article.islike = _.find(res, { 'id': article.id }).islike;
  //         return article;
  //       })
  //       console.log(this.list)
  //       this.cdr.detectChanges();
  //     })
  //   }
  // }

  edit(item: any): void {
    this.msg.success("触发事件");
  }

  dolike = (type, id) => {
    this.articleService.dolike({ type: type, id: id }).subscribe(res => {
      this.list.map(article => {
        if (article.id == res.id) {
          article.likesum = res.likesum;
          console.log(res.islike)
          article.islike = res.islike;
          return article
        }
      })
      console.log(this.list)
      this.cdr.detectChanges();
    })
  }

  submit = ($event, value) => {
    $event.preventDefault();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
    }
    this.articleService.create(value).subscribe(res => {
      this.form.reset();
      this.getData()
      this.cdr.detectChanges();
    })
  }

  delete = (item: Article) => {
    this.articleService.delete(item).subscribe(res => {
      console.log(res)
      this.getData()
      this.cdr.detectChanges();
    })
  }

  showModal = (name, id) => {
    this.isVisible = true;
    this.modelname = name;
    this.modelid = id;
  }

  handleOk(): void {
    console.log(this.commentcontent)
    console.log(this.modelid)
    this.isVisible = false;
    this.commentcontent = null;
  }

  handleCancel(): void {
    this.commentcontent = null;
    this.isVisible = false;
  }

}
