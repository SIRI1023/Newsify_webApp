export interface NewsDataSource {
  id: string;
  name: string;
  url: string;
  category: string[];
  language: string[];
}

export interface NewsDataArticle {
  title: string;
  description: string;
  content: string;
  pubDate: string;
  link: string;
  image_url: string | null;
  source_id: string;
  source_name?: string;
  category: string[];
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}