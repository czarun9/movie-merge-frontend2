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
  @Input() currentRating: number = 0;
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
