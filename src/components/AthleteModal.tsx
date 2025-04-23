import React from 'react';

interface AthleteModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  form: any;
  formError: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleFileChange es opcional para retrocompatibilidad.
  isEdit: boolean;
  preview?: string; // optional preview image URL
}

const AthleteModal: React.FC<AthleteModalProps> = ({
  show,
  onClose,
  onSubmit,
  loading,
  form,
  formError,
  handleChange,
  handleFileChange,
  isEdit,
  preview,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-md shadow-2xl transition-all duration-300 transform-gpu scale-100 hover:scale-[1.01]">
        <h2 className="text-xl font-bold mb-4 text-center">{isEdit ? 'Editar Atleta' : 'Agregar Atleta'}</h2>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>

          {/* Foto actual o preview */}
          {(preview || form.photoPreview || form.photo_url) && (
            <div className="flex flex-col items-center mb-2">
              <img
                src={preview || form.photoPreview || form.photo_url}
                alt="Foto del atleta"
                className="w-24 h-24 rounded-full object-cover border mb-2"
              />
              <span className="text-xs text-gray-500">Foto actual</span>
            </div>
          )}
          {/* Input para subir nueva foto */}
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="border rounded px-3 py-2"
            onChange={handleFileChange}
          />
          <input name="first_name" className="border rounded px-3 py-2" placeholder="Nombre" value={form.first_name||''} onChange={handleChange} />
          <input name="last_name" className="border rounded px-3 py-2" placeholder="Apellido" value={form.last_name||''} onChange={handleChange} />
          <input name="email" className="border rounded px-3 py-2" placeholder="Email" value={form.email||''} onChange={handleChange} />
          <input name="weight_category" className="border rounded px-3 py-2" placeholder="Categoría" value={form.weight_category||''} onChange={handleChange} />
          <input name="club" className="border rounded px-3 py-2" placeholder="Club" value={form.club||''} onChange={handleChange} />
          <input name="address" className="border rounded px-3 py-2" placeholder="Dirección" value={form.address||''} onChange={handleChange} />
          <input name="federation_id" className="border rounded px-3 py-2" placeholder="ID Federación" value={form.federation_id||''} onChange={handleChange} />
          <select name="gender" className="border rounded px-3 py-2" value={form.gender||'M'} onChange={handleChange}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          {/* Password fields only for add (not edit) */}
          {!isEdit && (
            <>
              <input
                type="password"
                name="password"
                className="border rounded px-3 py-2"
                placeholder="Contraseña"
                value={form.password || ''}
                onChange={handleChange}
                minLength={6}
                autoComplete="new-password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                className="border rounded px-3 py-2"
                placeholder="Confirmar Contraseña"
                value={form.confirmPassword || ''}
                onChange={handleChange}
                minLength={6}
                autoComplete="new-password"
                required
              />
            </>
          )}
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AthleteModal;
