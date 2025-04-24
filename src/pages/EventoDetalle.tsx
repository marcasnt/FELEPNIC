import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { upcomingEvents } from '../data/eventos';
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight } from 'lucide-react';

const EventoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const event = upcomingEvents.find(e => String(e.id) === id);

  if (!event) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
        <Link to="/eventos" className="btn-primary inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <Link to="/eventos" className="text-navy font-semibold flex items-center hover:text-gold transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Eventos
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={event.image} alt={event.title} className="w-full h-96 object-cover rounded-lg shadow-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-navy mb-4">{event.title}</h1>
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
          <p className="text-gray-700 mb-6">{event.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link to={`/registro-evento/${event.id}`} className="btn-secondary flex items-center">
              Registrarse <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoDetalle;
