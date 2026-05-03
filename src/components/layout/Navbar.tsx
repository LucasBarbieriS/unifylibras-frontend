import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, HandMetal, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkUser = () => {
    const saved = localStorage.getItem('user_name');
    setUser(saved);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('is_logged_in');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold text-xl">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <HandMetal size={24} />
          </div>
          <span>UnifyLibras</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-slate-600 dark:text-slate-300 font-medium">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Início</Link>
          <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Traduções</Link>
          <Link to="/support" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Suporte</Link>
          
          <div className="flex items-center gap-4 ml-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard?tab=profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.charAt(0)}
                    </div>
                    <span className="text-slate-900 dark:text-white font-bold hidden lg:inline">
                      Olá, <span className="text-blue-600 dark:text-blue-400">{user.split(' ')[0]}</span>
                    </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/20">
                Começar Agora
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-slate-600 dark:text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4 text-slate-600 dark:text-slate-300 font-medium">
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-500">Início</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-500">Dashboard</Link>
              <Link to="/support" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-500">Suporte</Link>
              <Link to="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-center">
                Começar Agora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
