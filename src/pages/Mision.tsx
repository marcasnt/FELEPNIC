
import React from 'react';
import Layout from '../components/Layout';
import { Target, Award, Users } from 'lucide-react';

const Mision = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Nuestra Misión
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Promoviendo la excelencia en el levantamiento de pesas nicaragüense
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 animate-slide-in">
            <h2 className="section-title mb-8">Nuestra Misión y Propósito</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              La Federación de Levantamiento de Pesas de Nicaragua tiene como misión promover, desarrollar y regular el deporte del levantamiento de pesas en todo el territorio nacional, 
              fomentando su práctica en todas las edades y niveles, desde la iniciación hasta el alto rendimiento.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Trabajamos para democratizar el acceso a este deporte olímpico, proporcionando oportunidades de crecimiento a todos los atletas, independientemente de su origen o condición socioeconómica, 
              mientras velamos por la integridad y los valores del levantamiento de pesas.
            </p>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Nos comprometemos a formar no solo atletas de élite que representen dignamente a Nicaragua en competencias internacionales, 
              sino también ciudadanos íntegros con valores de disciplina, perseverancia, trabajo en equipo y espíritu deportivo.
            </p>

            <div className="bg-cream p-6 rounded-lg border-l-4 border-gold mb-8">
              <blockquote className="text-navy italic text-lg">
                "Nuestra mayor misión es transformar el esfuerzo y la disciplina en oportunidades de desarrollo personal y profesional para cada atleta nicaragüense."
              </blockquote>
              <p className="text-right mt-2 text-gray-700 font-medium">- Presidente de FELEPNIC</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" 
                alt="Atletas entrenando" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Pilares de Nuestra Misión</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-navy rounded-full p-2 text-white mr-4 mt-1">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-navy">Desarrollo Técnico</h4>
                      <p className="text-gray-600">
                        Mejorar constantemente el nivel técnico de atletas, entrenadores y jueces.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-navy rounded-full p-2 text-white mr-4 mt-1">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-navy">Excelencia Competitiva</h4>
                      <p className="text-gray-600">
                        Formar atletas de alto rendimiento para competencias internacionales.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-navy rounded-full p-2 text-white mr-4 mt-1">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-navy">Inclusión y Acceso</h4>
                      <p className="text-gray-600">
                        Garantizar que el deporte sea accesible en todas las regiones del país.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mision;
