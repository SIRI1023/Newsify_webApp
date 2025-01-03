/**
 * Validates the Hugging Face API key
 */
export function validateApiKey(apiKey: string | undefined): boolean {
  return typeof apiKey === 'string' && apiKey.startsWith('hf_');
}

/**
 * Validates content for summarization
 */
export function validateContent(content: string): { isValid: boolean; error?: string } {
  if (!content?.trim()) {
    return { isValid: false, error: 'Content cannot be empty' };
  }

  if (content.trim().length < 10) {
    return { isValid: false, error: 'Content is too short to summarize' };
  }

  return { isValid: true };
}