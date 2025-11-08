import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export default class CategoriesComponent {
  items: Category[] = [
    { id:'buzos',      name:'Buzos',      imageUrl:'assets/images/buzoo.jpg',   link:'/catalog?cat=buzos' },
    { id:'camibusos',  name:'Camibusos',  imageUrl:'assets/images/camibuso.jpg',  link:'/catalog?cat=camibusos' },
    { id:'mugs',       name:'Mugs',       imageUrl:'assets/images/mugs.jpg',      link:'/catalog?cat=mugs' },
    { id:'cobijas',    name:'Cobijas',    imageUrl:'assets/images/cobija.jpg',  link:'/catalog?cat=cobijas' },
    { id:'mousepads',  name:'Mousepads',  imageUrl:'assets/images/mousepad.jpg', link:'/catalog?cat=mousepads' },
    { id:'vasos',      name:'Vasos',      imageUrl:'assets/images/vaso.jpg',      link:'/catalog?cat=vasos' }
  ];
}
