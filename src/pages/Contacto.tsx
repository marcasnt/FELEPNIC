
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí iría la lógica para enviar los datos al servidor
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    }, 5000);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Contáctanos
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Estamos aquí para atender tus consultas y comentarios
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-navy rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Dirección</h3>
              <p className="text-gray-700">Restaurante la plancha 1 c al norte</p>
              <p className="text-gray-700">Altamira, Gimnasio Altamira</p>
              <p className="text-gray-700">Managua, Nicaragua</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-navy rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Teléfono</h3>
              <p className="text-gray-700">+505 1234-5678</p>
              <p className="text-gray-700">+505 8765-4321</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-navy rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Correo Electrónico</h3>
              <p className="text-gray-700">info@felepnic.org.ni</p>
              <p className="text-gray-700">contacto@felepnic.org.ni</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-navy rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Horario de Atención</h3>
              <p className="text-gray-700">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
              <p className="text-gray-700">Sábado: 8:00 AM - 12:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-in">
            <h2 className="section-title mb-8">Envíanos un Mensaje</h2>
            
            {submitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 h-12 w-12 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje Enviado Exitosamente!</h3>
                    <p className="text-green-700">
                      Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    required
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
                  ></textarea>
                </div>
                
                <div>
                  <button type="submit" className="btn-primary flex items-center">
                    Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="section-title mb-8">Nuestra Ubicación</h2>
            <div className="rounded-lg overflow-hidden shadow-xl h-96">
              {/* Mapa de Google (iframe) con la nueva dirección */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.8882268512383!2d-86.2673908!3d12.1148219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7155e475d7b147%3A0xd3dbd8fb5814c5c8!2sAltamira%2C%20Managua!5e0!3m2!1ses!2sni!4v1681824124995!5m2!1ses!2sni" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-bold text-navy mb-2">¿Cómo puedo afiliarme a la federación?</h3>
              <p className="text-gray-700">
                Para afiliarte, debes completar el formulario de registro de atletas y presentar los documentos requeridos en nuestras oficinas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-bold text-navy mb-2">¿Cuál es el costo de la afiliación?</h3>
              <p className="text-gray-700">
                La cuota de afiliación anual es de aproximadamente C$500 para atletas y varía para clubes y asociaciones.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-bold text-navy mb-2">¿Ofrecen programas para principiantes?</h3>
              <p className="text-gray-700">
                Sí, contamos con programas de iniciación deportiva para todas las edades, con entrenadores certificados.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-bold text-navy mb-2">¿Cómo puedo participar en competencias?</h3>
              <p className="text-gray-700">
                Debes estar afiliado a la federación y cumplir con los requisitos específicos de cada evento.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-700 mb-4">
              ¿No encuentras respuesta a tu pregunta? Contáctanos directamente.
            </p>
            <a href="tel:+50512345678" className="btn-primary">
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
