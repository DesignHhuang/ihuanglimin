import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ArticleService } from './article.service';

export {
  AuthService,
  UserService,
  ArticleService
};

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthService,
        UserService,
        ArticleService
      ]
    };
  }
}
