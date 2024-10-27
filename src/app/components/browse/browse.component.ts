import {Component, OnInit} from '@angular/core';
import {Movie} from '../../movies';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MovieService} from '../../services/movie/movie.service';
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
  movies: Movie[] | undefined = [];
  filteredMovies: Movie[] | undefined = [];
  genres: string[] = ['Action', 'Sci-Fi', 'Drama', 'Comedy'];
  ratings: number[] = [5, 6, 7, 8, 9];
  minYear: number = 1950;
  maxYear: number = 2024;

  selectedGenre: string = '';
  selectedYear: string = '';
  selectedRating: string = '';

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies; // Początkowo pokazujemy wszystkie filmy
    });
  }

  filterMovies(): void {
    if (this.movies) {
      this.filteredMovies = this.movies.filter(movie => {
        const isWithinYearRange = movie.year >= this.minYear && movie.year <= this.maxYear;
        const isGenreMatch = this.selectedGenre ? movie.genre === this.selectedGenre : true;
        return isWithinYearRange && isGenreMatch;
      });
    }
  }

  // filterMovies(): void {
  //   this.filteredMovies = this.movies.filter(movie => {
  //     return (
  //       (!this.selectedGenre || movie.genre === this.selectedGenre) &&
  //       (!this.selectedYear || movie.year === +this.selectedYear) &&
  //       (!this.selectedRating || movie.rating >= +this.selectedRating)
  //     );
  //   });
  // }

  resetFilters(): void {
    this.selectedGenre = '';
    this.selectedYear = '';
    this.selectedRating = '';
    this.filteredMovies = this.movies; // Resetuj do początkowej listy filmów
  }
}
