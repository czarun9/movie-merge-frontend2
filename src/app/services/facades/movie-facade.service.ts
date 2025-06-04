import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap} from 'rxjs';
import { MovieService } from '../movie/movie.service';
import { MovieStatusService } from '../movie-status/movie-status.service';
import { UserService } from '../user/user.service';
import {TmdbMovie, TraktMovie, TraktMovieComment} from '../../models/movie.model';
import { MovieStatus } from '../../models/movie-status.model';
import {Review} from '../../models/review.model';

export interface MovieDetails {
  movie: TmdbMovie | null;
  traktMovie: TraktMovie | null;
  status?: MovieStatus;
}

@Injectable({
  providedIn: 'root'
})
export class MovieFacadeService {
  constructor(
    private movieService: MovieService,
    private movieStatusService: MovieStatusService,
    private userService: UserService
  ) {}

  /**
   * Pobiera kompleksowe dane o filmie, łącznie z recenzjami i komentarzami Trakt (w obiekcie traktMovie)
   */
  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return forkJoin({
      movie: this.movieService.getMovie(movieId),
      reviewPage: this.movieService.getMovieReviews(movieId),
      traktMovie: this.movieService.getTraktMovie(movieId)
    }).pipe(
      map(({movie, reviewPage, traktMovie}) => {
        const movieData = movie || null;
        const traktMovieData = traktMovie || null;

        const traktReviews: Review[] = traktMovieData?.comments
          ? this.mapTraktCommentsToReviews(traktMovieData.comments)
          : [];

        if (movieData && reviewPage) {
          movieData.reviews = [
            ...reviewPage.reviews,
            ...traktReviews
          ];
        } else if (movieData) {
          movieData.reviews = traktReviews;
        }

        return {
          movie: movieData,
          traktMovie: traktMovieData
        };
      })
    );
  }

  private mapTraktCommentsToReviews(traktComments: readonly TraktMovieComment[]): Review[] {
    return traktComments.map(comment => ({
      id: comment.id.toString(),
      author: comment.author,
      content: comment.content,
      url: '',
      platform: 'Trakt'
    }));
  }

  /**
   * Pobiera status filmu dla użytkownika
   */
  getMovieStatus(movieId: number): Observable<MovieStatus | undefined> {
    return this.movieStatusService.getMovieStatus(movieId);
  }

  /**
   * Ocenia film i zwraca zaktualizowany status
   */
  rateMovie(movieId: number, rating: number): Observable<MovieStatus> {
    return this.movieStatusService.setRating(movieId, rating).pipe(
      switchMap(() => this.movieStatusService.getMovieStatus(movieId)),
      map(status => {
        if (!status) {
          throw new Error('Nie można pobrać statusu filmu po ocenie');
        }
        return status;
      })
    );
  }

  /**
   * Zmienia status dodania do ulubionych
   */
  setFavouriteStatus(movieId: number, isFavourite: boolean): Observable<MovieStatus> {
    return this.movieStatusService.setFavouriteStatus(movieId, isFavourite).pipe(
      switchMap(() => this.movieStatusService.getMovieStatus(movieId)),
      map(status => {
        if (!status) {
          throw new Error('Nie można pobrać statusu filmu po zmianie statusu ulubionego');
        }
        return status;
      })
    );
  }

  /**
   * Zmienia status obejrzenia
   */
  setWatchedStatus(movieId: number, isWatched: boolean): Observable<MovieStatus> {
    return this.movieStatusService.setWatchedStatus(movieId, isWatched).pipe(
      switchMap(() => this.movieStatusService.getMovieStatus(movieId)),
      map(status => {
        if (!status) {
          throw new Error('Nie można pobrać statusu filmu po zmianie statusu obejrzenia');
        }
        return status;
      })
    );
  }

  /**
   * Zmienia status dodania do watchlisty
   */
  setWatchlistStatus(movieId: number, isAddedToWatchlist: boolean): Observable<MovieStatus> {
    return this.movieStatusService.setAddedToWatchlistStatus(movieId, isAddedToWatchlist).pipe(
      switchMap(() => this.movieStatusService.getMovieStatus(movieId)),
      map(status => {
        if (!status) {
          throw new Error('Nie można pobrać statusu filmu po zmianie statusu watchlisty');
        }
        return status;
      })
    );
  }

  /**
   * Dodaje film do istniejącej listy użytkownika
   */
  addMovieToList(listId: string, movieId: number): Observable<unknown> {
    return this.userService.addMovieToList(listId, movieId);
  }

  /**
   * Tworzy nową listę i dodaje do niej film
   */
  createListWithMovie(listName: string, movieId: number): Observable<unknown> {
    return this.userService.createListWithMovie(listName, movieId);
  }
}
