import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AppRoutingModule} from '../../app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AuthLayoutComponent, SignupPageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
