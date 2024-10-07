import {Component, OnInit} from '@angular/core';
import {Movie, MOVIES} from '../movies';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  movies: Movie[]= MOVIES;
  filteredMovies: Movie[]= MOVIES;
  genres: string[] = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy'];
  selectedGenre: string = 'All';

  constructor() {}

  ngOnInit(): void {
  }

  filterMovies(){
    if (this.selectedGenre === 'All') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie => movie.genre === this.selectedGenre);
    }
  }
}
