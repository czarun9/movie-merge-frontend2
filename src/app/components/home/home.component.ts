import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie/movie.service';
import {RouterLink} from '@angular/router';
import {TmdbMovie} from '../../movies';
import {DecimalPipe, NgForOf} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DecimalPipe
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
    this.movieService.discoverMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
