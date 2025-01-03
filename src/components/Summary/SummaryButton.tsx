import { Loader } from 'lucide-react';

interface SummaryButtonProps {
  onGenerate: () => Promise<void>;
  loading: boolean;
  disabled?: boolean;
}

export function SummaryButton({ onGenerate, loading, disabled }: SummaryButtonProps) {
  return (
    <button
      onClick={onGenerate}
      disabled={loading || disabled}
      className="inline-flex items-center px-3 py-1 text-s font-medium text-gray-800 
                 bg-[#FFF4DF] border border-gray-300 rounded-full shadow-sm 
                 hover:bg-orange-600 hover:text-gray-900 disabled:opacity-50 gap-2"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Summary'
      )}
    </button>
  );
}
