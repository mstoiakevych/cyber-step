import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res.success) {
        this.loginForm.reset();
        this.router.navigate(['/']);
      }
    }, error => {
      this.error = error.error.result;
      setTimeout(() => {
        this.error = '';
      }, 5000);
    });
  }


}
