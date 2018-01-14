import { HeaderService } from './header/header.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http/';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing } from './router/route-routing';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NavigationModule, CardModule } from 'patternfly-ng';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, ProfileComponent],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NavigationModule,
    CardModule
  ],
  providers: [AuthenticationService, AuthenticationGuard, ProfileService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
