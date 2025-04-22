
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '../services/authService';
import { supabase } from '../lib/supabase';

const AtletaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Autenticación real con Supabase
      const { session } = await authService.signIn(email, password);
      if (session) {
        navigate('/atleta-perfil');
      } else {
        setError('Credenciales incorrectas o usuario no encontrado.');
toast.error('Credenciales incorrectas o usuario no encontrado.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
toast.error(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.auth.resetPasswordForEmail(resetEmail);
      setResetMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
toast.success('¡Enlace de recuperación enviado! Revisa tu correo.');
    } catch (err: any) {
      setError(err.message || 'Error al enviar enlace de recuperación');
toast.error(err.message || 'Error al enviar enlace de recuperación');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cream/30 py-20 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-navy p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Portal de Atletas</h1>
              <p className="text-gold/90 mt-1">Accede a tu perfil y estadísticas</p>
            </div>
            <div className="p-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              {showReset ? (
                <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full border rounded p-2"
                    required
                  />
                  <Button type="submit">Enviar enlace de recuperación</Button>
                  {resetMessage && <div className="text-sm mt-2 text-green-700">{resetMessage}</div>}
                  <p className="text-sm text-center mt-2">
                    <a
                      href="#"
                      className="text-navy hover:text-gold font-semibold"
                      onClick={() => setShowReset(false)}
                    >
                      Volver al login
                    </a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-navy focus:border-navy block w-full pl-10 p-2.5"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-navy focus:border-navy block w-full pl-10 p-2.5 ${error ? 'border-red-500' : ''}`}
                        placeholder="Contraseña"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className={`w-full bg-navy text-white py-2 rounded hover:bg-gold transition-colors font-semibold flex items-center justify-center ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={isLoading}>
                    {isLoading && (
                      <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    )}
                    {isLoading ? 'Ingresando...' : 'Ingresar'}
                  </Button>
                  <p className="text-sm text-center mt-4">
                    <a
                      href="#"
                      className="text-navy hover:text-gold font-semibold"
                      onClick={() => setShowReset(true)}
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AtletaLogin;
