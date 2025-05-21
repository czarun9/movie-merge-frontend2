import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type RatingSource = 'tmdb' | 'trakt' | 'user';

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
  @Input() source: RatingSource = 'tmdb';
  @Input() maxValue: number = 10;

  get normalizedValue(): number {
    return (this.value / this.maxValue) * 5;
  }

  get displayValue(): string {
    return this.normalizedValue.toFixed(1);
  }

  get sourceIcon(): string {
    switch (this.source) {
      case 'tmdb': return 'T';
      case 'trakt': return 'TR';
      case 'user': return 'U';
      default: return '';
    }
  }

  get sourceLabel(): string {
    switch (this.source) {
      case 'tmdb': return 'TMDB';
      case 'trakt': return 'Trakt';
      case 'user': return 'Twoja ocena';
      default: return '';
    }
  }

  getRatingTileClass(): string[] {
    const classes = [this.source + '-rating'];

    const value = this.normalizedValue;
    if (value >= 4.5) classes.push('rating-highest');
    else if (value >= 3.5) classes.push('rating-high');
    else if (value >= 2.5) classes.push('rating-medium');
    else if (value >= 1.5) classes.push('rating-low');
    else classes.push('rating-lowest');

    return classes;
  }
}
