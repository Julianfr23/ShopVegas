// testimonials.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  cardWidth    = 380; // px — se recalcula en resize
  private interval: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updateCardWidth();
    if (this.isBrowser) {
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      }, 4500);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  @HostListener('window:resize')
  updateCardWidth(): void {
    if (!this.isBrowser) return;
    // En móvil, las cards ocupan el ancho del viewport
    this.cardWidth = window.innerWidth < 600
      ? window.innerWidth - 48   // padding lateral
      : 380;
  }

  goTo(i: number): void {
    this.currentIndex = i;
    // Reinicia el intervalo al navegar manualmente
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }, 4500);
  }

  testimonials = [
    {
      name: 'Laura M.',
      product: 'Custom Blanket',
      text: 'The blanket came out perfect with my family photo. The quality is incredible and it arrived super fast. I will definitely order again.'
    },
    {
      name: 'Andrew R.',
      product: 'Gamer Mouse Pad',
      text: 'The mouse pad looks amazing, the colors are exactly like the design I uploaded. My friends asked where I got it right away.'
    },
    {
      name: 'Valentine C.',
      product: 'Custom Desk Mat',
      text: 'I got a desk mat with my gaming setup design and it looks incredible. The print quality is sharp and the colors pop beautifully.'
    },
    {
      name: 'Sebastian T.',
      product: 'Sherpa Blanket',
      text: 'I ordered a sherpa blanket with my team logo and it turned out spectacular. So soft and the print doesnt fade after washing.'
    }
  ];
}
