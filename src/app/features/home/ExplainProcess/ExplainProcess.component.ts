import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ExplainProcess } from '../../../core/models/explainProcess.interface';

@Component({
  selector: 'app-explain-process',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ExplainProcess.component.html',
  styleUrls: ['./ExplainProcess.component.css']
})
export default class ExplainProcessComponent {

  steps: ExplainProcess[] = [
    {
      n: 1,
      title: 'Diseña',
      text: 'Sube tu arte o crea en línea.',
      media: 'assets/video/Diseño.mp4',
      mediaType: 'video'
    },
    {
      n: 2,
      title: 'Producimos',
      text: 'Tecnología textil avanzada.',
      media: 'assets/video/estampando.mp4',
      mediaType: 'video'
    },
    {
      n: 3,
      title: 'Enviamos',
      text: 'Despacho rápido y seguro.',
      media: 'assets/video/envio.mp4',
      mediaType: 'video'
    }
  ];

}
