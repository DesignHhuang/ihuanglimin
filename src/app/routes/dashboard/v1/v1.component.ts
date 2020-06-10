import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleService } from '@services';
import { StartupService } from '@core'

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .demo-loadmore-list {
        min-height: 350px;
      }
      .loadmore {
        text-align: center;
        margin-top: 12px;
        margin-bottom:24px;
        height: 32px;
        line-height: 32px;
      }
    `
  ]
})
export class DashboardV1Component implements OnInit {
  data: any[];

  webSite: any[];
  salesData: any[];
  offlineChartData: any[];
  pageIndex = 1;
  pageSiza = 10;
  total = 0;

  constructor(private config: StartupService, private articleService: ArticleService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getData();
  }

  getData = () => {
    this.articleService.allArticles({ "pageIndex": this.pageIndex - 1, "pageSize": this.pageSiza }).subscribe(res => {
      this.data = res.content;
      this.total = res.totalElements;
      this.cdr.detectChanges();
    })
  }
}
