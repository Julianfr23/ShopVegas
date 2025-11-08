import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';

  products: Product[] = [
    { id: 1, name: 'Cobija Personalizada', category: 'Cobijas', price: 250, image: 'assets/images/cobija.jpg' },
    { id: 2, name: 'Taza Personalizada', category: 'Mugs', price: 35, image: 'assets/images/vaso.jpg' },
    { id: 3, name: 'MousePad', category: 'Oficina', price: 55, image: 'assets/images/mousepad.jpg' },
    { id: 4, name: 'Hoody', category: 'Ropa', price: 80, image: 'assets/images/buzoo.jpg' }
  ];

  filteredProducts: Product[] = [...this.products];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Si te pasan ?category=... lo aplicamos al iniciar
    this.route.queryParams.subscribe(params => {
      const cat = params['category'];
      this.selectedCategory = cat ? String(cat) : '';
      this.applyFilters();
    });
  }

  /** Ejecuta la búsqueda basada en searchTerm y selectedCategory */
  onSearch(): void {
    this.applyFilters();
  }

  /** Aplica ambos filtros (categoría + búsqueda) */
  private applyFilters(): void {
    const term = this.searchTerm?.trim().toLowerCase() || '';

    this.filteredProducts = this.products.filter(p => {
      const matchCategory = this.selectedCategory ? p.category.toLowerCase() === this.selectedCategory.toLowerCase() : true;
      const matchSearch = term ? (
        p.name.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term))
      ) : true;
      return matchCategory && matchSearch;
    });
  }

  /** Método público si quieres filtrar por categoría desde el template o desde otro componente */
  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
}
