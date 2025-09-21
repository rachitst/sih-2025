import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radius, MessageSquareWarning, Music, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const ToolsView = () => {
  const [complaintText, setComplaintText] = useState('');
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerReason, setVolunteerReason] = useState('');

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) {
      toast.error('Please enter your complaint');
      return;
    }
    toast.success('Complaint submitted anonymously');
    setComplaintText('');
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail || !volunteerReason) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Volunteer application submitted');
    setVolunteerName('');
    setVolunteerEmail('');
    setVolunteerReason('');
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <Radius className="h-6 w-6 text-primary" />
          Wellness Tools
        </h1>
        <p className="text-neutral-medium">
          Additional resources and tools to support your mental wellbeing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Anonymous Complaint Box */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-1"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareWarning className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold text-neutral-dark">Anonymous Complaint Box</h2>
            </div>
            <p className="text-sm text-neutral-medium mb-4">
              Submit concerns or complaints anonymously. Your identity will be protected.
            </p>
            <form onSubmit={handleComplaintSubmit}>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-4 min-h-[120px]"
                placeholder="Describe your concern or complaint..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 rounded-lg bg-amber-500 text-white font-medium"
              >
                Submit Anonymously
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Spotify Integration */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-1"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-bold text-neutral-dark">Your Mood-Based Playlist</h2>
            </div>
            <p className="text-sm text-neutral-medium mb-4">
              Music curated based on your mood and preferences to help you relax and focus.
            </p>
            <div className="bg-neutral-light rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-dark">Calm & Focus</h3>
                  <p className="text-xs text-neutral-medium">30 songs • 1hr 45min</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-medium">1. Weightless - Marconi Union</span>
                  <span className="text-neutral-medium">5:14</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-medium">2. Electra - Airstream</span>
                  <span className="text-neutral-medium">6:02</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-medium">3. Watermark - Enya</span>
                  <span className="text-neutral-medium">4:38</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 rounded-lg bg-green-500 text-white font-medium flex items-center justify-center gap-2"
              onClick={() => toast.success('Opening Spotify playlist...')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </motion.button>
          </div>
        </motion.div>

        {/* Volunteer Registration */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-1"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-bold text-neutral-dark">Volunteer Registration</h2>
            </div>
            <p className="text-sm text-neutral-medium mb-4">
              Join our peer support network as a volunteer to help fellow students.
            </p>
            <form onSubmit={handleVolunteerSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Your full name"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Your email address"
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-medium mb-1">Why do you want to volunteer?</label>
                <textarea
                  className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[80px]"
                  placeholder="Tell us why you're interested"
                  value={volunteerReason}
                  onChange={(e) => setVolunteerReason(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium"
              >
                Submit Application
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsView;