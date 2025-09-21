import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Calendar, Clock, MapPin, Briefcase, GraduationCap, Heart, Award, Languages, Phone, Mail, FileText, Upload, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  education: string;
  occupation: string;
  organization: string;
  experience: string;
  languages: string[];
  skills: string[];
  availability: string[];
  interests: string[];
  motivation: string;
  heardFrom: string;
  resume: File | null;
  photo: File | null;
  references: {
    name: string;
    relation: string;
    contact: string;
  }[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  agreement: boolean;
}

const VolunteerView = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    education: '',
    occupation: '',
    organization: '',
    experience: '',
    languages: [],
    skills: [],
    availability: [],
    interests: [],
    motivation: '',
    heardFrom: '',
    resume: null,
    photo: null,
    references: [{ name: '', relation: '', contact: '' }],
    emergencyContact: { name: '', relation: '', phone: '' },
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'languages' | 'skills' | 'availability' | 'interests') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          [category]: [...prev[category], value]
        };
      } else {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'photo') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [fileType]: e.target.files![0]
      }));
    }
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedReferences = [...prev.references];
      updatedReferences[index] = {
        ...updatedReferences[index],
        [field]: value
      };
      return {
        ...prev,
        references: updatedReferences
      };
    });
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', relation: '', contact: '' }]
    }));
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreement: e.target.checked
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Volunteer application submitted successfully!');
    }, 2000);
  };

  const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu'];
  const skillOptions = ['Counseling', 'Active Listening', 'Crisis Intervention', 'Public Speaking', 'Event Planning', 'Social Media', 'Content Creation', 'Teaching', 'First Aid', 'Leadership', 'Project Management'];
  const availabilityOptions = ['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings', 'On-call'];
  const interestOptions = ['Peer Support', 'Crisis Helpline', 'Community Outreach', 'School Programs', 'College Workshops', 'Content Creation', 'Social Media', 'Event Organization', 'Research', 'Fundraising'];

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-dark mb-4">Application Submitted Successfully!</h1>
          <p className="text-neutral-medium mb-6">
            Thank you for your interest in volunteering with Vritti. We've received your application and will review it shortly.
            Our team will contact you within 5-7 business days regarding the next steps.
          </p>
          <p className="text-neutral-medium mb-8">
            Your application reference number: <span className="font-semibold">VR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium"
          >
            Return to Dashboard
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-primary" />
          Volunteer Registration
        </h1>
        <p className="text-neutral-medium">
          Join our community of volunteers and make a difference in mental health support.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-neutral-medium">Application Progress</span>
          <span className="text-sm font-medium text-primary">{step}/4</span>
        </div>
        <div className="w-full bg-neutral-light rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-neutral-dark mb-6 pb-2 border-b border-gray-100">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark mb-1">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-dark mb-1">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-neutral-dark mb-1">Date of Birth *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-neutral-dark mb-1">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-dark mb-1">Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-neutral-medium" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-dark mb-1">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-neutral-dark mb-1">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-neutral-dark mb-1">PIN Code *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-3">Upload Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-neutral-light rounded-lg flex items-center justify-center overflow-hidden">
                      {formData.photo ? (
                        <img 
                          src={URL.createObjectURL(formData.photo)} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserPlus className="h-8 w-8 text-neutral-medium" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="photo" className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-neutral-light transition-colors">
                        <Upload className="h-4 w-4 text-neutral-medium" />
                        <span className="text-sm text-neutral-medium">Choose file</span>
                        <input
                          type="file"
                          id="photo"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'photo')}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-neutral-medium mt-1">JPEG, PNG or GIF (Max. 2MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Professional Background */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-neutral-dark mb-6 pb-2 border-b border-gray-100">
                Professional Background
              </h2>
              
              <div className="mb-6">
                <label htmlFor="education" className="block text-sm font-medium text-neutral-dark mb-1">Highest Education *</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select Education Level</option>
                    <option value="high-school">High School</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-neutral-dark mb-1">Current Occupation *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="e.g. Student, Teacher, Engineer"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-neutral-dark mb-1">Organization/Institution</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. ABC University, XYZ Company"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-neutral-dark mb-1">Relevant Experience *</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select Experience Level</option>
                  <option value="none">No prior experience</option>
                  <option value="less-than-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="more-than-5">More than 5 years</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-dark mb-3">Languages Known *</label>
                <div className="flex items-center gap-2 mb-2">
                  <Languages className="h-4 w-4 text-neutral-medium" />
                  <span className="text-sm text-neutral-medium">Select all that apply</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {languageOptions.map(language => (
                    <div key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`lang-${language}`}
                        value={language}
                        checked={formData.languages.includes(language)}
                        onChange={(e) => handleCheckboxChange(e, 'languages')}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/80"
                      />
                      <label htmlFor={`lang-${language}`} className="ml-2 text-sm text-neutral-dark">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-dark mb-3">Skills *</label>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-neutral-medium" />
                  <span className="text-sm text-neutral-medium">Select all that apply</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skillOptions.map(skill => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`skill-${skill}`}
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => handleCheckboxChange(e, 'skills')}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/80"
                      />
                      <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-neutral-dark">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="resume" className="block text-sm font-medium text-neutral-dark mb-3">Upload Resume/CV</label>
                <div className="flex items-center gap-2">
                  <label htmlFor="resume" className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-neutral-light transition-colors">
                    <FileText className="h-4 w-4 text-neutral-medium" />
                    <span className="text-sm text-neutral-medium">{formData.resume ? formData.resume.name : 'Choose file'}</span>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      className="hidden"
                    />
                  </label>
                  {formData.resume && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-neutral-medium mt-1">PDF, DOC, or DOCX (Max. 5MB)</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Volunteer Preferences */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-neutral-dark mb-6 pb-2 border-b border-gray-100">
                Volunteer Preferences
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-dark mb-3">Availability *</label>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-neutral-medium" />
                  <span className="text-sm text-neutral-medium">Select all that apply</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availabilityOptions.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`avail-${option}`}
                        value={option}
                        checked={formData.availability.includes(option)}
                        onChange={(e) => handleCheckboxChange(e, 'availability')}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/80"
                      />
                      <label htmlFor={`avail-${option}`} className="ml-2 text-sm text-neutral-dark">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-dark mb-3">Areas of Interest *</label>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-neutral-medium" />
                  <span className="text-sm text-neutral-medium">Select all that apply</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`interest-${option}`}
                        value={option}
                        checked={formData.interests.includes(option)}
                        onChange={(e) => handleCheckboxChange(e, 'interests')}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/80"
                      />
                      <label htmlFor={`interest-${option}`} className="ml-2 text-sm text-neutral-dark">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="motivation" className="block text-sm font-medium text-neutral-dark mb-1">Motivation for Volunteering *</label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Please share why you want to volunteer with Vritti and what you hope to contribute or gain from this experience."
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="heardFrom" className="block text-sm font-medium text-neutral-dark mb-1">How did you hear about us? *</label>
                <select
                  id="heardFrom"
                  name="heardFrom"
                  value={formData.heardFrom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select an option</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend-family">Friend or Family</option>
                  <option value="school-college">School/College</option>
                  <option value="event">Event or Workshop</option>
                  <option value="search-engine">Search Engine</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Step 4: Emergency Contact & References */}
          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-xl font-bold text-neutral-dark mb-6 pb-2 border-b border-gray-100">
                Emergency Contact & References
              </h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-neutral-dark mb-4">Emergency Contact *</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="emergency-name" className="block text-sm font-medium text-neutral-dark mb-1">Name</label>
                    <input
                      type="text"
                      id="emergency-name"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergency-relation" className="block text-sm font-medium text-neutral-dark mb-1">Relationship</label>
                    <input
                      type="text"
                      id="emergency-relation"
                      value={formData.emergencyContact.relation}
                      onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergency-phone" className="block text-sm font-medium text-neutral-dark mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="emergency-phone"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-neutral-dark">References</h3>
                  <button
                    type="button"
                    onClick={addReference}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    + Add Reference
                  </button>
                </div>
                
                {formData.references.map((reference, index) => (
                  <div key={index} className="mb-6 p-4 bg-neutral-light/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-neutral-dark">Reference {index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-sm text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`ref-name-${index}`} className="block text-sm font-medium text-neutral-dark mb-1">Name</label>
                        <input
                          type="text"
                          id={`ref-name-${index}`}
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor={`ref-relation-${index}`} className="block text-sm font-medium text-neutral-dark mb-1">Relationship</label>
                        <input
                          type="text"
                          id={`ref-relation-${index}`}
                          value={reference.relation}
                          onChange={(e) => handleReferenceChange(index, 'relation', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor={`ref-contact-${index}`} className="block text-sm font-medium text-neutral-dark mb-1">Contact (Email/Phone)</label>
                        <input
                          type="text"
                          id={`ref-contact-${index}`}
                          value={reference.contact}
                          onChange={(e) => handleReferenceChange(index, 'contact', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreement"
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={handleAgreementChange}
                      required
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/80"
                    />
                  </div>
                  <label htmlFor="agreement" className="ml-2 text-sm text-neutral-medium">
                    I confirm that the information provided is accurate and complete. I understand that Vritti may contact my references and verify the information provided. I agree to abide by Vritti's volunteer policies and code of conduct if selected. *
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="p-6 bg-neutral-light/50 border-t border-gray-100 flex justify-between">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-200 text-neutral-dark rounded-lg font-medium"
              >
                Previous
              </motion.button>
            )}
            {step < 4 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium ml-auto"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !formData.agreement}
                className={`px-6 py-2 rounded-lg font-medium ml-auto ${isSubmitting || !formData.agreement ? 'bg-neutral-medium text-white cursor-not-allowed' : 'bg-primary text-white'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerView;