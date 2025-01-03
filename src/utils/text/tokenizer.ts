// Utility functions for text tokenization
const AVERAGE_CHARS_PER_TOKEN = 4;

export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / AVERAGE_CHARS_PER_TOKEN);
}

export function splitIntoSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g) || [];
}