import { AlertCircle } from 'lucide-react';

export function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 text-gray-600">
      <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p>We couldn't load the news. Please try again later.</p>
    </div>
  );
}