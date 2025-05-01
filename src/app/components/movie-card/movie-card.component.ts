import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {Genre} from '../../movies';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() imageBaseUrl: string = '';
  @Input() genres: Genre[] = [];


  getGenreNames(): string {
    if (!this.movie?.genre_ids || !this.genres?.length) return '';

    const genreNames = this.movie.genre_ids
      .map((id: number) => this.genres.find(genre => genre.id === id)?.name)
      .filter(Boolean);

    return genreNames.join(', ');
  }



}
