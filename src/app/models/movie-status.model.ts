export interface MovieStatus {
  watched: boolean;
  inWatchlist: boolean;
  favourite: boolean;
  ratings: Rating[];
  latestRating: number | null;
}

export interface Rating {
  value: number;
  ratedAt: Date;
}
