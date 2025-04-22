
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { X } from 'lucide-react';

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const events = [
    {
      id: 1,
      title: "Campeonato Nacional 2024",
      date: "Diciembre 2024",
      images: [
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1542466500-dccb2789cbbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80",
        "https://images.unsplash.com/photo-1591940742878-13aba4b7a585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      ]
    },
    {
      id: 2,
      title: "Torneo Interuniversitario 2024",
      date: "Octubre 2024",
      images: [
        "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      ]
    },
    {
      id: 3,
      title: "Juegos Centroamericanos 2024",
      date: "Agosto 2024",
      images: [
        "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=894&q=80"
      ]
    },
    {
      id: 4,
      title: "Copa Invitacional 2024",
      date: "Junio 2024",
      images: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        "https://images.unsplash.com/photo-1603233720024-4ee0904089c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80"
      ]
    }
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Galería de Fotos
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Momentos memorables de nuestros eventos y competencias
          </p>
        </div>
      </section>

      {/* Gallery by Event */}
      <section className="section-container">
        <div className="space-y-16">
          {events.map((event, eventIndex) => (
            <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${0.1 * eventIndex}s` }}>
              <h2 className="section-title mb-8">{event.title}</h2>
              <p className="text-gray-600 mb-6">{event.date}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.images.map((image, imageIndex) => (
                  <div 
                    key={imageIndex} 
                    className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleImageClick(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${event.title} - Imagen ${imageIndex + 1}`} 
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={closeModal}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Imagen ampliada" 
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-6 animate-fade-in">¿Quieres ver más fotos?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Síguenos en nuestras redes sociales para acceder a galerías extendidas y contenido exclusivo de todos nuestros eventos.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
              className="btn-primary">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
              className="btn-secondary">
              Instagram
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Galeria;
