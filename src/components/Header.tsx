import { Newspaper } from 'lucide-react';
import { AuthButtons } from './auth/AuthButtons';

export function Header() {
  return (
    <header className="bg-gray-100 border-b-4 border-orange-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-black" />
            <h1 className="text-3xl font-bold text-gray-800">Newsify</h1>
          </div>

          {/* Authentication Buttons */}
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
