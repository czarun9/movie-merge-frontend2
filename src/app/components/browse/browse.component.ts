import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { NgForOf } from '@angular/common';
import {BrowsePaginationComponent} from './browse-pagination/browse-pagination.component';
import {BrowseFilterComponent} from './browse-filter/browse-filter.component';
import {TmdbMovie} from '../../models/movie.model';
import {Genre} from '../../models/genre.model';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    NgForOf,
    MovieCardComponent,
    BrowsePaginationComponent,
    BrowseFilterComponent
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

  selectedGenreId?: number;
  selectedRating?: number;

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
    this.movieService
      .discoverMovies(this.page, this.selectedGenreId?.toString(), this.selectedRating)
      .subscribe(response => {
        if (response) {
          this.movies      = response.movies;
          this.filteredMovies = response.movies;
          this.totalPages  = response.totalPages;
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

  onSearchRequested(filters: { genre?: string; rating?: number }): void {
    if (filters.genre) {
      const genreObj = this.genres.find(g => g.name === filters.genre);
      this.selectedGenreId = genreObj?.id;
    } else {
      this.selectedGenreId = undefined;
    }
    this.loadMovies();
  }
}
