import { useState } from 'react';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';

export function AuthButtons() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user } = useAuthContext();
  const { signOut } = useAuth();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowModal(true);
  };

  if (user) {
    return (
      <div className="relative flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#FFF4DF] p-2 rounded-lg shadow-md">
          <User className="w-5 h-5 text-gray-800" />
          <span className="text-sm text-gray-800 font-medium hidden lg:block">
            {user.email}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-sm text-red-600 hover:text-red-800 bg-[#FFF4DF] p-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleAuthClick('login')}
          className="text-blue-600 hover:text-blue-800 bg-[#FFF4DF] p-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
        <button
          onClick={() => handleAuthClick('signup')}
          className="text-green-600 hover:text-green-800 bg-[#FFF4DF] p-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Sign Up</span>
        </button>
      </div>
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={authMode}
      />
    </>
  );
}
