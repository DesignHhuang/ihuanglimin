import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';
import { DelonACLModule } from '@delon/acl';
import { AlainThemeModule } from '@delon/theme';
import { AlainConfig, ALAIN_CONFIG } from '@delon/util';

const alainConfig: AlainConfig = {
  st: { modal: { size: 'lg' } },
  pageHeader: { homeI18n: '首页' },
  lodop: {
    license: `A59B099A586B3851E0F0D7FDBF37B603`,
    licenseA: `C94CEE276DB2187AE6B65D56B3FC2848`,
  },
  auth: {
    login_url: '/passport/login',
    ignores: [/\/login/, /\/register/, /assets\//, /passport\//]
  },
};

const alainModules = [AlainThemeModule.forRoot(), DelonACLModule.forRoot()];
const alainProvides = [{ provide: ALAIN_CONFIG, useValue: alainConfig }];

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {};

const zorroProvides = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];

@NgModule({
  imports: [...alainModules],
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalConfigModule,
      providers: [...alainProvides, ...zorroProvides],
    };
  }
}
