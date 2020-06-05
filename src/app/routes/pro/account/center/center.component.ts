import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from '@services';
import { StartupService } from '@core';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountCenterComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private userService: UserService, private config: StartupService, private cdr: ChangeDetectorRef) { }
  private router$: Subscription;
  user: any;
  tabs: any[] = [
    {
      key: 'articles',
      tab: '文字',
    },
    {
      key: 'applications',
      tab: '应用',
    },
    {
      key: 'projects',
      tab: '项目',
    },
  ];

  pos = 0;

  taging = false;
  tagValue = '';
  @ViewChild('tagInput', { static: false })
  private tagInput: ElementRef;

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex((w) => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    this.userService.currentUser().subscribe(res => {
      this.user = res;
      this.cdr.detectChanges();
    })
    this.router$ = this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
  }

  to(item: any) {
    this.router.navigateByUrl(`/pro/account/center/${item.key}`);
  }
  tagShowIpt() {
    this.taging = true;
    this.cdr.detectChanges();
    (this.tagInput.nativeElement as HTMLInputElement).focus();
  }

  tagBlur() {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tagList.filter((tag) => tag.tagname === tagValue).length === 0) {
      user.tagList.push({ tagname: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (e.keyCode === 13) {
      this.tagBlur();
    }
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
