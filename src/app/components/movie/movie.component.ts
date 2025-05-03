import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieStarsComponent} from './movie-stars/movie-stars.component';

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
    MovieStarsComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: TmdbMovie | undefined;
  protected imageBaseUrl : string = environment.imageBaseUrl;

  currentRating: number = 0;
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.loadMovieData();
    });
  }

  loadMovieData() {
    this.movieService.getMovie(this.movieId).subscribe(data => {
      if (data) {
        this.movieData = data;
        this.currentRating = data.vote_average ?? 0;
        console.log(this.movieData);
        console.log(this.currentRating);
      }
    });
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
