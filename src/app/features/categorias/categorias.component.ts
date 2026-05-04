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
      id: 'Buzos',
      name: 'Hoodies & Sweatshirts',
      tag: 'Apparel',
      icon: 'bi-stars',
      count: 12,
      imageUrl: 'assets/images/buzoo.jpg',
      description: 'Bold graphics, soft fabric. Design your perfect hoodie with your artwork, photo, or logo — sublimated in full color for lasting vibrancy.'
    },
    {
      id: 'Camibusos',
      name: 'T-Shirts',
      tag: 'Apparel',
      icon: 'bi-person',
      count: 18,
      imageUrl: 'assets/images/camibuso.jpg',
      description: 'Lightweight and breathable tees that carry your identity. Perfect for everyday wear, events, or gifting to someone special.'
    },
    {
      id: 'Mugs',
      name: 'Mugs & Tumblers',
      tag: 'Kitchen',
      icon: 'bi-cup-hot',
      count: 8,
      imageUrl: 'assets/images/mugs.jpg',
      description: 'Start every morning with a mug that tells your story. Wrap-around prints, photos, or illustrations — dishwasher safe and built to last.'
    },
    {
      id: 'Cobijas',
      name: 'Blankets',
      tag: 'Home',
      icon: 'bi-house-heart',
      count: 6,
      imageUrl: 'assets/images/cobija.jpg',
      description: 'Ultra-soft custom blankets printed edge to edge. Ideal for cozy nights, memorable gifts, or showing off your favorite memories.'
    },
    {
      id: 'Mousepads',
      name: 'Mouse Pads',
      tag: 'Gaming / Office',
      icon: 'bi-controller',
      count: 10,
      imageUrl: 'assets/images/mousepad.jpg',
      description: 'Level up your desk setup with a full-print mouse pad. From gamer artwork to minimal aesthetics — precision surface, maximum style.'
    },
    {
      id: 'Vasos',
      name: 'Tumblers & Cups',
      tag: 'Kitchen',
      icon: 'bi-cup-straw',
      count: 7,
      imageUrl: 'assets/images/vaso.jpg',
      description: 'Custom printed tumblers that keep your drinks hot or cold. Great for hydration on the go and as branded merchandise.'
    },
  ];
}
