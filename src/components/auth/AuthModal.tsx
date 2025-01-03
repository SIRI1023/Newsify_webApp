import { AuthForm } from './AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
        <div className="mt-2 text-center">
          <h2 className="mt-4 text-4xl font-bold text-orange-500">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
        </div>
        <AuthForm mode={mode} />
      </div>
    </div>
  );
}
