import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieStarsComponent } from '../movie-stars/movie-stars.component';

@Component({
  selector: 'app-movie-actions',
  standalone: true,
  imports: [CommonModule, MovieStarsComponent],
  templateUrl: './movie-actions.component.html',
  styleUrls: ['./movie-actions.component.css']
})
export class MovieActionsComponent {
  @Input() userRating: number = 0;
  @Input() staticRating: number = 0;

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

  getRatingTileClass(): string {
    const rating = this.staticRating / 2;

    if (rating >= 4.5) return 'rating-highest';
    if (rating >= 3.5) return 'rating-high';
    if (rating >= 2.5) return 'rating-medium';
    if (rating >= 1.5) return 'rating-low';
    return 'rating-lowest';
  }

}
