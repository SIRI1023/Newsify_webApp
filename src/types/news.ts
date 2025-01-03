export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  category?: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}