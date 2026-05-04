// register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  showPassword = false;
  isLoading    = false;

  userData = {
    fullName:        '',
    email:           '',
    phone:           '',
    password:        '',
    confirmPassword: '',
    acceptTerms:     false,
    newsletter:      false,
  };

  constructor(private router: Router) {}

  passwordsMatch(): boolean {
    return this.userData.password === this.userData.confirmPassword;
  }

  onSubmit(): void {
    if (!this.passwordsMatch() || !this.userData.acceptTerms) return;

    this.isLoading = true;

    // TODO: replace with real auth service call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Register:', this.userData.email);
      this.router.navigate(['/auth/login']);
    }, 1200);
  }
}
