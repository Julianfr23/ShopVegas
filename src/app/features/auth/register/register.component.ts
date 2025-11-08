import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false
  };

  particles: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    this.particles = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      color: this.getRandomColor()
    }));
  }

  getRandomColor(): string {
    const colors = ['#FFA6AB', '#FF7F0F', '#A1C3A4', '#D6B6C4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  passwordsMatch(): boolean {
    return this.userData.password === this.userData.confirmPassword;
  }

  onSubmit() {
    if (!this.passwordsMatch()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.userData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    console.log('Datos de registro:', this.userData);

    // Aquí iría tu lógica de registro
    // Por ejemplo: this.authService.register(this.userData).subscribe(...)

    // Simulamos registro exitoso
    alert('¡Cuenta creada exitosamente! Redirigiendo al login...');
    this.router.navigate(['/auth/login']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Validación en tiempo real para mejor UX
  onPasswordChange() {
    if (this.userData.confirmPassword && !this.passwordsMatch()) {
      // Puedes agregar lógica adicional aquí
    }
  }
}
