import React from 'react';
import Layout from '../components/Layout';
import AthleteManagement from './AthleteManagement';

const AdminPanel: React.FC = () => {
  // Aquí puedes agregar más herramientas y secciones para el administrador en el futuro
  return (
    <Layout>
      
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-navy">Panel de Administración</h1>
        <p className="mb-8 text-gray-700">
          Bienvenido al panel de administración. Desde aquí puedes gestionar atletas, ver registros de competencias y acceder a herramientas exclusivas para administradores.
        </p>
        {/* Botones debajo del título y descripción, con 13px de margen */}
        <div style={{marginTop: '13px', marginBottom: '24px'}} className="w-full flex justify-center">
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
        </div>
        {/* Herramientas del administrador */}
        <div className="mb-10">
          <AthleteManagement />
        </div>
        {/* Aquí puedes agregar más componentes o secciones para el admin */}
      </div>
    </Layout>
  );
};

export default AdminPanel;
