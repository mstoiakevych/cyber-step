import {Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Game} from '../../../../../../shared/interfaces/game';
import {OrderService} from '../../../../../../shared/services/order.service';
import {Order} from '../../../../../../shared/interfaces/order';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;

  headerURL!: string;

  constructor(private orderService: OrderService, private router: Router) {
  }

  @Input() game!: Game;
  @Input() currentRankURL!: string;
  @Input() desiredRankURL!: string;
  @Input() currentValue!: any;
  @Input() desiredValue!: any;
  @Input() totalPrice!: number;
  @Input() offers!: string[];
  @Output() onChanged = new EventEmitter();

  nickname!: string;
  comment!: string;
  booster = '';


  showPayPal = false;
  paidFor = false;

  orderForm!: FormGroup;

  onClose(): void {
    this.onChanged.emit(true);
  }

  ngOnInit(): void {
    this.headerURL = 'assets/img/games/header-' + this.game.nameUrl + '.png';
    this.orderForm = new FormGroup({
      nickName: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
    });
  }

  orderNow(): void {

    let o: Order;

    if (this.game.digital) {
      o = {
        nickname: this.orderForm.controls.nickName.value,
        game: this.game.title,
        price: this.totalPrice.toString(),
        currentRank: {
          rank: this.getRankByRating(this.currentValue),
          rating: this.currentValue,
          imageUrl: this.currentRankURL
        },
        desiredRank: {
          rank: this.getRankByRating(this.desiredValue),
          rating: this.desiredValue,
          imageUrl: this.desiredRankURL
        },
        booster: this.booster,
        comment: this.orderForm.controls.comments.value,
        offers: this.offers
      };
    } else if (!this.game.digital) {
      o = {
        nickname: this.orderForm.controls.nickName.value,
        game: this.game.title,
        price: this.totalPrice.toString(),
        currentRank: {
          rank: this.currentValue,
          imageUrl: this.currentRankURL
        },
        desiredRank: {
          rank: this.desiredValue,
          imageUrl: this.desiredRankURL
        },
        booster: this.booster,
        comment: this.orderForm.controls.comments.value,
        offers: this.offers
      };
    } else {
      throw new Error('Game data is wrong!');
    }

    this.orderService.createOrder(o).subscribe(res => {
      this.paypalElement.nativeElement.style.margin = '50px 10% 0';
      this.showPayPal = true;
      paypal
        .Buttons({
          style: {
            color: 'black',
            layout: 'horizontal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Rank boosting in ' + this.game.title + ' from ' + this.currentValue + ' to ' + this.desiredValue,
                  amount: {
                    currency_code: 'EUR',
                    value: this.totalPrice
                  }
                }
              ]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();

            this.onClose();
            this.paidFor = true;
            await this.router.navigate(['']);
          },
          onError: (err: any) => {
            console.log(err);
          }
        })
        .render(this.paypalElement.nativeElement);
    }, error => {
      this.onClose();
    });
  }

  getRankByRating(rating: number | string): string {
    const possibleRanks = this.game.ranks.filter(rank => rank.startsAt ? rank.startsAt : -1 <= rating);
    return possibleRanks.slice(-1)[0].rank;
  }

  onChange(event: any) {
    this.booster = event.target.value;
  }
}
