import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SketchPage from './pages/SketchPage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sketch/:id" element={<SketchPage />} />
        <Route path="/sketch/:id/learn" element={<LearnPage />} />
        <Route path="/sketch/:id/practice" element={<PracticePage />} />
      </Routes>
    </Layout>
  );
}
