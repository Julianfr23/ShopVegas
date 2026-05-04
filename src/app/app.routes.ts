import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent),
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categorias/categorias.component').then(m => m.CategoriasComponent)
  },
  {
    path: 'productos',
    loadChildren: () => import('./features/categorias/products/products.routes').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'product/custom',
    loadComponent: () =>
      import('./features/categorias/products/product-custom/product-custom.component')
        .then(m => m.ProductCustomComponent)
  },
  {
    path: 'buy',
    loadComponent: () =>
      import('./features/buy/cart/cart.component')
        .then(m => m.CartComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
