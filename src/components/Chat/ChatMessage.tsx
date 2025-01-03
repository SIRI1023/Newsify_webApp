import { User, Bot } from 'lucide-react';
import type { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-600" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className={`flex-1 max-w-[80%] p-3 rounded-lg ${
        isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        {message.content}
      </div>
    </div>
  );
}