import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {User} from '../../../../shared/interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private authService: AuthService, private alert: AlertService) {
  }

  user!: User;

  userForm = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
  }
}
