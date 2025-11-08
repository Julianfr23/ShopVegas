import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router'; // ✅ Importamos el Router

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit, AfterViewInit, OnDestroy {
  activeIndex = 0;
  private autoSlideInterval: any;

  categories = [
    {
      name: 'Moda',
      description:
        'Descubre las últimas tendencias en moda para cada ocasión. Estilo y calidad en cada prenda.',
      image: 'assets/images/buzoo.jpg',
      icon: 'fas fa-tshirt',
    },
    {
      name: 'Tecnología',
      description:
        'Innovación y potencia en cada dispositivo. Lo último en gadgets y electrónicos.',
      image: 'assets/images/camibuso.jpg',
      icon: 'fas fa-laptop',
    },
    {
      name: 'Hogar',
      description:
        'Transforma tu espacio con nuestra selección premium de productos para el hogar.',
      image: 'assets/images/cobija.jpg',
      icon: 'fas fa-home',
    },
    {
      name: 'Deportes',
      description:
        'Equípate para superar tus límites. Tecnología y diseño en cada producto deportivo.',
      image: 'assets/images/mugs.jpg',
      icon: 'fas fa-running',
    },
  ];

  constructor(private router: Router) {} // ✅ Inyectamos Router

  ngOnInit() {}

  ngAfterViewInit() {
    // 🔹 Forzar render de transformaciones cuando el DOM ya existe
    setTimeout(() => {
      this.activeIndex = 0;
    });
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  getCardTransform(index: number): string {
    const offset = index - this.activeIndex;
    const baseTranslateX = offset * 420;
    const scale = index === this.activeIndex ? 1 : 0.85;
    const rotateY = offset * 15;
    const translateZ = index === this.activeIndex ? 50 : -100;

    return `translateX(${baseTranslateX}px) scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.categories.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.categories.length) % this.categories.length;
  }

  goToSlide(index: number) {
    this.activeIndex = index;
  }

  selectCard(index: number) {
    this.activeIndex = index;
    console.log('🟠 Seleccionaste:', this.categories[index].name);
  }

  // ✅ Nuevo método para redirigir a productos filtrados
  verProductosPorCategoria(nombreCategoria: string) {
    this.router.navigate(['/productos'], {
      queryParams: { categoria: nombreCategoria },
    });
  }
}
