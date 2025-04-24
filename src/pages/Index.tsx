// Forzar redeploy en Vercel
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Trophy, Users, Calendar, Medal, ArrowRight, LineChart, Award, User, MapPin, Clock } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import { upcomingEvents } from '../data/eventos';

// Duplicamos los logos base para crear un efecto de desplazamiento infinito
const baseLogos = [
  { src: '/logos/comite-olimpico.png', alt: 'Comité Olímpico Nicaragüense' },
  { src: '/logos/iwf.png', alt: 'International Weightlifting Federation' },
  { src: '/logos/ind.png', alt: 'Instituto Nicaragüense de Deportes' },
  { src: '/logos/pawf.png', alt: 'Panamerican Weightlifting Federation' },
  { src: '/logos/ordeca.png', alt: 'Organización Deportiva Centroamericana' },
  { src: '/logos/olympic-games.png', alt: 'Juegos Olímpicos' },
];

const LogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    skipSnaps: true,
  });

  // Autoplay effect with pause functionality
  useEffect(() => {
    if (!emblaApi) return;

    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Velocidad del desplazamiento (3 segundos)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [emblaApi, isPaused]);

  // Duplicamos los logos para crear un efecto de desplazamiento infinito
  const logos = [...baseLogos, ...baseLogos];

  return (
    <div 
      className="overflow-hidden" 
      ref={emblaRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex gap-12 py-8 animate-scroll">
        {logos.map((logo, index) => (
          <div key={index} className="flex-[0_0_250px] min-w-0">
            <div className="h-32 bg-gray-50/50 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-navy"
      >
        <div className="container mx-auto px-4 py-20 text-center text-white z-10">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/46d2fdaf-6ca3-4eb7-bf8e-5741f2b23941.png" 
              alt="FELEPNIC Logo" 
              className="h-48 w-48 object-contain animate-fade-in"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Federación de <span className="text-gold font-extrabold">Levantamiento de Pesas</span> de Nicaragua
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Formando campeones, construyendo futuro. Excelencia y disciplina en cada levantamiento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contacto" className="bg-white text-navy font-semibold px-6 py-3 rounded-lg transform hover:scale-105 transition-transform">
              Contacto
            </Link>
            <Link to="/registro-atleta" className="btn-secondary transform hover:scale-105 transition-transform">
              Registro de Atletas
            </Link>
          </div>
        </div>
      </section>

      {/* Logos Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">¿Quiénes nos avalan?</h2>
          <LogoCarousel />
        </div>
      </section>

      {/* About Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h2 className="section-title mb-6">Sobre Nosotros</h2>
            <p className="text-gray-700 mb-4">
              La Federación de Levantamiento de Pesas de Nicaragua (FELEPNIC) es el organismo rector de este deporte olímpico en el país, 
              dedicada a la promoción, desarrollo y organización de competencias a nivel nacional e internacional.
            </p>
            <p className="text-gray-700 mb-6">
              Nuestro compromiso es fomentar el crecimiento del deporte, descubrir nuevos talentos y apoyar a nuestros atletas 
              para que alcancen su máximo potencial en la escena deportiva mundial.
            </p>
            <div className="flex gap-4">
              <Link to="/mision" className="text-navy font-semibold flex items-center hover:text-gold transition-colors">
                Nuestra Misión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/vision" className="text-navy font-semibold flex items-center hover:text-gold transition-colors">
                Nuestra Visión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img 
              src="/lovable-uploads/sobrenosotros.jpg"
              alt="Levantamiento de pesas" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Athlete Access Section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Acceso para Atletas
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="text-gold">
                <User size={80} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-navy mb-2">Portal de Atletas</h3>
                <p className="text-gray-600 mb-4">
                  Accede a tu perfil para consultar tus estadísticas, historial de competencias y logros deportivos. 
                  Mantén actualizada tu información y sigue tu progreso en cada evento.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-cream/50 p-4 rounded-lg text-center">
                <LineChart className="h-12 w-12 mx-auto text-navy mb-2" />
                <h4 className="font-semibold text-navy">Estadísticas</h4>
                <p className="text-sm text-gray-600">Consulta tu rendimiento</p>
              </div>
              <div className="bg-cream/50 p-4 rounded-lg text-center">
                <Calendar className="h-12 w-12 mx-auto text-navy mb-2" />
                <h4 className="font-semibold text-navy">Eventos</h4>
                <p className="text-sm text-gray-600">Historial de competencias</p>
              </div>
              <div className="bg-cream/50 p-4 rounded-lg text-center">
                <Award className="h-12 w-12 mx-auto text-navy mb-2" />
                <h4 className="font-semibold text-navy">Logros</h4>
                <p className="text-sm text-gray-600">Medallas y reconocimientos</p>
              </div>
            </div>
            <div className="text-center">
              <Link to="/atleta-login" className="btn-primary inline-flex items-center">
                Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Por Qué Elegirnos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-gold mb-4 flex justify-center">
                <Trophy size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 text-center">Reconocimiento Internacional</h3>
              <p className="text-gray-600 text-center">
                Afiliados a organizaciones internacionales de levantamiento de pesas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-gold mb-4 flex justify-center">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 text-center">Entrenadores Calificados</h3>
              <p className="text-gray-600 text-center">
                Staff técnico de primer nivel con certificaciones internacionales.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-gold mb-4 flex justify-center">
                <Calendar size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 text-center">Eventos Regulares</h3>
              <p className="text-gray-600 text-center">
                Organizamos competencias nacionales e internacionales durante todo el año.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-gold mb-4 flex justify-center">
                <Medal size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 text-center">Atletas Destacados</h3>
              <p className="text-gray-600 text-center">
                Nuestros atletas han representado a Nicaragua en competencias internacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="section-container">
        <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
          Próximos Eventos
        </h2>
        <div className="space-y-12">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center border-b border-gray-200 pb-12 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="lg:col-span-2">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-3">
                <h3 className="text-2xl font-bold text-navy mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-gold" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-gold" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-gold" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2 text-gold" />
                    {event.participants}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/eventos/${event.id}`} className="btn-primary">
                    Ver Detalles
                  </Link>
                  <Link to={`/registro-evento/${event.id}`} className="btn-secondary flex items-center">
                    Registrarse <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/eventos" className="btn-primary inline-flex items-center">
            Ver Todos los Eventos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            ¿Listo para formar parte de nuestra federación?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Únete a la Federación de Levantamiento de Pesas de Nicaragua y sé parte de nuestro equipo de campeones.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contacto" className="bg-white text-navy hover:bg-cream px-6 py-3 rounded-md font-semibold transition-all transform hover:scale-105">
              Contáctanos
            </Link>
            <Link to="/atletas" className="bg-gold text-navy hover:bg-gold/90 px-6 py-3 rounded-md font-semibold transition-all transform hover:scale-105">
              Regístrate como Atleta
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
