import {Component, OnInit} from '@angular/core';
import {TmdbMovie} from '../../movies';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgForOf} from '@angular/common';
import {MovieService} from '../../services/movie/movie.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MovieCardComponent} from '../movie-card/movie-card.component';
import {MoviePaginationComponent} from '../movie-pagination/movie-pagination.component';
import {MovieFilterComponent} from '../movie-filter/movie-filter.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    DecimalPipe,
    MovieCardComponent,
    MoviePaginationComponent,
    MovieFilterComponent
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

  selectedGenre: string = '';
  selectedYear: string = '';
  selectedRating: string = '';
  page = 1;
  protected totalPages: number | undefined;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'], 10) || 1;
      this.loadMovies();
    });
  }

  filterMovies(): TmdbMovie[] | undefined {
    return this.filteredMovies;
  }

  resetFilters(): void {
  }

  onPageChanged(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }

  loadMovies(): void {
    this.movieService.discoverMovies(this.page).subscribe(response => {
      if (response) {
        this.movies = response.movies;
        this.filteredMovies = response.movies;
        this.totalPages = response.totalPages;
      }
    });
  }

  onGenreChanged(genre: string): void {
    this.selectedGenre = genre;
    this.filterMovies();
  }

  onRatingChanged(rating: string): void {
    this.selectedRating = rating;
    this.filterMovies();
  }


}

