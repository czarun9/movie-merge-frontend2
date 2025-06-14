import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { environment } from '../../../environments/environment';
import {TmdbMovie, TraktMovie} from '../../models/movie.model';
import { MovieStatus } from '../../models/movie-status.model';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieStarsComponent } from './movie-stars/movie-stars.component';
import { MovieActionsComponent } from './movie-actions/movie-actions.component';
import { MovieFacadeService } from '../../services/facades/movie-facade.service';
import {ToastrService} from 'ngx-toastr';

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
export class MovieComponent implements OnInit, OnDestroy {
  movieId: number | null = null;
  movieData: TmdbMovie | null | undefined;
  traktMovieData: TraktMovie | undefined;
  movieStatus: MovieStatus | undefined;
  movieNotFound = false;

  protected readonly imageBaseUrl: string = environment.imageBaseUrl;

  protected staticRating: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private movieFacade: MovieFacadeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam = params.get('id');
        this.movieId = idParam ? +idParam : null;

        if (this.movieId !== null) {
          this.loadMovieData(this.movieId);
        } else {
          console.error('Brak poprawnego ID filmu w URL');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMovieData(movieId: number): void {
    this.movieNotFound = false;

    this.movieFacade.getMovieDetails(movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (movieDetails) => {
          if (movieDetails.movie) {
            this.movieData = movieDetails.movie;
            this.staticRating = movieDetails.movie.vote_average ?? 0;
          } else {
            this.movieNotFound = true;
            return;
          }

          this.traktMovieData = movieDetails.traktMovie ?? undefined;
        },
        error: (error) => {
          console.error('Błąd podczas pobierania danych filmu:', error);
          this.movieNotFound = true;
        }
      });

    this.movieFacade.getMovieStatus(movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (status) => this.movieStatus = status,
        error: (error) => console.error('Błąd podczas pobierania statusu filmu:', error)
      });
  }


  rateMovie(rating: number): void {
    if (rating < 0.5 || rating > 5) {
      console.warn('Nieprawidłowa ocena:', rating);
      return;
    }

    this.movieFacade.rateMovie(this.movieId!, rating)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedStatus) => {
          this.movieStatus = updatedStatus;
        },
        error: (error) => console.error('Błąd podczas wysyłania oceny:', error)
      });
  }

  changeFavouriteStatus(isFavourite: boolean): void {
    this.movieFacade.setFavouriteStatus(this.movieId!, isFavourite)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedStatus) => {
          this.movieStatus = updatedStatus;
        },
        error: (error) => console.error('Błąd podczas zmiany statusu ulubionego:', error)
      });
  }

  changeWatchedStatus(isWatched: boolean): void {
    this.movieFacade.setWatchedStatus(this.movieId!, isWatched)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedStatus) => {
          this.movieStatus = updatedStatus;
        },
        error: (error) => console.error('Błąd podczas zmiany statusu obejrzenia:', error)
      });
  }

  changeAddedToWatchlistStatus(isAddedToWatchlist: boolean): void {
    this.movieFacade.setWatchlistStatus(this.movieId!, isAddedToWatchlist)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedStatus) => {
          this.movieStatus = updatedStatus;
        },
        error: (error) => console.error('Błąd podczas zmiany statusu pola Do Obejrzenia:', error)
      });
  }

  addMovieToCustomList(listId: string): void {
    this.movieFacade.addMovieToList(listId, this.movieId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.toastr.success(`Dodano film do listy`),
        error: (error) => {
          if (error.status === 403) {
            this.toastr.error('Nie masz dostępu do tej listy.');
          } else if (error.status === 409) {
            this.toastr.warning('Film już znajduje się na tej liście.');
          } else if (error.status === 404) {
            this.toastr.error('Lista nie została znaleziona.');
          } else {
            this.toastr.error('Wystąpił nieoczekiwany błąd.');
            console.error(error);
          }
        }

      });
  }

  createCustomList(listName: string): void {
    if (!listName.trim() || !this.movieId) return;

    this.movieFacade.createListWithMovie(listName, this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastr.success(`Utworzono listę '${listName}' i dodano film.`);
        },
        error: (error) => {
          console.error('Błąd tworzenia listy:', error);
          this.toastr.error('Nie udało się utworzyć listy.');
        }
      });
  }
}
