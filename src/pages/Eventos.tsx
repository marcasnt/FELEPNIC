import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { upcomingEvents } from '../data/eventos';

const Eventos = () => {

  const pastEvents = [
    {
      id: 4,
      title: "Campeonato Nacional 2024",
      date: "12 de Diciembre, 2024",
      location: "Managua, Nicaragua",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 5,
      title: "Torneo Interuniversitario 2024",
      date: "30 de Octubre, 2024",
      location: "León, Nicaragua",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 6,
      title: "Juegos Centroamericanos 2024",
      date: "15 de Agosto, 2024",
      location: "San Salvador, El Salvador",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 7,
      title: "Copa Invitacional 2024",
      date: "5 de Junio, 2024",
      location: "Granada, Nicaragua",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Eventos
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Calendario de competencias nacionales e internacionales
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-container">
        <h2 className="section-title mb-12">Próximos Eventos</h2>

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
                    Registrarse <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-8 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Calendario Anual 2025
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8">
            Consulta nuestro calendario anual para planificar tu participación en los eventos de la federación.
            Recuerda que las fechas pueden estar sujetas a cambios, por lo que te recomendamos verificar regularmente esta información.
          </p>
          <a href="#" className="btn-primary inline-flex items-center">
            Descargar Calendario Completo <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-container">
        <h2 className="section-title mb-12">Eventos Pasados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {pastEvents.map((event, index) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-200 hover:shadow-2xl hover:scale-[1.01]">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover transition-all duration-200 hover:brightness-105" />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Calendar size={20} className="text-navy" />
                  {event.title}
                </h3>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-navy mb-2">{event.title}</h3>
                <div className="flex flex-col space-y-1 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gold" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gold" />
                    {event.location}
                  </div>
                </div>
                <a href={`/galeria?evento=${event.id}`} className="text-navy font-semibold flex items-center hover:text-gold transition-colors text-sm">
                  Ver Galería de Fotos <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/galeria" className="btn-primary">
            Ver Todas las Galerías
          </a>
        </div>
      </section>

      {/* Event Registration CTA */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            ¿Quieres participar en nuestros eventos?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Regístrate como atleta para recibir información actualizada sobre las próximas competencias y procesos de inscripción.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="/atletas" className="btn-secondary">
              Registro de Atletas
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Eventos;
