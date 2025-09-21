import { useState, useMemo } from 'react';
import { Calendar, Users, Clock, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Enhanced Mock Data ---
const studentsData = [
  { id: 1, name: 'Alex Miller', course: 'Computer Science', risk: 'High', assessments: [ { date: '2025-07-15', gad7: 16, phq9: 14 }, { date: '2025-08-20', gad7: 15, phq9: 15 }, { date: '2025-09-21', gad7: 15, phq9: 14 } ], sessionHistory: [ { date: '2025-08-20', notes: 'Discussed exam stress...' }, { date: '2025-07-15', notes: 'Initial consultation...' } ] },
  { id: 2, name: 'Samantha Khan', course: 'Psychology', risk: 'Medium', assessments: [ { date: '2025-06-10', gad7: 11, phq9: 9 }, { date: '2025-07-22', gad7: 12, phq9: 10 }, { date: '2025-09-01', gad7: 10, phq9: 11 } ], sessionHistory: [ { date: '2025-09-01', notes: 'Follow-up on anxiety...' }, { date: '2025-07-22', notes: 'Talked about social...' } ] },
  { id: 3, name: 'Jordan Lee', course: 'Business Administration', risk: 'Low', assessments: [ { date: '2025-08-05', gad7: 4, phq9: 5 }, { date: '2025-09-10', gad7: 5, phq9: 4 } ], sessionHistory: [ { date: '2025-09-10', notes: 'General check-in.' } ] },
];

const appointmentsData = [
  { id: 101, studentId: 3, time: '10:00 AM', status: 'Completed' },
  { id: 102, studentId: 2, time: '11:00 AM', status: 'In Progress' },
  { id: 103, studentId: 1, time: '2:00 PM', status: 'Upcoming' },
  { id: 104, studentId: 3, time: '3:00 PM', status: 'Upcoming' },
];

const CounsellorPortal = () => {
    const [activeView, setActiveView] = useState<'appointments' | 'students'>('appointments');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(102);
    const [activeTab, setActiveTab] = useState<'notes' | 'history' | 'assessments'>('notes');
    const [searchTerm, setSearchTerm] = useState('');
    const [sessionNotes, setSessionNotes] = useState(`Topics Discussed:
- Reports feeling overwhelmed by upcoming project deadlines.
- Expressed concerns about social isolation from peers.

Interventions Used:
- Introduced the 5-4-3-2-1 grounding technique.
- Collaboratively developed a structured time-blocking schedule.`);

    const selectedAppointment = useMemo(() => appointmentsData.find(a => a.id === selectedAppointmentId), [selectedAppointmentId]);
    const selectedStudent = useMemo(() => studentsData.find(s => s.id === selectedAppointment?.studentId), [selectedAppointment]);
    
    // --- Helper Functions ---
    const getStatusClasses = (status: string) => {
        if (status === 'In Progress') return 'bg-primary/10 text-primary border-primary/20';
        if (status === 'Upcoming') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    
    const getRiskClasses = (risk: string) => {
        if (risk === 'High') return 'bg-red-100 text-red-800';
        if (risk === 'Medium') return 'bg-orange-100 text-orange-800';
        return 'bg-green-100 text-green-800';
    };
    
    const filteredStudents = studentsData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const handleAppointmentSelect = (id: number) => {
        setSelectedAppointmentId(id);
        setActiveView('appointments');
        setActiveTab('notes'); // Reset to notes tab on new selection
    };

  return (
    <div className="flex h-screen bg-neutral-light">
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center lg:justify-start gap-2">
            <img src="/logo.png" alt="Vritti Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold hidden lg:block">Vritti</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
            <button onClick={() => setActiveView('appointments')} className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg transition-colors ${activeView === 'appointments' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-medium hover:bg-gray-100'}`}>
                <Calendar size={20} /> <span className="hidden lg:block">Appointments</span>
            </button>
            <button onClick={() => setActiveView('students')} className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg transition-colors ${activeView === 'students' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral-medium hover:bg-gray-100'}`}>
                <Users size={20} /> <span className="hidden lg:block">Students</span>
            </button>
        </nav>
      </aside>

      <main className="flex-1 grid grid-cols-1 xl:grid-cols-3 overflow-hidden">
        {/* --- Left Panel: Dynamic Content based on View --- */}
        <div className="xl:col-span-1 border-r border-gray-200 bg-white flex flex-col">
          {activeView === 'appointments' ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Today's Schedule</h1>
                <p className="text-sm text-neutral-medium">Sunday, September 21, 2025</p>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-3">
                {appointmentsData.map(appt => {
                    const student = studentsData.find(s => s.id === appt.studentId);
                    return (
                        <button key={appt.id} onClick={() => handleAppointmentSelect(appt.id)} className={`w-full text-left p-4 rounded-lg border-l-4 transition-colors ${selectedAppointmentId === appt.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-gray-50'}`}>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{student?.name}</p>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusClasses(appt.status)}`}>{appt.status}</span>
                            </div>
                            <p className="text-sm text-neutral-medium mt-1 flex items-center gap-2"><Clock size={14}/> {appt.time}</p>
                        </button>
                    )
                })}
              </div>
            </>
          ) : (
             <>
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Student Directory</h1>
                <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                    <input type="text" placeholder="Search students..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"/>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-3">
                {filteredStudents.map(student => (
                    <div key={student.id} className="p-4 rounded-lg hover:bg-gray-50 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-neutral-medium">{student.course}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRiskClasses(student.risk)}`}>{student.risk}</span>
                    </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* --- Right Panel: Session Details --- */}
        <div className="xl:col-span-2 p-6 overflow-y-auto">
          {selectedStudent ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-dark">Session with {selectedStudent.name}</h2>
                  <p className="text-neutral-medium">{selectedAppointment?.time} - {selectedAppointment && new Date(new Date().setHours(11, 50)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600">End Session</button>
              </div>
              
              <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('notes')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'notes' ? 'border-primary text-primary' : 'border-transparent text-neutral-medium hover:text-neutral-dark'}`}>Session Notes</button>
                    <button onClick={() => setActiveTab('assessments')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'assessments' ? 'border-primary text-primary' : 'border-transparent text-neutral-medium hover:text-neutral-dark'}`}>Assessment History</button>
                    <button onClick={() => setActiveTab('history')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-neutral-medium hover:text-neutral-dark'}`}>Session History</button>
                  </nav>
              </div>

              {activeTab === 'notes' && (
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Current Session Notes</h3>
                        <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary/90">Save Notes</button>
                    </div>
                    <div className="p-4">
                        <textarea
                            value={sessionNotes}
                            onChange={(e) => setSessionNotes(e.target.value)}
                            className="w-full h-96 p-3 bg-neutral-light rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
              )}
              {activeTab === 'assessments' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Assessment Score Trends</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={selectedStudent.assessments}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 25]}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="gad7" name="GAD-7 (Anxiety)" stroke="#EAB308" strokeWidth={2} />
                            <Line type="monotone" dataKey="phq9" name="PHQ-9 (Depression)" stroke="#F97316" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Session History</h3>
                    <div className="space-y-4">
                        {selectedStudent.sessionHistory.map((session, index) => (
                            <div key={index} className="p-3 bg-neutral-light rounded-lg">
                                <p className="font-semibold text-neutral-dark">{session.date}</p>
                                <p className="text-sm text-neutral-medium mt-1">{session.notes}</p>
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Calendar size={48} className="mx-auto text-gray-300"/>
                    <h3 className="mt-2 text-lg font-medium text-gray-800">Select an appointment</h3>
                    <p className="mt-1 text-sm text-gray-500">Choose an appointment from the list to view session details.</p>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CounsellorPortal;