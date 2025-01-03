import { HfInference } from '@huggingface/inference';

let hfClient: HfInference | null = null;

export function getHuggingFaceClient(): HfInference {
  if (!hfClient) {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Missing Hugging Face API key');
    }
    
    hfClient = new HfInference(apiKey);
  }
  
  return hfClient;
}

export async function generateText(prompt: string, params = {}): Promise<string> {
  const hf = getHuggingFaceClient();

  try {
    const response = await hf.textGeneration({
      model: 'EleutherAI/gpt-neo-1.3B',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 40,
        do_sample: true,
        ...params
      }
    });

    return response.generated_text;
  } catch (error) {
    console.error('Text generation failed:', error);
    throw error;
  }
}