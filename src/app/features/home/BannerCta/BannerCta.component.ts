import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BannerCta } from '../../../core/models/bannerCta.interface';

@Component({
  selector: 'app-banner-cta',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './BannerCta.component.html',
  styleUrls: ['./BannerCta.component.css']
})
export default class BannerCtaComponent {
  banner: BannerCta = {
    title: 'Personaliza con tu estilo',
    subtitle: 'Textiles y objetos listos para estampar — producción responsable',
    cta: { label: 'Empezar', link: '/catalog' },
    imageUrl: 'assets/images/banner.jpg'
  };
}
