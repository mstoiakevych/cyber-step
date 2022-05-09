import {Component, OnInit, ViewChild} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games = [
    {
      title: 'Dota 2',
      bg: 'url("assets/img/slider/slider-dota.jpg") no-repeat',
      url: 'dota2',
      isActive: true,
      color: '#63686A',
    },
    {
      title: 'CS:GO',
      bg: 'url("assets/img/slider/slider-csgo.jpg") no-repeat',
      url: 'csgo',
      isActive: false,
      color: '#5A5C5D',
    },
    {
      title: 'Hearthstone',
      bg: 'url("assets/img/slider/slider-hs.jpg") no-repeat',
      url: 'hs',
      isActive: false,
      color: '#615D75',
    },
    {
      title: 'Valorant',
      bg: 'url("assets/img/slider/slider-valorant.jpg") no-repeat',
      url: 'valorant',
      isActive: false,
      color: '#A93C44',
    },
    {
      title: 'Overwatch',
      bg: 'url("assets/img/slider/slider-overwatch.jpg") no-repeat',
      url: 'overwatch',
      isActive: false,
      color: '#997A7D',
    },
    {
      title: 'Rocket League',
      bg: 'url("assets/img/slider/slider-rl.jpg") no-repeat',
      url: 'rl',
      isActive: false,
      color: '#514B50',
    },
    {
      title: 'Pubg',
      bg: 'url("assets/img/slider/slider-pubg.jpg") no-repeat',
      url: 'pubg',
      isActive: false,
      color: '#376181',
    },
    {
      title: 'League of Legends',
      bg: 'url("assets/img/slider/slider-lol.jpg") no-repeat',
      url: 'lol',
      isActive: false,
      color: '#AB9F76',
    },
  ]

  @ViewChild("nav", {read: DragScrollComponent}) ds: DragScrollComponent | null;

  constructor() {
    this.ds = null;
  }

  ngOnInit(): void {
  }

}
