import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardConfig, InfoStatusCardConfig } from 'patternfly-ng';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  config: CardConfig;

  card2Config: InfoStatusCardConfig = {
    showTopBorder: false,
    htmlContent: false,
    iconImageSrc: '//www.patternfly.org/assets/img/patternfly-orb.svg',
    info: [
      'Infastructure: VMware',
      'Vmware: 1 CPU (1 socket x 1 core), 1024 MB',
      '12 Snapshots',
      'Drift History: 1',
      '<b>No htmlContent</b>',
      '<button>Mikel</button>'
    ]

  };
  constructor() {}

  ngOnInit() {
    this.config = {
      noPadding: false,
      topBorder: true
    } as CardConfig;
  }
}
