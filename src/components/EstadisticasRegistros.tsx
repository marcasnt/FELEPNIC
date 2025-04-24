import React from 'react';
import GraficosRegistros from './GraficosRegistros';

interface EstadisticasProps {
  registros: Array<{
    evento_id: number;
    evento_titulo: string;
    club: string;
    categoria: string;
  }>;
  eventos: Array<{ id: number; title: string }>;
}

// Agrupa los registros por evento y club
function getStats(registros: EstadisticasProps['registros'], eventos: EstadisticasProps['eventos']) {
  const porEvento: Record<number, number> = {};
  const porClub: Record<string, number> = {};

  registros.forEach(r => {
    porEvento[r.evento_id] = (porEvento[r.evento_id] || 0) + 1;
    porClub[r.club] = (porClub[r.club] || 0) + 1;
  });

  return {
    porEvento,
    porClub,
  };
}

const EstadisticasRegistros: React.FC<EstadisticasProps> = ({ registros, eventos }) => {
  const stats = getStats(registros, eventos);
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-2 text-navy">Estadísticas de Inscripciones</h3>
      <GraficosRegistros registros={registros} eventos={eventos} />
      {/* Listados numéricos clásicos, si quieres conservarlos:
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Inscritos por Evento</h4>
          <ul className="list-disc ml-6">
            {eventos.map(ev => (
              <li key={ev.id}>
                {ev.title}: <span className="font-bold">{stats.porEvento[ev.id] || 0}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Inscritos por Club</h4>
          <ul className="list-disc ml-6">
            {Object.entries(stats.porClub).map(([club, count]) => (
              <li key={club}>
                {club}: <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      */}
    </div>
  );
};

export default EstadisticasRegistros;
