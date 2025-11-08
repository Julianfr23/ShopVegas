import { Component } from '@angular/core';
import CarruselComponent from './Carrusel/Carrusel.component';
import BannerCtaComponent from './BannerCta/BannerCta.component';
import BenefitsComponent from './Benefits/Benefits.component';
import CategoriesComponent from './Categories/Categories.component';
import ExplainProcessComponent from './ExplainProcess/ExplainProcess.component';
import UniquesComponent from './Uniques/Uniques.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import { ExclusiveComponent } from "./exclusive/exclusive.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarruselComponent,
    BannerCtaComponent,
    BenefitsComponent,
    CategoriesComponent,
    ExplainProcessComponent,
    UniquesComponent,
    HeaderComponent,
    FooterComponent,
    ExclusiveComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export  class HomeComponent {}
