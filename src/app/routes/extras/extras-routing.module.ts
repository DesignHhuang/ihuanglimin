import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpCenterComponent } from './helpcenter/helpcenter.component';
import { ExtrasSettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'helpcenter', component: HelpCenterComponent },
  { path: 'settings', component: ExtrasSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrasRoutingModule {}
