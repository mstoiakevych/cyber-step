import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MainLayoutComponent} from './main-layout.component';
import {FooterComponent} from './footer/footer.component';
import {LoaderComponent} from './loader/loader.component';
import {BackscrollComponent} from './backscroll/backscroll.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from '../../app-routing.module';
import {PackagesPageComponent} from './pages/packages-page/packages-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {ExamplesComponent} from './pages/examples/examples.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {HttpClientModule} from '@angular/common/http';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {DigitGamePageComponent} from './pages/game-page/components/digit-game-page/digit-game-page.component';
import {NotDigitGamePageComponent} from './pages/game-page/components/not-digit-game-page/not-digit-game-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {ParticlesComponent} from './particles/particles.component';
import {OrderPageComponent} from './pages/game-page/components/order-page/order-page.component';
import {SingleBlogPageComponent} from './pages/blog-page/components/single-blog-page/single-blog-page.component';
import { AlertComponent } from './alert/alert.component';
import {NgxSmartModalModule} from "ngx-smart-modal";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  providers: [AuthGuard],
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    LoaderComponent,
    BackscrollComponent,
    HomePageComponent,
    PackagesPageComponent,
    ContactPageComponent,
    ExamplesComponent,
    GamePageComponent,
    DigitGamePageComponent,
    NotDigitGamePageComponent,
    ProfilePageComponent,
    ParticlesComponent,
    OrderPageComponent,
    SingleBlogPageComponent,
    AlertComponent
  ],
  exports: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserModule,
    NgxSmartModalModule.forChild()
  ]
})
export class MainLayoutModule {

}
