import { getHuggingFaceClient } from '../huggingface/client';
import { cleanText } from './cleaner';
import { createChunks } from './chunker';
import { retryWithBackoff } from '../retry';

const SUMMARIZATION_PARAMS = {
  chunk: {
    max_length: 150,
    min_length: 40,
    length_penalty: 2.0,
    num_beams: 4,
    temperature: 0.3,
    early_stopping: true,
    no_repeat_ngram_size: 3,
    do_sample: true,
    top_k: 50,
    top_p: 0.95
  },
  final: {
    max_length: 250,
    min_length: 100,
    length_penalty: 2.0,
    num_beams: 6,
    temperature: 0.3,
    early_stopping: true,
    no_repeat_ngram_size: 3,
    do_sample: true,
    top_k: 50,
    top_p: 0.95
  }
};

async function summarizeChunk(text: string): Promise<string> {
  const hf = getHuggingFaceClient();
  const result = await hf.summarization({
    model: 'google/pegasus-xsum',
    inputs: text.trim(),
    parameters: SUMMARIZATION_PARAMS.chunk
  });
  return result.summary_text;
}

async function generateFinalSummary(text: string): Promise<string> {
  const hf = getHuggingFaceClient();
  const result = await hf.summarization({
    model: 'google/pegasus-xsum',
    inputs: text.trim(),
    parameters: SUMMARIZATION_PARAMS.final
  });
  return result.summary_text;
}

export async function generateHierarchicalSummary(content: string): Promise<string> {
  // Clean and prepare content
  const cleanContent = cleanText(content);
  if (!cleanContent) {
    throw new Error('No valid content to summarize after cleaning');
  }

  // Split into chunks
  const chunks = createChunks(cleanContent);
  
  try {
    // For very short content, summarize directly
    if (chunks.length === 1) {
      return await retryWithBackoff(
        () => generateFinalSummary(chunks[0]),
        3
      );
    }

    // First level: Summarize each chunk
    const chunkSummaries = await Promise.all(
      chunks.map(chunk =>
        retryWithBackoff(
          () => summarizeChunk(chunk),
          3
        )
      )
    );

    // Filter out empty or invalid summaries
    const validSummaries = chunkSummaries
      .filter(summary => summary && summary.trim().length > 0)
      .map(summary => summary.trim());

    if (validSummaries.length === 0) {
      throw new Error('Failed to generate valid summaries from content chunks');
    }

    // For multiple chunks, combine summaries and generate final summary
    const combinedSummaries = validSummaries.join(' ');
    return await retryWithBackoff(
      () => generateFinalSummary(combinedSummaries),
      3
    );
  } catch (error) {
    console.error('Error in hierarchical summarization:', error);
    throw error;
  }
}