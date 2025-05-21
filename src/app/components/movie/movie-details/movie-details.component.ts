import {AfterViewInit, Component, ElementRef, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  UpperCasePipe
} from '@angular/common';
import {TmdbMovie, TraktMovie} from '../../../models/movie.model';
import {MovieDetailsReviewsComponent} from './movie-details-reviews/movie-details-reviews.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    DecimalPipe,
    CurrencyPipe,
    NgIf,
    NgForOf,
    DatePipe,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    MovieDetailsReviewsComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements AfterViewInit {
  @Input() movieData: TmdbMovie | undefined;
  @Input() traktMovieData!: TraktMovie | undefined;

  isOverviewExpanded = false;
  isTruncatable = false;

  @ViewChild('overviewRef') overviewRef!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const paragraph = this.overviewRef.nativeElement;
    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
    const lines = paragraph.scrollHeight / lineHeight;

    this.isTruncatable = lines > 4;
    this.cdr.detectChanges();
  }

  formatRuntime(runtime: number | null | undefined): string {
    if (!runtime || runtime <= 0) return '';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }


  toggleOverview() {
    this.isOverviewExpanded = !this.isOverviewExpanded;
  }

  tabs = [
    { label: 'Obsada', value: 'cast' },
    { label: 'Szczegóły', value: 'details' },
    { label: 'Ekipa', value: 'crew' },
    { label: 'Recenzje', value: 'reviews' }
  ];

  selectedTab = this.tabs[0];

  selectTab(tab: any) {
    this.selectedTab = tab;
  }

  get movieDetails() {
    if (!this.movieData) return [];

    return [
      { label: 'Data wydania', value: this.movieData.release_date },
      { label: 'Język oryginalny', value: this.movieData.original_language.toUpperCase() },
      { label: 'Dla dorosłych', value: this.movieData.adult ? 'Tak' : 'Nie' },
      { label: 'Popularność', value: this.movieData.popularity.toFixed(0) },
      { label: 'Dochód', value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.movieData.revenue) },
      { label: 'Wideo dostępne', value: this.movieData.video ? 'Tak' : 'Nie' }
    ];
  }

}
