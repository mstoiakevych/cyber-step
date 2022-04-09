import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {NgxSmartModalService} from "ngx-smart-modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DotaServerType, gameModeRepresentations, serverRepresentations} from "../../../shared/interfaces/match";
import {MatchService} from "../../../shared/services/match.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gameCreationForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    GameMode: new FormControl(gameModeRepresentations[0].gameMode, [Validators.required]),
    Server: new FormControl(serverRepresentations[0].server, [Validators.required])
  })
  error = ''

  gameModes = gameModeRepresentations
  servers = serverRepresentations

  constructor(public authService: AuthService,
              private router: Router,
              public ngxSmartModalService: NgxSmartModalService,
              private matchService: MatchService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.matchService.createMatch(this.gameCreationForm.value).subscribe(createdMatch => {
      console.log(createdMatch)
    })
  }
}
