import { Routes, Route, useLocation  } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import CounsellorPortal from './pages/CounsellorPortal';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

// Import view components
import DashboardView from './pages/DashboardView';
import ChatbotView from './pages/ChatbotView';
import ResourcesView from './pages/ResourcesView';
import BookingView from './pages/BookingView';
import SupportView from './pages/SupportView';
import ToolsView from './pages/ToolsView';

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/chat" element={<ChatbotView />} />
            <Route path="/resources" element={<ResourcesView />} />
            <Route path="/booking" element={<BookingView />} />
            <Route path="/support" element={<SupportView />} />
            <Route path="/tools" element={<ToolsView />} />
            <Route path="/counsellor" element={<CounsellorPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;