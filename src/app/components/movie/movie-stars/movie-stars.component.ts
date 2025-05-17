import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { NgClass, NgForOf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-movie-stars',
  standalone: true,
  imports: [NgForOf, NgClass, NgStyle],
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

  getStarClipValue(starIndex: number): string {
    const rating = this.hoverRating > 0
      ? this.hoverRating
      : (this.hasRated ? this.userRating * 2 : this.staticRating);

    const starStartValue = (starIndex - 1) * 2;

    const remainingPoints = Math.max(0, Math.min(2, rating - starStartValue));

    let fillPercentage = (remainingPoints / 2) * 100;

    if (Math.abs(remainingPoints - 1) < 0.1) {
      fillPercentage = 50;
    }

    return (100 - fillPercentage) + '%';
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
