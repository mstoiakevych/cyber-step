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
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.userForm.controls.fullname.setValue(user.fullname);
      this.userForm.controls.username.setValue(user.username);
      this.userForm.controls.email.setValue(user.email);
      this.userForm.controls.age.setValue(user.age);
      this.userForm.controls.phone.setValue(user.phone);
      this.userForm.controls.address.setValue(user.address);
    });
  }

  onSubmit(): void {
    this.authService.updateUser({_id: this.user._id, ...this.userForm.value}).subscribe(_ => {
      this.alert.success('Data has been updated!');
    }, error => this.alert.danger('Something went wrong!'));
  }
}
