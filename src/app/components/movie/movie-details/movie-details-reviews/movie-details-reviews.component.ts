import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Review} from '../../../../models/review.model';

@Component({
  selector: 'app-movie-details-reviews',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './movie-details-reviews.component.html',
  styleUrl: './movie-details-reviews.component.css'
})
export class MovieDetailsReviewsComponent {

  @Input() reviews: Review[] = [];

  expandedReviews: { [index: number]: boolean } = {};

  toggleReview(index: number) {
    this.expandedReviews[index] = !this.expandedReviews[index];
  }

  isExpanded(index: number): boolean {
    return this.expandedReviews[index];
  }
}
