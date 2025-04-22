
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeft, LogOut } from 'lucide-react';

// Extiende el tipo Window para evitar errores de TS
declare global {
  interface Window {
    supabase?: any;
  }
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar si estamos en AthleteManagement para mostrar los botones especiales
  const isAthletePanel = location.pathname.includes('athlete');

  // Cerrar sesión con supabase
  const handleLogout = async () => {
    if (window.confirm('¿Seguro que deseas cerrar sesión?')) {
      try {
        const { error } = await window.supabase?.auth?.signOut?.() || {};
        if (error) throw error;
      } catch (e) {
        // Si no hay window.supabase, recarga igual
      }
      navigate('/atleta-login');
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center relative">
          <Link to="/" className="flex items-center">
            <span className={`font-bold text-xl md:text-2xl ${scrolled ? 'text-navy' : 'text-white'}`}>FELEPNIC</span>
          </Link>

          {/* Botones especiales para panel de atletas */}
          

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${scrolled ? 'text-navy' : 'text-white'}`}>Inicio</Link>
            <div className="relative group">
              <button className={`nav-link flex items-center ${scrolled ? 'text-navy' : 'text-white'}`}>
                Acerca <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left z-50">
                <Link to="/mision" className="block px-4 py-2 hover:bg-cream transition-colors">Misión</Link>
                <Link to="/vision" className="block px-4 py-2 hover:bg-cream transition-colors">Visión</Link>
                <Link to="/historia" className="block px-4 py-2 hover:bg-cream transition-colors">Historia</Link>
              </div>
            </div>
            <Link to="/eventos" className={`nav-link ${scrolled ? 'text-navy' : 'text-white'}`}>Eventos</Link>
            <Link to="/galeria" className={`nav-link ${scrolled ? 'text-navy' : 'text-white'}`}>Galería</Link>
            <Link to="/registro-atleta" className={`nav-link ${scrolled ? 'text-navy' : 'text-white'}`}>Registro</Link>
            <Link to="/contacto" className={`nav-link ${scrolled ? 'text-navy' : 'text-white'}`}>Contacto</Link>
            <Link 
              to="/atleta-login" 
              className={`px-4 py-2 rounded-md ${
                scrolled 
                  ? 'bg-navy text-white hover:bg-navy/90' 
                  : 'bg-white text-navy hover:bg-cream'
              } transition-colors font-medium`}
            >
              Acceder
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${scrolled ? 'text-navy' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white w-full shadow-lg transform transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          <Link to="/" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Inicio</Link>
          <div className="border-t border-gray-100 pt-2">
            <Link to="/mision" className="block nav-link py-2 pl-4" onClick={() => setIsOpen(false)}>Misión</Link>
            <Link to="/vision" className="block nav-link py-2 pl-4" onClick={() => setIsOpen(false)}>Visión</Link>
            <Link to="/historia" className="block nav-link py-2 pl-4" onClick={() => setIsOpen(false)}>Historia</Link>
          </div>
          <Link to="/eventos" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Eventos</Link>
          <Link to="/galeria" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Galería</Link>
          <Link to="/registro-atleta" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Registro</Link>
          <Link to="/contacto" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Contacto</Link>
          <Link 
            to="/atleta-login" 
            className="block bg-navy text-white py-2 px-4 rounded-md text-center font-medium" 
            onClick={() => setIsOpen(false)}
          >
            Acceder
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
