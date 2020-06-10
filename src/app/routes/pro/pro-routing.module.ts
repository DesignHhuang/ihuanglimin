import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProAccountCenterApplicationsComponent } from './account/center/applications/applications.component';
import { ProAccountCenterArticlesComponent } from './account/center/articles/articles.component';
import { ProAccountCenterComponent } from './account/center/center.component';
import { ProAccountCenterProjectsComponent } from './account/center/projects/projects.component';
import { ProAccountSettingsBaseComponent } from './account/settings/base/base.component';
import { ProAccountSettingsBindingComponent } from './account/settings/binding/binding.component';
import { ProAccountSettingsNotificationComponent } from './account/settings/notification/notification.component';
import { ProAccountSettingsSecurityComponent } from './account/settings/security/security.component';
import { ProAccountSettingsComponent } from './account/settings/settings.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'center',
        component: ProAccountCenterComponent,
        children: [
          { path: '', redirectTo: 'articles', pathMatch: 'full' },
          {
            path: 'articles',
            component: ProAccountCenterArticlesComponent,
            data: { titleI18n: '个人中心' },
          },
          {
            path: 'projects',
            component: ProAccountCenterProjectsComponent,
            data: { titleI18n: '个人中心' },
          },
          {
            path: 'applications',
            component: ProAccountCenterApplicationsComponent,
            data: { titleI18n: '个人中心' },
          },
        ],
      },
      {
        path: 'settings',
        component: ProAccountSettingsComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: ProAccountSettingsBaseComponent,
            data: { title: '个人设置' },
          },
          {
            path: 'security',
            component: ProAccountSettingsSecurityComponent,
            data: { title: '个人设置' },
          },
          {
            path: 'binding',
            component: ProAccountSettingsBindingComponent,
            data: { title: '个人设置' },
          },
          {
            path: 'notification',
            component: ProAccountSettingsNotificationComponent,
            data: { title: '个人设置' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule { }
