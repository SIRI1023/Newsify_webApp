import { summarizeArticle } from '../server/api/summarize';

export async function handleSummarizeRequest(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const { content } = await req.json();
    
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const summary = await summarizeArticle(content);
    
    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    });
  } catch (error) {
    console.error('Error in summarize endpoint:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}