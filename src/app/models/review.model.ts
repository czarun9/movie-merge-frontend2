export interface Review {
  id: string | null;
  author: string;
  content: string;
  url: string;
  platform: string;
}

export interface ReviewPageResponse {
  totalPages: number;
  totalResults: number;
  page: number;
  reviews: Review[];
}

