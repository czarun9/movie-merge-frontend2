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
    NgClass,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements AfterViewInit {
  @Input() movieData: TmdbMovie | undefined;

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

}
