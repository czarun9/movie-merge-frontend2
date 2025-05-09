import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-stars',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './movie-stars.component.html',
  styleUrls: ['./movie-stars.component.css']
})
export class MovieStarsComponent implements OnChanges {
  @Input() staticRating: number = 0;
  @Input() userRating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;
  hasRated: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRating']) {
      this.hasRated = this.userRating > 0;
    }
  }

  onStarHover(event: MouseEvent, starIndex: number) {
    const wrapper = event.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;

    this.hoverRating = (starIndex - 1) * 2 + (percentage <= 0.5 ? 1 : 2);
  }

  onStarLeave() {
    this.hoverRating = 0;
  }

  getStarFillPercentage(starIndex: number): number {
    const rating = this.hoverRating > 0
      ? this.hoverRating
      : (this.hasRated ? this.userRating * 2 : this.staticRating);

    const fullStars = starIndex * 2;
    if (rating >= fullStars) return 100;
    if (rating >= fullStars - 1) return 42;
    return 0;
  }

  rateMovie(rating: number) {
    const scaledRating = Math.round(rating) / 2;

    if (scaledRating <= 0) {
      return;
    }

    this.hasRated = true;
    this.userRating = scaledRating;
    this.ratingChanged.emit(scaledRating);
  }
}
