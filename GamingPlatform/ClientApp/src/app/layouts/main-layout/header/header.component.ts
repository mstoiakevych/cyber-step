import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {NgxSmartModalService} from "ngx-smart-modal";
import * as signalR from '@microsoft/signalr';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  createGameModalId = 'CreateGameId';

  constructor(public authService: AuthService,
              private router: Router,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.matchHub, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .build();

    connection.start().then(x => {
      console.log('Connected', x)

      connection.send('CreateGame', 3, 3).then(x => {
        console.log('Created', x)
      })

      connection.on('Error', message => {
        console.log(message)
      })

    }).catch(e => {
      console.log('WHAT HAPPENED?', e)
    })
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
