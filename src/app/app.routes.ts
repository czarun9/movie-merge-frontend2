import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BrowseComponent} from './components/browse/browse.component';
import {RegisterComponent} from './components/register/register.component';
import {MovieComponent} from './components/movie/movie.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'movie/:id', component: MovieComponent}
];
