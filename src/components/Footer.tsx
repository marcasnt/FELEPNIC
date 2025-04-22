
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FELEPNIC</h3>
            <p className="text-gray-300 mb-4">
              Federación de Levantamiento de Pesas de Nicaragua, promoviendo el deporte y formando campeones desde 1952.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors">Inicio</Link></li>
              <li><Link to="/mision" className="text-gray-300 hover:text-gold transition-colors">Misión</Link></li>
              <li><Link to="/vision" className="text-gray-300 hover:text-gold transition-colors">Visión</Link></li>
              <li><Link to="/historia" className="text-gray-300 hover:text-gold transition-colors">Historia</Link></li>
              <li><Link to="/eventos" className="text-gray-300 hover:text-gold transition-colors">Eventos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Más Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/galeria" className="text-gray-300 hover:text-gold transition-colors">Galería</Link></li>
              <li><Link to="/atletas" className="text-gray-300 hover:text-gold transition-colors">Atletas</Link></li>
              <li><Link to="/contacto" className="text-gray-300 hover:text-gold transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-gold" />
                <span className="text-gray-300">Restaurante la plancha 1 c al norte, Altamira, Gimnasio Altamira, Managua, Nicaragua</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gold" />
                <span className="text-gray-300">+505 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gold" />
                <span className="text-gray-300">info@felepnic.org.ni</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Federación de Levantamiento de Pesas de Nicaragua. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
