import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {GameService} from './game.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {Router} from "@angular/router";
import {CreateMatch, Match, matchModeRepresentations, serverRepresentations} from "../../shared/interfaces/match";
import {FormControl, FormGroup} from "@angular/forms";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NotificationService} from "../../shared/services/notification.service";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [GameService, DecimalPipe]
})
export class MatchComponent implements OnInit {
  public servers = serverRepresentations
  public gameModes = matchModeRepresentations

  showPassword: boolean = false;

  games$: Observable<Match[]>;
  total$: Observable<number | null>;
  total: number | null = null;

  form = new FormGroup({
    name: new FormControl(''),
    gameMode: new FormControl(this.gameModes[0].value),
    rate: new FormControl(0),
    server: new FormControl(this.servers[0].value),
    password: new FormControl('4d447c3a2a5a2b18ffb7340ea9fd42ff'),
  })

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('sidebar') sidebar: SidebarComponent;

  constructor(public service: GameService, private router: Router, public notification: ToastService) {
    this.games$ = service.games$;
    this.total$ = service.total$;
    this.headers = new QueryList<NgbdSortableHeader>();
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.total$.subscribe(x => {
      this.total = x;
    })

    this.games$.subscribe(x => {
      console.log(x)
    })
  }

  counter(i: number) {
    return new Array(i);
  }

  onSubmit() {
    const matchToCreate: CreateMatch = {
      Name: this.form.get('name')?.value,
      Server: this.form.get('server')?.value,
      GameMode: 0,
      MatchMode: this.form.get('gameMode')?.value,
      Password: this.form.get('password')?.value
    }

    this.service.createMatch(matchToCreate).subscribe(matchId => {
      this.router.navigateByUrl(`match/dota2/${matchId}`)
    }, error => {
      this.notification.show(error.error.message)
      this.sidebar.hide()
    })
  }
}
