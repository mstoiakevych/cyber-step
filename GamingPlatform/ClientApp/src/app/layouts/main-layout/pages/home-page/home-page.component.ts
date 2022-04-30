import {Component, OnInit} from '@angular/core';
import {NgxSmartModalService} from "ngx-smart-modal";
import {MatchManagementHub} from "../../../../shared/hubs/match-management.hub";
import {MatchService} from "../../../../shared/services/match.service";
import {Match, serverRepresentations} from "../../../../shared/interfaces/match";
import {NotificationService} from "../../../../shared/services/notification.service";
import {Router} from "@angular/router";
import {NgxSmartModalComponent} from "ngx-smart-modal/src/components/ngx-smart-modal.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  createGameModalId = 'CreateGameId';
  matches: Match[] = []
  matchServerRepresentations = serverRepresentations
  get createGameModal(): NgxSmartModalComponent {
    return this.ngxSmartModalService.getModal(this.createGameModalId)
  }

  constructor(public ngxSmartModalService: NgxSmartModalService,
              public matchService: MatchService,
              public notificationService: NotificationService,
              public router: Router, public hub: MatchManagementHub) {}

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
    }, error => this.notificationService.error('Oops!', error.message))

    this.hub.establishConnection()
  }

  testHub() {
    this.hub.test()
  }

  getNormalizedServerName(match: Match): string {
    return this.matchServerRepresentations.find(x => x.server === match.server)!.representation
  }

  onJoin(match: Match) {
    this.createGameModal.close()
    this.router.navigateByUrl(`/match/${match.id}`)
  }
}
