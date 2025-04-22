
import React from 'react';
import Layout from '../components/Layout';
import { Eye, Globe, Star } from 'lucide-react';

const Vision = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Nuestra Visión
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Hacia dónde nos dirigimos como Federación
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in order-2 lg:order-1">
            <h2 className="section-title mb-8">Una Mirada al Futuro</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              La Federación de Levantamiento de Pesas de Nicaragua aspira a ser reconocida como una de las organizaciones deportivas más exitosas y respetadas 
              a nivel regional e internacional, estableciendo a Nicaragua como potencia en el levantamiento de pesas.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Visualizamos un futuro donde el levantamiento de pesas sea uno de los deportes más populares y practicados en Nicaragua, 
              con infraestructura moderna en cada departamento del país y un sistema de desarrollo de talentos que identifique y cultive sistemáticamente a los futuros campeones.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Nuestra visión también incluye la formación de atletas que no solo destaquen en competencias internacionales, sino que se conviertan en 
              embajadores de este deporte y modelos a seguir para las futuras generaciones de nicaragüenses.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80" 
                alt="Visión deportiva" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent rounded-lg flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">El Futuro es Dorado</h3>
                  <p className="opacity-90">
                    Cada entrenamiento nos acerca más a nuestra visión de excelencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Objectives */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Objetivos de Nuestra Visión
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-gold mb-6 flex justify-center">
                <Star size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 text-center">Excelencia Deportiva</h3>
              <p className="text-gray-600 text-center">
                Conseguir al menos una medalla olímpica para Nicaragua en los próximos ciclos olímpicos y posicionar a nuestros atletas entre los mejores del continente.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-gold mb-6 flex justify-center">
                <Globe size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 text-center">Expansión Nacional</h3>
              <p className="text-gray-600 text-center">
                Establecer centros de entrenamiento especializados en todos los departamentos del país, garantizando acceso universal al deporte.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-gold mb-6 flex justify-center">
                <Eye size={48} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 text-center">Reconocimiento Global</h3>
              <p className="text-gray-600 text-center">
                Ser anfitriones de competencias internacionales de primer nivel y tener representación en los principales organismos internacionales del deporte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl font-bold text-navy mb-8">Nuestra Declaración de Visión</h2>
          <div className="bg-navy text-white p-8 rounded-lg shadow-lg">
            <p className="text-xl italic">
              "Ser la federación deportiva líder en Nicaragua, reconocida internacionalmente por la excelencia de nuestros atletas y la calidad de nuestros programas de desarrollo, 
              convirtiendo al levantamiento de pesas en un pilar fundamental del deporte nicaragüense y un símbolo de orgullo nacional."
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Vision;
