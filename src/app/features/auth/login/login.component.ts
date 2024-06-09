import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../../../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if(this.loginForm.valid) {
      const { email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe( user => {
        if(user) {
          this.sessionService.setUser(user);
          this.loginError = false;
          this.router.navigate(['/profile']);
        } else {
          this.loginError = true;
        }
      });
    }
    this.loginForm.reset();
  }

}
