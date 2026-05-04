// banner-cta.component.ts
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bannercta.component.html',
  styleUrls: ['./bannercta.component.css'],
})
export class BannerCtaComponent implements OnInit, OnDestroy {

  activeProduct = 0;
  private interval: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.interval = setInterval(() => {
        this.activeProduct = (this.activeProduct + 1) % this.products.length;
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  setActive(i: number): void {
    this.activeProduct = i;
    // Reinicia el auto-rotación al hacer clic manual
    if (this.interval) clearInterval(this.interval);
    if (this.isBrowser) {
      this.interval = setInterval(() => {
        this.activeProduct = (this.activeProduct + 1) % this.products.length;
      }, 3000);
    }
  }

  products = [
    { name: 'Mugs', image: 'assets/images/mugs.jpg' },
    { name: 'Mouse Pads', image: 'assets/images/mousepad.jpg' },
    { name: 'Cobijas', image: 'assets/images/cobija.jpg' },
    { name: 'Buzos', image: 'assets/images/buzoo.jpg' },
    { name: 'Vasos', image: 'assets/images/vaso.jpg' },
  ];
}
