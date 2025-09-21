import { Routes, Route, useLocation  } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import CounsellorPortal from './pages/CounsellorPortal';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/counsellor" element={<CounsellorPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;