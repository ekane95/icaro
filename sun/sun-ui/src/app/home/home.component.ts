import { ProfileService } from './../services/profile.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toggleOnClick: true;
  public account_type = localStorage.getItem('account_type');
  email: string;
  constructor(
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.getAccount(5).subscribe(
      data => {
        for (let key in data) {
          if (key === 'email') {
            this.email = data[key];
          }
        }
        console.log(this.email);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * This method, call logout procedure from service part.
   */
  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Toggle sidebar
   * Gall specific width to sidebar and main content.
   */
  toggleSidebar() {
    if (this.toggleOnClick) {
      return '180' + 'px';
    } else {
      return '40' + 'px';
    }
  }
}
