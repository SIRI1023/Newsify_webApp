import { useState, useEffect } from 'react';
import { 
  Newspaper, 
  BookOpen, 
  Bell, 
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { AuthButtons } from '../auth/AuthButtons';
import { SearchBar } from './SearchBar';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300
        ${isScrolled ? 'shadow-md' : 'shadow-sm'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <Newspaper className="w-8 h-8 text-blue-600" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Newsify
              </h1>
              <span className="text-xs text-gray-500 -mt-1">Stay Informed</span>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <BookOpen className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}