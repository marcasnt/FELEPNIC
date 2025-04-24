import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { upcomingEvents } from '../data/eventos';

interface Registro {
  id: number;
  evento_id: number;
  evento_titulo: string;
  nombre: string;
  email: string;
  categoria: string;
  club: string;
  telefono: string;
  registrado_en: string;
}

const EventosRegistroAdmin: React.FC = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistros = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('registro_eventos')
        .select('*')
        .order('registrado_en', { ascending: false });
      if (error) {
        setError('Error al cargar registros: ' + error.message);
      } else {
        setRegistros(data || []);
      }
      setLoading(false);
    };
    fetchRegistros();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-navy">Atletas registrados por evento</h2>
      {loading && <div>Cargando registros...</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      {upcomingEvents.map(evento => {
        const inscritos = registros.filter(r => r.evento_id === evento.id);
        return (
          <div key={evento.id} className="mb-8 border rounded-lg p-4 bg-white shadow">
            <h3 className="font-semibold text-lg text-navy mb-2">{evento.title}</h3>
            <div className="text-sm text-gray-500 mb-2">{evento.date} | {evento.location}</div>
            {inscritos.length === 0 ? (
              <div className="text-gray-500 italic">No hay atletas registrados para este evento.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-cream text-navy">
                      <th className="px-3 py-2 border">Nombre</th>
                      <th className="px-3 py-2 border">Email</th>
                      <th className="px-3 py-2 border">Categoría</th>
                      <th className="px-3 py-2 border">Club</th>
                      <th className="px-3 py-2 border">Teléfono</th>
                      <th className="px-3 py-2 border">Registrado en</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscritos.map(reg => (
                      <tr key={reg.id}>
                        <td className="border px-2 py-1">{reg.nombre}</td>
                        <td className="border px-2 py-1">{reg.email}</td>
                        <td className="border px-2 py-1">{reg.categoria}</td>
                        <td className="border px-2 py-1">{reg.club}</td>
                        <td className="border px-2 py-1">{reg.telefono}</td>
                        <td className="border px-2 py-1">{new Date(reg.registrado_en).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EventosRegistroAdmin;
