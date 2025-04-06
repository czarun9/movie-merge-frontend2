import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie/movie.service';
import {DecimalPipe, NgIf} from '@angular/common';
import {TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe
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
    });
  }
}
