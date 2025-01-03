// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      reading_history: {
        Row: {
          id: string;
          user_id: string;
          article_title: string;
          article_category: string;
          article_url: string;
          read_at: string;
          time_spent: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          article_title: string;
          article_category: string;
          article_url: string;
          read_at?: string;
          time_spent?: number;
        };
      };
      recommendations: {
        Row: {
          id: string;
          user_id: string;
          article_title: string;
          article_category: string;
          article_url: string;
          score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          article_title: string;
          article_category: string;
          article_url: string;
          score: number;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          preferences: Record<string, unknown>;
          created_at: string;
        };
      };
    };
  };
}
