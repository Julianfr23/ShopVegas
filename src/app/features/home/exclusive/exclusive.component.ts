import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exclusive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exclusive.component.html',
  styleUrls: ['./exclusive.component.css']
})
export class ExclusiveComponent {
  exclusiveProducts = [
    {
      name: 'Sneakers Urban',
      price: 299000,
      description: 'Comodidad y estilo en cada paso. Edición limitada.',
      image: 'assets/images/buzoo.jpg'
    },
    {
      name: 'Smartwatch Pro',
      price: 599000,
      description: 'Diseño elegante con tecnología de última generación.',
      image: 'assets/images/cobija2.jpg'
    },
    {
      name: 'Set Home Deluxe',
      price: 399000,
      description: 'Crea ambientes únicos con este set exclusivo.',
      image: 'assets/images/vaso.jpg'
    }
  ];
}
