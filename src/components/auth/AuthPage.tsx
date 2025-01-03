import { useState } from 'react';
import { AuthForm } from './AuthForm';
import { Newspaper } from 'lucide-react';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Newspaper className="h-12 w-12 text-orange-500 mx-auto" />
        <h1 className="mt-6 text-4xl font-bold text-orange-500">
          {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {mode === 'login'
            ? 'Sign in to access your personalized newsfeed.'
            : 'Join us and stay updated with the latest news.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <AuthForm mode={mode} />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="mt-2 text-orange-500 hover:text-orange-600 font-medium"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
