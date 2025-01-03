import { createContext, useContext, useState } from 'react';
import { generateResponse } from '../services/chat';
import type { Message } from '../types/chat';

interface ChatContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string, context: { articleTitle: string; articleContent: string }) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  loading: false,
  sendMessage: async () => {},
  clearMessages: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string, context: { articleTitle: string; articleContent: string }) => {
    try {
      setLoading(true);
      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      const response = await generateResponse(content, context);
      const aiMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);