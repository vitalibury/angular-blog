import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/intefaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  myForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if(this.myForm.invalid) return

    const user: User = {
      login: this.myForm.value.email,
      password: this.myForm.value.password
    }
  }

}
