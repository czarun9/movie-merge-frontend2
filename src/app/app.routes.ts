import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import {FavoritesPageComponent} from './components/user/lists/pages/favorites-page/favorites-page.component';
import {WatchlistPageComponent} from './components/user/lists/pages/watchlist-page/watchlist-page.component';
import {RatingsPageComponent} from './components/user/lists/pages/ratings-page/ratings-page.component';
import {WatchedPageComponent} from './components/user/lists/pages/watched-page/watched-page.component';
import {CustomListsPageComponent} from './components/user/lists/pages/custom-lists-page/custom-lists-page.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'favourites', component: FavoritesPageComponent },
  { path: 'watchlist', component: WatchlistPageComponent },
  { path: 'watched', component: WatchedPageComponent },
  { path: 'ratings', component: RatingsPageComponent },
  { path: 'custom-lists', component: CustomListsPageComponent },
];
