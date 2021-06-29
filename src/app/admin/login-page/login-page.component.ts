import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/intefaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false;
  myForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    if(this.myForm.invalid) return

    this.submitted = true;
    const user: User = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.myForm.reset();
      this.router.navigate(['/admin', 'dashboard']);
    },
    (error) => console.log(error),
    () => this.submitted = false
    )}

}
