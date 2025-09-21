import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, CartesianGrid, ReferenceArea } from 'recharts';
import { Users, TrendingUp, Calendar, AlertTriangle, ArrowUpRight, ArrowDownRight, Lightbulb } from 'lucide-react';

const AdminDashboard = () => {
  const stressData = [
    { month: 'Aug', stress: 6.2 }, { month: 'Sep', stress: 7.1 }, { month: 'Oct', stress: 8.4 },
    { month: 'Nov', stress: 7.8 }, { month: 'Dec', stress: 6.9 }, { month: 'Jan', stress: 7.5 },
  ];
  
  const departmentData = [
      { name: 'Engineering', wellness: 6.1, color: '#EF4444' }, { name: 'Arts & Humanities', wellness: 7.5, color: '#3B82F6' },
      { name: 'Business', wellness: 7.1, color: '#10B981' }, { name: 'Sciences', wellness: 6.5, color: '#F97316' }, { name: 'Medicine', wellness: 5.9, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-neutral-light p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-dark">Institutional Wellness Overview</h1>
        <p className="text-neutral-medium mt-1">Anonymous, real-time insights for proactive support.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-neutral-medium flex items-center gap-2"><Users size={16}/> Active Students</p>
            <p className="text-4xl font-bold text-neutral-dark mt-2">1,247</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2"><ArrowUpRight size={14}/> +12% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-neutral-medium flex items-center gap-2"><TrendingUp size={16}/> Avg. Mood Score</p>
            <p className="text-4xl font-bold text-neutral-dark mt-2">6.8<span className="text-xl text-neutral-medium">/10</span></p>
            <p className="text-sm text-orange-600 flex items-center gap-1 mt-2"><ArrowDownRight size={14}/> -0.3 from last week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-neutral-medium flex items-center gap-2"><Calendar size={16}/> Sessions This Month</p>
            <p className="text-4xl font-bold text-neutral-dark mt-2">342</p>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-2"><ArrowUpRight size={14}/> +12% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-neutral-medium flex items-center gap-2"><AlertTriangle size={16}/> Active Alerts</p>
            <p className="text-4xl font-bold text-red-600 mt-2">3</p>
            <p className="text-sm text-neutral-medium mt-2">High-priority flags require attention.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-dark mb-4">Campus Stress vs. Academic Calendar</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={stressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis domain={[5, 10]} stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Legend verticalAlign="top" height={36}/>
              <ReferenceArea x1="Sep" x2="Oct" stroke="orange" strokeOpacity={0.3} label={{ value: "Midterms", position: "insideTop", fill: "#F97316", fontSize: 12 }} />
              <ReferenceArea x1="Dec" x2="Jan" stroke="red" strokeOpacity={0.3} label={{ value: "Finals", position: "insideTop", fill: "#EF4444", fontSize: 12 }}/>
              <Line type="monotone" dataKey="stress" name="Avg. Stress Level" stroke="#3A86FF" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-dark mb-4">Wellness by Department</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={departmentData} layout="vertical" margin={{top: 5, right: 20, left: 70, bottom: 5}}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={100} tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip cursor={{fill: '#f3f4f6'}} />
                        <Bar dataKey="wellness" name="Avg. Wellness Score" fill="#06D6A0" radius={[0, 8, 8, 0]} barSize={15} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-dark mb-4 flex items-center gap-2"><Lightbulb className="text-yellow-500" /> Actionable Insights</h2>
                <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-red-50/50 border border-red-200">
                        <p className="text-sm font-medium text-red-900"><span className="font-bold">Observation:</span> Stress levels in the <span className="font-bold">Medicine</span> cohort are notably high.</p>
                        <p className="text-sm text-red-900 mt-1"><span className="font-bold">Recommendation:</span> Deploy targeted workshops on burnout prevention and stress management.</p>
                    </div>
                     <div className="p-3 rounded-lg bg-green-50/50 border border-green-200">
                        <p className="text-sm font-medium text-green-900"><span className="font-bold">Observation:</span> High wellness scores in <span className="font-bold">Arts & Humanities</span>.</p>
                        <p className="text-sm text-green-900 mt-1"><span className="font-bold">Recommendation:</span> Leverage student ambassadors from this cohort for a campus-wide wellness campaign.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;