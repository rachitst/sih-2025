import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareWarning, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ComplaintView = () => {
  const [complaintText, setComplaintText] = useState('');
  const [complaintType, setComplaintType] = useState('general');
  const [urgencyLevel, setUrgencyLevel] = useState('medium');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [attachFile, setAttachFile] = useState<File | null>(null);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) {
      toast.error('Please enter your complaint');
      return;
    }
    toast.success('Complaint submitted successfully');
    setComplaintText('');
    setComplaintType('general');
    setUrgencyLevel('medium');
    setAttachFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachFile(e.target.files[0]);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <MessageSquareWarning className="h-6 w-6 text-amber-500" />
          Anonymous Complaint Box
        </h1>
        <p className="text-neutral-medium">
          Submit concerns or complaints anonymously. Your identity will be protected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Complaint Form */}
        <div className="md:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6"
          >
            <form onSubmit={handleComplaintSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">Complaint Type</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="general">General Complaint</option>
                  <option value="academic">Academic Issue</option>
                  <option value="harassment">Harassment</option>
                  <option value="discrimination">Discrimination</option>
                  <option value="facilities">Facilities Problem</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">Urgency Level</label>
                <div className="flex gap-4">
                  {['low', 'medium', 'high'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={urgencyLevel === level}
                        onChange={() => setUrgencyLevel(level)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">Complaint Details</label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 min-h-[200px]"
                  placeholder="Describe your concern or complaint in detail..."
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-1">Attach Evidence (optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-neutral-light hover:bg-gray-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Images, PDFs, or documents (MAX. 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                </div>
                {attachFile && (
                  <p className="mt-2 text-sm text-neutral-medium">
                    File attached: {attachFile.name}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  className="text-amber-500 focus:ring-amber-500 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-neutral-dark cursor-pointer">
                  Submit anonymously
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 text-white font-medium flex items-center justify-center gap-2"
              >
                <Shield className="h-5 w-5" />
                Submit Complaint
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Information Sidebar */}
        <div className="md:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6"
          >
            <h2 className="text-lg font-bold text-neutral-dark mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-neutral-medium">
                  <span className="font-medium text-neutral-dark">Submit your complaint</span> with as much detail as possible.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-neutral-medium">
                  <span className="font-medium text-neutral-dark">Your complaint is encrypted</span> and sent to the appropriate department.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-neutral-medium">
                  <span className="font-medium text-neutral-dark">Action is taken</span> based on the nature and urgency of your complaint.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 text-amber-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-sm text-neutral-medium">
                  <span className="font-medium text-neutral-dark">You can check status</span> using the anonymous tracking code provided.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h3 className="font-medium text-neutral-dark mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Privacy Guarantee
              </h3>
              <p className="text-sm text-neutral-medium">
                Your identity is protected. All submissions are encrypted and anonymized before being reviewed by authorized personnel.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintView;