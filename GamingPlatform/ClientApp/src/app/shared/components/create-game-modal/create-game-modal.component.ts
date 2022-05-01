import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {gameModeRepresentations, serverRepresentations} from "../../interfaces/match";
import {ModalComponent} from "../../interfaces/modal-component";
import {MatchService} from "../../services/match.service";
import {MatchManagementHub} from "../../hubs/match-management.hub";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {NgxSmartModalComponent} from "ngx-smart-modal/src/components/ngx-smart-modal.component";
import {NgxSmartModalService} from "ngx-smart-modal";

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss']
})
export class CreateGameModalComponent implements OnInit, ModalComponent {

  @Input() modalId: string = 'CreateGameModalId'
  get createGameModal(): NgxSmartModalComponent {
    return this.ngxSmartModalService.getModal(this.modalId)
  }

  gameCreationForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    GameMode: new FormControl(gameModeRepresentations[0].gameMode, [Validators.required]),
    Server: new FormControl(serverRepresentations[0].server, [Validators.required])
  })
  error = ''

  gameModes = gameModeRepresentations
  servers = serverRepresentations

  constructor(private matchService: MatchService,
              public authService: AuthService,
              public notificationService: NotificationService,
              public router: Router,
              public hub: MatchManagementHub,
              public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.matchService.create(this.gameCreationForm.value).subscribe(matchId => {
      this.createGameModal.close()
      this.hub.createGame(matchId)
      this.router.navigateByUrl(`/match/${matchId}`)
    }, e => {
      this.notificationService.error('', e.message);
    })
  }
}
