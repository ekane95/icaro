import { AccountsService } from './services/accounts.service';
import { HeaderService } from './header/header.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http/';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing } from './router/route-routing';
import { AuthenticationGuard } from './guards/authentication.guard';
import { PatternFlyNgModule } from 'patternfly-ng';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordModalComponent } from './modals/change-password-modal/change-password-modal.component';
import { ProfileService } from './services/profile.service';
import { AccountsComponent } from './accounts/accounts.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ChangePasswordModalComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    HttpModule,
    FormsModule,
    PatternFlyNgModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
  })
  ],
  providers: [AuthenticationService, AuthenticationGuard, ProfileService, HeaderService, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
