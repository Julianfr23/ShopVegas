// categorias.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {

  activeCategory: string | null = null;

  categories = [
    {
      id:          'MOUSE PAD',
      name:        'Mouse Pads',
      tag:         'Gaming',
      icon:        'bi-mouse',
      count:       12,
      fromPrice:   18.99,
      imageUrl:    'assets/images/gamer/mousepad1.PNG',
      description: 'Smooth polyester surface with a 3mm non-slip rubber base and reinforced stitched edges. Full-color custom print that lasts — perfect for any gaming or office setup.'
    },
    {
      id:          'DESKMAT',
      name:        'Desk Mats',
      tag:         'Gaming',
      icon:        'bi-display',
      count:       18,
      fromPrice:   32.00,
      imageUrl:    'assets/images/gamer/deskmat1.png',
      description: 'Extended coverage for your entire desk. Precision surface, non-slip base and vibrant edge-to-edge full-color print. Perfect for gaming, editing or everyday creative work.'
    },
    {
      id:          'FLEECE BLANKET',
      name:        'Fleece Blankets',
      tag:         'Home',
      icon:        'bi-house-heart',
      count:       21,
      fromPrice:   25.00,
      imageUrl:    'assets/images/home/blanket1.jpg',
      description: 'Ultra-soft 100% polyester fleece with full-color edge-to-edge sublimation printing. Lightweight yet cozy — ideal for movie nights, naps, or as a personalized gift.'
    },
    {
      id:          'SHERPA BLANKET',
      name:        'Sherpa Blankets',
      tag:         'Home',
      icon:        'bi-snow',
      count:       21,
      fromPrice:   28.00,
      imageUrl:    'assets/images/home/blanket22.jpg',
      description: 'Your custom design on the front, ultra-soft fluffy Sherpa on the back. Next-level warmth and comfort — perfect for your couch, bedroom or as a thoughtful gift.'
    },
    {
      id:          'APRON',
      name:        'Aprons',
      tag:         'Home',
      icon:        'bi-scissors',
      count:       5,
      fromPrice:   25.00,
      imageUrl:    'assets/images/home/apron1.png',
      description: 'Durable 100% polyester canvas with bold edge-to-edge color. Five strap color options available. Perfect for cooking, baking, grilling or any creative craft.'
    },
  ];
}
