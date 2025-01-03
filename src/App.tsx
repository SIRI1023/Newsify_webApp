import { BrowserRouter as Router } from 'react-router-dom';
import { NewsCard } from './components/NewsCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { RecommendationBar } from './components/RecommendationBar';
import { SentimentFilter } from './components/SentimentFilter';
import { TrendingTopics } from './components/TrendingTopics';
import { useNewsData } from './hooks/useNewsData';
import { useSentimentFilter } from './hooks/useSentimentFilter';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

export default function App() {
  const { articles, loading, error, activeCategory, setActiveCategory } = useNewsData();
  const { selectedSentiment, setSelectedSentiment, filterBySentiment } = useSentimentFilter();

  const filteredArticles = articles.filter(article => filterBySentiment(article.sentiment));

  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <CategoryTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <RecommendationBar />
            
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                <TrendingTopics articles={filteredArticles} />
                
                <div className="flex justify-between items-center">
                  <SentimentFilter
                    selected={selectedSentiment}
                    onChange={setSelectedSentiment}
                  />
                </div>
                
                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <ErrorMessage />
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 text-lg">
                      No articles found with the selected filters
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, index) => (
                      <NewsCard key={`${article.link}-${index}`} article={article} />
                    ))}
                  </div>
                )}
              </div>
            </main>

            <footer className="mt-auto bg-white border-t">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-600">
                  © {new Date().getFullYear()} Newsify. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}