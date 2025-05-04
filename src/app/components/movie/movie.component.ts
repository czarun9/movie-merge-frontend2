import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {MovieStatus, TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieStarsComponent} from './movie-stars/movie-stars.component';
import {MovieActionsComponent} from './movie-actions/movie-actions.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    UpperCasePipe,
    CurrencyPipe,
    NgForOf,
    MovieDetailsComponent,
    MovieStarsComponent,
    MovieActionsComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: TmdbMovie | undefined;
  movieStatus: MovieStatus | undefined;
  protected imageBaseUrl: string = environment.imageBaseUrl;

  currentRating: number = 0;
  protected userRating: number;
  protected staticRating: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.userRating = 0;
    this.staticRating = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.loadMovieData();
      this.loadMovieStatus()
    });
  }

  loadMovieData() {
    this.movieService.getMovie(this.movieId).subscribe(data => {
      if (data) {
        this.movieData = data;
        this.staticRating = data.vote_average ?? 0;
        console.log(this.movieData);
        console.log(this.currentRating);
      }
    });
  }

  loadMovieStatus() {
    this.movieService.getMovieStatus(this.movieId).subscribe(status => {
      if (status) {
        this.movieStatus = status;
        console.log(this.movieStatus);
      }
    })
  }

  likeMovie() {

  }

  addToWatchlist() {

  }

  watchMovie() {

  }

  rateMovie(rating: number) {
    this.currentRating = rating;
    console.log(rating);
    // this.movieService.rateMovie(rating)
  }


}
