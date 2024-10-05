import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowseComponent} from './browse/browse.component';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'browse', component: BrowseComponent},
];
