import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { NotFoundLayoutComponent } from './layouts/notfound-layout/notfound-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogPageComponent } from './layouts/main-layout/pages/blog-page/blog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundLayoutComponent,
    BlogPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    AuthLayoutModule,
    BrowserAnimationsModule,

  ],
  providers: [BlogPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
