const CLEANUP_PATTERNS = [
  { pattern: /<[^>]*>/g, replacement: ' ' },           // Remove HTML tags
  { pattern: /\[.*?\]/g, replacement: ' ' },           // Remove content in brackets
  { pattern: /\(.*?\)/g, replacement: ' ' },           // Remove content in parentheses
  { pattern: /https?:\/\/\S+/g, replacement: ' ' },    // Remove URLs
  { pattern: /\s+/g, replacement: ' ' },               // Normalize whitespace
  { pattern: /[^\w\s.,!?;:'"()-]/g, replacement: ' ' } // Remove special characters
];

export function cleanText(text: string): string {
  if (!text?.trim()) return '';

  let cleaned = text;
  
  // Apply all cleanup patterns
  CLEANUP_PATTERNS.forEach(({ pattern, replacement }) => {
    cleaned = cleaned.replace(pattern, replacement);
  });

  // Additional cleaning steps
  cleaned = cleaned
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join(' ')
    .trim();

  // Remove redundant spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}