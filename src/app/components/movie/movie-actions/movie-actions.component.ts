import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieStarsComponent } from '../movie-stars/movie-stars.component';
import { RatingTileComponent } from '../rating-tile/rating-tile.component';
import { MovieStatus } from '../../../movies';

@Component({
  selector: 'app-movie-actions',
  standalone: true,
  imports: [CommonModule, MovieStarsComponent, RatingTileComponent],
  templateUrl: './movie-actions.component.html',
  styleUrls: ['./movie-actions.component.css']
})
export class MovieActionsComponent {
  @Input() staticRating: number = 0;
  @Input() movieStatus: MovieStatus | undefined;

  @Output() ratingChanged = new EventEmitter<number>();
  @Output() favouriteToggled = new EventEmitter<boolean>();
  @Output() watchedMovieToggled = new EventEmitter<boolean>();
  @Output() addToWatchlistToggled = new EventEmitter<boolean>();

  get userRating(): number {
    return this.movieStatus?.latestRating ?? 0;
  }

  onRatingChanged(rating: number) {
    if (!this.movieStatus || rating < 0.5 || rating > 5) {
      return;
    }

    this.movieStatus.latestRating = rating;
    this.movieStatus.ratings.push({ value: rating, ratedAt: new Date() });

    this.ratingChanged.emit(rating);
  }

  toggleFavorite(): void {
    if (!this.movieStatus) return;
    this.movieStatus.favourite = !this.movieStatus.favourite;
    this.favouriteToggled.emit(this.movieStatus.favourite);
  }

  toggleWatched(): void {
    if (!this.movieStatus) return;
    this.movieStatus.watched = !this.movieStatus.watched;
    this.watchedMovieToggled.emit(this.movieStatus.watched);
  }

  toggleWatchlist(): void {
    if (!this.movieStatus) return;
    this.movieStatus.inWatchlist = !this.movieStatus.inWatchlist;
    this.addToWatchlistToggled.emit(this.movieStatus.inWatchlist);
  }
}
