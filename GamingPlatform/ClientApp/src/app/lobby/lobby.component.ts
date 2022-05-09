import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {TimerComponent} from "../components/timer/timer.component";
import {GameMode, GameState, Match, matchModeRepresentations, serverRepresentations} from "../shared/interfaces/match";
import {Player, Team} from "../shared/interfaces/player";
import {ToastService} from "../shared/services/toast.service";
import {MatchManagementHub} from "../shared/hubs/match-management.hub";
import {GameService} from "../components/match/game.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  matchId: number
  match: Match = {
    id: 0,
    name: '',
    gameMode: GameMode.OneVsOne,
    matchMode: matchModeRepresentations[0].value,
    gameState: GameState.Lobby,
    joinedPlayers: 1,
    totalPlayers: 2,
    server: serverRepresentations[0].value,
    lobbyName: '',
    lobbyPassword: '',
    players: [],
  };

  player: Player = {
    id: 0,
    username: '',
    avatar: '',
    team: Team.Radiant,
    isReady: false
  }

  get players() {
    return this.RadiantList.concat(this.DireList)
  }

  servers = serverRepresentations
  matchModes = matchModeRepresentations
  isEditing: boolean = true;
  isStarted: boolean = false;

  public allAccepted = () => this.match?.totalPlayers === this.players.filter(p => p.isReady).length

  public DireList: Player[] = []
  public RadiantList: Player[] = []

  @ViewChild('stepper') private stepper: MatStepper
  @ViewChild('timer') private timer: TimerComponent

  constructor(private route: ActivatedRoute,
              public router: Router,
              public hub: MatchManagementHub,
              public notification: ToastService,
              public gameService: GameService
              ) {
    this.matchId = route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.hub.onError(message => {
      this.notification.show(message)
    })

    this.hub.onMatchJoin(players => {
      console.log('OnMatchJoin', players)
    })

    this.hub.onNewPlayerJoin(player => {
      console.log('New player joined', player)

      this.addPlayerToTeam(player)
    })

    this.hub.onPlayerToggleReady(player => {
      this.getPlayerTeam(player).find(p => p.id === player.id)!.isReady = player.isReady
    })

    this.hub.onPlayerChangeTeam(player => {
      // if (player.team === Team.Radiant) {
      //   const playerToUpdate = this.DireList.find(p => p.id === player.id)!
      //   playerToUpdate.team = player.team
      //
      //   this.DireList = this.DireList.filter(p => p.id !== player.id)
      //   this.RadiantList.push(playerToUpdate)
      // } else if (player.team === Team.Dire) {
      //   const playerToUpdate = this.RadiantList.find(p => p.id === player.id)!
      //   playerToUpdate.team = player.team
      //
      //   this.RadiantList = this.RadiantList.filter(p => p.id !== player.id)
      //   this.DireList.push(playerToUpdate)
      // }

      this.updatePlayerTeam(player)
    })

    this.hub.onShowModalWithTimer(message => {
      console.log('[TESTING] Event ShowModalWithTimer')
      this.notification.show(message)
    })

    this.hub.onShowModalWithMessage(message => {
      console.log('[TESTING] Event ShowModalWithMessage')
      this.notification.show(message)
    })

    this.hub.onShowMatchResult(winner => {
      console.log('[TESTING] Event ShowMatchResult')
      this.notification.show('Game has ended. Winner: ' + winner.toFixed())
    })

    this.hub.onPlayerLeave(player => {
      this.DireList = this.DireList.filter(p => p.id !== player.id)
      this.RadiantList = this.RadiantList.filter(p => p.id !== player.id)
    })

    this.hub.establishConnection()

    this.gameService.getMatch(this.matchId).subscribe(match => {
      this.match = match;

      this.gameService.joinMatch(match.id).subscribe(player => {
        this.player = player;

        this.match.players.filter(p => p.id !== player.id).forEach(player => this.addPlayerToTeam(player))
        this.addPlayerToTeam(this.player)

        this.hub.joinGame(match.id, player.id)
      }, joinError => {
        this.notification.show(joinError.error.message)

        this.router.navigateByUrl('/')
      })
    }, matchError => {
      this.notification.show('This match doesn\'t exist anymore')

      this.router.navigateByUrl('/')
    })
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let team: Team
      if (event.container.data === this.DireList) {
        team = Team.Dire
      } else if (event.container.data === this.RadiantList) {
        team = Team.Radiant
      } else return

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)

      const player = this.players.find(p => p.id === Number(event.item.element.nativeElement.id))!

      this.hub.changeTeam(player.id, team).then(success => {
        if (!success) {
          transferArrayItem(event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex)

          this.notification.show('You can\'t change the team')
        } else {
          player.team = team
        }
      })
    }
  }

  submit() {
    this.isEditing = !this.isEditing;
    for (const field in this.form.controls) {
      const control = this.form.get(field);
      control![!this.isEditing ? 'enable' : 'disable']()
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  acceptedCount = () => this.players.filter(p => p.isReady).length

  form = new FormGroup({
    name: new FormControl({value: this.match.name, disabled: this.isEditing}),
    matchMode: new FormControl({value: this.match.matchMode, disabled: this.isEditing}),
    rate: new FormControl({value: 322, disabled: this.isEditing}),
    server: new FormControl({value: this.match.server, disabled: this.isEditing}),
    password: new FormControl({value: this.match.lobbyPassword, disabled: this.isEditing}),
  })


  start() {
    if (this.allAccepted()) {
      this.isStarted = true;
      setTimeout(() => {
        this.stepper.next()
      }, 5000)
      setTimeout(() => {
        this.stepper.next()
      }, 10000)
      setTimeout(() => {
        this.stepper.next();
        this.timer.startTimer();
        setTimeout(() => {
          this.stepper.next()
          setTimeout(() => {
            this.stepper.next()
          }, 10000)
        }, 60000)
      }, 15000)
    }
  }

  toggleReady() {
    this.hub.toggleReady().then(isReady => {
      this.player.isReady = isReady;
    })
  }

  getPlayerTeam(player: Player): Player[] {
    if (player.team === Team.Radiant) return this.RadiantList
    else if (player.team === Team.Dire) return this.DireList
    return null!
  }

  addPlayerToTeam(player: Player) {
    this.getPlayerTeam(player).push(player)
  }

  updatePlayerTeam(player: Player) {
    const playerToUpdate = this.players.find(p => p.id === player.id)!

    this.RadiantList = this.RadiantList.filter(p => p.id !== player.id)
    this.DireList = this.DireList.filter(p => p.id !== player.id)

    playerToUpdate.team = player.team

    this.addPlayerToTeam(playerToUpdate)
  }
}
