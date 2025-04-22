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
  const data = sortedRecords.map((rec) => ({
    name: rec.competition_name + ' (' + (rec.competition_date ? new Date(rec.competition_date).toLocaleDateString() : '-') + ')',
    Arranque: rec.snatch ?? 0,
    "Envión": rec.clean_and_jerk ?? 0,
    Total: rec.total ?? 0,
  }));

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Arranque" stroke="#1e3a8a" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Envión" stroke="#f59e42" />
          <Line type="monotone" dataKey="Total" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AthleteStatsChart;
