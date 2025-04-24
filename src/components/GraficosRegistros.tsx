import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface GraficosProps {
  registros: Array<{
    evento_id: number;
    evento_titulo: string;
    club: string;
    categoria: string;
  }>;
  eventos: Array<{ id: number; title: string }>;
}

const COLORS = ['#003366', '#FFD700', '#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#FF4444', '#AA66CC'];

function getBarDataPorEvento(registros: GraficosProps['registros'], eventos: GraficosProps['eventos']) {
  const counts: Record<number, number> = {};
  registros.forEach(r => {
    counts[r.evento_id] = (counts[r.evento_id] || 0) + 1;
  });
  return eventos.map(ev => ({ name: ev.title, Inscritos: counts[ev.id] || 0 }));
}

function getPieDataPorClub(registros: GraficosProps['registros']) {
  const counts: Record<string, number> = {};
  registros.forEach(r => {
    counts[r.club] = (counts[r.club] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

const GraficosRegistros: React.FC<GraficosProps> = ({ registros, eventos }) => {
  const barData = getBarDataPorEvento(registros, eventos);
  const pieData = getPieDataPorClub(registros);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="font-semibold mb-2 text-center">Inscritos por Evento</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Inscritos" fill="#003366" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="font-semibold mb-2 text-center">Participación por Club</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficosRegistros;
