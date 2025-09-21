import { useState, useEffect, useCallback } from 'react';
import { Calendar, BookOpen, Star, Heart, Settings, User, CheckCircle, Zap, Users, Brain, PenSquare, Wind, FileText, AlertCircle } from 'lucide-react';
import AIChat from '../components/AIChat';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// --- Helper Components (Moved Outside Main Component to Fix Bug) ---

// PHQ-9 Questions
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


// --- Main Dashboard Component ---

const StudentDashboard = () => {
  // State management
  const [userName, setUserName] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showPHQ9, setShowPHQ9] = useState<boolean>(false);
  const [phq9Score, setPHQ9Score] = useState<number | null>(null);
  const [phq9Severity, setPHQ9Severity] = useState<string>('');
  const [journalEntry, setJournalEntry] = useState('');
  const [latestJournalEntry, setLatestJournalEntry] = useState<{ text: string, date: string } | null>(null);

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '🙂', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😕', label: 'Not Good', value: 'not-good' },
    { emoji: '😥', label: 'Struggling', value: 'struggling' }
  ];

  // --- Core Logic ---

  const handleSaveName = (name: string) => {
    localStorage.setItem('vritti_userName', name);
    setUserName(name);
    setShowOnboarding(false);
    
    // Check if PHQ-9 assessment needs to be shown
    const phq9Completed = localStorage.getItem('vritti_phq9_completed');
    if (phq9Completed !== 'true') {
      setShowPHQ9(true);
    } else {
      toast.success(`Welcome back, ${name}! Let's continue your wellness journey.`);
    }
  };
  
  const handlePHQ9Complete = (score: number, severity: string) => {
    // Save PHQ-9 results to localStorage
    localStorage.setItem('vritti_phq9_score', score.toString());
    localStorage.setItem('vritti_phq9_severity', severity);
    localStorage.setItem('vritti_phq9_completed', 'true');
    
    // Update state
    setPHQ9Score(score);
    setPHQ9Severity(severity);
    setShowPHQ9(false);
    
    toast.success(`Welcome, ${userName}! Let's start your wellness journey.`);
  };

  const handleMoodSelection = (mood: any) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`vritti_mood_${today}`, mood.value);
    setSelectedMood(mood.value);
    toast.success(`Your ${mood.label.toLowerCase()} mood has been logged!`);
  };

  const handleSaveJournal = () => {
      if (!journalEntry.trim()) {
          toast.error("Journal entry can't be empty.");
          return;
      }
      const newEntry = {
          text: journalEntry,
          date: new Date().toISOString(),
      };
      localStorage.setItem('vritti_latestJournal', JSON.stringify(newEntry));
      setLatestJournalEntry(newEntry);
      setJournalEntry(''); // Clear input
      toast.success('Your thoughts have been saved.');
  };

  // --- Effects for Initialization ---

  useEffect(() => {
    // Check for user name on initial load
    const savedName = localStorage.getItem('vritti_userName');
    if (savedName) {
      setUserName(savedName);
      
      // Check if PHQ-9 assessment has been completed
      const phq9Completed = localStorage.getItem('vritti_phq9_completed');
      if (phq9Completed !== 'true') {
        // Show PHQ-9 assessment if not completed
        setShowPHQ9(true);
      } else {
        // Load PHQ-9 results if available
        const savedScore = localStorage.getItem('vritti_phq9_score');
        const savedSeverity = localStorage.getItem('vritti_phq9_severity');
        if (savedScore) setPHQ9Score(parseInt(savedScore));
        if (savedSeverity) setPHQ9Severity(savedSeverity);
      }
    } else {
      // Show onboarding if no user name
      setShowOnboarding(true);
    }

    // Load today's mood
    const today = new Date().toISOString().split('T')[0];
    const todayMood = localStorage.getItem(`vritti_mood_${today}`);
    if (todayMood) {
      setSelectedMood(todayMood);
    }

    // Load latest journal entry
    const savedJournal = localStorage.getItem('vritti_latestJournal');
    if (savedJournal) {
        setLatestJournalEntry(JSON.parse(savedJournal));
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Determine if we should show the main dashboard content
  const showMainContent = !showOnboarding && !showPHQ9;

  return (
    <div className="min-h-screen bg-neutral-light p-4 sm:p-6 lg:p-8">
      <OnboardingModal show={showOnboarding} onSave={handleSaveName} />
      <PHQ9Modal show={showPHQ9} onComplete={handlePHQ9Complete} />
      
      {showMainContent && (
        <>
        {/* Header */}
        <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">{getGreeting()}, {userName || 'there'}!</h1>
          <p className="text-neutral-medium mt-1">Ready to focus on your wellness today?</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Settings className="w-6 h-6 text-neutral-medium hover:text-primary" />
        </motion.button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Main Content Area --- */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <AIChat />
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
          >
              <h2 className="text-xl font-semibold text-neutral-dark mb-4 flex items-center gap-2"><PenSquare size={22} className="text-primary" /> Thought Journal</h2>
              <p className="text-sm text-neutral-medium mb-4">A private space to reflect. What's on your mind right now?</p>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="For example: 'I'm feeling anxious about my upcoming presentation, but I know I've prepared well...'"
                className="w-full h-32 p-3 bg-neutral-light rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
              <div className="flex justify-between items-center mt-4">
                  <div className="text-xs text-neutral-medium">
                      {latestJournalEntry ? `Last entry: ${new Date(latestJournalEntry.date).toLocaleDateString()}` : 'Your entries are saved locally.'}
                  </div>
                  <motion.button 
                    onClick={handleSaveJournal}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white font-semibold py-2 px-5 rounded-lg"
                  >
                      Save Entry
                  </motion.button>
              </div>
          </motion.div>
        </div>
        
        {/* --- Sidebar --- */}
        <div className="space-y-6">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-neutral-dark mb-4">How are you feeling today?</h2>
            <div className="flex justify-around bg-neutral-light p-2 rounded-lg">
              {moods.map((mood) => (
                <motion.button
                  key={mood.value}
                  onClick={() => handleMoodSelection(mood)}
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-lg transition-colors ${selectedMood === mood.value ? 'bg-primary/20' : ''}`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center gap-2"><BookOpen size={20} className="text-secondary" /> Recommended Resources</h2>
            <div className="space-y-3">
                {[
                    { icon: Wind, title: "Box Breathing Exercise", type: "Audio • 3 min" },
                    { icon: FileText, title: "Understanding Cognitive Distortions", type: "Article • 5 min read" },
                    { icon: Users, title: "Connect with Peer Support", type: "Community" }
                ].map(item => (
                    <div key={item.title} className="bg-neutral-light p-3 rounded-lg flex items-center gap-3 hover:bg-gray-200 cursor-pointer">
                        <div className="bg-secondary/10 p-2 rounded-md">
                           <item.icon className="w-5 h-5 text-secondary"/>
                        </div>
                        <div>
                           <p className="font-semibold text-sm text-neutral-dark">{item.title}</p>
                           <p className="text-xs text-neutral-medium">{item.type}</p>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center gap-2"><Calendar size={20} className="text-primary"/> Upcoming Session</h2>
            <div className="flex items-center gap-4">
              
              <div>
                <p className="font-semibold text-neutral-dark">Dr. Anya Sharma</p>
                <p className="text-sm text-neutral-medium">Today at 2:00 PM</p>
              </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="mt-4 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Join Secure Session
            </motion.button>
          </motion.div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default StudentDashboard;