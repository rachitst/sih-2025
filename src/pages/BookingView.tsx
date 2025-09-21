import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle, Users, Video, MessageSquare, Star, ChevronRight, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const counselors = [
  {
    id: 1,
    name: 'Dr. Anya Sharma',
    title: 'Senior Counselor',
    specialties: ['Anxiety', 'Depression', 'Academic Stress', 'Career Guidance'],
    languages: ['English', 'Hindi'],
    experience: '10+ years',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. Rajiv Mehta',
    title: 'Clinical Psychologist',
    specialties: ['Trauma', 'Relationship Issues', 'Self-Esteem', 'Grief'],
    languages: ['English', 'Hindi', 'Punjabi'],
    experience: '8+ years',
    rating: 4.7,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Priya Patel',
    title: 'Student Wellness Specialist',
    specialties: ['Exam Stress', 'Time Management', 'Social Anxiety', 'Mindfulness'],
    languages: ['English', 'Gujarati'],
    experience: '5+ years',
    rating: 4.8,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Arjun Singh',
    title: 'Behavioral Therapist',
    specialties: ['Addiction', 'Anger Management', 'ADHD', 'Behavioral Issues'],
    languages: ['English', 'Hindi', 'Urdu'],
    experience: '12+ years',
    rating: 4.6,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop'
  }
];

const sessionTypes = [
  { id: 'in-person', name: 'In-Person', icon: <Users className="h-5 w-5" />, description: 'Face-to-face session at the university counseling center' },
  { id: 'video', name: 'Video Call', icon: <Video className="h-5 w-5" />, description: 'Online video session via secure platform' },
  { id: 'chat', name: 'Chat Session', icon: <MessageSquare className="h-5 w-5" />, description: 'Text-based counseling session' }
];

const BookingView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCounselor, setSelectedCounselor] = useState<typeof counselors[0] | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null);

  // Generate dates for the next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });
  
  // Get all unique specialties for filtering
  const allSpecialties = Array.from(
    new Set(
      counselors.flatMap(counselor => counselor.specialties)
    )
  ).sort();
  
  // Filter counselors based on search and specialty filter
  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = searchQuery === '' || 
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesSpecialty = !filterSpecialty || 
      counselor.specialties.includes(filterSpecialty);
      
    return matchesSearch && matchesSpecialty;
  });

  const handleCounselorSelect = (counselor: typeof counselors[0]) => {
    setSelectedCounselor(counselor);
    setCurrentStep(2);
  };
  
  const handleSessionTypeSelect = (typeId: string) => {
    setSelectedSessionType(typeId);
    setCurrentStep(3);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (!selectedCounselor || !selectedSessionType || !selectedDate || !selectedTime) {
      toast.error('Please complete all booking details');
      return;
    }
    
    setShowConfirmation(true);
    toast.success('Session booked successfully!');
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCounselor(null);
    setSelectedSessionType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowConfirmation(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          Book a Confidential Session
        </h1>
        <p className="text-neutral-medium">
          Schedule a one-on-one session with a university counselor.
        </p>
      </div>
      
      {/* Progress Steps */}
      {!showConfirmation && (
        <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${currentStep === step ? 'bg-primary text-white' : currentStep > step ? 'bg-green-100 text-green-600' : 'bg-neutral-light text-neutral-medium'}`}
              >
                {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              <div className={`text-sm ml-2 ${currentStep >= step ? 'text-neutral-dark font-medium' : 'text-neutral-medium'}`}>
                {step === 1 ? 'Select Counselor' : step === 2 ? 'Session Type' : 'Schedule'}
              </div>
              {step < 3 && (
                <div className="mx-4 h-[2px] w-16 bg-neutral-light">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: currentStep > step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showConfirmation ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-dark mb-2">Session Booked!</h2>
          <p className="text-neutral-medium mb-6">
            Your session with {selectedCounselor?.name} is confirmed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-neutral-light/50 rounded-lg p-4">
              <CalendarIcon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-medium text-neutral-dark">
                {selectedDate && formatDate(selectedDate)}
              </p>
            </div>
            
            <div className="bg-neutral-light/50 rounded-lg p-4">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-medium text-neutral-dark">{selectedTime}</p>
            </div>
            
            <div className="bg-neutral-light/50 rounded-lg p-4">
              {sessionTypes.find(t => t.id === selectedSessionType)?.icon || 
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />}
              <p className="font-medium text-neutral-dark">
                {sessionTypes.find(t => t.id === selectedSessionType)?.name || 'Session'}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-neutral-medium mb-8">
            You'll receive a confirmation email with details and a calendar invite.
            Please arrive 5 minutes early for your session.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium"
            >
              Book Another Session
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg border border-primary text-primary font-medium"
            >
              Add to Calendar
            </motion.button>
          </div>
        </motion.div>
      ) : currentStep === 1 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterSpecialty || ''}
                onChange={(e) => setFilterSpecialty(e.target.value || null)}
                className="appearance-none w-full md:w-60 pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-5 w-5" />
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-neutral-medium h-5 w-5" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCounselors.length > 0 ? filteredCounselors.map((counselor) => (
              <motion.div
                key={counselor.id}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)' }}
                className="border border-gray-100 rounded-lg p-4 cursor-pointer"
                onClick={() => handleCounselorSelect(counselor)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={counselor.image} 
                      alt={counselor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/80?text=${counselor.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-neutral-dark">{counselor.name}</h3>
                        <p className="text-primary text-sm">{counselor.title}</p>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <Star className="fill-current h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{counselor.rating}</span>
                        <span className="text-xs text-neutral-medium ml-1">({counselor.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-neutral-medium mb-1">
                        <span className="font-medium text-neutral-dark">Experience:</span> {counselor.experience}
                      </p>
                      <p className="text-xs text-neutral-medium mb-1">
                        <span className="font-medium text-neutral-dark">Specialties:</span> {counselor.specialties.join(', ')}
                      </p>
                      <p className="text-xs text-neutral-medium">
                        <span className="font-medium text-neutral-dark">Languages:</span> {counselor.languages.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-medium">No counselors found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      ) : currentStep === 2 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full bg-neutral-light hover:bg-neutral-200"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
            
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={selectedCounselor?.image} 
                  alt={selectedCounselor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark">{selectedCounselor?.name}</h3>
                <p className="text-primary text-sm">{selectedCounselor?.title}</p>
              </div>
            </div>
          </div>
          
          <h3 className="font-bold text-neutral-dark mb-4">Select Session Type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {sessionTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)' }}
                className={`border rounded-lg p-6 cursor-pointer text-center ${selectedSessionType === type.id ? 'border-primary bg-primary/5' : 'border-gray-100'}`}
                onClick={() => handleSessionTypeSelect(type.id)}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${selectedSessionType === type.id ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark'}`}>
                  {type.icon}
                </div>
                <h4 className="font-bold text-neutral-dark mb-2">{type.name}</h4>
                <p className="text-xs text-neutral-medium">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full bg-neutral-light hover:bg-neutral-200"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
            
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={selectedCounselor?.image} 
                  alt={selectedCounselor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark">{selectedCounselor?.name}</h3>
                <p className="text-sm text-neutral-medium">
                  {sessionTypes.find(t => t.id === selectedSessionType)?.name} Session
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-neutral-dark mb-4">Select a Date</h3>
              <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
                {dates.map((date, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDateSelect(date)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[70px] ${
                      selectedDate && selectedDate.toDateString() === date.toDateString()
                        ? 'bg-primary text-white'
                        : 'bg-neutral-light text-neutral-medium hover:bg-neutral-200'
                    }`}
                  >
                    <span className="text-xs font-medium">{daysOfWeek[date.getDay()]}</span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                    <span className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </motion.button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <h3 className="font-bold text-neutral-dark mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Available Times for {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {timeSlots.map((time, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-3 px-4 rounded-lg text-center ${
                          selectedTime === time
                            ? 'bg-primary text-white'
                            : 'bg-neutral-light text-neutral-medium hover:bg-neutral-200'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-neutral-light/30 rounded-lg p-6">
              <h3 className="font-bold text-neutral-dark mb-4">Session Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-neutral-medium">Counselor</span>
                  <span className="font-medium text-neutral-dark">{selectedCounselor?.name}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-neutral-medium">Session Type</span>
                  <span className="font-medium text-neutral-dark">
                    {sessionTypes.find(t => t.id === selectedSessionType)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-neutral-medium">Date</span>
                  <span className="font-medium text-neutral-dark">
                    {selectedDate ? formatDate(selectedDate) : 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-neutral-medium">Time</span>
                  <span className="font-medium text-neutral-dark">
                    {selectedTime || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-neutral-medium">Duration</span>
                  <span className="font-medium text-neutral-dark">50 minutes</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-sm text-neutral-medium">
                  <strong>Note:</strong> Please arrive 5 minutes early for your session. 
                  Cancellations must be made at least 24 hours in advance.
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 rounded-lg font-medium ${
                  selectedDate && selectedTime
                    ? 'bg-primary text-white'
                    : 'bg-neutral-light text-neutral-medium cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingView;