import { Calendar, BookOpen, AlertCircle, Wind, FileText, Users, Activity, BarChart, Heart, Bell, Smile, Frown, Meh, Award, Clock, Sun, Moon, Target, Zap, Music, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Card Components for Consistent Layout & Alignment ---
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

const CardBody = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 flex-grow ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way"
];

// PHQ-9 Assessment Modal Component
const PHQ9Modal = ({ show, onComplete }: { show: boolean, onComplete: (score: number, severity: string) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [severity, setSeverity] = useState<string>("");

  const handleAnswer = (value: number) => {
    // Save the answer
    setAnswers(prev => ({ ...prev, [step]: value }));
    
    // Move to next question or calculate result
    if (step < 8) {
      setStep(step + 1);
    } else {
      // Calculate total score
      const totalScore = Object.values({ ...answers, [step]: value }).reduce((sum, val) => sum + val, 0);
      setScore(totalScore);
      
      // Determine severity
      let severityLevel = "";
      if (totalScore <= 4) severityLevel = "Minimal depression";
      else if (totalScore <= 9) severityLevel = "Mild depression";
      else if (totalScore <= 14) severityLevel = "Moderate depression";
      else if (totalScore <= 19) severityLevel = "Moderately severe depression";
      else severityLevel = "Severe depression";
      
      setSeverity(severityLevel);
    }
  };

  const handleComplete = () => {
    if (score !== null) {
      onComplete(score, severity);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            {score === null ? (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full" 
                    style={{ width: `${((step + 1) / 9) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-dark mb-2">Mental Health Check-in</h2>
                  <p className="text-neutral-medium text-sm">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-dark mb-4">{step + 1}. {PHQ9_QUESTIONS[step]}</h3>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Not at all", value: 0 },
                      { label: "Several days", value: 1 },
                      { label: "More than half the days", value: 2 },
                      { label: "Nearly every day", value: 3 }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-3 rounded-lg border ${answers[step] === option.value ? 'border-primary bg-primary/10' : 'border-gray-200'}`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-neutral-dark mb-2">Thank you for sharing.</h2>
                
                <div className="py-3">
                  <p className="text-lg font-semibold">Your Score: {score}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    score <= 4 ? 'bg-green-100 text-green-800' :
                    score <= 9 ? 'bg-blue-100 text-blue-800' :
                    score <= 14 ? 'bg-yellow-100 text-yellow-800' :
                    score <= 19 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {severity}
                  </div>
                </div>
                
                <p className="text-neutral-medium">
                  This score suggests you may be experiencing symptoms of {severity.toLowerCase()}. This is not a diagnosis, but an indication that it could be helpful to speak with a professional. Vritti is here to provide you with tools and connect you with counselors.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleComplete}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg mt-4"
                >
                  Continue to Dashboard
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Onboarding Modal Component
const OnboardingModal = ({ show, onSave }: { show: boolean, onSave: (name: string) => void }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-neutral-dark mb-2">Welcome to Vritti!</h2>
              <p className="text-neutral-medium mb-6">Let's personalize your wellness journey.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



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
    if (savedName) setUserName(savedName);

    // Load PHQ-9 results if available, otherwise set mock data
    const savedScore = localStorage.getItem('vritti_phq9_score');
    const savedSeverity = localStorage.getItem('vritti_phq9_severity');
    if (savedScore && savedSeverity) {
        setPHQ9Score(parseInt(savedScore));
        setPHQ9Severity(savedSeverity);
    } else {
        setPHQ9Score(9);
        setPHQ9Severity('Mild depression');
    }
    
    // Load other user data
    const savedMood = localStorage.getItem('vritti_mood');
    if (savedMood) setCurrentMood(savedMood);
    
    const savedStreak = localStorage.getItem('vritti_streak');
    if (savedStreak) setStreakCount(parseInt(savedStreak));
    else setStreakCount(Math.floor(Math.random() * 5) + 1);
    
    const savedActivity = localStorage.getItem('vritti_last_activity');
    if (savedActivity) setLastActivity(savedActivity);
    
    const savedSleep = localStorage.getItem('vritti_sleep_hours');
    if (savedSleep) setSleepHours(parseInt(savedSleep));
    else setSleepHours(Math.floor(Math.random() * 3) + 6);
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
        <h1 className="text-2xl font-bold text-neutral-dark">{getGreeting()}, {userName || 'there'}!</h1>
        <p className="text-neutral-medium">Welcome to your personalized wellness dashboard.</p>
      </div>
      
      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Left Column (Main Content) --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> How are you feeling today?
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleMoodSelection('happy')} className={`p-3 rounded-full ${currentMood === 'happy' ? 'bg-green-100' : 'bg-neutral-light'}`}>
                    <Smile className={`h-8 w-8 ${currentMood === 'happy' ? 'text-green-500' : 'text-neutral-medium'}`} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleMoodSelection('neutral')} className={`p-3 rounded-full ${currentMood === 'neutral' ? 'bg-yellow-100' : 'bg-neutral-light'}`}>
                    <Meh className={`h-8 w-8 ${currentMood === 'neutral' ? 'text-yellow-500' : 'text-neutral-medium'}`} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleMoodSelection('sad')} className={`p-3 rounded-full ${currentMood === 'sad' ? 'bg-blue-100' : 'bg-neutral-light'}`}>
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
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardBody>
                <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" /> Your Mental Health Check-in
                </h2>
                {phq9Score !== null && phq9Severity ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-medium">PHQ-9 Score</p>
                        <p className="text-2xl font-bold text-neutral-dark">{phq9Score}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        phq9Score <= 4 ? 'bg-green-100 text-green-800' :
                        phq9Score <= 9 ? 'bg-blue-100 text-blue-800' :
                        phq9Score <= 14 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {phq9Severity}
                      </div>
                    </div>
                    <p className="text-neutral-medium text-sm">
                      Your recent check-in shows signs of {phq9Severity.toLowerCase()}.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6"><p className="text-neutral-medium">No assessment data available.</p></div>
                )}
              </CardBody>
              <CardFooter>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleViewDetails} className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20">
                  View Details
                </motion.button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardBody>
                <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" /> Your Wellness Stats
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="bg-blue-100 p-2 rounded-full"><Moon className="h-4 w-4 text-blue-600" /></div><span className="text-sm text-neutral-medium">Sleep</span></div>
                    <div className="font-medium">{sleepHours} hours</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="bg-green-100 p-2 rounded-full"><Activity className="h-4 w-4 text-green-600" /></div><span className="text-sm text-neutral-medium">Last Activity</span></div>
                    <div className="font-medium capitalize">{lastActivity}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="bg-yellow-100 p-2 rounded-full"><Sun className="h-4 w-4 text-yellow-600" /></div><span className="text-sm text-neutral-medium">Mood</span></div>
                    <div className="font-medium flex items-center gap-1">{getMoodIcon(currentMood)}<span className="capitalize">{currentMood}</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="bg-purple-100 p-2 rounded-full"><Target className="h-4 w-4 text-purple-600" /></div><span className="text-sm text-neutral-medium">Goals Completed</span></div>
                    <div className="font-medium">3/5</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardBody>
              <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" /> Community Support
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img src={`https://ui-avatars.com/api/?name=Priya+Singh&background=818cf8&color=fff&size=40`} alt="Priya Singh"/></div><div className="flex-1"><p className="font-medium text-sm text-neutral-dark">Priya Singh</p><p className="text-xs text-neutral-medium">Shared a resource on anxiety management</p></div><span className="text-xs text-neutral-medium">2h ago</span></div>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img src={`https://ui-avatars.com/api/?name=Rahul+Kumar&background=fb923c&color=fff&size=40`} alt="Rahul Kumar"/></div><div className="flex-1"><p className="font-medium text-sm text-neutral-dark">Rahul Kumar</p><p className="text-xs text-neutral-medium">Posted in Stress Management group</p></div><span className="text-xs text-neutral-medium">5h ago</span></div>
              </div>
            </CardBody>
            <CardFooter>
                <Link to="/vritti-chat"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20">View Community</motion.button></Link>
            </CardFooter>
          </Card>
        </div>

        {/* --- Right Column (Sidebar Content) --- */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Upcoming Session
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden flex-shrink-0"><img src={`https://ui-avatars.com/api/?name=Dr.+Anya+Sharma&background=3A86FF&color=fff&size=48`} alt="Dr. Anya Sharma"/></div>
                <div><p className="font-semibold text-neutral-dark">Dr. Anya Sharma</p><p className="text-sm text-neutral-medium">Today at 2:00 PM</p></div>
              </div>
            </CardBody>
            <CardFooter>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toast.success('Joining session...')} className="w-full py-2.5 rounded-lg bg-primary text-white font-semibold text-sm">Join Session</motion.button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardBody>
              <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> Upcoming Events
              </h2>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-3 py-1"><div className="flex items-center gap-2"><Clock className="h-4 w-4 text-neutral-medium" /><p className="text-xs text-neutral-medium">Tomorrow, 10:00 AM</p></div><p className="font-medium text-neutral-dark">Group Meditation Session</p></div>
                <div className="border-l-4 border-yellow-500 pl-3 py-1"><div className="flex items-center gap-2"><Clock className="h-4 w-4 text-neutral-medium" /><p className="text-xs text-neutral-medium">Friday, 3:00 PM</p></div><p className="font-medium text-neutral-dark">Stress Management Workshop</p></div>
              </div>
            </CardBody>
            <CardFooter>
              <Link to="/booking"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20">View All Events</motion.button></Link>
            </CardFooter>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-lg font-bold text-neutral-dark mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> Daily Wellness Tip
              </h2>
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg">
                <p className="text-neutral-dark font-medium mb-2">Mindful Moments</p>
                <p className="text-sm text-neutral-medium">Take 5 minutes today to practice mindful breathing. Find a quiet space, close your eyes, and focus on your breath.</p>
              </div>
            </CardBody>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardView;