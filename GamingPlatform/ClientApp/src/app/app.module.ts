import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastComponent} from "./components/toast/toast.component";
import {SpinnerComponent} from './components/spinner/spinner.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MatchComponent} from './components/match/match.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {TournamentComponent} from './components/tournament/tournament.component';
import {NgbdSortableHeader} from './components/match/sortable.directive';
import {AntEmptyComponent} from './components/ant-empty/ant-empty.component';
import {GamesComponent} from './components/games/games.component';
import {DragScrollModule} from "ngx-drag-scroll";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {LobbyComponent} from './lobby/lobby.component';
import {BackButtonDirective} from './back-button.directive';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgSelectModule} from '@ng-select/ng-select';
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { TimerComponent } from './components/timer/timer.component';
import {NotificationComponent} from "./shared/components/notification/notification.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {RepresentationPipe} from './shared/pipes/representation.pipe.ts.pipe';
import {DecimalPipe} from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { NgChartsModule } from 'ng2-charts';
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpClientModule,
    DecimalPipe
  ],
  declarations: [
    AppComponent,
    ToastComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MatchComponent,
    HomePageComponent,
    TournamentComponent,
    NgbdSortableHeader,
    AntEmptyComponent,
    GamesComponent,
    SidebarComponent,
    LobbyComponent,
    BackButtonDirective,
    TimerComponent,
    NotificationComponent,
    RepresentationPipe,
    ProfilePageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    DragScrollModule,
    DragDropModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule,
    MatSliderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
