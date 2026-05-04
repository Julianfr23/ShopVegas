import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registrarse'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
