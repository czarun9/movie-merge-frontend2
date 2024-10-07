import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId: string = '1';
  movieData: any;  // Dane filmu

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    // Pobranie ID z URL-a
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id')!;
      this.loadMovieData();
    });
  }

  // Metoda ładowania danych na podstawie ID filmu
  loadMovieData() {
    this.movieService.getMovie(this.movieId).subscribe(data => {
      this.movieData = data;
    });
  }
}
