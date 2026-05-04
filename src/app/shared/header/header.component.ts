// header.component.ts
import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled  = false;
  menuOpen    = false;
  searchQuery = '';
  cartCount   = 0;

  private isBrowser: boolean;
  private onStorage = () => this.updateCartCount();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        if (this.isBrowser) window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    if (this.isBrowser) {
      this.updateCartCount();
      window.addEventListener('storage', this.onStorage);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('storage', this.onStorage);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) this.isScrolled = window.scrollY > 40;
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu():  void { this.menuOpen = false; }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/productos'], { queryParams: { q: this.searchQuery.trim() } });
      this.closeMenu();
    }
  }

  scrollToSection(sectionId: string): void {
    if (this.router.url !== '/' && this.router.url !== '/home') {
      this.router.navigateByUrl('/').then(() =>
        setTimeout(() => this.scrollTo(sectionId), 350)
      );
    } else {
      this.scrollTo(sectionId);
    }
  }

  private scrollTo(id: string): void {
    if (this.isBrowser) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private updateCartCount(): void {
    if (!this.isBrowser) return;
    try {
      const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      this.cartCount = cart.reduce((t: number, i: any) => t + (i.quantity || 1), 0);
    } catch { this.cartCount = 0; }
  }
}
