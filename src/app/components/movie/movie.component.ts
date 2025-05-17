import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieStarsComponent} from './movie-stars/movie-stars.component';
import {MovieActionsComponent} from './movie-actions/movie-actions.component';
import {MovieStatusService} from '../../services/movie-status/movie-status.service';
import {TmdbMovie} from '../../models/movie.model';
import {MovieStatus} from '../../models/movie-status.model';
import {forkJoin} from 'rxjs';
import {Review} from '../../models/review.model';
import {UserService} from '../../services/user/user.service';

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
  movieId: number | null = null;
  movieData: TmdbMovie | undefined;
  movieStatus: MovieStatus | undefined;
  protected imageBaseUrl: string = environment.imageBaseUrl;

  currentRating: number = 0;
  protected userRating: number;
  protected staticRating: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private movieStatusService: MovieStatusService, private userService: UserService) {
    this.userRating = 0;
    this.staticRating = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.movieId = idParam ? +idParam : null;
      if (this.movieId !== null) {
        this.loadMovieDataAndReviews();
        this.loadMovieStatus();
      } else {
        console.error('Brak poprawnego ID filmu w URL');
      }
    });
  }


  private loadMovieDataAndReviews(): void {
    if (this.movieId === null) {
      console.error('Nie można załadować danych filmu: movieId jest null');
      return;
    }

    forkJoin({
      movie: this.movieService.getMovie(this.movieId),
      reviewPage: this.movieService.getMovieReviews(this.movieId)
    }).subscribe(({movie, reviewPage}) => {
      if (movie) {
        this.setMovieData(movie);
      }
      if (reviewPage) {
        this.setReviews(reviewPage.reviews);
      }
    });
  }

  private setMovieData(movie: TmdbMovie): void {
    this.movieData = movie;
    console.log(this.movieData);
    this.staticRating = movie.vote_average ?? 0;
  }

  private setReviews(reviews: Review[]): void {
    if (this.movieData) {
      this.movieData.reviews = reviews;
    }
  }

  private loadMovieStatus(): void {
    this.movieStatusService.getMovieStatus(this.movieId).subscribe(status => {
      if (status) {
        this.movieStatus = status;
        console.log(this.movieStatus);
      }
    });
  }

  rateMovie(rating: number) {
    if (rating < 0.5 || rating > 5) {
      console.warn('Nieprawidłowa ocena:', rating);
      return;
    }

    this.currentRating = rating;

    if (this.movieStatus) {
      const now = new Date();
      this.movieStatus.ratings.push({value: rating, ratedAt: now});
      this.movieStatus.latestRating = rating;
    }

    this.movieStatusService.setRating(this.movieId!, rating).subscribe({
      next: () => console.log('Ocena wysłana:', rating),
      error: err => console.error('Błąd podczas wysyłania oceny:', err)
    });
  }


  changeFavouriteStatus(favouriteStatus: boolean) {
    console.log(favouriteStatus);
    this.movieStatusService.setFavouriteStatus(this.movieId!, favouriteStatus).subscribe();
  }

  changeWatchedStatus(watchedStatus: boolean) {
    console.log(watchedStatus);
    this.movieStatusService.setWatchedStatus(this.movieId!, watchedStatus).subscribe();
  }

  changeAddedToWatchlistStatus(addedToWatchlistStatus: boolean) {
    console.log(addedToWatchlistStatus);
    this.movieStatusService.setAddedToWatchlistStatus(this.movieId!, addedToWatchlistStatus).subscribe();
  }

  addMovieToCustomList(listId: string) {
    this.userService.addMovieToList(listId, this.movieId!).subscribe({
      next: () => console.log(`Dodano film do listy ${listId}`),
      error: err => console.error('Błąd dodawania do listy', err)
    });
  }

  createCustomList(listName: string) {
    this.userService.createListWithMovie(listName, this.movieId!).subscribe({
      next: () => console.log(`Utworzono listę '${listName}' z filmem`),
      error: err => console.error('Błąd tworzenia listy', err)
    });
  }


}
