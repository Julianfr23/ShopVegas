// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroSplitComponent } from './hero-split/hero-split.component';
import { BannerCtaComponent } from './BannerCta/BannerCta.component';
import { CategoriesComponent } from './Categories/Categories.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';
import { TestimonialsComponent } from './Testimonials/Testimonials.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { carruselComponent } from './Carrusel/Carrusel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    carruselComponent,
    HeroSplitComponent,
    BannerCtaComponent,
    CategoriesComponent,
    ProductsFeaturedComponent,
    TestimonialsComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent { }
