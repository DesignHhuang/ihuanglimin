import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExtrasRoutingModule } from './extras-routing.module';
import { HelpCenterComponent } from './helpcenter/helpcenter.component';
import { ExtrasSettingsComponent } from './settings/settings.component';

const COMPONENTS = [HelpCenterComponent, ExtrasSettingsComponent];

@NgModule({
  imports: [SharedModule, ExtrasRoutingModule],
  declarations: [...COMPONENTS],
})
export class ExtrasModule { }
