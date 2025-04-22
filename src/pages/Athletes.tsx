import React, { useEffect, useState } from 'react';
import { athleteService } from '../services/athleteService';
import type { Athlete } from '../lib/supabase';
import Layout from '../components/Layout';

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAthletes();
  }, []);

  const loadAthletes = async () => {
    try {
      const data = await athleteService.getAllAthletes();
      setAthletes(data);
    } catch (err) {
      setError('Error al cargar los atletas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Atletas Registrados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {athletes.map((athlete) => (
            <div 
              key={athlete.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {athlete.first_name} {athlete.last_name}
              </h2>
              <p className="text-gray-600 mb-1">Categoría: {athlete.weight_category}</p>
              <p className="text-gray-600 mb-1">ID Federación: {athlete.federation_id || 'N/A'}</p>
              <p className="text-gray-600">Club: {athlete.club || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Athletes;
