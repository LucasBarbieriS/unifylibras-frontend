import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans flex flex-col">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 UnifyLibras. Acessibilidade para todos.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
