import {Component, OnInit} from '@angular/core';
import {Movie, MOVIES} from '../movies';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MovieService} from '../services/movie.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  genres: string[] = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy'];
  selectedGenre: string = 'All';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  filterMovies(){
    if (this.selectedGenre === 'All') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie => movie.genre === this.selectedGenre);
    }
  }
}
