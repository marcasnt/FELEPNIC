
import React from 'react';
import Layout from '../components/Layout';
import { Clock, Flag, Award } from 'lucide-react';

const Historia = () => {
  const timelineEvents = [
    {
      year: "1952",
      title: "Fundación",
      description: "Se funda la Federación de Levantamiento de Pesas de Nicaragua con un pequeño grupo de entusiastas del deporte."
    },
    {
      year: "1960",
      title: "Primera Competencia Internacional",
      description: "Nicaragua participa por primera vez en una competencia internacional de levantamiento de pesas en Guatemala."
    },
    {
      year: "1975",
      title: "Reconocimiento Oficial",
      description: "La federación recibe reconocimiento oficial por parte del Comité Olímpico de Nicaragua."
    },
    {
      year: "1982",
      title: "Primeras Medallas Centroamericanas",
      description: "Atletas nicaragüenses ganan sus primeras medallas en los Juegos Centroamericanos."
    },
    {
      year: "1995",
      title: "Expansión Nacional",
      description: "Se establecen filiales de la federación en los principales departamentos del país."
    },
    {
      year: "2007",
      title: "Primer Medallista Panamericano",
      description: "Nicaragua consigue su primera medalla en los Juegos Panamericanos en la disciplina de halterofilia."
    },
    {
      year: "2016",
      title: "Primera Participación Olímpica",
      description: "Un atleta nicaragüense de levantamiento de pesas clasifica por méritos propios a los Juegos Olímpicos."
    },
    {
      year: "2023",
      title: "Actualidad",
      description: "La federación continúa creciendo y formando nuevos talentos con miras a los próximos Juegos Olímpicos."
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Nuestra Historia
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            El legado de la halterofilia nicaragüense a través de los años
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 animate-slide-in">
            <h2 className="section-title mb-6">Los Inicios de Nuestra Federación</h2>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              La historia de la Federación de Levantamiento de Pesas de Nicaragua comienza en 1952, cuando un grupo de entusiastas del deporte decidió 
              formalizar la práctica de la halterofilia en el país. Desde sus humildes comienzos, con apenas unos pocos equipos rudimentarios y un 
              puñado de practicantes, la federación ha evolucionado hasta convertirse en una de las organizaciones deportivas más respetadas del país.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Durante las décadas siguientes, y a pesar de los desafíos económicos y políticos que enfrentó Nicaragua, el espíritu de superación 
              de nuestros atletas nunca se apagó. La federación siguió creciendo, organizando competencias locales y fomentando la práctica del deporte 
              en diferentes regiones del país.
            </p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
              alt="Historia del levantamiento de pesas" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Línea de Tiempo Histórica
          </h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-navy"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'} animate-fade-in`} style={{ animationDelay: `${0.1 * index}s` }}>
                    <h3 className="text-2xl font-bold text-navy">{event.title}</h3>
                    <div className="text-gold font-bold text-xl mb-2">{event.year}</div>
                    <p className="text-gray-700">{event.description}</p>
                  </div>

                  <div className="z-10 flex items-center justify-center w-10 h-10 bg-gold rounded-full border-4 border-white shadow-md animate-fade-in" style={{ animationDelay: `${0.1 * index + 0.05}s` }}>
                    {index === 0 ? (
                      <Flag className="w-5 h-5 text-navy" />
                    ) : index === timelineEvents.length - 1 ? (
                      <Award className="w-5 h-5 text-navy" />
                    ) : (
                      <Clock className="w-5 h-5 text-navy" />
                    )}
                  </div>

                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12 text-right'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="section-container">
        <h2 className="section-title mb-12 text-center mx-auto after:left-1/2 after:-translate-x-1/2">
          Figuras Históricas Destacadas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: `${0.1 * item}s` }}>
              <div className="h-64 overflow-hidden">
                <img 
                  src={`https://source.unsplash.com/random/600x400?athlete,${item}`} 
                  alt={`Atleta destacado ${item}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">
                  {item === 1 ? "Carlos Rodríguez" : item === 2 ? "María Martínez" : "Roberto López"}
                </h3>
                <p className="text-gold font-medium mb-4">
                  {item === 1 ? "Fundador y Primer Presidente (1952-1968)" : item === 2 ? "Primera Medallista Internacional (1970-1985)" : "Entrenador Histórico (1975-2010)"}
                </p>
                <p className="text-gray-600">
                  {item === 1 
                    ? "Pionero del levantamiento de pesas en Nicaragua, estableció las bases de la federación y gestionó su primer reconocimiento internacional." 
                    : item === 2 
                    ? "Primera atleta nicaragüense en obtener una medalla internacional, abriendo camino para las mujeres en este deporte." 
                    : "Formó a varias generaciones de atletas y desarrolló metodologías de entrenamiento adaptadas a las condiciones de Nicaragua."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legacy Section */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
            Nuestro Legado Continúa
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Hoy, la Federación de Levantamiento de Pesas de Nicaragua sigue construyendo sobre los cimientos establecidos por nuestros predecesores,
            honrando su legado y trabajando para alcanzar nuevas alturas en el deporte nacional e internacional.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="/galeria" className="btn-secondary">
              Explora Nuestra Galería Histórica
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Historia;
