import { cleanText } from '../../utils/text/cleaner';
import { extractNamedEntities } from './ner';
import type { NewsDataArticle } from '../../types/newsData';

const KEYWORD_CACHE = new Map<string, string[]>();

interface TermScore {
  term: string;
  score: number;
  isEntity?: boolean;
}

// Calculate term frequency with entity boost
function calculateTF(text: string, entities: string[]): Map<string, number> {
  const terms = text.toLowerCase().split(/\W+/).filter(Boolean);
  const tf = new Map<string, number>();
  const entitySet = new Set(entities.map(e => e.toLowerCase()));
  
  terms.forEach(term => {
    if (term.length <= 2 || stopWords.has(term)) return;
    // Boost score for named entities
    const score = entitySet.has(term) ? 2 : 1;
    tf.set(term, (tf.get(term) || 0) + score);
  });
  
  return tf;
}

// Calculate inverse document frequency
function calculateIDF(documents: string[]): Map<string, number> {
  const idf = new Map<string, number>();
  const N = documents.length;
  
  documents.forEach(doc => {
    const terms = new Set(
      doc.toLowerCase()
        .split(/\W+/)
        .filter(term => term.length > 2 && !stopWords.has(term))
    );
    
    terms.forEach(term => {
      idf.set(term, (idf.get(term) || 0) + 1);
    });
  });
  
  idf.forEach((count, term) => {
    idf.set(term, Math.log(N / count));
  });
  
  return idf;
}

// Extract keywords using hybrid approach (TF-IDF + NER)
export async function extractKeywords(text: string, context: string[] = []): Promise<string[]> {
  const cleanedText = cleanText(text);
  const cacheKey = cleanedText.slice(0, 100);
  
  const cached = KEYWORD_CACHE.get(cacheKey);
  if (cached) return cached;

  try {
    // Extract named entities
    const entities = extractNamedEntities(cleanedText);
    const entityTerms = entities.map(e => e.text);
    
    // Calculate TF-IDF scores with entity boost
    const tf = calculateTF(cleanedText, entityTerms);
    const idf = calculateIDF([cleanedText, ...context]);
    
    // Score terms
    const scores: TermScore[] = [
      // Add named entities with high base score
      ...entityTerms.map(term => ({
        term,
        score: 10, // High base score for entities
        isEntity: true
      })),
      // Add TF-IDF scores
      ...Array.from(tf.entries()).map(([term, freq]) => ({
        term,
        score: freq * (idf.get(term) || 0),
        isEntity: false
      }))
    ];

    // Combine and sort scores
    const keywords = scores
      .sort((a, b) => b.score - a.score)
      .filter((item, index, self) => 
        index === self.findIndex(t => t.term.toLowerCase() === item.term.toLowerCase())
      )
      .slice(0, 5)
      .map(({ term }) => term);

    KEYWORD_CACHE.set(cacheKey, keywords);
    return keywords;
  } catch (error) {
    console.error('Keyword extraction failed:', error);
    return [];
  }
}

// Common English stop words (unchanged)
const stopWords = new Set([/* ... existing stop words ... */]);

export async function extractArticleKeywords(article: NewsDataArticle): Promise<string[]> {
  const text = [
    article.title,
    article.description || '',
    article.content?.slice(0, 200) || ''
  ].join(' ').trim();

  return extractKeywords(text);
}