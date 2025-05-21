import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieStarsComponent } from '../movie-stars/movie-stars.component';
import { RatingTileComponent } from '../rating-tile/rating-tile.component';
import { MovieStatus } from '../../../models/movie-status.model';
import { ListSelectorModalComponent } from '../list-selector-modal/list-selector-modal.component';
import { TmdbMovie, TraktMovie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-actions',
  standalone: true,
  imports: [CommonModule, MovieStarsComponent, RatingTileComponent, ListSelectorModalComponent],
  templateUrl: './movie-actions.component.html',
  styleUrls: ['./movie-actions.component.css']
})
export class MovieActionsComponent implements OnInit, OnChanges {
  @Input() staticRating: number = 0;
  @Input() movieStatus: MovieStatus | undefined;
  @Input() tmdbMovie: TmdbMovie | undefined;
  @Input() traktMovie: TraktMovie | undefined;

  @Output() ratingChanged = new EventEmitter<number>();
  @Output() favouriteToggled = new EventEmitter<boolean>();
  @Output() watchedMovieToggled = new EventEmitter<boolean>();
  @Output() addToWatchlistToggled = new EventEmitter<boolean>();
  @Output() addToList = new EventEmitter<string>();
  @Output() createList = new EventEmitter<string>();

  showListModal = false;
  isDataLoading = true;

  ngOnInit() {
    this.checkDataStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tmdbMovie'] || changes['traktMovie']) {
      this.checkDataStatus();
    }
  }

  checkDataStatus() {
    this.isDataLoading = !(this.tmdbMovie !== undefined && this.traktMovie !== undefined);

    if (this.isDataLoading) {
      setTimeout(() => {
        this.isDataLoading = false;
      }, 2000);
    }
  }

  get userRating(): number {
    return this.movieStatus?.latestRating ?? 0;
  }

  get tmdbRating(): number {
    return this.tmdbMovie?.vote_average ?? 0;
  }

  get traktRating(): number {
    return this.traktMovie?.rating ?? 0;
  }

  get tmdbMaxRating(): number {
    return 10;
  }

  get traktMaxRating(): number {
    return 10;
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

  openListSelector(): void {
    this.showListModal = true;
  }

  closeListModal(): void {
    this.showListModal = false;
  }

  onListAdd(listId: string): void {
    this.addToList.emit(listId);
    this.showListModal = false;
  }

  onListCreate(listName: string): void {
    this.createList.emit(listName);
    this.showListModal = false;
  }
}
