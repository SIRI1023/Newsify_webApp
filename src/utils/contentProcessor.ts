// Constants for content processing
const MAX_TOKENS = 1024;
const AVERAGE_CHARS_PER_TOKEN = 4;
const MAX_CHUNK_LENGTH = MAX_TOKENS * AVERAGE_CHARS_PER_TOKEN;

/**
 * Clean HTML content by removing tags and unnecessary whitespace
 */
export function cleanHtmlContent(content: string): string {
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\[.*?\]/g, '') // Remove content in square brackets (often ads/metadata)
    .replace(/https?:\/\/\S+/g, '') // Remove URLs
    .trim();
}

/**
 * Split content into chunks that fit within token limits
 */
export function chunkContent(content: string): string[] {
  const cleanContent = cleanHtmlContent(content);
  
  if (cleanContent.length <= MAX_CHUNK_LENGTH) {
    return [cleanContent];
  }

  const chunks: string[] = [];
  let currentChunk = '';
  const sentences = cleanContent.match(/[^.!?]+[.!?]+/g) || [];

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= MAX_CHUNK_LENGTH) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}