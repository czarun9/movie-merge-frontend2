import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre, TmdbMovie } from '../../../movies';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './browse-filter.component.html',
  styleUrls: ['./browse-filter.component.css']
})
export class BrowseFilterComponent {
  @Input() movies: TmdbMovie[] = [];
  @Input() genres: Genre[] = [];
  @Output() filtered = new EventEmitter<TmdbMovie[]>();
  @Output() searchRequested = new EventEmitter<{ genre?: string, rating?: number }>();

  selectedGenre: string = '';
  selectedRating: string = '';
  ratings: number[] = [5, 6, 7, 8, 9];

  triggerSearch(): void {
    this.searchRequested.emit({
      genre: this.selectedGenre || undefined,
      rating: this.selectedRating ? +this.selectedRating : undefined
    });
  }

  resetFilters(): void {
    this.selectedGenre = '';
    this.selectedRating = '';
    this.triggerSearch(); // automatycznie zresetuj także wyniki
  }

}
