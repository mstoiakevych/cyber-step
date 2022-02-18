import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GameService} from '../../../../shared/services/game.service';
import {Game} from '../../../../shared/interfaces/game';
import {Router} from '@angular/router';
import {OrderService} from '../../../../shared/services/order.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  };

  constructor(private gameService: GameService, private router: Router) {
  }

  games: Game[] = [];
  isGamesLoaded = false;
  search = '';

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      this.isGamesLoaded = true;
    }, error => console.error(error));
  }

  findGame(): void {
    if (this.search) {
        this.router.navigate(['/game/' + this.search]);
      }
  }
}