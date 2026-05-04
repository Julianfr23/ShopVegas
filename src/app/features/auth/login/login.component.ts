// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email        = '';
  password     = '';
  rememberMe   = false;
  showPassword = false;
  isLoading    = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) return;

    this.isLoading = true;

    // TODO: replace with real auth service call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login attempt:', this.email);
      this.router.navigate(['/home']);
    }, 1200);
  }
}
