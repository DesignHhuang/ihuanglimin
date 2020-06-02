import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';

export {
  AuthService
};

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthService
      ]
    };
  }
}
