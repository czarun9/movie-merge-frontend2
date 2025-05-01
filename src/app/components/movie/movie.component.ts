import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    UpperCasePipe,
    CurrencyPipe,
    NgForOf,
    MovieDetailsComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: TmdbMovie | undefined;
  protected imageBaseUrl : string = environment.imageBaseUrl;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.loadMovieData();
    });
  }

  loadMovieData() {
    this.movieService.getMovie(this.movieId).subscribe(data => {
      this.movieData = data;
      console.log(this.movieData);
    });
  }

  genreMap: Record<number, string> = {
    28: 'Akcja',
    12: 'Przygodowy',
    16: 'Animacja',
    35: 'Komedia',
    80: 'Kryminalny',
    99: 'Dokumentalny',
    18: 'Dramat',
    10751: 'Familijny',
    14: 'Fantasy',
    36: 'Historyczny',
    27: 'Horror',
    10402: 'Muzyczny',
    9648: 'Mystery',
    10749: 'Romans',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'Wojenny',
    37: 'Western',
  };
  currentRating: number = 5.0;

  getGenreNames(genreIds: number[] | null | undefined): string[] {
    if (!genreIds || genreIds.length === 0) {
      return ['Brak informacji'];
    }

    return genreIds.map(id => this.genreMap[id] || 'Nieznany');
  }


  likeMovie() {

  }

  addToWatchlist() {

  }

  watchMovie() {

  }

  rateMovie(star: number) {

  }
}
