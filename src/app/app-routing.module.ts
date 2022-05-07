import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {MatchComponent} from "./components/match/match.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {GamesComponent} from "./components/games/games.component";
import {LobbyComponent} from "./lobby/lobby.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        data: {isHeader: true, isFooter: true},
      },
      {
        path: 'match',
        component: GamesComponent,
        data : {isHeader: true}
      },
      {
        path: 'match/dota2',
        component: MatchComponent,
        data : {isHeader: true}
      },
      {
        path: 'match/dota2/:id',
        component: LobbyComponent,
        data : {isHeader: true}
      },
      // {
      //   path: 'match',
      //   component: MatchComponent,
      //   data: {isHeader: true},
      // },
      // {
      //   path: 'match/:id',
      //   component: MatchComponent,
      //   data: {isHeader: true},
      // },
      // {
      //   path: 'tournament',
      //   component: GamesComponent,
      //   data: {isHeader: true},
      // },
      // {
      //   path: 'tournament/dota2',
      //   component: MatchComponent,
      //   data: {isHeader: true, game: 'dota2'},
      // }
    ]
  },
  {
    path: '**',
    data: {isHeader: true},
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
