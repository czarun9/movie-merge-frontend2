import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-rating-tile',
  standalone: true,
  templateUrl: './rating-tile.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './rating-tile.component.css'
})
export class RatingTileComponent {
  @Input() value: number = 0;

  getRatingTileClass(): string {
    if (this.value >= 4.5) return 'rating-highest';
    if (this.value >= 3.5) return 'rating-high';
    if (this.value >= 2.5) return 'rating-medium';
    if (this.value >= 1.5) return 'rating-low';
    return 'rating-lowest';
  }
}
