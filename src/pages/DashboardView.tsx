import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, AlertCircle, Wind, FileText, Users, Activity, BarChart, Heart, Bell, Smile, Frown, Meh, Award, Clock, Sun, Moon, Coffee, Zap, Music, MessageCircle, Target, Brain, Sparkles, Lightbulb, ChevronRight, CalendarClock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const DashboardView = () => {
  const [userName, setUserName] = useState<string>('');
  const [phq9Score, setPHQ9Score] = useState<number | null>(null);
  const [phq9Severity, setPHQ9Severity] = useState<string>('');
  const [currentMood, setCurrentMood] = useState<string>('neutral');
  const [streakCount, setStreakCount] = useState<number>(3);
  const [lastActivity, setLastActivity] = useState<string>('breathing exercise');
  const [sleepHours, setSleepHours] = useState<number>(7);

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
    
    // Load other user data (in a real app, this would come from an API)
    const savedMood = localStorage.getItem('vritti_mood');
    if (savedMood) setCurrentMood(savedMood);
    
    const savedStreak = localStorage.getItem('vritti_streak');
    if (savedStreak) setStreakCount(parseInt(savedStreak));
    else setStreakCount(Math.floor(Math.random() * 5) + 1);
    
    const savedActivity = localStorage.getItem('vritti_last_activity');
    if (savedActivity) setLastActivity(savedActivity);
    
    const savedSleep = localStorage.getItem('vritti_sleep_hours');
    if (savedSleep) setSleepHours(parseInt(savedSleep));
    else setSleepHours(Math.floor(Math.random() * 3) + 6); // Random between 6-8 hours
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
  
  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    localStorage.setItem('vritti_mood', mood);
    toast.success(`Mood updated to ${mood}`);
  };
  
  const handleActivityClick = (activity: string) => {
    toast.success(`Starting ${activity}...`);
    setLastActivity(activity.toLowerCase());
    localStorage.setItem('vritti_last_activity', activity.toLowerCase());
    // In a real app, this would navigate to the activity
  };
  
  const getMoodIcon = (mood: string) => {
    switch(mood) {
      case 'happy': return <Smile className="h-6 w-6 text-green-500" />;
      case 'sad': return <Frown className="h-6 w-6 text-blue-500" />;
      case 'neutral': return <Meh className="h-6 w-6 text-yellow-500" />;
      default: return <Meh className="h-6 w-6 text-yellow-500" />;
    }
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

      {/* Mood Tracker */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
        <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          How are you feeling today?
        </h2>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelection('happy')}
              className={`p-3 rounded-full ${currentMood === 'happy' ? 'bg-green-100' : 'bg-neutral-light'}`}
            >
              <Smile className={`h-8 w-8 ${currentMood === 'happy' ? 'text-green-500' : 'text-neutral-medium'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelection('neutral')}
              className={`p-3 rounded-full ${currentMood === 'neutral' ? 'bg-yellow-100' : 'bg-neutral-light'}`}
            >
              <Meh className={`h-8 w-8 ${currentMood === 'neutral' ? 'text-yellow-500' : 'text-neutral-medium'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelection('sad')}
              className={`p-3 rounded-full ${currentMood === 'sad' ? 'bg-blue-100' : 'bg-neutral-light'}`}
            >
              <Frown className={`h-8 w-8 ${currentMood === 'sad' ? 'text-blue-500' : 'text-neutral-medium'}`} />
            </motion.button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-neutral-medium">Your streak</p>
            <div className="flex items-center justify-end gap-1">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-lg">{streakCount} days</span>
            </div>
          </div>
        </div>
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
                    src={`https://ui-avatars.com/api/?name=Dr.+Anya+Sharma&background=6366f1&color=fff&size=48`}
                    alt="Dr. Anya Sharma"
                    className="w-full h-full object-cover"
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
                  onClick={() => handleActivityClick(item.title)}
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
        
        {/* Activity Suggestions */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Suggested for You
            </h2>
            
            <div className="space-y-3">
              <Link to="/spotify">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <div className="bg-green-500 p-2 rounded-md">
                    <Music className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-neutral-dark">Calming Playlist</p>
                    <p className="text-xs text-neutral-medium">Music • Spotify</p>
                  </div>
                </motion.div>
              </Link>
              
              <Link to="/resources">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <div className="bg-blue-500 p-2 rounded-md">
                    <BookOpen className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-neutral-dark">Mindfulness Guide</p>
                    <p className="text-xs text-neutral-medium">Video • 10 min</p>
                  </div>
                </motion.div>
              </Link>
              
              <Link to="/volunteer">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <div className="bg-purple-500 p-2 rounded-md">
                    <Users className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-neutral-dark">Volunteer Opportunities</p>
                    <p className="text-xs text-neutral-medium">Community • Engagement</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Wellness Stats */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Your Wellness Stats
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Moon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-neutral-medium">Sleep</span>
                </div>
                <div className="font-medium">{sleepHours} hours</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-neutral-medium">Last Activity</span>
                </div>
                <div className="font-medium capitalize">{lastActivity}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Sun className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-sm text-neutral-medium">Mood</span>
                </div>
                <div className="font-medium flex items-center gap-1">
                  {getMoodIcon(currentMood)}
                  <span className="capitalize">{currentMood}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-neutral-medium">Goals Completed</span>
                </div>
                <div className="font-medium">3/5</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Upcoming Events */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Upcoming Events
            </h2>
            
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-3 py-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-medium" />
                  <p className="text-xs text-neutral-medium">Tomorrow, 10:00 AM</p>
                </div>
                <p className="font-medium text-neutral-dark">Group Meditation Session</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3 py-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-medium" />
                  <p className="text-xs text-neutral-medium">Friday, 3:00 PM</p>
                </div>
                <p className="font-medium text-neutral-dark">Stress Management Workshop</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-medium" />
                  <p className="text-xs text-neutral-medium">Next Monday, 5:00 PM</p>
                </div>
                <p className="font-medium text-neutral-dark">Peer Support Group Meeting</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-medium" />
                  <p className="text-xs text-neutral-medium">Next Wednesday, 2:00 PM</p>
                </div>
                <p className="font-medium text-neutral-dark">Art Therapy Workshop</p>
              </div>
              
              <Link to="/booking">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20"
                >
                  View All Events
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Wellness Tips */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Daily Wellness Tip
            </h2>
            
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg">
              <p className="text-neutral-dark font-medium mb-2">Mindful Moments</p>
              <p className="text-sm text-neutral-medium">
                Take 5 minutes today to practice mindful breathing. Find a quiet space, close your eyes, and focus on your breath. This simple practice can reduce stress and improve focus.
              </p>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button 
                onClick={() => toast.success('Tip saved!')}
                className="text-sm text-primary font-medium hover:underline"
              >
                Save for later
              </button>
              
              <button 
                onClick={() => toast.success('Showing new tip...')}
                className="text-sm text-neutral-medium hover:text-neutral-dark"
              >
                Show another
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Community Support */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Community Support
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={`https://ui-avatars.com/api/?name=Priya+Singh&background=6366f1&color=fff&size=40`}
                    alt="Priya Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-neutral-dark">Priya Singh</p>
                  <p className="text-xs text-neutral-medium">Shared a resource on anxiety management</p>
                </div>
                <span className="text-xs text-neutral-medium">2h ago</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={`https://ui-avatars.com/api/?name=Rahul+Kumar&background=6366f1&color=fff&size=40`}
                    alt="Rahul Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-neutral-dark">Rahul Kumar</p>
                  <p className="text-xs text-neutral-medium">Posted in Stress Management group</p>
                </div>
                <span className="text-xs text-neutral-medium">5h ago</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={`https://ui-avatars.com/api/?name=Neha+Gupta&background=6366f1&color=fff&size=40`}
                    alt="Neha Gupta"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-neutral-dark">Neha Gupta</p>
                  <p className="text-xs text-neutral-medium">Started a new discussion thread</p>
                </div>
                <span className="text-xs text-neutral-medium">1d ago</span>
              </div>
              
              <Link to="/vritti-chat">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20"
                >
                  View Community
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Additional Resources */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Additional Resources
            </h2>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <FileText className="w-5 h-5 text-white"/>
                  </div>
                  <p className="font-medium text-neutral-dark">Mental Health Articles</p>
                </div>
                <p className="text-sm text-neutral-medium ml-10">
                  Expert-written articles on various mental health topics
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Wind className="w-5 h-5 text-white"/>
                  </div>
                  <p className="font-medium text-neutral-dark">Guided Meditations</p>
                </div>
                <p className="text-sm text-neutral-medium ml-10">
                  Audio sessions for relaxation and mindfulness practice
                </p>
              </div>
              
              <Link to="/resources">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20"
                >
                  View All Resources
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;