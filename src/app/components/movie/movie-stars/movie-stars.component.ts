import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-movie-stars',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './movie-stars.component.html',
  styleUrl: './movie-stars.component.css'
})
export class MovieStarsComponent {
  @Input() currentRating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();
  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;


  onStarHover(event: MouseEvent, starIndex: number) {
    const wrapper = event.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;

    const percentage = offsetX / width;

    this.hoverRating = starIndex - 1 + (percentage <= 0.5 ? 0.5 : 1);
  }

  getStarFillPercentage(starIndex: number): number {
    const rating = this.hoverRating || (this.currentRating / 2);

    if (rating >= starIndex) return 100;
    if (rating >= starIndex - 0.5) return 42;

    return 0;
  }

  onStarLeave() {
    this.hoverRating = 0;
  }

  rateMovie(hoverRating: number) {
    this.ratingChanged.emit(hoverRating);
  }
}
