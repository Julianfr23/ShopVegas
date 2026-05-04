// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  viewMode: 'grid' | 'list' = 'grid';
  sidebarOpen  = false;
  searchTerm   = '';
  selectedCategory = '';
  sortBy       = 'default';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // ── Filtros por tipo de producto ──
  categoryOptions = [
    { value: '',               label: 'All Products',   icon: 'bi-grid'        },
    { value: 'MOUSE PAD',      label: 'Mouse Pad',      icon: 'bi-mouse'       },
    { value: 'DESKMAT',        label: 'Desk Mat',       icon: 'bi-display'     },
    { value: 'FLEECE BLANKET', label: 'Fleece Blanket', icon: 'bi-house-heart' },
    { value: 'SHERPA BLANKET', label: 'Sherpa Blanket', icon: 'bi-snow'        },
    { value: 'APRON',          label: 'Apron',          icon: 'bi-scissors'    },
  ];

  // Grupos para el sidebar
  gamingTypes = ['MOUSE PAD', 'DESKMAT'];
  homeTypes   = ['FLEECE BLANKET', 'SHERPA BLANKET', 'APRON'];

  products: Product[] = [
    // ── GAMER ──
    { id: 1,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad1.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 2,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad2.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 3,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad3.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 4,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad4.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 5,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad5.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 6,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad6.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 7,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad7.PNG',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 8,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad8.png',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 9,  name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad9.png',  description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 10, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad10.png', description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 11, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad11.png', description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 12, name: 'MOUSE PAD', category: 'Gaming', price: 18.50, image: 'assets/images/gamer/mousepad12.png', description: 'Transform your space with a personalized mouse pad that combines style and functionality.' },
    { id: 13, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat1.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 14, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat2.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 15, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat3.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 16, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat4.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 17, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat5.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 18, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat6.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 19, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat7.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 20, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat8.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 21, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat9.png',   description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 22, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat10.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 23, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat11.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 24, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat12.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 25, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat13.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 26, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat14.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 27, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat15.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 28, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat16.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 29, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat17.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },
    { id: 30, name: 'DESKMAT',   category: 'Gaming', price: 32.00, image: 'assets/images/gamer/deskmat18.png',  description: 'Enhance your workspace or gaming setup with a personalized desk mat.' },

    // ── HOME ──
    { id: 31, name: 'APRON',          category: 'Home', price: 25.00, image: 'assets/images/home/apron1.png',     description: 'Cook, Create & Craft with Personality.' },
    { id: 32, name: 'APRON',          category: 'Home', price: 25.00, image: 'assets/images/home/apron2.png',     description: 'Cook, Create & Craft with Personality.' },
    { id: 33, name: 'APRON',          category: 'Home', price: 25.00, image: 'assets/images/home/apron3.png',     description: 'Cook, Create & Craft with Personality.' },
    { id: 34, name: 'APRON',          category: 'Home', price: 25.00, image: 'assets/images/home/apron4.png',     description: 'Cook, Create & Craft with Personality.' },
    { id: 35, name: 'APRON',          category: 'Home', price: 25.00, image: 'assets/images/home/apron5.png',     description: 'Cook, Create & Craft with Personality.' },
    { id: 36, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket1.jpg',   description: 'Wrap yourself in warmth and personality.' },
    { id: 37, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket2.png',   description: 'Wrap yourself in warmth and personality.' },
    { id: 38, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket3.png',   description: 'Wrap yourself in warmth and personality.' },
    { id: 39, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket4.jpg',   description: 'Wrap yourself in warmth and personality.' },
    { id: 40, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket5.png',   description: 'Wrap yourself in warmth and personality.' },
    { id: 41, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket6.jpg',   description: 'Wrap yourself in warmth and personality.' },
    { id: 42, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket7.png',   description: 'Wrap yourself in warmth and personality.' },
    { id: 43, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket8.jpg',   description: 'Wrap yourself in warmth and personality.' },
    { id: 44, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket9.jpg',   description: 'Wrap yourself in warmth and personality.' },
    { id: 45, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket10.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 46, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket11.jpg',  description: 'Wrap yourself in warmth and personality.' },
    { id: 47, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket12.jpg',  description: 'Wrap yourself in warmth and personality.' },
    { id: 48, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket13.jpeg', description: 'Wrap yourself in warmth and personality.' },
    { id: 49, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket14.jpeg', description: 'Wrap yourself in warmth and personality.' },
    { id: 50, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket15.JPG',  description: 'Wrap yourself in warmth and personality.' },
    { id: 51, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket16.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 52, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket17.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 53, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket18.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 54, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket19.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 55, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket20.jpg',  description: 'Wrap yourself in warmth and personality.' },
    { id: 56, name: 'FLEECE BLANKET', category: 'Home', price: 25.00, image: 'assets/images/home/blanket21.png',  description: 'Wrap yourself in warmth and personality.' },
    { id: 57, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket22.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 58, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket23.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 59, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket24.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 60, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket25.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 61, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket26.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 62, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket27.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 63, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket28.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 64, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket29.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 65, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket30.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 66, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket31.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 67, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket32.png',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 68, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket33.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 69, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket34.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 70, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket35.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 71, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket36.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 72, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket37.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 73, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket38.jpg',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 74, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket39.JPG',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 75, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket40.png',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 76, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket41.png',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
    { id: 77, name: 'SHERPA BLANKET', category: 'Home', price: 28.00, image: 'assets/images/home/blanket42.png',  description: 'Experience next-level coziness with ultra-soft Sherpa fleece.' },
  ];

  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q'])         this.searchTerm       = params['q'];
      if (params['categoria']) this.selectedCategory = params['categoria'];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    let result = this.products.filter(p => {
      // Filtra por nombre de producto (MOUSE PAD, DESKMAT, FLEECE BLANKET, etc.)
      const matchType   = !this.selectedCategory || p.name === this.selectedCategory;
      const matchSearch = !term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
      const matchMin    = this.minPrice === null || p.price >= this.minPrice;
      const matchMax    = this.maxPrice === null || p.price <= this.maxPrice;
      return matchType && matchSearch && matchMin && matchMax;
    });

    switch (this.sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    this.filteredProducts = result;
  }

  clearSearch(): void { this.searchTerm = ''; this.applyFilters(); }

  clearAllFilters(): void {
    this.searchTerm = ''; this.selectedCategory = '';
    this.sortBy = 'default'; this.minPrice = null; this.maxPrice = null;
    this.applyFilters();
  }

  getCategoryCount(cat: string): number {
    if (!cat) return this.products.length;
    return this.products.filter(p => p.name === cat).length;
  }

  get activeFilterCount(): number {
    let c = 0;
    if (this.selectedCategory) c++;
    if (this.minPrice !== null) c++;
    if (this.maxPrice !== null) c++;
    if (this.searchTerm)        c++;
    return c;
  }
}
