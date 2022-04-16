import {Component, OnInit} from '@angular/core';
import {NgxSmartModalService} from "ngx-smart-modal";
import {MatchManagementHub} from "../../../../shared/hubs/match-management.hub";
import {MatchService} from "../../../../shared/services/match.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  createGameModalId = 'CreateGameId';

  constructor(public ngxSmartModalService: NgxSmartModalService,
              public hub: MatchManagementHub,
              public matchService: MatchService) {}

  ngOnInit(): void {
    this.hub.onError(m => console.log(m))

    this.hub.establishConnection()
  }

  onCreateGame() {
  }
}
