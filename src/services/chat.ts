import { generateText } from '../utils/huggingface/client';
import { buildPrompt } from '../utils/chat/promptBuilder';
import { formatResponse } from '../utils/chat/responseFormatter';
import { GPT_NEO_CONFIG } from './chat/modelConfig';

export async function generateResponse(
  query: string,
  context: { articleTitle: string; articleContent: string }
): Promise<string> {
  try {
    const prompt = buildPrompt({ ...context, query });
    
    const response = await generateText(prompt, GPT_NEO_CONFIG.defaultParams);
    const cleanedResponse = formatResponse(response);

    if (cleanedResponse.length < 30) {
      // Retry with different parameters if response is too short
      const retryResponse = await generateText(prompt, GPT_NEO_CONFIG.retryParams);
      return formatResponse(retryResponse);
    }

    return cleanedResponse;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}