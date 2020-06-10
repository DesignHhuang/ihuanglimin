import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleService } from '@services';
import { StartupService } from '@core'
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '@domain';

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
  list: any[];
  loadingMore = false;
  form: FormGroup;
  submitting = false;
  pageIndex = 1;
  pageSiza = 10;
  total = 0;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private articleService: ArticleService, private config: StartupService, private msg: NzMessageService) {

  }

  getData = () => {
    this.articleService.allArticlesByUser({ "pageIndex": this.pageIndex - 1, "pageSize": this.pageSiza }).subscribe(res => {
      this.list = res.content;
      this.total = res.totalElements;
      this.cdr.detectChanges();
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [null, [Validators.required]],
    });
    this.getData();
  }

  edit(item: any): void {
    this.msg.success("触发事件");
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

  onLoadMore(): void {
    this.loadingMore = true;
    // this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    // this.http.get(fakeDataUrl).subscribe((res: any) => {
    //   this.data = this.data.concat(res.results);
    //   this.list = [...this.data];
    //   this.loadingMore = false;
    // });
  }
}
