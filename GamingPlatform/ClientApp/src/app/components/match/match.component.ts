import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {map, Observable} from 'rxjs';

import {GameService} from './game.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {Router} from "@angular/router";
import {CreateMatch, Match, matchModeRepresentations, serverRepresentations} from "../../shared/interfaces/match";
import {FormControl, FormGroup} from "@angular/forms";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ToastService} from "../../shared/services/toast.service";
import {faGem} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [GameService, DecimalPipe]
})
export class MatchComponent implements OnInit {
  faGem = faGem

  public servers = serverRepresentations
  public gameModes = matchModeRepresentations

  showPassword: boolean = false;
  feeValue = 25;

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
    this.games$ = service.games$.pipe(map(x => x.map(g => {(g as any).fee = Math.floor(Math.random() * 300); return g})));
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

  getRandomFee(game: any) {
    return game.fee
  }

  onValueChange(event: any) {
    console.log(event)
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
