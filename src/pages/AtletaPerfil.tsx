
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User, Medal, Calendar, LineChart, Award, ArrowLeft, LogOut } from 'lucide-react';
import AthleteStatsChart from '../components/AthleteStatsChart';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from '../lib/supabase';

const AtletaPerfil = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitionRecords, setCompetitionRecords] = useState<any[]>([]);
  const [medals, setMedals] = useState({ oro: 0, plata: 0, bronce: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthleteProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session || !session.user) {
          setError('No autenticado. Inicia sesión.');
          setLoading(false);
          return;
        }
        // Buscar el perfil del atleta
        const { data: athletes, error: athleteError } = await supabase
          .from('athletes')
          .select('*')
          .eq('auth_user_id', session.user.id);
        if (athleteError) {
          setError('Error al obtener el perfil de atleta.');
          setLoading(false);
          return;
        }
        if (!athletes || athletes.length === 0) {
          setError('No se encontró un perfil de atleta asociado a este usuario.');
          setLoading(false);
          return;
        }
        setAthlete(athletes[0]);
        // Cargar historial real de competencias del atleta
        const { data: records, error: recordsError } = await supabase
          .from('competition_records')
          .select('*')
          .eq('athlete_id', athletes[0].id)
          .order('competition_date', { ascending: false });
        if (!recordsError && records) {
          setCompetitionRecords(records);
          // Calcular medallas
          let oro = 0, plata = 0, bronce = 0;
          records.forEach((r: any) => {
            if (r.place === 1) oro++;
            else if (r.place === 2) plata++;
            else if (r.place === 3) bronce++;
          });
          setMedals({ oro, plata, bronce });
        }
      } catch (err) {
        setError('Error inesperado al cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchAthleteProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/atleta-login');
  };

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-navy text-xl font-bold">Cargando perfil...</div>
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-100 text-red-700 p-6 rounded shadow">{error}</div>
        </div>
      ) : !athlete ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-navy text-xl font-bold">No se encontró información del atleta.</div>
        </div>
      ) : (
        <div className="min-h-screen bg-cream/30 py-12">
          <div style={{marginTop: '13px'}} />
      <section className="w-full flex justify-center" style={{marginBottom: '15px'}}>
        <div className="flex justify-between items-center w-full max-w-4xl px-4">
          <button
            className="flex items-center text-navy hover:text-gold transition-colors text-base font-medium"
            onClick={() => window.location.href = '/'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2 h-5 w-5"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            Volver al inicio
          </button>
          <button
            className="flex items-center text-navy hover:text-gold transition-colors text-base font-medium"
            onClick={async () => {
              if (window.confirm('¿Seguro que deseas cerrar sesión?')) {
                try {
                  const { error } = await window.supabase?.auth?.signOut?.() || {};
                  if (error) throw error;
                } catch (e) {
                  alert('Error al cerrar sesión');
                }
                window.location.href = '/atleta-login';
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out mr-2 h-5 w-5"><path d="M9 16v-1a3 3 0 0 1 3-3h8"></path><path d="M16 17l5-5-5-5"></path></svg>
            Cerrar sesión
          </button>
        </div>
      </section>
      <div className="container mx-auto px-4">
            {/* Profile Header */}
            <div className="w-full flex justify-center mt-6">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center max-w-md w-full transition-all duration-200 hover:shadow-2xl hover:scale-[1.01]">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold shadow-lg mb-4 cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => setShowPhotoModal(true)}>
                  <img
                    src={athlete.photo_url || '/avatar-default.png'}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
{/* Modal para ampliar la foto */}
{showPhotoModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in"
    onClick={() => setShowPhotoModal(false)}
  >
    <div
      className="relative max-w-full max-h-full p-2"
      onClick={e => e.stopPropagation()}
    >
      <img
        src={athlete.photo_url}
        alt="Foto de perfil ampliada"
        className="rounded-lg shadow-lg max-h-[80vh] max-w-[90vw] animate-zoom-in"
        style={{ background: '#fff' }}
      />
      <button
        onClick={() => setShowPhotoModal(false)}
        className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-opacity-100 transition"
        title="Cerrar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}
                <div className="flex flex-col gap-2 md:ml-6">
                  <div className="flex gap-3 items-center">
                    <span className="flex items-center text-yellow-500 font-semibold"><Medal className="mr-1 h-5 w-5" /> Oro: {medals.oro}</span>
                    <span className="flex items-center text-gray-400 font-semibold"><Medal className="mr-1 h-5 w-5" style={{color:'#C0C0C0'}} /> Plata: {medals.plata}</span>
                    <span className="flex items-center text-orange-700 font-semibold"><Medal className="mr-1 h-5 w-5" style={{color:'#cd7f32'}} /> Bronce: {medals.bronce}</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy">{athlete.first_name} {athlete.last_name}</h1>
                  <p className="text-gray-600">Atleta desde {athlete.created_at ? new Date(athlete.created_at).getFullYear() : 'Año desconocido'} • Categoría {athlete.weight_category}</p>
                  {/* Medallas por tipo y total */}
                  <div className="flex flex-col md:items-start items-center mt-2 text-gold">
                    <span>
                      {medals.oro > 0 && `${medals.oro}x Oro`}
                      {medals.plata > 0 && (medals.oro > 0 ? ', ' : '') + `${medals.plata}x Plata`}
                      {medals.bronce > 0 && ((medals.oro > 0 || medals.plata > 0) ? ', ' : '') + `${medals.bronce}x Bronce`}
                    </span>
                    <span className="text-navy font-semibold">Total: {medals.oro + medals.plata + medals.bronce} medallas</span>
                  </div>
                  <div className="mt-2 text-gray-700">
                    <span className="font-semibold">Correo:</span> {athlete.email}
                  </div>
                  {athlete.federation_id && (
                    <div className="mt-1 text-gray-700">
                      <span className="font-semibold">ID Federación:</span> {athlete.federation_id}
                    </div>
                  )}
                  {athlete.club && (
                    <div className="mt-1 text-gray-700">
                      <span className="font-semibold">Club:</span> {athlete.club}
                    </div>
                  )}
                  {athlete.coach && (
                    <div className="mt-1 text-gray-700">
                      <span className="font-semibold">Entrenador:</span> {athlete.coach}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Estadísticas de Levantamientos */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center"><LineChart className="h-6 w-6 mr-2" /> Estadísticas de Levantamientos</h2>
              {competitionRecords.length > 0 ? (
                <AthleteStatsChart records={competitionRecords} />
              ) : (
                <div className="text-gray-600">No hay registros de levantamientos disponibles.</div>
              )}
            </div>
            {/* Events History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-navy mb-4">Historial de Competencias</h2>
              {competitionRecords.length === 0 ? (
                <div className="text-gray-600">No hay historial de competencias disponible.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="px-2 py-1">Competencia</th>
                        <th className="px-2 py-1">Fecha</th>
                        <th className="px-2 py-1">Categoría</th>
                        <th className="px-2 py-1">Arranque</th>
                        <th className="px-2 py-1">Envión</th>
                        <th className="px-2 py-1">Total</th>
                        <th className="px-2 py-1">Lugar</th>
                        <th className="px-2 py-1">Medalla</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitionRecords.map((record: any) => (
                        <tr key={record.id} className="border-b">
                          <td className="px-2 py-1">{record.competition_name}</td>
                          <td className="px-2 py-1">{record.competition_date ? new Date(record.competition_date).toLocaleDateString() : ''}</td>
                          <td className="px-2 py-1">{record.weight_category}</td>
                          <td className="px-2 py-1">{record.snatch ?? '-'}</td>
                          <td className="px-2 py-1">{record.clean_and_jerk ?? '-'}</td>
                          <td className="px-2 py-1">{record.total ?? '-'}</td>
                          <td className="px-2 py-1">{record.place ?? '-'}</td>
                          <td className="px-2 py-1">
                            {record.place === 1 && <span className="text-yellow-500 font-bold">Oro</span>}
                            {record.place === 2 && <span className="text-gray-400 font-bold">Plata</span>}
                            {record.place === 3 && <span className="text-orange-700 font-bold">Bronce</span>}
                            {(record.place !== 1 && record.place !== 2 && record.place !== 3) && '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Animaciones Tailwind personalizadas (asegúrate que tu tailwind.config.js permite estas clases, si no, usa las utilidades inline o ajusta)
// animate-fade-in y animate-zoom-in pueden ser agregadas como utilidades personalizadas si no existen por defecto
export default AtletaPerfil;
