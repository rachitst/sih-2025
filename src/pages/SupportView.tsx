import { motion } from 'framer-motion';
import { Users, MessageCircle, UserRound } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Counselor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Anya Sharma',
    specialty: 'Anxiety & Depression',
    experience: '10+ years',
    avatar: '/counselor1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Rajiv Mehta',
    specialty: 'Career Guidance',
    experience: '8 years',
    avatar: '/counselor2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    specialty: 'Relationship Counseling',
    experience: '12 years',
    avatar: '/counselor3.jpg',
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Academic Stress',
    experience: '7 years',
    avatar: '/counselor4.jpg',
  },
];

const supportCategories = [
  { id: 'anxiety', label: 'Anxiety Support' },
  { id: 'career', label: 'Career Advice' },
  { id: 'academic', label: 'Academic Help' },
  { id: 'relationships', label: 'Relationship Guidance' },
];

const SupportView = () => {
  const [showCounselors, setShowCounselors] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCounselors(true);
  };

  const handleConnectDiscord = () => {
    toast.success('Redirecting to Discord community...');
  };

  const handleConnectCounselor = (counselor: Counselor) => {
    toast.success(`Request sent to ${counselor.name}`);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Your Support Network
        </h1>
        <p className="text-neutral-medium">
          Connect with peers and professionals for support and guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Peer Support Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="h-40 bg-indigo-600 flex items-center justify-center">
            <MessageCircle className="h-20 w-20 text-white opacity-20" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-neutral-dark mb-2">Peer Support Community</h2>
            <p className="text-neutral-medium mb-6">
              Join our Discord community to connect with fellow students who understand what you're going through. Share experiences, get advice, and build friendships in a safe, moderated space.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConnectDiscord}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Connect on Discord
            </motion.button>
          </div>
        </motion.div>

        {/* Top Mates Counselor Matching */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="h-40 bg-primary flex items-center justify-center">
            <UserRound className="h-20 w-20 text-white opacity-20" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-neutral-dark mb-2">Top Mates Counselor Matching</h2>
            <p className="text-neutral-medium mb-6">
              Get matched with a professional counselor based on your specific needs. Our Top Mates program connects you with the right expert for personalized support.
            </p>
            
            {!showCounselors ? (
              <div className="grid grid-cols-2 gap-3">
                {supportCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(category.id)}
                    className="py-3 px-4 rounded-lg bg-neutral-light text-neutral-dark font-medium hover:bg-neutral-200"
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-neutral-dark">
                    Recommended Counselors
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCounselors(false)}
                    className="text-sm text-primary font-medium"
                  >
                    Back to Categories
                  </motion.button>
                </div>
                
                {counselors.map((counselor) => (
                  <motion.div 
                    key={counselor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:border-primary/30"
                  >
                    <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden flex-shrink-0">
                      <img 
                        src={counselor.avatar} 
                        alt={counselor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/48?text=${counselor.name.charAt(0)}`;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-dark">{counselor.name}</h4>
                      <p className="text-sm text-neutral-medium">{counselor.specialty} • {counselor.experience}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConnectCounselor(counselor)}
                      className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20"
                    >
                      Connect
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportView;