import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {Router} from "@angular/router";
import {Game} from "../../../../shared/interfaces/game";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  nameURL = ""
  isGameLoaded = false
  game!: Game

  constructor(private gameService: GameService, private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(function(){ window.scrollTo(0, 0); }, 100);
    this.nameURL = this.router.url.split("/")[2]
    this.gameService.getOneGame(this.nameURL).subscribe((data) => {

      if (!data.success) {
        this.router.navigate(["/404"])
      } else {
        this.game = data.result
        this.isGameLoaded = true
      }
    })
  }

}
