import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const BookingView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Generate dates for the next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both a date and time');
      return;
    }
    
    setShowConfirmation(true);
    toast.success('Session booked successfully!');
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Counselor Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-32 h-32 rounded-full bg-neutral-light mb-4 overflow-hidden">
              <img 
                src="/counselor.jpg" 
                alt="Dr. Anya Sharma"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150?text=Dr.+Anya';
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-neutral-dark">Dr. Anya Sharma</h2>
            <p className="text-primary font-medium">University Counselor</p>
          </div>
          
          <div className="space-y-4 text-sm text-neutral-medium">
            <p>
              Dr. Sharma specializes in student mental health, anxiety management, and academic stress. 
              She has over 10 years of experience working with university students.
            </p>
            <p>
              <strong>Specialties:</strong> Anxiety, Depression, Academic Stress, Career Guidance
            </p>
            <p>
              <strong>Languages:</strong> English, Hindi
            </p>
          </div>
        </div>

        {/* Calendar Interface */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          {showConfirmation ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-dark mb-2">Session Booked!</h2>
              <p className="text-neutral-medium mb-4">
                Your session with Dr. Anya Sharma is confirmed for:
              </p>
              <div className="bg-neutral-light rounded-lg p-4 mb-6 w-full max-w-sm">
                <p className="font-medium text-neutral-dark">
                  {selectedDate && formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>
              <p className="text-sm text-neutral-medium mb-6">
                You'll receive a confirmation email with details and a calendar invite.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 rounded-lg bg-primary text-white font-medium"
              >
                Book Another Session
              </motion.button>
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingView;