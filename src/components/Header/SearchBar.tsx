import { Search, Command } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Search news..."
        className="w-full pl-10 pr-12 py-2.5 rounded-full border border-gray-200 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                 group-hover:border-gray-300 transition-all"
      />
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                        group-hover:text-gray-500 transition-colors" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 
                    px-1.5 py-1 rounded border border-gray-200 bg-gray-50 text-xs text-gray-400">
        <Command className="w-3 h-3" />
        K
      </div>
    </div>
  );
}