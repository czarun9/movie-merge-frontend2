import {Component, OnInit} from '@angular/core';
import {TmdbMovie} from '../../movies';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgForOf} from '@angular/common';
import {MovieService} from '../../services/movie/movie.service';
import {RouterLink} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MovieCardComponent} from '../movie-card/movie-card.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    DecimalPipe,
    MovieCardComponent
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  movies: TmdbMovie[] | undefined = [];
  filteredMovies: TmdbMovie[] | undefined = [];
  protected imageBaseUrl = environment.imageBaseUrl;
  genres: string[] = ['Action', 'Sci-Fi', 'Drama', 'Comedy'];
  ratings: number[] = [5, 6, 7, 8, 9];
  minYear: number = 1950;
  maxYear: number = 2024;

  selectedGenre: string = '';
  selectedYear: string = '';
  selectedRating: string = '';

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.discoverMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies; // Początkowo pokazujemy wszystkie filmy
    });
  }

  filterMovies(): TmdbMovie[] | undefined {
    return this.filteredMovies;
  }

  resetFilters(): void {}
}
