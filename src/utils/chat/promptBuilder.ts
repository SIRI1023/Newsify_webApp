interface PromptContext {
  articleTitle: string;
  articleContent: string;
  query: string;
}

export function buildPrompt({ articleTitle, articleContent, query }: PromptContext): string {
  return `
Below is a news article. Please provide a clear and accurate response to the user's question based on the article content.

Article Title: ${articleTitle}
Article Content: ${articleContent}

Question: ${query}

Answer:`;
}