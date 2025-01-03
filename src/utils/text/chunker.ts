import { estimateTokenCount, splitIntoSentences } from './tokenizer';

const MAX_TOKENS_PER_CHUNK = 500; // Reduced for better processing
const MIN_CHUNK_TOKENS = 100;     // Minimum tokens per chunk

export function createChunks(text: string): string[] {
  const sentences = splitIntoSentences(text);
  if (sentences.length === 0) return [text];

  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentTokenCount = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokenCount(sentence);
    
    // Handle long sentences
    if (sentenceTokens > MAX_TOKENS_PER_CHUNK) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [];
        currentTokenCount = 0;
      }
      // Split long sentence into smaller parts
      const parts = sentence.match(/.{1,1000}/g) || [];
      chunks.push(...parts);
      continue;
    }

    // Check if adding this sentence would exceed the limit
    if (currentTokenCount + sentenceTokens > MAX_TOKENS_PER_CHUNK) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [];
        currentTokenCount = 0;
      }
    }
    
    currentChunk.push(sentence);
    currentTokenCount += sentenceTokens;
  }

  // Add remaining chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  // Merge small chunks
  return mergeSmallChunks(chunks);
}

function mergeSmallChunks(chunks: string[]): string[] {
  if (chunks.length <= 1) return chunks;

  const merged: string[] = [];
  let current = '';

  for (const chunk of chunks) {
    const combinedTokens = estimateTokenCount(current + ' ' + chunk);
    
    if (combinedTokens <= MAX_TOKENS_PER_CHUNK) {
      current = current ? `${current} ${chunk}` : chunk;
    } else {
      if (current) merged.push(current);
      current = chunk;
    }
  }

  if (current) merged.push(current);
  return merged;
}