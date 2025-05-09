import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieStarsComponent} from './movie-stars/movie-stars.component';
import {MovieActionsComponent} from './movie-actions/movie-actions.component';
import {MovieStatusService} from '../../services/movie-status/movie-status.service';
import {TmdbMovie} from '../../models/movie.model';
import {MovieStatus} from '../../models/movie-status.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    UpperCasePipe,
    CurrencyPipe,
    NgForOf,
    MovieDetailsComponent,
    MovieStarsComponent,
    MovieActionsComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: TmdbMovie | undefined;
  movieStatus: MovieStatus | undefined;
  protected imageBaseUrl: string = environment.imageBaseUrl;

  currentRating: number = 0;
  protected userRating: number;
  protected staticRating: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private movieStatusService: MovieStatusService) {
    this.userRating = 0;
    this.staticRating = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.loadMovieData();
      this.loadMovieStatus()
    });
  }


  loadMovieData() {
    this.movieService.getMovie(this.movieId).subscribe(data => {
      if (data) {
        this.movieData = data;
        this.staticRating = data.vote_average ?? 0;

        this.movieData.reviews = [
          {
            author: 'janek_89',
            platform: 'Filmweb',
            content: 'Świetny film z genialną obsadą. Na pewno wrócę do niego jeszcze nie raz.'
          },
          {
            author: 'moviereviewer',
            platform: 'IMDb',
            content: 'Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona.  Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona. Trochę zbyt długi, ale fabuła bardzo wciągająca i świetnie nakręcona.'
          },
          {
            author: 'cinemalover22',
            platform: 'Rotten Tomatoes',
            content: 'Przeciętny film z kilkoma ciekawymi momentami, ale ogólnie szału nie ma.'
          }
        ];

        console.log(this.movieData);
        console.log(this.currentRating);
      }
    });
  }

  loadMovieStatus() {
    this.movieStatusService.getMovieStatus(this.movieId).subscribe(status => {
      if (status) {
        this.movieStatus = status;
        console.log(this.movieStatus);
      }
    })
  }

  rateMovie(rating: number) {
    if (rating < 0.5 || rating > 5) {
      console.warn('Nieprawidłowa ocena:', rating);
      return;
    }

    this.currentRating = rating;

    if (this.movieStatus) {
      const now = new Date();
      this.movieStatus.ratings.push({ value: rating, ratedAt: now });
      this.movieStatus.latestRating = rating;
    }

    this.movieStatusService.setRating(this.movieId, rating).subscribe({
      next: () => console.log('Ocena wysłana:', rating),
      error: err => console.error('Błąd podczas wysyłania oceny:', err)
    });
  }


  changeFavouriteStatus(favouriteStatus: boolean) {
    console.log(favouriteStatus);
    this.movieStatusService.setFavouriteStatus(this.movieId, favouriteStatus).subscribe();
  }

  changeWatchedStatus(watchedStatus: boolean) {
    console.log(watchedStatus);
    this.movieStatusService.setWatchedStatus(this.movieId, watchedStatus).subscribe();
  }

  changeAddedToWatchlistStatus(addedToWatchlistStatus: boolean) {
    console.log(addedToWatchlistStatus);
    this.movieStatusService.setAddedToWatchlistStatus(this.movieId, addedToWatchlistStatus).subscribe();
  }
}
