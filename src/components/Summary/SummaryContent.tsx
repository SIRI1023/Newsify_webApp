interface SummaryContentProps {
  summary: string;
}

export function SummaryContent({ summary }: SummaryContentProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Summary</h4>
      <p className="text-sm text-gray-600">{summary}</p>
    </div>
  );
}