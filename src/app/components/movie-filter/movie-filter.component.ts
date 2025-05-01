import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css'
})
export class MovieFilterComponent {
  @Input() genres: string[] = [];
  @Input() ratings: number[] = [];

  @Input() selectedGenre: string = '';
  @Input() selectedRating: string = '';

  @Output() genreChanged = new EventEmitter<string>();
  @Output() ratingChanged = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  onGenreChange(value: string): void {
    this.genreChanged.emit(value);
  }

  onRatingChange(value: string): void {
    this.ratingChanged.emit(value);
  }

  onReset(): void {
    this.resetFilters.emit();
  }
}
