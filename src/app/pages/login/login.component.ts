import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginError: boolean = false;
  userData: any = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
          console.log('Login successfull', user);
          this.userData = user;
          this.loginError = false;
          // redirecionar outra página ou armazenar os dados do usuário aqui...
        } else {
          this.loginError = true;
        }
      });
    }
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

}
