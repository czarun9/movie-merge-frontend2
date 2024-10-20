import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowseComponent} from './browse/browse.component';
import {RegisterComponent} from './register/register.component';
import {MovieComponent} from './movie/movie.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'movie/:id', component: MovieComponent}
];
