import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Game} from './game';
import {GameService} from './game.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {GAMEMODES, SERVERS} from "../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [GameService, DecimalPipe]
})
export class MatchComponent implements OnInit {
  public servers = SERVERS
  public gameModes = GAMEMODES

  showPassword: boolean = false;

  games$: Observable<Game[]>;
  total$: Observable<number | null>;
  total: number | null = null;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: GameService, private router: Router) {
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
  }

  counter(i: number) {
    return new Array(i);
  }

  createNewMatch() {
    const ID = 3
    this.router.navigate([this.router.url, ID]);
  }
}
