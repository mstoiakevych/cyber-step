import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {gameModeRepresentations, serverRepresentations} from "../../interfaces/match";
import {MatchService} from "../../services/match.service";
import {ModalComponent} from "../../interfaces/modal-component";

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss']
})
export class CreateGameModalComponent implements OnInit, ModalComponent {

  @Input() modalId: string = 'CreateGameModalId'

  gameCreationForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    GameMode: new FormControl(gameModeRepresentations[0].gameMode, [Validators.required]),
    Server: new FormControl(serverRepresentations[0].server, [Validators.required])
  })
  error = ''

  gameModes = gameModeRepresentations
  servers = serverRepresentations

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.matchService.createAndJoinMatch(this.gameCreationForm.value).subscribe(createdMatch => {
      console.log(createdMatch)
    })
  }
}
