import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, AlertCircle, Wind, FileText, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardView = () => {
  const [userName, setUserName] = useState<string>('');
  const [phq9Score, setPHQ9Score] = useState<number | null>(null);
  const [phq9Severity, setPHQ9Severity] = useState<string>('');

  useEffect(() => {
    // Load user name from localStorage
    const savedName = localStorage.getItem('vritti_userName');
    if (savedName) {
      setUserName(savedName);
    }

    // Load PHQ-9 results if available
    const savedScore = localStorage.getItem('vritti_phq9_score');
    const savedSeverity = localStorage.getItem('vritti_phq9_severity');
    if (savedScore) setPHQ9Score(parseInt(savedScore));
    if (savedSeverity) setPHQ9Severity(savedSeverity);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleViewDetails = () => {
    toast.success('Viewing assessment details...');
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark">
          {getGreeting()}, {userName || 'there'}!
        </h1>
        <p className="text-neutral-medium">
          Welcome to your personalized wellness dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assessment Summary Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-2 lg:col-span-1"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Your Mental Health Check-in
            </h2>
            
            {phq9Score !== null && phq9Severity ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-medium">PHQ-9 Score</p>
                    <p className="text-2xl font-bold text-neutral-dark">{phq9Score}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    phq9Score <= 4 ? 'bg-green-100 text-green-800' :
                    phq9Score <= 9 ? 'bg-blue-100 text-blue-800' :
                    phq9Score <= 14 ? 'bg-yellow-100 text-yellow-800' :
                    phq9Score <= 19 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {phq9Severity}
                  </div>
                </div>
                
                <p className="text-neutral-medium text-sm">
                  Your recent check-in shows signs of {phq9Severity.toLowerCase()} symptoms.
                  We've personalized resources to help support your journey.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewDetails}
                  className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20"
                >
                  View Details
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-neutral-medium">No assessment data available.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Session Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Session
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden">
                  <img 
                    src="/counselor.jpg" 
                    alt="Dr. Anya Sharma"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/48?text=Dr.+A';
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-neutral-dark">Dr. Anya Sharma</p>
                  <p className="text-sm text-neutral-medium">Today at 2:00 PM</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success('Joining session...')}
                className="w-full py-2 rounded-lg bg-primary text-white font-medium text-sm"
              >
                Join Session
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Access Resources */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-2 lg:col-span-1"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Quick Access Resources
            </h2>
            
            <div className="space-y-3">
              {[
                { icon: Wind, title: "5-Minute Breathing Exercise", type: "Audio • 3 min" },
                { icon: FileText, title: "Understanding Anxiety", type: "Article • 5 min read" },
                { icon: Users, title: "Connect with Peer Support", type: "Community" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success(`Opening: ${item.title}`)}
                  className="bg-neutral-light p-3 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <div className="bg-primary/10 p-2 rounded-md">
                    <item.icon className="w-5 h-5 text-primary"/>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-neutral-dark">{item.title}</p>
                    <p className="text-xs text-neutral-medium">{item.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;