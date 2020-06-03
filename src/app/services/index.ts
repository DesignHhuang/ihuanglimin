import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service'

export {
  AuthService,
  UserService
};

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthService,
        UserService
      ]
    };
  }
}
