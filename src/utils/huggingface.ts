import { HfInference } from '@huggingface/inference';
import { chunkContent } from './contentProcessor';

const hf = new HfInference(import.meta.env.HUGGINGFACE_API_KEY);

export async function generateSummary(content: string): Promise<string> {
  if (!content?.trim()) {
    throw new Error('Content cannot be empty.');
  }

  try {
    const chunks = chunkContent(content);
    const summaries = await Promise.all(
      chunks.map(async (chunk) => {
        const result = await hf.summarization({
          inputs: chunk,
          model: 'facebook/bart-large-cnn',
          parameters: {
            max_length: 130,
            min_length: 30,
          },
        });
        return result.summary_text;
      })
    );

    // Combine summaries if there were multiple chunks
    return summaries.join(' ');
  } catch (error) {
    console.error('Error generating summary with Hugging Face:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
}