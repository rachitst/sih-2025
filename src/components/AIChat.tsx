import { Send } from 'lucide-react';

const AIChat = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-neutral-dark mb-4">AI Companion</h3>
      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {/* Student Message */}
        <div className="flex justify-end">
          <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
            I'm so stressed about my exams, I can't focus.
          </div>
        </div>
        {/* AI Message */}
        <div className="flex justify-start">
          <div className="bg-neutral-light text-neutral-dark p-3 rounded-lg max-w-xs">
            It sounds like exam pressure is making it difficult to concentrate. Can you tell me more about what 'can't focus' feels like for you right now?
          </div>
        </div>
        {/* Student Message */}
        <div className="flex justify-end">
          <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
            It's like my brain is buzzing and I keep rereading the same page.
          </div>
        </div>
         {/* AI Message */}
        <div className="flex justify-start">
          <div className="bg-neutral-light text-neutral-dark p-3 rounded-lg max-w-xs">
            That buzzing feeling can be overwhelming. Let's try a quick 2-minute grounding exercise to help clear your thoughts. Are you open to that?
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Message Aura AI..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button className="ml-2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AIChat;