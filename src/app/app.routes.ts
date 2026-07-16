import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { NavbarComponent } from './navbar/navbar';
import { BlogListComponent } from './list/list';
import { BlogFormComponent } from './form/form';
import { authGuard } from './guard/auth-guard';
import { Home } from './home/home';
export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'navbar',component:NavbarComponent
  },
  {
    path: '',component: BlogListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: BlogFormComponent,
    canActivate: [authGuard]
  },
  {
    path:'home',component:Home,canActivate:[authGuard]
  },
{
  path: 'edit/:id',
  component: BlogFormComponent,
  canActivate: [authGuard]
}
];
