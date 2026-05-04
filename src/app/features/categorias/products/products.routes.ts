import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // ✅ agrega esta línea

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'view/:id', component: ProductDetailComponent } // ✅ ahora lo reconocerá
];
