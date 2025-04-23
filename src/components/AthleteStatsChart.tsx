import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CompetitionRecord {
  competition_name: string;
  competition_date: string;
  snatch: number | null;
  clean_and_jerk: number | null;
  total: number | null;
}

interface AthleteStatsChartProps {
  records: CompetitionRecord[];
}

const AthleteStatsChart: React.FC<AthleteStatsChartProps> = ({ records }) => {
  // Ordenar por fecha (por si acaso)
  const sortedRecords = [...records].sort((a, b) => {
    return new Date(a.competition_date).getTime() - new Date(b.competition_date).getTime();
  });

  // Preparar los datos para el gráfico
  const data = sortedRecords.map((rec) => {
    // Abrevia el nombre: solo las primeras 2 palabras y la fecha corta
    const words = rec.competition_name.split(' ').slice(0, 2).join(' ');
    const date = rec.competition_date ? new Date(rec.competition_date).toLocaleDateString() : '-';
    return {
      name: rec.competition_name + ' (' + date + ')',
      shortName: words + ' (' + date + ')',
      Arranque: rec.snatch ?? 0,
      "Envión": rec.clean_and_jerk ?? 0,
      Total: rec.total ?? 0,
    };
  });

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="shortName"
            angle={-25}
            textAnchor="end"
            height={40}
            tick={{ fontSize: 10, fill: '#888' }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Arranque" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5, stroke: '#1e3a8a', strokeWidth: 2, fill: '#fff', className: 'transition-all duration-200 hover:scale-125 hover:fill-[#1e3a8a]' }} activeDot={{ r: 10, stroke: '#1e3a8a', strokeWidth: 3, fill: '#f1f5f9', className: 'shadow-lg' }} isAnimationActive={true} animationDuration={900} />
          <Line type="monotone" dataKey="Envión" stroke="#f59e42" strokeWidth={3} dot={{ r: 5, stroke: '#f59e42', strokeWidth: 2, fill: '#fff', className: 'transition-all duration-200 hover:scale-125 hover:fill-[#f59e42]' }} activeDot={{ r: 10, stroke: '#f59e42', strokeWidth: 3, fill: '#f1f5f9', className: 'shadow-lg' }} isAnimationActive={true} animationDuration={900} />
          <Line type="monotone" dataKey="Total" stroke="#16a34a" strokeWidth={3} dot={{ r: 5, stroke: '#16a34a', strokeWidth: 2, fill: '#fff', className: 'transition-all duration-200 hover:scale-125 hover:fill-[#16a34a]' }} activeDot={{ r: 10, stroke: '#16a34a', strokeWidth: 3, fill: '#f1f5f9', className: 'shadow-lg' }} isAnimationActive={true} animationDuration={900} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AthleteStatsChart;
