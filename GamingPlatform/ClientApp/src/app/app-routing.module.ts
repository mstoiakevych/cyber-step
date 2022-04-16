import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundLayoutComponent } from './layouts/notfound-layout/notfound-layout.component';
import { HomePageComponent } from './layouts/main-layout/pages/home-page/home-page.component';
import { LoginPageComponent } from './layouts/auth-layout/pages/login-page/login-page.component';
import { SignupPageComponent } from './layouts/auth-layout/pages/signup-page/signup-page.component';
import { PackagesPageComponent } from './layouts/main-layout/pages/packages-page/packages-page.component';
import { ContactPageComponent } from './layouts/main-layout/pages/contact-page/contact-page.component';
import { ExamplesComponent } from './layouts/main-layout/pages/examples/examples.component';
import { GamePageComponent } from './layouts/main-layout/pages/game-page/game-page.component';
import { ProfilePageComponent } from './layouts/main-layout/pages/profile-page/profile-page.component';
import { BlogPageComponent } from './layouts/main-layout/pages/blog-page/blog-page.component';
import { SingleBlogPageComponent } from './layouts/main-layout/pages/blog-page/components/single-blog-page/single-blog-page.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'packages',
        component: PackagesPageComponent
      },
      {
        path: 'contact',
        component: ContactPageComponent
      },
      {
        path: 'examples',
        canActivate: [AuthGuard],
        component: ExamplesComponent
      },
      {
        path: 'game/:name',
        component: GamePageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog',
        component: BlogPageComponent
      },
      {
        path: 'blog/:id',
        component: SingleBlogPageComponent
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'signup',
        component: SignupPageComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
