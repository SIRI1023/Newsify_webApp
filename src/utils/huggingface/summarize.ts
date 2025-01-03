import { validateContent } from '../validation';
import { generateHierarchicalSummary } from '../text/hierarchicalSummarizer';
import { postProcessSummary } from '../text/postProcessor';

export async function generateSummary(content: string): Promise<string> {
  const validation = validateContent(content);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid content');
  }

  try {
    const rawSummary = await generateHierarchicalSummary(content);
    return postProcessSummary(rawSummary);
  } catch (error: any) {
    console.error('Summarization failed:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
}