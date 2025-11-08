import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  particles: any;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login attempt:', this.email, this.password);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
