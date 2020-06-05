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
import { AdvancedFormComponent } from './form/advanced-form/advanced-form.component';
import { BasicFormComponent } from './form/basic-form/basic-form.component';
import { StepFormComponent } from './form/step-form/step-form.component';
import { ProListApplicationsComponent } from './list/applications/applications.component';
import { ProListArticlesComponent } from './list/articles/articles.component';
import { ProBasicListComponent } from './list/basic-list/basic-list.component';
import { ProCardListComponent } from './list/card-list/card-list.component';
import { ProListLayoutComponent } from './list/list/list.component';
import { ProListProjectsComponent } from './list/projects/projects.component';
import { ProTableListComponent } from './list/table-list/table-list.component';
import { ProProfileAdvancedComponent } from './profile/advanced/advanced.component';
import { ProProfileBaseComponent } from './profile/basic/basic.component';
import { ProResultFailComponent } from './result/fail/fail.component';
import { ProResultSuccessComponent } from './result/success/success.component';

const routes: Routes = [
  {
    path: 'form',
    children: [
      { path: '', redirectTo: 'basic-form', pathMatch: 'full' },
      { path: 'basic-form', component: BasicFormComponent },
      { path: 'step-form', component: StepFormComponent },
      { path: 'advanced-form', component: AdvancedFormComponent },
    ],
  },
  {
    path: 'list',
    children: [
      { path: 'table-list', component: ProTableListComponent },
      { path: 'basic-list', component: ProBasicListComponent },
      { path: 'card-list', component: ProCardListComponent },
      {
        path: '',
        component: ProListLayoutComponent,
        children: [
          { path: 'articles', component: ProListArticlesComponent },
          { path: 'projects', component: ProListProjectsComponent },
          { path: 'applications', component: ProListApplicationsComponent },
        ],
      },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: 'basic', component: ProProfileBaseComponent },
      { path: 'advanced', component: ProProfileAdvancedComponent },
    ],
  },
  {
    path: 'result',
    children: [
      { path: 'success', component: ProResultSuccessComponent },
      { path: 'fail', component: ProResultFailComponent },
    ],
  },
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
