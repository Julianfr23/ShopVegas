// categories.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../../shared/header/header.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  categories = [
    {
      id:        'MOUSE PAD',
      name:      'Mouse Pads',
      tag:       'Gaming',
      fromPrice: 18.99,
      count:     12,
      imageUrl:  'assets/images/gamer/mousepad1.PNG',
    },
    {
      id:        'DESKMAT',
      name:      'Desk Mats',
      tag:       'Gaming',
      fromPrice: 32.00,
      count:     18,
      imageUrl:  'assets/images/gamer/deskmat1.png',
    },
    {
      id:        'FLEECE BLANKET',
      name:      'Fleece Blankets',
      tag:       'Home',
      fromPrice: 25.00,
      count:     21,
      imageUrl:  'assets/images/home/blanket1.jpg',
    },
    {
      id:        'SHERPA BLANKET',
      name:      'Sherpa Blankets',
      tag:       'Home',
      fromPrice: 28.00,
      count:     21,
      imageUrl:  'assets/images/home/blanket22.jpg',
    },
    {
      id:        'APRON',
      name:      'Aprons',
      tag:       'Home',
      fromPrice: 25.00,
      count:     5,
      imageUrl:  'assets/images/home/apron1.png',
    },
  ];
}
