import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SketchPage from './pages/SketchPage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import Layout from './components/Layout';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sketch/:id" element={<SketchPage />} />
        <Route path="/sketch/:id/learn" element={<LearnPage />} />
        <Route path="/sketch/:id/practice" element={<PracticePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}
