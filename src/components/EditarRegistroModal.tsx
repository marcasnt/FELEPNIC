import React, { useState } from 'react';

interface EditarRegistroModalProps {
  registro: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const EditarRegistroModal: React.FC<EditarRegistroModalProps> = ({ registro, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ ...registro });
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-bold mb-4">Editar Registro</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Nombre completo" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Correo electrónico" required />
          <input type="text" name="categoria" value={form.categoria} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Categoría" required />
          <input type="text" name="club" value={form.club} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Club" required />
          <input type="text" name="id_federacion" value={form.id_federacion} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="ID de Federación" required />
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Teléfono" required />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarRegistroModal;
