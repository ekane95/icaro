import { NgForm } from '@angular/forms';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardConfig, InfoStatusCardConfig } from 'patternfly-ng';
import { Account, AccountFull } from '../interfaces/account';
import { error } from 'util';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  config: CardConfig;
  model: any = {};
  items: any[] = [];
  account: Account = {};
  fullAccount: AccountFull = {};
  password: string;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.config = {
      noPadding: false,
      topBorder: true
    } as CardConfig;
    this.getAllAccounts();
  }

  private postAccount() {
    this.fullAccount.email = 'mikel@hotmail.com';
    this.fullAccount.name = 'Mikel';
    this.fullAccount.username = 'Mikel';
    this.fullAccount.uuid = '29';
    this.fullAccount.hotspotid = '29';
    this.fullAccount.password = 'password';
    this.fullAccount.type = 'type1';

    this.profileService.postAccount(this.fullAccount).subscribe(
      data => { console.log(data) },
      error => { console.log(error) }
    );
  }


  private changePassword(f: NgForm) {
    this.account.email = 'mikel@hotmail.com';
    this.account.name = 'Mikel';
    this.account.username = 'Mikel';
    this.account.password = this.model.newpassword;

    this.profileService.changePassword(this.account).subscribe(
      data => { console.log(data) },
      error => { console.log(error) }
    );
  }

  private getAllAccounts() {
    this.profileService.getAccounts().subscribe(
      data => {
        let myArray = [];
        for (let key in data) {
          myArray.push(data[key]);
        }
        this.items = myArray;
        console.log(this.items);
      },
      error => {
        console.log(error.json());
      }
    );
  }
}
