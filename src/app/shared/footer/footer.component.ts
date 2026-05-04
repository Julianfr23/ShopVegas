// footer.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year  = new Date().getFullYear();
  email = '';

  subscribe(): void {
    if (!this.email.trim()) return;
    // TODO: conectar con servicio de newsletter
    console.log('Newsletter subscription:', this.email);
    alert('¡Gracias! Te avisaremos de las novedades 🎨');
    this.email = '';
  }

  scrollToSection(id: string): void {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}
