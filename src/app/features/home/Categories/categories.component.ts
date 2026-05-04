// categories.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  activeCategory: string | null = null;

  categories = [
    {
      id: 'MOUSE PAD',
      name: 'Mouse Pads',
      tag: 'Gaming',
      icon: 'bi-mouse',
      count: 12,
      imageUrl: 'assets/images/gamer/mousepad1.PNG',
      description: 'Smooth polyester surface, 3mm non-slip rubber base and reinforced stitched edges. Full-color custom print for your gaming or office setup.'
    },
    {
      id: 'DESKMAT',
      name: 'Desk Mats',
      tag: 'Gaming',
      icon: 'bi-display',
      count: 18,
      imageUrl: 'assets/images/gamer/deskmat1.png',
      description: 'Extended coverage for your entire desk. Precision surface, non-slip base and vibrant edge-to-edge print. Perfect for gaming or creative work.'
    },
    {
      id: 'FLEECE BLANKET',
      name: 'Fleece Blankets',
      tag: 'Home',
      icon: 'bi-house-heart',
      count: 21,
      imageUrl: 'assets/images/home/blanket1.jpg',
      description: 'Ultra-soft 100% polyester fleece with full-color edge-to-edge printing. Lightweight yet cozy — perfect for movie nights or as a personalized gift.'
    },
    {
      id: 'SHERPA BLANKET',
      name: 'Sherpa Blankets',
      tag: 'Home',
      icon: 'bi-snow',
      count: 21,
      imageUrl: 'assets/images/home/blanket22.jpg',
      description: 'Custom design on the front, ultra-soft fluffy Sherpa on the back. Next-level warmth and comfort for your couch or bedroom.'
    },
    {
      id: 'APRON',
      name: 'Aprons',
      tag: 'Home',
      icon: 'bi-scissors',
      count: 5,
      imageUrl: 'assets/images/home/apron1.png',
      description: 'Durable 100% polyester canvas with bold edge-to-edge color. Five strap options — perfect for cooking, baking, grilling or crafting.'
    },
  ];
}
