import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {RouterLink} from '@angular/router';
import {TmdbMovie} from '../../movies';
import {DecimalPipe, NgForOf} from '@angular/common';
import {environment} from '../../../environments/environment';
import {MovieCardComponent} from '../movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DecimalPipe,
    MovieCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: TmdbMovie[] | undefined = [];

  protected imageBaseUrl = `${environment.imageBaseUrl}`;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadMovies(1);
  }

  private loadMovies(page: number): void {
    this.movieService.discoverMovies(page).subscribe(response => {
      if (response) {
        this.movies = response.movies;
      }
    });
  }
}
