import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NotFoundLayoutComponent} from "./layouts/notfound-layout/notfound-layout.component";
import {BlogPageComponent} from "./layouts/main-layout/pages/blog-page/blog-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {MainLayoutModule} from "./layouts/main-layout/main-layout.module";
import {AuthLayoutModule} from "./layouts/auth-layout/auth-layout.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundLayoutComponent,
    BlogPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MainLayoutModule,
    AuthLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [BlogPageComponent, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
