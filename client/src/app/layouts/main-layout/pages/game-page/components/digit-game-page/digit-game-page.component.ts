import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Game} from "../../../../../../shared/interfaces/game";
import {AuthService} from "../../../../../../shared/services/auth.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-digit-game-page',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0, zIndex: 10}),
        animate(200, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        style({opacity: 1, zIndex: 10}),
        animate(200, style({opacity: 0}))
      ])
    ])
  ],
  templateUrl: './digit-game-page.component.html',
  styleUrls: ['./digit-game-page.component.scss', '../../game-page.component.scss']
})
export class DigitGamePageComponent implements OnInit {

  currentRankURL = ""
  desiredRankURL = ""
  currentValue = 0
  desiredValue = 0
  price = 0.01
  totalPrice = 0
  showOrder = false
  offers: string[] = []
  @Input() game!: Game

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentRankURL = this.game.ranks[0].imageUrl!
    this.desiredRankURL = this.game.ranks[this.game.ranks.length - 1].imageUrl!
    this.currentValue = this.game.ranks[0].startsAt!
    this.desiredValue = this.game.maxRating!
    this.countPrice()
  }

  private findRankURL(value: number) {
    let url = this.game.ranks[0].imageUrl
    for (let i = 0; i < this.game.ranks.length; i++) {
      if (value < this.game.ranks[i].startsAt!)
        break
      else
        url = this.game.ranks[i].imageUrl
    }
    return url
  }

  private countPrice() {
    let xp = this.desiredValue - this.currentValue
    this.totalPrice = Number(((xp * this.price) * Math.log(this.desiredValue)).toFixed(2))

    let pct = 0.0
    this.offers = []
    Array.from(document.getElementsByClassName("custom-checkbox")).map((item, index) => {
      const ele = item as HTMLInputElement;
      if (ele.checked) {
        this.offers.push(this.game.offers[index].title)
        pct += this.game.offers[index].pctCost
      }
    })
    this.totalPrice = Number((this.totalPrice + (this.totalPrice * pct / 100)).toFixed(2))

    if (xp <= 0)
      this.totalPrice = 0
  }


  addValue(i: string) {
    if (i === "d") {
      if (this.desiredValue != this.game.maxRating) {
        this.desiredValue += 1
        this.desiredRankURL = this.findRankURL(this.desiredValue)!
      }
    } else {
      if (this.currentValue != this.game.maxRating) {
        this.currentValue += 1
        this.currentRankURL = this.findRankURL(this.currentValue)!
      }
    }
    this.countPrice()
  }

  subValue(i: string) {
    if (i === "d") {
      if (this.desiredValue != this.game.ranks[0].startsAt) {
        this.desiredValue -= 1
        this.desiredRankURL = this.findRankURL(this.desiredValue)!
      }
    } else {
      if (this.currentValue != this.game.ranks[0].startsAt) {
        this.currentValue -= 1
        this.currentRankURL = this.findRankURL(this.currentValue)!
      }
    }
    this.countPrice()
  }

  setValue(event: any, i: string) {
    if (event.target.value < this.game.ranks[0].startsAt!) {
      if (i === "d") {
        this.desiredValue = this.game.ranks[0].startsAt!
      } else {
        this.currentValue = this.game.ranks[0].startsAt!
      }
    }
    if (event.target.value >= this.game.maxRating!) {
      if (i === "d") {
        this.desiredValue = this.game.maxRating!
      } else {
        this.currentValue = this.game.maxRating!
      }
    }
    this.currentRankURL = this.findRankURL(this.currentValue)!
    this.desiredRankURL = this.findRankURL(this.desiredValue)!
    this.countPrice()
  }

  addPercentPrice(event: any, pctCost: number) {
    this.countPrice()
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.showOrder = false
    }
  }

  order() {
    if (this.authService.isAuthenticated())
      this.showOrder = true
    else
      this.router.navigate(["/login"])
  }

  close($event: any) {
    this.showOrder = false
  }
}
