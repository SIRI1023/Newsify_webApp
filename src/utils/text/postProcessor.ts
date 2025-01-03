function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;]|\s+/g, ' ')
    .trim();
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(normalizeText(str1).split(' '));
  const words2 = new Set(normalizeText(str2).split(' '));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  return intersection.size / union.size;
}

function removeDuplicateSentences(sentences: string[]): string[] {
  const result: string[] = [];
  const SIMILARITY_THRESHOLD = 0.7;

  for (const sentence of sentences) {
    const isDuplicate = result.some(
      existing => calculateSimilarity(existing, sentence) > SIMILARITY_THRESHOLD
    );
    if (!isDuplicate) {
      result.push(sentence);
    }
  }

  return result;
}

function improveReadability(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.,!?])(?!["\'])\s*/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function postProcessSummary(summary: string): string {
  if (!summary) return '';
  
  const sentences = summary
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 10);
    
  const uniqueSentences = removeDuplicateSentences(sentences);
  const processedText = uniqueSentences.join(' ');
  
  return improveReadability(processedText);
}