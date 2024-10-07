export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  imageUrl: string;
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.6,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Seven Samurai',
    genre: 'Action',
    year: 1956,
    rating: 98,
    imageUrl: 'https://www.metacritic.com/a/img/resize/fe58469ff7c416550dbbb4ec46aa9454da7ec734/catalog/provider/5/2/5-tt0047478.jpg?auto=webp&fit=cover&height=300&width=200',
  }
]
