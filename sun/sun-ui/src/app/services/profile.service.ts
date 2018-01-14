import { HeaderService } from './../header/header.service';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { apConfig } from '../../global';
import { Account, AccountFull } from '../interfaces/account';

@Injectable()
export class ProfileService {
  private apiAccountsUrl = apConfig.API_ENDPOINT_URL + '/accounts';
  private authenticationToken = localStorage.getItem('authenticationToken');

  constructor(private http: Http, private headerService: HeaderService) { }

  getAccounts() {
    return this.http
      .get(this.apiAccountsUrl, this.headerService.setHeader())
      .map(res => res.json());
  }


  changePassword(account: Account) {
    let body = JSON.stringify(account);
    return this.http.put(this.apiAccountsUrl + '/' + '5', body, this.headerService.setHeader())
      .map(res => res.json());

  }

  postAccount(account: AccountFull) {
    let body = JSON.stringify(account);
    return this.http.post(this.apiAccountsUrl, body, this.headerService.setHeader())
      .map(res => res.json());

  }


}
