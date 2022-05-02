import {Component, Input, OnInit} from '@angular/core';
import {CreatedMatch, Match} from "../../../../shared/interfaces/match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../../../../shared/services/match.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {MatchManagementHub} from "../../../../shared/hubs/match-management.hub";
import {Player} from "../../../../shared/interfaces/player";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit {

  matchId: number
  match: Match
  player: Player

  constructor(public router: Router,
              private route: ActivatedRoute,
              public matchService: MatchService,
              public notificationService: NotificationService,
              public hub: MatchManagementHub,
              public authService: AuthService) {
    this.matchId = route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.hub.onError(message => {
      this.notificationService.error('', message)
    })

    this.hub.onMatchJoin(players => {
      console.log('OnMatchJoin', players)
    })

    this.hub.onNewPlayerJoin(player => {
      console.log('New player joined', player)
    })

    this.hub.onShowModalWithTimer(message => {
      console.log('[TESTING] Event ShowModalWithTimer')
      this.notificationService.info('', message)
    })

    this.hub.onShowModalWithMessage(message => {
      console.log('[TESTING] Event ShowModalWithMessage')
      this.notificationService.info('', message)
    })

    this.hub.onShowMatchResult(winner => {
      console.log('[TESTING] Event ShowMatchResult')
      this.notificationService.success('', 'Game has ended. Winner: ' + winner.toFixed())
    })

    this.hub.establishConnection()

    this.matchService.getMatch(this.matchId).subscribe(match => {
      this.match = match;

      this.matchService.join(match.id).subscribe(player => {
        this.player = player

        this.hub.joinGame(match.id, player.id)
      }, joinError => {
        this.notificationService.warning('', joinError.error.message)
      })
    }, matchError => {
      this.notificationService.warning('', 'This match doesn\'t exist anymore')

      this.router.navigateByUrl('/')
    })
  }


  invitePlayers() {
    console.log('[TESTING] Call InvitePlayers')
    this.hub.invitePlayers(1)
  }
}
