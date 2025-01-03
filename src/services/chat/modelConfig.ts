export const GPT_NEO_CONFIG = {
  model: 'EleutherAI/gpt-neo-1.3B',
  defaultParams: {
    max_length: 150,
    min_length: 30,
    temperature: 0.7,
    top_p: 0.9,
    top_k: 40,
    do_sample: true,
    num_return_sequences: 1
  },
  retryParams: {
    max_length: 150,
    temperature: 0.8,
    top_p: 0.95,
    do_sample: true
  }
};