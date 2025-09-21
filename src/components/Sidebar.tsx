import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, BookOpen, Calendar, Users, MessageSquareWarning, Music, UserPlus, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'Vritti AI' },
  { to: '/resources', icon: BookOpen, label: 'Resource Vault' },
  { to: '/booking', icon: Calendar, label: 'Book a Session' },
  { to: '/support', icon: Users, label: 'Support Network' },
  { to: '/complaint', icon: MessageSquareWarning, label: 'Complaint Box' },
  { to: '/spotify', icon: Music, label: 'Mood Playlist' },
  { to: '/volunteer', icon: UserPlus, label: 'Volunteer' },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-20 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Vritti Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">Vritti</span>
        </NavLink>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-neutral-medium hover:bg-neutral-light'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* <div className="p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg font-medium"
        >
          <AlertOctagon className="h-5 w-5" />
          <span>SOS/Crisis Support</span>
        </motion.button>
      </div> */}
    </aside>
  );
};

export default Sidebar;