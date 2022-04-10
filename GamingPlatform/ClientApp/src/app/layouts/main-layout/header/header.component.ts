import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {NgxSmartModalService} from "ngx-smart-modal";

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
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
