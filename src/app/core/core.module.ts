import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ServicesModule } from '@services';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    ServicesModule.forRoot(),
  ],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
