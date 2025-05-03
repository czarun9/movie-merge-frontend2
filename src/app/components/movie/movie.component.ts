import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from './movie-details/movie-details.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    UpperCasePipe,
    CurrencyPipe,
    NgForOf,
    MovieDetailsComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: TmdbMovie | undefined;
  protected imageBaseUrl : string = environment.imageBaseUrl;

  stars = [1, 2, 3, 4, 5];
  currentRating: number = 0;
  hoverRating = 0;
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

  onStarHover(event: MouseEvent, starIndex: number) {
    const wrapper = event.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;

    const percentage = offsetX / width;

    this.hoverRating = starIndex - 1 + (percentage <= 0.5 ? 0.5 : 1);
  }

  getStarFillPercentage(starIndex: number): number {
    const rating = this.hoverRating || (this.currentRating / 2);

    if (rating >= starIndex) return 100;
    if (rating >= starIndex - 0.5) return 42;

    return 0;
  }

  onStarLeave() {
    this.hoverRating = 0;
  }



}
