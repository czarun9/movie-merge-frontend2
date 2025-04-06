import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';

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
}
