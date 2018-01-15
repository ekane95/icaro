import { NgForm } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { error } from 'util';

@Component({
	encapsulation: ViewEncapsulation.None,
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  model: any = {};
  items: any[] = [];
  account: any = {};
  fullAccount: any = {};
  preferenceArray: any[] = [];
  passwordLength = 0;
  apiResponse: string;

  constructor(private profileService : ProfileService) {}

  ngOnInit() {
  }

  private getPasswordLength(value: string = '') {
    this.passwordLength = value.length;
  }

  private changePassword(changepasswordform: NgForm) {
  this.account.email = 'mikel@hotmail.com';
  this.account.name = 'Mikel';
  this.account.username = 'Mikel';
  this.account.password = this.model.newPassword;
  this.account.id = this.model.idaccount;
  this.profileService.changePassword(this.account).subscribe(
    data => {
      this.apiResponse = data.status;
      changepasswordform.reset();
    },
    error => {
      console.log(error);
    }
  );
}

}
