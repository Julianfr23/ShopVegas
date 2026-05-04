// app.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'shop';
  private isBrowser: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // 1. Aplica el tema guardado al body inmediatamente al arrancar
    if (this.isBrowser) {
      const saved = localStorage.getItem('sp-theme') || 'hogar';
      document.body.setAttribute('data-theme', saved);
    }

    // 2. Sincroniza cualquier cambio posterior de tema
    this.themeService.theme$.subscribe(theme => {
      if (this.isBrowser) {
        document.body.setAttribute('data-theme', theme);
      }
    });

    // 3. Marca si estamos en home para protegerlo del tema gamer
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        if (!this.isBrowser) return;
        const url = e.urlAfterRedirects || e.url;
        const isHome = url === '/' || url === '/home' || url.startsWith('/home?');
        if (isHome) {
          document.body.classList.add('on-home');
        } else {
          document.body.classList.remove('on-home');
        }
      });
  }
}
