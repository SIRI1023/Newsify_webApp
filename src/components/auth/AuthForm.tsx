import { useState } from 'react';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await signIn(email, password);
    } else {
      await signUp(email, password, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
      >
        {loading ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : mode === 'login' ? (
          'Sign In'
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
