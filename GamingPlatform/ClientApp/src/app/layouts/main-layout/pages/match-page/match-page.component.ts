import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../../shared/interfaces/match";
import {Router} from "@angular/router";
import {MatchService} from "../../../../shared/services/match.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {MatchManagementHub} from "../../../../shared/hubs/match-management.hub";

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit {

  match: Match
  playerId: number

  constructor(public router: Router,
              public matchService: MatchService,
              public notificationService: NotificationService,
              public hub: MatchManagementHub) {
    this.match = this.router.getCurrentNavigation()!.extras.state as Match
  }

  ngOnInit(): void {
    this.hub.onMatchJoin(players => {
      console.log('OnMatchJoin', players)
    })

    if (!this.match) {
      this.notificationService.info('', 'You can\'t join this game any more.')
      this.router.navigateByUrl('/');
    }

    this.matchService.joinMatch(this.match.id).subscribe(created => {
      this.playerId = created.playerId
      this.hub.joinGame(created.matchId, created.playerId)
    })
  }

}
