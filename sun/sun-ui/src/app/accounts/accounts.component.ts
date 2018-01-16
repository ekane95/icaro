import { Account } from './../interfaces/account';
import { error } from 'util';
import { ProfileService } from './../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActionConfig, ListConfig, Action, ListEvent, PaginationConfig } from 'patternfly-ng';
import { PaginationEvent } from 'patternfly-ng/dist/src/app/pagination/pagination.module';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountList: any;
  actionConfig: ActionConfig;
  actionConfig1: ActionConfig;
  actionsText: string = '';
  allItems: any[];
  items: any[];
  listConfig: ListConfig;
  paginationConfig: PaginationConfig;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getAllAccounts();
    this.actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Main Action',
        tooltip: 'Start the server'
      }],
      moreActions: [{
        id: 'action2',
        title: 'Edit',
        tooltip: 'Edit Value'
      }, {
        id: 'action3',
        title: 'Secondary Action 2',
        tooltip: 'Do something else'
      }, {
        id: 'action4',
        title: 'Secondary Action 3',
        tooltip: 'Do something special'
      }]
    } as ActionConfig;

    this.actionConfig1 = {
      primaryActions: [{
        id: 'action1',
        title: 'Edit',
        tooltip: 'Start the server'
      }]
    } as ActionConfig;

    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      useExpandItems: true
    } as ListConfig;

    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 3,
      pageSizeIncrements: [2, 3, 4],
      totalItems: this.allItems.length
    } as PaginationConfig;

    this.updateItems();
  }

  private getAllAccounts() {
    this.profileService.getAllAccounts().subscribe(data => {
      this.accountList = data;
      console.log(this.accountList);
    }, error => {
      console.log(error);
    });
  }

  // Actions
  // Actions

  handleAction($event: Action, item: any): void {
    if ($event.id === 'start' && item !== null) {
      item.started = true;
    }
    this.actionsText = $event.title + ' selected\r\n' + this.actionsText;

    console.log(item);
  }

  handleSelectionChange($event: ListEvent): void {
    this.actionsText = $event.selectedItems.length + ' items selected\r\n' + this.actionsText;
  }

  handleClick($event: ListEvent, item: any): void {
    // this.actionsText = $event.item.name + ' clicked\r\n' + this.actionsText;
  }

  handlePageSize($event: PaginationEvent) {
    this.actionsText = 'Page Size: ' + $event.pageSize + ' Selected' + '\n' + this.actionsText;
    this.updateItems();
  }

  handlePageNumber($event: PaginationEvent) {
    this.actionsText = 'Page Number: ' + $event.pageNumber + ' Selected' + '\n' + this.actionsText;
    this.updateItems();
  }

  editAccount(item: any): void {
    for (let key in item) {
      console.log(key + '=>' + item[key]);
    }
  }

  // Pagination

  updateItems() {
    this.items = this.allItems.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }
}
