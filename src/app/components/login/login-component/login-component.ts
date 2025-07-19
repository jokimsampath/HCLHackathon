import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login-service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  loginSuccess: string | null = null;
  cred: any = { username: '', password: '' }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.cred.username = this.loginForm.get('username')?.value;
      this.cred.password = this.loginForm.get('password')?.value;

      // Call the login service with credentials
      this.loginService.login(this.cred)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.loginSuccess = 'Login successful';
              this.loginError = null;
              this.router.navigate(['/dashboard']);
            } else {
              this.loginError = res.message || 'Login failed';
              this.loginSuccess = null;
              console.log('Login failed:', res.message);
            }
          },
          error: (err) => {
            this.loginError = 'An error occurred during login';
            this.loginSuccess = null;
            console.error('API Error:', err);
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

}
