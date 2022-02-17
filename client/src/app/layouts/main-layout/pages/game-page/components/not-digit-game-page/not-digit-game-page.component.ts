import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Game} from "../../../../../../shared/interfaces/game";
import {ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../../../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-not-digit-game-page',
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
  templateUrl: './not-digit-game-page.component.html',
  styleUrls: ['./not-digit-game-page.component.scss', '../../game-page.component.scss']
})
export class NotDigitGamePageComponent implements OnInit {
  currentRankURL = ""
  desiredRankURL = ""
  selectedCurrentRank!: string
  selectedCurrentRankLVL: string = ""
  selectedDesiredRank!: string
  selectedDesiredRankLVL: string  = ""
  isLvl1 = true
  isLvl2 = true
  price = 8
  lvlprice = 5
  totalPrice = 0
  showOrder = false
  @ViewChild('select1') select1!: ElementRef;
  @ViewChild('select2') select2!: ElementRef;
  @ViewChild('select1lvl') select1lvl!: ElementRef;
  @ViewChild('select2lvl') select2lvl!: ElementRef;
  @Input() game!: Game
  currentValue!: string
  desiredValue!: string;
  offers: string[] = []
  constructor(private cdref: ChangeDetectorRef, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
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

  ngAfterViewInit() {
    if (this.game.ranks[0].levels.length < 1) {
      let idx = this.game.ranks.length - 1
      this.select2.nativeElement.getElementsByTagName("option")[idx].selected = true
      this.currentRankURL = this.game.ranks[0].imageUrl!
      this.desiredRankURL = this.game.ranks[idx].imageUrl!
      this.selectedCurrentRank = this.select1.nativeElement.getElementsByTagName("option")[0].value
      this.selectedDesiredRank = this.select2.nativeElement.getElementsByTagName("option")[idx].value
    } else {
      let idx = this.game.ranks.length - 2
      this.select2.nativeElement.getElementsByTagName("option")[idx].selected = true
      this.select2lvl.nativeElement.getElementsByTagName("option")[0].selected = true
      this.selectedCurrentRank = this.select1.nativeElement.getElementsByTagName("option")[0].value
      this.selectedDesiredRank = this.select2.nativeElement.getElementsByTagName("option")[idx].value
      this.selectedCurrentRankLVL = this.select1lvl.nativeElement.getElementsByTagName("option")[0].value
      this.selectedDesiredRankLVL = this.select2lvl.nativeElement.getElementsByTagName("option")[0].value

      this.currentRankURL = this.game.ranks[0].levels[0].imageUrl!
      this.desiredRankURL = this.game.ranks[idx].levels[0].imageUrl!
    }
    this.currentValue = this.selectedCurrentRank +" "+ this.selectedCurrentRankLVL
    this.desiredValue = this.selectedDesiredRank +" "+ this.selectedDesiredRankLVL
    this.countPrice()
    this.cdref.detectChanges()
  }


  private countPrice() {
    let desiredValue = 0
    let currentValue = 0
    let desiredValueLVL = 0
    let currentValueLVL = 0
    this.game.ranks.map((rank, index) => {
      if (rank.rank === this.selectedCurrentRank) {
        if (rank.levels.length) {
          rank.levels.map((l, index) => {
            if (l.level === this.selectedCurrentRankLVL) {
              currentValueLVL = index * this.lvlprice
            }
          })
        }
        currentValue = index
      }
      if (rank.rank === this.selectedDesiredRank) {
        if (rank.levels.length) {
          rank.levels.map((l, index) => {
            if (l.level === this.selectedDesiredRankLVL) {
              desiredValueLVL = index * this.lvlprice
            }
          })
        }
        desiredValue = index
      }
    })
    let xp = desiredValue - currentValue
    this.totalPrice = Number(Math.abs(((xp * this.price) * Math.log(xp == 1 ? 0.5 : desiredValue))).toFixed(2))
    this.totalPrice -= desiredValueLVL - currentValueLVL
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

  addPercentPrice(event: any, pctCost: number) {
    this.countPrice()
  }

  choseRank(event: any, value: any, i: string) {
    if (i == "d") {
      this.game.ranks.map((rank, index) => {
        if (rank.rank === value && rank.levels.length > 0) {
          this.selectedDesiredRank = this.select2.nativeElement.getElementsByTagName("option")[index].value
          if (this.game.ranks[0].levels.length < 1) {
            this.desiredRankURL = this.game.ranks[index].imageUrl!
          } else {
            this.game.ranks[index].levels.map((lvl, idx) => {
              if (lvl.level === this.selectedDesiredRankLVL) {
                this.desiredRankURL = this.game.ranks[index].levels[idx].imageUrl
              }
            })
          }
        }
        this.isLvl2 = true
        if (rank.rank === value && rank.levels.length < 1) {
          this.selectedDesiredRank = this.select2.nativeElement.getElementsByTagName("option")[index].value
          this.desiredRankURL = this.game.ranks[index].imageUrl!
          this.isLvl2 = false
        }
      })
      this.countPrice()
    } else {
      this.game.ranks.map((rank, index) => {
        if (rank.rank === value && rank.levels.length > 0) {
          this.selectedCurrentRank = this.select1.nativeElement.getElementsByTagName("option")[index].value
          if (this.game.ranks[0].levels.length < 1) {
            this.currentRankURL = this.game.ranks[index].imageUrl!
          } else {
            this.game.ranks[index].levels.map((lvl, idx) => {
              if (lvl.level === this.selectedCurrentRankLVL) {
                this.currentRankURL = this.game.ranks[index].levels[idx].imageUrl
              }
            })
          }
        }
        this.isLvl1 = true
        if (rank.rank === value && rank.levels.length < 1) {
          this.selectedCurrentRank = this.select1.nativeElement.getElementsByTagName("option")[index].value
          this.currentRankURL = this.game.ranks[index].imageUrl!
          this.isLvl1 = false
        }
      })
      this.countPrice()
    }
    this.currentValue = this.selectedCurrentRank +" "+ this.selectedCurrentRankLVL
    this.desiredValue = this.selectedDesiredRank +" "+ this.selectedDesiredRankLVL
  }

  choseRankLVL($event: Event, value: string, i: string) {
    if (i == "d") {
      this.game.ranks.map((rank, index) => {
        if (rank.rank == this.selectedDesiredRank && rank.levels.length > 0) {
          this.game.ranks[index].levels.map((lvl, idx) => {
            if (lvl.level === value) {
              this.desiredRankURL = this.game.ranks[index].levels[idx].imageUrl
              this.selectedDesiredRankLVL = this.select2lvl.nativeElement.getElementsByTagName("option")[idx].value
            }
          })
        }
      })
    } else {
      this.game.ranks.map((rank, index) => {
        if (rank.rank == this.selectedCurrentRank && rank.levels.length > 0) {
          this.game.ranks[index].levels.map((lvl, idx) => {
            if (lvl.level === value) {
              this.currentRankURL = this.game.ranks[index].levels[idx].imageUrl
              this.selectedCurrentRankLVL = this.select2lvl.nativeElement.getElementsByTagName("option")[idx].value
            }
          })
        }
      })
    }
    this.countPrice()
    this.currentValue = this.selectedCurrentRank +" "+ this.selectedCurrentRankLVL
    this.desiredValue = this.selectedDesiredRank +" "+ this.selectedDesiredRankLVL
  }
}
