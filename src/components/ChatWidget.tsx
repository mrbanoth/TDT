import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Chat widget colors
  const colors = {
    primary: 'bg-orange-500',
    hover: 'hover:bg-orange-600',
    ring: 'focus:ring-orange-400',
    shadow: 'shadow-orange-500/30',
    dark: 'bg-orange-600'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Message sending logic here
      setMessage('');
      setTimeout(() => setIsOpen(false), 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden border border-gray-200 mb-3">
          {/* Header */}
          <div className={`${colors.primary} text-white p-3 flex justify-between items-center`}>
            <h3 className="font-medium">Need Help?</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="p-4 bg-gray-50 h-48 overflow-y-auto">
            <div className="text-center text-sm text-gray-500 py-6">
              <p>Hello! How can we help you today?</p>
              <p>We'll respond as soon as possible.</p>
            </div>
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 ${colors.ring} focus:border-transparent`}
              />
              <button
                type="submit"
                className={`${colors.primary} text-white rounded-full p-2 ${colors.hover} transition-colors`}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${colors.primary} ${colors.hover} text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center`}
        style={{
          width: '60px',
          height: '60px',
          boxShadow: `0 4px 12px ${colors.shadow}`
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        title="Chat with us"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default ChatWidget;
