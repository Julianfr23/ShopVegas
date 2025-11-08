import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Benefit } from '../../../core/models/benefit.interface'; 

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './Benefits.component.html',
  styleUrls: ['./Benefits.component.css']
})
export default class BenefitsComponent {
  items: Benefit[] = [
    { icon: 'bi-truck',        title: 'Envío confiable',  text: 'Cobertura nacional y tiempos claros.' },
    { icon: 'bi-palette',      title: 'Colores fieles',   text: 'Impresión nítida y duradera.' },
    { icon: 'bi-recycle',      title: 'Eco-friendly',     text: 'Materiales y procesos responsables.' },
    { icon: 'bi-shield-check', title: 'Garantía',         text: 'Cambio por defectos de fabricación.' }
  ];
}
