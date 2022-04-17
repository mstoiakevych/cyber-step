import {Component, OnInit} from '@angular/core';
import {NgxSmartModalService} from "ngx-smart-modal";
import {MatchManagementHub} from "../../../../shared/hubs/match-management.hub";
import {MatchService} from "../../../../shared/services/match.service";
import {Match, serverRepresentations} from "../../../../shared/interfaces/match";
import {NotificationService} from "../../../../shared/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  createGameModalId = 'CreateGameId';
  matches: Match[] = []
  matchServerRepresentations = serverRepresentations

  constructor(public ngxSmartModalService: NgxSmartModalService,
              public hub: MatchManagementHub,
              public matchService: MatchService,
              public notificationService: NotificationService,
              public router: Router) {}

  ngOnInit(): void {
    this.hub.onError(message => this.notificationService.warning('Warning', message))

    this.hub.establishConnection()

    this.matchService.getMatches().subscribe(matches => {
      console.log('Fetched matches!', matches)
      this.matches = matches;
    }, error => this.notificationService.error('Oops!', error.message))
  }

  onCreateGame() {
  }

  getNormalizedServerName(match: Match): string {
    return this.matchServerRepresentations.find(x => x.server === match.server)!.representation
  }

  onJoin(match: Match) {
    this.router.navigateByUrl(`/match/${match.id}`, {state: match})
  }
}
