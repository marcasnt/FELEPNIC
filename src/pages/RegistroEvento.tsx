import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { upcomingEvents } from '../data/eventos';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

const RegistroEvento = () => {
  const { id } = useParams<{ id: string }>();
  const event = upcomingEvents.find(e => String(e.id) === id);

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    categoria: '',
    club: '',
    telefono: '',
    id_federacion: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!event) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
        <Link to="/eventos" className="btn-primary inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Eventos
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    // Guardar registro en Supabase
    const { error } = await supabase.from('registro_eventos').insert([
      {
        evento_id: event.id,
        evento_titulo: event.title,
        nombre: form.nombre,
        email: form.email,
        categoria: form.categoria,
        club: form.club,
        telefono: form.telefono,
        id_federacion: form.id_federacion,
        registrado_en: new Date().toISOString(),
      }
    ]);
    setLoading(false);
    if (error) {
      setError('Error al registrar: ' + error.message);
    } else {
      setSuccess(true);
      setForm({ nombre: '', email: '', categoria: '', club: '', telefono: '', id_federacion: '' });
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-lg">
      <Link to={`/eventos/${event.id}`} className="text-navy font-semibold flex items-center hover:text-gold transition-colors mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al evento
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-navy">Registro para: {event.title}</h1>
      {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-6">¡Registro exitoso! Nos pondremos en contacto contigo pronto.</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Correo electrónico</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Categoría</label>
          <input type="text" name="categoria" value={form.categoria} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Club</label>
          <input type="text" name="club" value={form.club} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">ID de Federación</label>
          <input type="text" name="id_federacion" value={form.id_federacion} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Teléfono</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} className="input w-full" required />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
      </form>
    </div>
  );
};

export default RegistroEvento;
