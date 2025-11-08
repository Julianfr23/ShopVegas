import { Component } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { HeaderComponent } from "../../../../shared/header/header.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
   imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
   products: Product[] = [
    {
      id: 1,
      name: 'Cobija Personalizada',
      category: 'Cobijas',
      description: 'Hermosas cobijas personalizadas con diseños ya realizados por nosotros, o podemos personalizar la cobija a tu estilo y con las fotos, mensajes, que quieras, solo deja volar tu imaginación.',
      price: 120,
      image: 'assets/images/cobija.jpg',
      images: [
        'assets/images/cobija1.png',
        'assets/images/cobija2.jpg',
        'assets/images/cobija3.jpg',
        'assets/images/cobija4.jpg'
      ],
    },
    {
      id: 2,
      name: 'Vela Aromática Premium',
      category: 'Decoración',
      description: 'Vela artesanal con aroma a lavanda y recipiente de cerámica.',
      price: 45000,
      image: 'assets/images/vela.jpg',
      images: [
        'assets/images/vela1.jpg',
        'assets/images/vela2.jpg'
      ],
    },
    {
      id: 3,
      name: 'Cojín Bohemio',
      category: 'Decoración',
      description: 'Cojín tejido a mano con diseño étnico, ideal para salas modernas.',
      price: 75000,
      image: 'assets/images/cojin.jpg',
      images: [
        'assets/images/cojin1.jpg',
        'assets/images/cojin2.jpg'
      ],
    },
    {
      id: 4,
      name: 'Lámpara Minimalista',
      category: 'Iluminación',
      description: 'Lámpara de mesa moderna con luz cálida y estructura metálica.',
      price: 160000,
      image: 'assets/images/lampara.jpg',
      images: [
        'assets/images/lampara1.jpg',
        'assets/images/lampara2.jpg'
      ],
    },
    {
      id: 5,
      name: 'Manta de Lana Natural',
      category: 'Hogar',
      description: 'Suave manta tejida 100% en lana, perfecta para el invierno.',
      price: 130000,
      image: 'assets/images/manta.jpg',
      images: [
        'assets/images/manta1.jpg',
        'assets/images/manta2.jpg'
      ],
    }
  ];


  selectedProduct: Product = this.products[0];


  selectedImage: string = this.selectedProduct.image;

  selectImage(img: string): void {
    this.selectedImage = img;
  }


  selectProduct(id: number): void {
    const found = this.products.find(p => p.id === id);
    if (found) {
      this.selectedProduct = found;
      this.selectedImage = found.image;
    }
  }
}
