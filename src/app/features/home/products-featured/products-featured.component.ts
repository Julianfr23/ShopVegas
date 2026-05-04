// products-featured.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-featured',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.css'],
})
export class ProductsFeaturedComponent {

  // Productos reales de la lista de 76 — IDs que coinciden con product-list y product-detail
  featuredProducts = [
    {
      id: 1,
      name: 'MOUSE PAD',
      category: 'Gaming',
      price: 18.99,
      image: 'assets/images/gamer/mousepad1.PNG',
      tag: 'Gamer'
    },
    {
      id: 5,
      name: 'MOUSE PAD',
      category: 'Gaming',
      price: 18.99,
      image: 'assets/images/gamer/mousepad5.PNG',
      tag: 'Popular'
    },
    {
      id: 13,
      name: 'DESKMAT',
      category: 'Gaming',
      price: 32.00,
      image: 'assets/images/gamer/deskmat1.png',
      tag: 'Gamer'
    },
    {
      id: 20,
      name: 'DESKMAT',
      category: 'Gaming',
      price: 32.00,
      image: 'assets/images/gamer/deskmat8.png',
      tag: null
    },
    {
      id: 36,
      name: 'FLEECE BLANKET',
      category: 'Home',
      price: 25.00,
      image: 'assets/images/home/blanket1.jpg',
      tag: 'New'
    },
    {
      id: 45,
      name: 'FLEECE BLANKET',
      category: 'Home',
      price: 25.00,
      image: 'assets/images/home/blanket10.png',
      tag: null
    },
    {
      id: 57,
      name: 'SHERPA BLANKET',
      category: 'Home',
      price: 28.00,
      image: 'assets/images/home/blanket22.jpg',
      tag: 'Popular'
    },
    {
      id: 31,
      name: 'APRON',
      category: 'Home',
      price: 25.00,
      image: 'assets/images/home/apron1.png',
      tag: null
    },
  ];
}
