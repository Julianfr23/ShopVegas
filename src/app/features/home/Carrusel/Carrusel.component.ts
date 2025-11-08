import { Component, Input } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Slide } from "../../../core/models/slide.interface";

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './Carrusel.component.html',
  styleUrl: './Carrusel.component.css',
})
export default class CarruselComponent {
  @Input() intervalMs = 5000;
  @Input() showIndicators = true;
  @Input() showControls = true;
  @Input() fade = true;

  carouselId = 'heroCarousel';

  slides: Slide[] = [
    {
      id: '1',
      imageUrl: 'assets/images/slide1.jpg',
      alt: 'Buzos personalizados en varios colores',
      title: 'Estampa tu mundo',
      subtitle: 'Buzos, mugs, cobijas y mas - hechos a tu medida',
      cta: { label: 'Explorar productos', link: '/catalog' }

    },
    {
      id: '2',
      imageUrl: 'assets/images/slide2.jpg',
      alt: 'Taza personalizada sobre mesa',
      title: 'Diseña y nosotros producimos',
      subtitle: 'Calidad premium y envios confiables',
      cta: { label: 'Crear diseño', link: '/catalog/personalizado' }
    },
    {
      id: '3',
      imageUrl: 'assets/images/slide3.jpg',
      alt: 'Cobija y mousepad con estampado',
      title: 'Para hogar y oficina',
      subtitle: 'Descubre ideas para regalar',
      cta: { label: 'Ver ideas', link: '/catalog?gift=true' }
    }
  ]
}

