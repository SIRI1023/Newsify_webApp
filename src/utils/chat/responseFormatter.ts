export function formatResponse(response: string): string {
  // Extract the actual response after the "Answer:" prompt
  const answerMatch = response.match(/Answer:(.*?)(?=$|Question:|Article:)/si);
  const extractedResponse = answerMatch ? answerMatch[1] : response;

  return extractedResponse
    .replace(/^["'\s]+|["'\s]+$/g, '') // Remove quotes and extra spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\.\s*([A-Z])/g, '. $1') // Fix sentence spacing
    .trim();
}