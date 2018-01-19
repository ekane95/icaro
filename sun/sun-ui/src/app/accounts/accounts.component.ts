import { NgForm } from '@angular/forms';
import { AccountsService } from './../services/accounts.service';
import { error } from 'util';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ActionConfig,
  ListConfig,
  Action,
  ListEvent,
  PaginationConfig,
  ToolbarConfig,
  NotificationType
} from 'patternfly-ng';
import { PaginationEvent } from 'patternfly-ng/dist/src/app/pagination/pagination.module';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import * as jQuery from 'jquery';
import { EditAccount } from '../interfaces/account';

declare var $: any;
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;

  objectLength: number;
  apiResponse: string;
  accountToPost: any = {};
  itemToEdit: any = {};
  seletedItem: any[] = [];
  isDataArrived = false;
  accountList: any[] = [];
  actionConfig: ActionConfig;
  actionConfig1: ActionConfig;
  items: any[];
  listConfig: ListConfig;
  paginationConfig: PaginationConfig;

  constructor(
    private profileService: ProfileService,
    private accountsService: AccountsService
  ) {}
  ngOnInit() {
    this.getAllAccounts();
  }

  private getAllAccounts() {
    this.profileService.getAllAccounts().subscribe(
      data => {
        this.isDataArrived = true;
        this.accountList = data;
        this.configureListPagination();
        this.updateItems();
      },
      error => {
        console.log(error);
      }
    );
  }

  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'Edit') {
      this.profileService.getAccount(item.id).subscribe(
        data => {
          this.itemToEdit = data;
        },
        error => {}
      );
      console.log(this.itemToEdit.name);
      $(this.myModal.nativeElement).modal('show');
    } else {
      console.log(item.id);
      this.accountsService.deleteAccount(item.id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  private postNewAccount() {
    this.accountToPost.uuid = 'string';
    this.accountToPost.type = 'string';
    this.accountToPost.name = 'string';
    this.accountToPost.username = 'string';
    this.accountToPost.password = 'string';
    this.accountToPost.email = 'string';
    this.accountToPost.hotspot_id = 2;
    this.accountsService.postAccount(this.accountToPost).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMultiply(): void {
    for (let i = 0; i <= this.seletedItem.length - 1; i++) {
      console.log(this.seletedItem[i].id);
      this.accountsService.deleteAccount(this.seletedItem[i].id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  handleSelectionChange($event: ListEvent): void {
    if ($event.selectedItems.length > 0) {
      this.seletedItem = $event.selectedItems;
    } else {
      this.seletedItem = [];
    }

    console.log(this.seletedItem);
  }

  handleClick($event: ListEvent, item: any): void {}
  handlePageSize($event: PaginationEvent) {
    this.updateItems();
  }

  handlePageNumber($event: PaginationEvent) {
    this.updateItems();
  }

  // Pagination
  updateItems() {
    this.items = this.accountList
      .slice(
        (this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
        this.paginationConfig.totalItems
      )
      .slice(0, this.paginationConfig.pageSize);
  }

  /**
   * Edit accounts, when user click save
   * @param editAccount
   */

  editAccount(editAccount: NgForm) {
    console.log(this.itemToEdit);
    let accountToEdit: EditAccount = {};
    accountToEdit.id = this.itemToEdit.id;
    accountToEdit.name = this.itemToEdit.name;
    accountToEdit.username = this.itemToEdit.username;
    accountToEdit.email = this.itemToEdit.email;
    this.profileService.changePassword(accountToEdit).subscribe(
      data => {
        this.apiResponse = data.status;
        $(this.myModal.nativeElement).modal('hide');
        this.getAllAccounts();
      },
      error => {
        this.apiResponse = 'error';
      }
    );
  }

  /**
   * Configuration of pagination
   */
  private configureListPagination() {
    this.actionConfig = {
      primaryActions: [
        {
          id: 'Edit',
          title: 'Edit',
          tooltip: 'Edit Accounts'
        },
        {
          id: 'action2',
          title: 'Delete',
          tooltip: 'Delete account'
        }
      ]
    } as ActionConfig;

    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      useExpandItems: false
    } as ListConfig;

    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 3,
      pageSizeIncrements: [2, 3, 4],
      totalItems: this.accountList.length
    } as PaginationConfig;
  }
}
