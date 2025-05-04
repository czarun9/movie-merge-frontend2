import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieStarsComponent } from '../movie-stars/movie-stars.component';
import {RatingTileComponent} from '../rating-tile/rating-tile.component';
import {MovieStatus} from '../../../movies';

@Component({
  selector: 'app-movie-actions',
  standalone: true,
  imports: [CommonModule, MovieStarsComponent, RatingTileComponent],
  templateUrl: './movie-actions.component.html',
  styleUrls: ['./movie-actions.component.css']
})
export class MovieActionsComponent {
  @Input() userRating: number = 0;
  @Input() staticRating: number = 0;
  @Input() movieStatus: MovieStatus | undefined;

  @Output() ratingChanged = new EventEmitter<number>();

  likeMovie() {
    console.log('Polubiono');
  }

  addToWatchlist() {
    console.log('Dodano do watchlisty');
  }

  watchMovie() {
    console.log('Obejrzano');
  }

  onRatingChanged(rating: number) {
    this.ratingChanged.emit(rating);
  }

}
