// banner-cta.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
    { name: 'Mouse Pad',       id: 1,  image: 'assets/images/gamer/mousepad1.PNG'  },
    { name: 'Desk Mat',        id: 13, image: 'assets/images/gamer/deskmat1.png'   },
    { name: 'Fleece Blanket',  id: 36, image: 'assets/images/home/blanket1.jpg'    },
    { name: 'Sherpa Blanket',  id: 57, image: 'assets/images/home/blanket22.jpg'   },
    { name: 'Apron',           id: 31, image: 'assets/images/home/apron1.png'      },
  ];
}
