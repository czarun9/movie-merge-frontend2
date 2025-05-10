import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface ListItem {
  id: number;
  title: string;
  release_date?: string;
  rating?: number;
  date?: string;
  content?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getUserFavorites(): Observable<ListItem[]> {
    return of([
      { id: 1, title: 'Incepcja', release_date: '2010-07-16', posterUrl: 'https://image.tmdb.org/t/p/w500/9fa0zIIPqKqS5YE9xweWW0xXtR3.jpg', rating: 5},
      { id: 2, title: 'Matrix', release_date: '1999-03-31' }
    ]);
  }

  getUserWatchlist(): Observable<ListItem[]> {
    return of([
      { id: 3, title: 'Interstellar', release_date: '2014-11-07' },
      { id: 4, title: 'Blade Runner 2049', release_date: '2017-10-06' }
    ]);
  }

  getUserRatings(): Observable<ListItem[]> {
    return of([
      { id: 5, title: 'The Dark Knight', rating: 3, release_date: '2008-07-18' },
      { id: 6, title: 'Fight Club', rating: 3.5, release_date: '1999-10-15' }
    ]);
  }

  removeItemFromSection(sectionName: string, itemId: number): Observable<void> {
    console.log(`Usuwanie elementu ${itemId} z sekcji ${sectionName}`);
    return of(void 0);
  }
}
