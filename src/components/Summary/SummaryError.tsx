import { AlertCircle } from 'lucide-react';

interface SummaryErrorProps {
  message: string;
}

export function SummaryError({ message }: SummaryErrorProps) {
  return (
    <div className="mt-2 p-4 bg-red-50 rounded-md">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
        <p className="text-sm text-red-600">{message}</p>
      </div>
    </div>
  );
}