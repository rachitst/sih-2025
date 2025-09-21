import { useState } from 'react';
import AIChat from '../components/AIChat';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Volume2 } from 'lucide-react';

const chatModes = [
  { id: 'general', label: 'General' },
  { id: 'career', label: 'Career' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'academic', label: 'Academic' },
  { id: 'wellness', label: 'Wellness' },
];

const suggestedPrompts = [
  "I'm feeling overwhelmed with my coursework",
  "How can I manage my anxiety before exams?",
  "I'm having trouble sleeping lately",
  "I'm feeling lonely on campus",
];

const ChatbotView = () => {
  const [activeMode, setActiveMode] = useState('general');

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Vritti AI Assistant
        </h1>
        <p className="text-neutral-medium">
          Your personal AI companion for mental wellness and support.
        </p>
      </div>

      {/* Chat Mode Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {chatModes.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveMode(mode.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeMode === mode.id
                ? 'bg-primary text-white'
                : 'bg-neutral-light text-neutral-medium hover:bg-neutral-200'
            }`}
          >
            {mode.label}
          </motion.button>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <AIChat />
        </div>

        {/* Suggested Prompts */}
        <div className="p-4 border-t border-gray-100 bg-neutral-light/50">
          <p className="text-sm font-medium text-neutral-medium mb-2">Suggested prompts:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white px-3 py-2 rounded-lg text-sm border border-gray-200 text-neutral-dark hover:border-primary/30"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Voice Controls */}
        <div className="p-4 flex justify-end space-x-2 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-neutral-light text-neutral-medium hover:bg-neutral-200"
          >
            <Volume2 className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-neutral-light text-neutral-medium hover:bg-neutral-200"
          >
            <Mic className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotView;