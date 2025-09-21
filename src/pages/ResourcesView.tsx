import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Music, FileText, Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';

type ResourceType = 'all' | 'audio' | 'articles' | 'games' | 'videos' | 'worksheets';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  thumbnail: string;
  url?: string;
  duration?: string;
  author?: string;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise',
    description: 'A quick guided breathing exercise to help reduce stress and anxiety.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&auto=format&fit=crop',
    duration: '5:12',
    author: 'Dr. Sarah Johnson',
    featured: true
  },
  {
    id: '2',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes, symptoms, and management strategies for anxiety.',
    type: 'articles',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=300&auto=format&fit=crop',
    author: 'Mental Health Foundation'
  },
  {
    id: '3',
    title: 'Emotional Intelligence Game',
    description: 'Interactive game to help identify and understand different emotions.',
    type: 'games',
    thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Audio guide for progressive muscle relaxation technique.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format&fit=crop',
    duration: '15:30',
    author: 'Mindfulness Institute'
  },
  {
    id: '5',
    title: 'Healthy Sleep Habits',
    description: 'Article on developing healthy sleep habits for better mental health.',
    type: 'articles',
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=300&auto=format&fit=crop',
    author: 'Sleep Research Center'
  },
  {
    id: '6',
    title: 'Mindfulness Meditation',
    description: 'Guided meditation for practicing mindfulness and present-moment awareness.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=300&auto=format&fit=crop',
    duration: '10:15',
    author: 'Zen Wellness'
  },
  {
    id: '7',
    title: 'Stress Management Techniques',
    description: 'Video tutorial on effective stress management techniques for students.',
    type: 'videos',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=300&auto=format&fit=crop',
    duration: '12:45',
    author: 'Student Wellness Program'
  },
  {
    id: '8',
    title: 'Cognitive Behavioral Therapy Basics',
    description: 'Introduction to CBT principles and how they can help manage negative thought patterns.',
    type: 'videos',
    thumbnail: 'https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=300&auto=format&fit=crop',
    duration: '18:30',
    author: 'Dr. Michael Chen',
    featured: true
  },
  {
    id: '9',
    title: 'Thought Record Worksheet',
    description: 'Printable worksheet to track and challenge negative thoughts.',
    type: 'worksheets',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=300&auto=format&fit=crop',
    author: 'Cognitive Therapy Center'
  },
  {
    id: '10',
    title: 'Gratitude Journal Template',
    description: 'Structured template for maintaining a daily gratitude practice.',
    type: 'worksheets',
    thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=300&auto=format&fit=crop',
    author: 'Positive Psychology Institute'
  },
  {
    id: '11',
    title: 'Exam Anxiety Management',
    description: 'Strategies specifically designed to help students manage exam-related anxiety.',
    type: 'articles',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=300&auto=format&fit=crop',
    author: 'Educational Psychology Department'
  },
  {
    id: '12',
    title: 'Mood Tracker Game',
    description: 'Interactive game that helps track and understand mood patterns over time.',
    type: 'games',
    thumbnail: 'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=300&auto=format&fit=crop',
    featured: true
  },
  {
    id: '13',
    title: 'Deep Sleep Soundscape',
    description: 'Calming audio designed to help you fall asleep faster and improve sleep quality.',
    type: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1455642305367-68834a9d4712?q=80&w=300&auto=format&fit=crop',
    duration: '45:00',
    author: 'Sleep Sound Lab'
  },
  {
    id: '14',
    title: 'Peer Support Training Video',
    description: 'Learn how to effectively support friends dealing with mental health challenges.',
    type: 'videos',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop',
    duration: '22:10',
    author: 'Peer Support Network'
  },
  {
    id: '15',
    title: 'Self-Care Assessment Worksheet',
    description: 'Evaluate your current self-care practices and identify areas for improvement.',
    type: 'worksheets',
    thumbnail: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=300&auto=format&fit=crop',
    author: 'Wellness Center'
  }
];

const ResourcesView = () => {
  const [activeFilter, setActiveFilter] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((resource) => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleResourceClick = (resource: Resource) => {
    toast.success(`Opening: ${resource.title}`);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          PsychoHub
        </h1>
        <p className="text-neutral-medium">
          Explore our curated collection of mental wellness resources.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-medium" />
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Featured Resources */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-neutral-dark mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources
            .filter(resource => resource.featured)
            .map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                onClick={() => handleResourceClick(resource)}
                featured={true}
              />
            ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <FilterButton 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
          icon={<BookOpen className="h-4 w-4" />}
          label="All"
        />
        <FilterButton 
          active={activeFilter === 'audio'} 
          onClick={() => setActiveFilter('audio')}
          icon={<Music className="h-4 w-4" />}
          label="Relaxation Audio"
        />
        <FilterButton 
          active={activeFilter === 'articles'} 
          onClick={() => setActiveFilter('articles')}
          icon={<FileText className="h-4 w-4" />}
          label="Articles"
        />
        <FilterButton 
          active={activeFilter === 'games'} 
          onClick={() => setActiveFilter('games')}
          icon={<Gamepad2 className="h-4 w-4" />}
          label="EQ Games"
        />
        <FilterButton 
          active={activeFilter === 'videos'} 
          onClick={() => setActiveFilter('videos')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>}
          label="Videos"
        />
        <FilterButton 
          active={activeFilter === 'worksheets'} 
          onClick={() => setActiveFilter('worksheets')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
          label="Worksheets"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources
          .filter(resource => !resource.featured || activeFilter !== 'all')
          .map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onClick={() => handleResourceClick(resource)} 
            />
          ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-medium">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const FilterButton = ({ active, onClick, icon, label }: FilterButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
      active
        ? 'bg-primary text-white'
        : 'bg-neutral-light text-neutral-medium hover:bg-neutral-200'
    }`}
  >
    {icon}
    {label}
  </motion.button>
);

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
  featured?: boolean;
}

const ResourceCard = ({ resource, onClick, featured = false }: ResourceCardProps) => {
  const typeIcons = {
    audio: <Music className="h-4 w-4" />,
    articles: <FileText className="h-4 w-4" />,
    games: <Gamepad2 className="h-4 w-4" />,
    videos: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>,
    worksheets: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  };

  const typeLabels = {
    audio: 'Audio',
    articles: 'Article',
    games: 'Game',
    videos: 'Video',
    worksheets: 'Worksheet',
  };
  
  const typeColors = {
    audio: 'bg-blue-100 text-blue-700',
    articles: 'bg-green-100 text-green-700',
    games: 'bg-purple-100 text-purple-700',
    videos: 'bg-red-100 text-red-700',
    worksheets: 'bg-amber-100 text-amber-700',
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)' }}
      className={`bg-white rounded-xl overflow-hidden border ${featured ? 'border-primary/30 shadow-md' : 'border-gray-100 shadow-sm'}`}
    >
      <div className="relative">
        <div 
          className="h-40 bg-neutral-light bg-cover bg-center" 
          style={{ backgroundImage: `url(${resource.thumbnail})` }}
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        {resource.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {resource.duration}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${resource.type in typeColors ? typeColors[resource.type as keyof typeof typeColors] : 'bg-gray-100 text-gray-700'}`}>
            {resource.type in typeIcons && typeIcons[resource.type as keyof typeof typeIcons]}
            {resource.type in typeLabels && typeLabels[resource.type as keyof typeof typeLabels]}
          </span>
          {resource.author && (
            <span className="text-xs text-neutral-medium">{resource.author}</span>
          )}
        </div>
        <h3 className="font-bold text-neutral-dark mb-1">{resource.title}</h3>
        <p className="text-sm text-neutral-medium mb-4">{resource.description}</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={`w-full py-2 rounded-lg ${featured ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} font-medium text-sm hover:bg-primary/90 hover:text-white`}
        >
          Open Resource
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResourcesView;