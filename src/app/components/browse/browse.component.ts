import { Component, OnInit } from '@angular/core';
import {Genre, TmdbMovie} from '../../movies';
import { MovieService } from '../../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MoviePaginationComponent } from '../movie-pagination/movie-pagination.component';
import { MovieFilterComponent } from '../movie-filter/movie-filter.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    NgForOf,
    MovieCardComponent,
    MoviePaginationComponent,
    MovieFilterComponent
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  movies: TmdbMovie[] = [];
  genres: Genre[] = [];
  filteredMovies: TmdbMovie[] = [];
  protected imageBaseUrl = environment.imageBaseUrl;

  page = 1;
  protected totalPages: number = 1;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'], 10) || 1;
      this.loadMovies();
    });

    this.movieService.getGenres().subscribe(response => {
      this.genres = response?.genres ?? [];
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

  onPageChanged(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }

  onMoviesFiltered(filtered: TmdbMovie[]): void {
    this.filteredMovies = filtered;
  }

}
