import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Unique } from '../../../core/models/unique.interface';

@Component({
  selector: 'app-uniques',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './Uniques.component.html',
  styleUrls: ['./Uniques.component.css']
})
export default class UniquesComponent {
  items: Unique[] = [
    { icon: 'bi-rulers', title: 'Hecho a tu medida', text: 'Lotes desde 1 unidad y producción flexible.' },
    { icon: 'bi-headset', title: 'Soporte humano', text: 'Te asesoramos en archivo, tamaños y acabados.' },
    { icon: 'bi-shield-check', title: 'Calidad consistente', text: 'Perfiles de color y pruebas antes de imprimir.' }
  ];

}
