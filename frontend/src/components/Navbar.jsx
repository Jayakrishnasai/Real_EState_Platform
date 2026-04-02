import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentBg = location.pathname === '/' && !isScrolled;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${transparentBg ? 'bg-transparent text-white' : 'bg-premium-900/95 backdrop-blur-md text-white shadow-lg'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <Home className="text-gold-500 w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-wider">AURA</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-sans">
            <Link to="/properties" className="hover:text-gold-500 transition-colors">Properties</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-gold-500 transition-colors">Dashboard</Link>
                <button onClick={logout} className="hover:text-gold-500 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gold-500 transition-colors">Login</Link>
                <Link to="/register" className="px-6 py-2 bg-gold-500 text-premium-900 font-semibold rounded-none hover:bg-gold-400 transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold-500">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-premium-900 border-t border-premium-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/properties" className="block px-3 py-2 text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Properties</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-white hover:text-gold-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 text-gold-500" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
