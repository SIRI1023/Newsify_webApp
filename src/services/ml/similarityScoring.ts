import type { NewsDataArticle } from '../../types/newsData';

// TF-IDF implementation for content similarity
function calculateTFIDF(documents: string[]): Map<string, number[]> {
  const tokenize = (text: string) => text.toLowerCase().split(/\W+/).filter(Boolean);
  const terms = new Set(documents.flatMap(tokenize));
  const tfidf = new Map<string, number[]>();

  // Calculate term frequency for each document
  documents.forEach((doc, docIndex) => {
    const tokens = tokenize(doc);
    const termFreq = new Map<string, number>();
    
    tokens.forEach(term => {
      termFreq.set(term, (termFreq.get(term) || 0) + 1);
    });

    // Calculate TF-IDF for each term
    terms.forEach(term => {
      const tf = (termFreq.get(term) || 0) / tokens.length;
      const docsWithTerm = documents.filter(d => tokenize(d).includes(term)).length;
      const idf = Math.log(documents.length / (docsWithTerm || 1));
      const scores = tfidf.get(term) || new Array(documents.length).fill(0);
      scores[docIndex] = tf * idf;
      tfidf.set(term, scores);
    });
  });

  return tfidf;
}

// Cosine similarity between two vectors
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (mag1 * mag2) || 0;
}

export function calculateContentSimilarity(articles: NewsDataArticle[]): number[][] {
  // Combine title and description for content analysis
  const documents = articles.map(article => 
    `${article.title} ${article.description || ''} ${article.content || ''}`
  );

  const tfidf = calculateTFIDF(documents);
  const documentVectors: number[][] = new Array(documents.length)
    .fill(0)
    .map(() => new Array(tfidf.size).fill(0));

  // Build document vectors from TF-IDF scores
  Array.from(tfidf.values()).forEach((scores, termIndex) => {
    scores.forEach((score, docIndex) => {
      documentVectors[docIndex][termIndex] = score;
    });
  });

  // Calculate similarity matrix
  const similarityMatrix = documentVectors.map(vec1 =>
    documentVectors.map(vec2 => cosineSimilarity(vec1, vec2))
  );

  return similarityMatrix;
}