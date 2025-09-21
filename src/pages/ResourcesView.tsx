import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Music, FileText, Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';

type ResourceType = 'all' | 'audio' | 'articles' | 'games';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  thumbnail: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise',
    description: 'A quick guided breathing exercise to help reduce stress and anxiety.',
    type: 'audio',
    thumbnail: '/resources/breathing.jpg',
  },
  {
    id: '2',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes, symptoms, and management strategies for anxiety.',
    type: 'articles',
    thumbnail: '/resources/anxiety.jpg',
  },
  {
    id: '3',
    title: 'Emotional Intelligence Game',
    description: 'Interactive game to help identify and understand different emotions.',
    type: 'games',
    thumbnail: '/resources/eq-game.jpg',
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Audio guide for progressive muscle relaxation technique.',
    type: 'audio',
    thumbnail: '/resources/relaxation.jpg',
  },
  {
    id: '5',
    title: 'Healthy Sleep Habits',
    description: 'Article on developing healthy sleep habits for better mental health.',
    type: 'articles',
    thumbnail: '/resources/sleep.jpg',
  },
  {
    id: '6',
    title: 'Mindfulness Meditation',
    description: 'Guided meditation for practicing mindfulness and present-moment awareness.',
    type: 'audio',
    thumbnail: '/resources/meditation.jpg',
  },
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
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
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
}

const ResourceCard = ({ resource, onClick }: ResourceCardProps) => {
  const typeIcons = {
    audio: <Music className="h-4 w-4" />,
    articles: <FileText className="h-4 w-4" />,
    games: <Gamepad2 className="h-4 w-4" />,
  };

  const typeLabels = {
    audio: 'Audio',
    articles: 'Article',
    games: 'Game',
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
    >
      <div 
        className="h-40 bg-neutral-light bg-cover bg-center" 
        style={{ backgroundImage: `url(${resource.thumbnail})` }}
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            resource.type === 'audio' ? 'bg-blue-100 text-blue-700' :
            resource.type === 'articles' ? 'bg-green-100 text-green-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {resource.type in typeIcons && typeIcons[resource.type as keyof typeof typeIcons]}
            {resource.type in typeLabels && typeLabels[resource.type as keyof typeof typeLabels]}
          </span>
        </div>
        <h3 className="font-bold text-neutral-dark mb-1">{resource.title}</h3>
        <p className="text-sm text-neutral-medium mb-4">{resource.description}</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20"
        >
          Open Resource
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResourcesView;