import { Send } from 'lucide-react';
import { useState } from 'react';

interface Message {
  content: string;
  isUser: boolean;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { content: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiKey = "AIzaSyDCcSs9sHJyk4GXvyQWQOLO3woa5Co5PZU";
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in the environment variables.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const prompt = `
        You are Vritti, an AI therapist and counselor focused on student mental health and well-being.
        Your role is to provide empathetic, supportive responses while helping students manage their
        mental health, academic stress, and personal development.
        
        User message: ${inputMessage}
      `;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      setMessages(prev => [...prev, { content: aiResponse, isUser: false }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, { 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-[500px]">
      <h3 className="text-lg font-bold text-neutral-dark mb-4">AI Companion</h3>
      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`${
              message.isUser 
                ? 'bg-primary text-white' 
                : 'bg-neutral-light text-neutral-dark'
              } p-3 rounded-lg max-w-xs`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-light text-neutral-dark p-3 rounded-lg">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message Vritti..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          className="ml-2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AIChat;