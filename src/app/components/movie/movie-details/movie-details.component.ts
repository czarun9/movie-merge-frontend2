import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
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
    DatePipe,
    NgClass
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements AfterViewInit {
  @Input() movieData: TmdbMovie | undefined;

  isOverviewExpanded = false;
  isTruncatable = false;

  @ViewChild('overviewRef') overviewRef!: ElementRef;

  ngAfterViewInit() {
    const paragraph = this.overviewRef.nativeElement;
    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
    const lines = paragraph.scrollHeight / lineHeight;

    this.isTruncatable = lines > 4;
  }

  toggleOverview() {
    this.isOverviewExpanded = !this.isOverviewExpanded;
  }
}
