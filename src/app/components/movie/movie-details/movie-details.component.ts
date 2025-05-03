import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TmdbMovie} from '../../../movies';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    DecimalPipe,
    CurrencyPipe,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  @Input() movieData: TmdbMovie | undefined;
}
