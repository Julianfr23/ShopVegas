// carrusel.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent {
  images = [
    { src: 'assets/images/gamer/deskmat1.png' },
    { src: 'assets/images/home/apron1.png'      },
    { src: 'assets/images/gamer/mousepad3.PNG'       },
    { src: 'assets/images/home/blanket7.png'            },
    { src: 'assets/images/gamer/mousepad9.png'      },
    { src: 'assets/images/home/blanket33.jpg'     },
    { src: 'assets/images/gamer/mousepad1.png'             },
    { src: 'assets/images/home/apron4.png'         },
    { src: 'assets/images/gamer/deskmat3.png'           },
    { src: 'assets/images/home/blanket33.jpg'          },
    { src: 'assets/images/gamer/deskmat11.png'          },
    { src: 'assets/images/home/apron2.png'     },
    { src: 'assets/images/gamer/mousepad5.PNG'    },
    { src: 'assets/images/home/blanket34.jpg'             },
  ];
}
