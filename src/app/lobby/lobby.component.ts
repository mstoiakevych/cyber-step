import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Game} from "../components/match/game";
import {GAMES} from "../components/match/games";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup} from "@angular/forms";
import {GAMEMODES, SERVERS} from "../constants";
import {MatStepper} from "@angular/material/stepper";
import {TimerComponent} from "../components/timer/timer.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public isEditing: boolean = true;
  private _id: number = -1;
  public game?: Game;
  public isStarted: boolean = false;

  public servers = SERVERS
  public gameModes = GAMEMODES

  public allAccepted = () => this.game?.maxPlayers === this.acceptedCount()

  public players = [
    {
      id: 1,
      steam_id: 76561198975089785,
      nick: "Nebag",
      photo: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/65/6504a08df5bf5b17698403fc9e0b1da29110492f_full.jpg",
      accepted: false,
    },
    {
      id: 2,
      steam_id: 123456,
      nick: "Gaben",
      photo: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5a/5ae14182491e54978c24324e49e8198736e6c23f_full.jpg",
      accepted: true,
    },
    {
      id: 3,
      steam_id: 123451,
      nick: "Snitch",
      photo: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e8/e8ef2b11eee5e2b7b13c3a82cbbbb5e4efdb454a_full.jpg",
      accepted: true,
    },
    {
      id: 4,
      steam_id: 123113,
      nick: "Spider Man",
      photo: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4a/4ae8fc4878b4e51761aff1d56b2d38da5ebcf10b_full.jpg",
      accepted: true,
    }
  ]

  public DireList = [this.players[0], this.players[1]]
  public RadiantList = [this.players[2], this.players[3]]

  @ViewChild('stepper') private stepper: MatStepper
  @ViewChild('timer') private timer: TimerComponent

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['id']
      this.game = GAMES.find(x => x.id == this._id)
    });
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  submit() {
    this.isEditing = !this.isEditing;
    for (const field in this.frmGroup.controls) {
      const control = this.frmGroup.get(field);
      control![!this.isEditing ? 'enable' : 'disable']()
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  acceptedCount = () => this.players.filter(x => x.accepted).length


  frmGroup = new FormGroup({
    name: new FormControl({value: this.game?.name, disabled: this.isEditing}),
    gameMode: new FormControl({value: this.game?.gameMode, disabled: this.isEditing}),
    rate: new FormControl({value: this.game?.rate, disabled: this.isEditing}),
    server: new FormControl({value: this.servers[1], disabled: this.isEditing}),
    password: new FormControl({value: 'this.game?.password', disabled: this.isEditing}),
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

  accept() {
    this.players[0].accepted = !this.players[0].accepted;
  }

}
