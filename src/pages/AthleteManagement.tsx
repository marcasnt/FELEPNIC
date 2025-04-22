import React, { useEffect, useState } from 'react';
import { athleteService } from '../services/athleteService';
import type { Athlete, CompetitionRecord } from '../lib/supabase';
// import Layout from '../components/Layout';
import { Search, Filter, ChevronDown } from 'lucide-react';

import { supabase } from '../lib/supabase';
import { Dialog } from '@/components/ui/dialog';

import AthleteModal from '../components/AthleteModal';

const AthleteManagement = () => {
  // --- Estados y handlers para gestión de atletas (modales, formularios) ---
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [showEditAthleteModal, setShowEditAthleteModal] = useState(false);
  const [athleteToEdit, setAthleteToEdit] = useState<Athlete | null>(null);
  const [athleteForm, setAthleteForm] = useState<Partial<Athlete> & { photo?: File | null; photoPreview?: string }>({});
  const [athleteFormLoading, setAthleteFormLoading] = useState(false);
  const [athleteFormError, setAthleteFormError] = useState<string|null>(null);

  // Handler para abrir modal de edición con datos prellenados
  const handleEditAthlete = (athlete: Athlete) => {
    setAthleteToEdit(athlete);
    setAthleteForm({ ...athlete }); // Clonar el objeto para evitar problemas de referencia
    setShowEditAthleteModal(true);
    setAthleteFormError(null);
  };
  // Handler para eliminar atleta
  const handleDeleteAthlete = async (athlete: Athlete) => {
    if (window.confirm('¿Seguro que deseas eliminar este atleta?')) {
      try {
        await athleteService.deactivateAthlete(athlete.id);
        await loadAthletes();
        if (selectedAthlete && selectedAthlete.id === athlete.id) setSelectedAthlete(null);
      } catch (err: any) {
        alert(err.message || 'Error al eliminar atleta');
      }
    }
  };
  // Resetear formulario
  // (Keep only this implementation, remove all other redeclarations later in the file)
  const resetAthleteForm = () => {
    setAthleteForm({});
    setAthleteFormError(null);
    setAthleteFormLoading(false);
  };
  // Handler para cambios en los inputs del formulario
  const handleAthleteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAthleteForm(prev => ({ ...prev, [name]: value }));
  };

  // Handler para archivos (foto)
  const handleAthleteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAthleteForm(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handler para agregar atleta
  const handleAddAthlete = async (e: React.FormEvent) => {
    e.preventDefault();
    setAthleteFormLoading(true);
    setAthleteFormError(null);
    try {
      if (!athleteForm.first_name || !athleteForm.last_name || !athleteForm.weight_category) {
        setAthleteFormError('Nombre, apellido y categoría son obligatorios');
        setAthleteFormLoading(false);
        return;
      }
      let photoUrl = athleteForm.photo_url;
      if (athleteForm.photo) {
        const fileExt = athleteForm.photo.name.split('.').pop();
        const fileName = `athlete_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('athlete-photos')
          .upload(fileName, athleteForm.photo, { upsert: true });
        if (uploadError) throw new Error('Error al subir la foto');
        const { data: publicUrlData } = supabase.storage.from('athlete-photos').getPublicUrl(uploadData.path);
        photoUrl = publicUrlData.publicUrl;
      }
      await athleteService.createAthlete({
        ...athleteForm,
        photo_url: photoUrl,
        photo: undefined,
        photoPreview: undefined,
        active: true,
      } as Omit<Athlete, 'id' | 'created_at' | 'updated_at'>);
      await loadAthletes();
      setShowAddAthleteModal(false);
      resetAthleteForm();
    } catch (err: any) {
      setAthleteFormError(err.message || 'Error al agregar atleta');
    } finally {
      setAthleteFormLoading(false);
    }
  };
  // Handler para actualizar atleta
  const handleUpdateAthlete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteToEdit) return;
    setAthleteFormLoading(true);
    setAthleteFormError(null);
    try {
      if (!athleteForm.first_name || !athleteForm.last_name || !athleteForm.weight_category) {
        setAthleteFormError('Nombre, apellido y categoría son obligatorios');
        setAthleteFormLoading(false);
        return;
      }
      let photoUrl = athleteForm.photo_url;
      if (athleteForm.photo) {
        // Subir a Supabase Storage
        const fileExt = athleteForm.photo.name.split('.').pop();
        const fileName = `athlete_${athleteToEdit.id}_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('athlete-photos')
          .upload(fileName, athleteForm.photo, { upsert: true });
        if (uploadError) throw new Error('Error al subir la foto');
        // Obtener URL pública
        const { data: publicUrlData } = supabase.storage.from('athlete-photos').getPublicUrl(uploadData.path);
        photoUrl = publicUrlData.publicUrl;
      }
      await athleteService.updateAthlete(athleteToEdit.id, {
        ...athleteForm,
        photo_url: photoUrl,
        photo: undefined,
        photoPreview: undefined,
      } as Partial<Athlete>);
      await loadAthletes();
      setShowEditAthleteModal(false);
      setAthleteToEdit(null);
      resetAthleteForm();
    } catch (err: any) {
      setAthleteFormError(err.message || 'Error al actualizar atleta');
    } finally {
      setAthleteFormLoading(false);
    }
  };

  // Todos los hooks deben ir al inicio
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CompetitionRecord | null>(null);
  const [formRecord, setFormRecord] = useState<Partial<CompetitionRecord>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  // Hooks de gestión de atletas
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [athleteRecords, setAthleteRecords] = useState<CompetitionRecord[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('');

  // --- Funciones de gestión de atletas ---

  /**
   * Carga todos los atletas desde el servicio.
   */
  const loadAthletes = async () => {
    try {
      setLoading(true);
      const data = await athleteService.getAllAthletes();
      setAthletes(data);
    } catch (err) {
      setError('Error al cargar los atletas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carga los registros de competencia de un atleta específico.
   * @param athleteId ID del atleta
   */
  const loadAthleteRecords = async (athleteId: string) => {
    try {
      const records = await athleteService.getAthleteCompetitionRecords(athleteId);
      setAthleteRecords(records);
    } catch (err) {
      console.error('Error al cargar los registros:', err);
    }
  };

  // Efectos iniciales
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const role = session?.user?.user_metadata?.role;
      setIsAdmin(role === 'admin');
    });
  }, []);

  useEffect(() => {
    loadAthletes();
  }, []);

  // Control de acceso admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-6 rounded shadow">
          Acceso restringido: solo administradores
        </div>
      </div>
    );
  }
  if (isAdmin === null) {
    return <div className="text-center py-20">Verificando acceso...</div>;
  }

  // Modal para agregar/editar registro
  const openAddRecord = () => {
    setEditingRecord(null);
    setFormRecord({
      athlete_id: selectedAthlete?.id,
      competition_name: '',
      competition_date: '',
      weight_category: selectedAthlete?.weight_category,
      snatch: undefined,
      clean_and_jerk: undefined,
      total: undefined,
      place: undefined,
    });
    setModalOpen(true);
  };
  const openEditRecord = (record: CompetitionRecord) => {
    setEditingRecord(record);
    setFormRecord(record);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingRecord(null);
    setFormError(null);
    setFormRecord({});
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormRecord((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRecord((prev) => ({ ...prev, [name]: value ? Number(value) : undefined }));
  };
  const handleSubmitRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      if (!formRecord.competition_name || !formRecord.competition_date || !formRecord.weight_category) {
        setFormError('Nombre, fecha y categoría de competencia son obligatorios');
        setFormLoading(false);
        return;
      }
      // Solo existe addCompetitionRecord, así que para edición simplemente agrega uno nuevo o implementa la lógica adecuada si lo deseas.
      // Validación estricta de campos requeridos para evitar errores de tipado
      if (!selectedAthlete?.id) throw new Error('Selecciona un atleta');
      if (!formRecord.competition_name || !formRecord.competition_date || !formRecord.weight_category) {
        throw new Error('Todos los campos obligatorios deben estar completos');
      }
      await athleteService.addCompetitionRecord({
        athlete_id: selectedAthlete.id,
        competition_name: formRecord.competition_name,
        competition_date: formRecord.competition_date,
        weight_category: formRecord.weight_category,
        snatch: formRecord.snatch !== undefined ? formRecord.snatch : undefined,
        clean_and_jerk: formRecord.clean_and_jerk !== undefined ? formRecord.clean_and_jerk : undefined,
        total: formRecord.total !== undefined ? formRecord.total : undefined,
        place: formRecord.place !== undefined ? formRecord.place : undefined
      });
      await loadAthleteRecords(selectedAthlete!.id);
      closeModal();
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar el registro');
    } finally {
      setFormLoading(false);
    }
  };
  const handleDeleteRecord = async (recordId: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar este registro?')) return;
    try {
      // No existe deleteCompetitionRecord, así que podrías implementar un borrado lógico o mostrar un mensaje.
      alert('Funcionalidad de eliminar registro aún no implementada en el backend.');
      // await loadAthleteRecords(selectedAthlete!.id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };








  // Buscar atletas
  const searchAthletes = async () => {
    if (!searchQuery.trim()) {
      loadAthletes();
      return;
    }
    try {
      setLoading(true);
      const data = await athleteService.searchAthletes(searchQuery);
      setAthletes(data);
    } catch (err) {
      setError('Error en la búsqueda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar la selección de un atleta
  const handleAthleteSelect = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    loadAthleteRecords(athlete.id);
  };

  // Filtrar atletas por categoría
  const filteredAthletes = filterCategory
    ? athletes.filter(a => a.weight_category === filterCategory)
    : athletes;

  return (
    <>
      <AthleteModal
        show={showAddAthleteModal || showEditAthleteModal}
        onClose={() => {
          if (showEditAthleteModal) setShowEditAthleteModal(false);
          if (showAddAthleteModal) setShowAddAthleteModal(false);
          setAthleteToEdit(null);
          resetAthleteForm();
        }}
        onSubmit={showEditAthleteModal ? handleUpdateAthlete : handleAddAthlete}
        loading={athleteFormLoading}
        form={athleteForm}
        formError={athleteFormError}
        handleChange={handleAthleteFormChange}
        handleFileChange={handleAthleteFileChange}
        preview={athleteForm.photoPreview}
        isEdit={showEditAthleteModal}
      />
      
      <div className="container mx-auto px-4 py-8 pt-32 md:pt-28">
        {/* Botones de navegación y logout debajo del navbar */}
        
        <h1 className="text-2xl font-bold mb-6">Administración de Atletas</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full md:w-1/3"
            placeholder="Buscar atleta por nombre o email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={searchAthletes}
          >Buscar</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => { resetAthleteForm(); setShowAddAthleteModal(true); }}
          >Agregar Atleta</button>
        </div>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Apellido</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Categoría</th>
                <th className="px-4 py-2 border">Club</th>
                <th className="px-4 py-2 border">Dirección</th>
                <th className="px-4 py-2 border">Género</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-4">Cargando...</td></tr>
              ) : filteredAthletes.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-4">No hay atletas encontrados.</td></tr>
              ) : (
                filteredAthletes.map(athlete => (
                  <tr key={athlete.id} className="hover:bg-gray-100 cursor-pointer">
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.first_name}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.last_name}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.email}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.weight_category}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.club || 'N/A'}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.address || 'N/A'}</td>
                    <td className="px-4 py-2 border" onClick={() => handleAthleteSelect(athlete)}>{athlete.gender === 'M' ? 'Masculino' : 'Femenino'}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded"
                        onClick={e => { e.stopPropagation(); handleEditAthlete(athlete); }}
                      >Editar</button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={e => { e.stopPropagation(); handleDeleteAthlete(athlete); }}
                      >Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      {selectedAthlete && (
        <div className="bg-gray-50 p-4 rounded mb-8">
          <h2 className="text-lg font-bold mb-2">Registros de {selectedAthlete.first_name} {selectedAthlete.last_name}</h2>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mb-3"
            onClick={openAddRecord}
          >Agregar Registro de Competencia</button>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Competencia</th>
                <th className="px-2 py-1 border">Fecha</th>
                <th className="px-2 py-1 border">Categoría</th>
                <th className="px-2 py-1 border">Arranque</th>
                <th className="px-2 py-1 border">Envión</th>
                <th className="px-2 py-1 border">Total</th>
                <th className="px-2 py-1 border">Lugar</th>
                <th className="px-2 py-1 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {athleteRecords.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-2">Sin registros</td></tr>
              ) : (
                athleteRecords.map(record => (
                  <tr key={record.id}>
                    <td className="px-2 py-1 border">{record.competition_name}</td>
                    <td className="px-2 py-1 border">{record.competition_date}</td>
                    <td className="px-2 py-1 border">{record.weight_category}</td>
                    <td className="px-2 py-1 border">{record.snatch}</td>
                    <td className="px-2 py-1 border">{record.clean_and_jerk}</td>
                    <td className="px-2 py-1 border">{record.total}</td>
                    <td className="px-2 py-1 border">{record.place}</td>
                    <td className="px-2 py-1 border flex gap-2">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded"
                        onClick={e => { e.stopPropagation(); openEditRecord(record); }}
                      >Editar</button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={e => { e.stopPropagation(); handleDeleteRecord(record.id); }}
                      >Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Modal para agregar/editar registro de competencia */}
          {modalOpen && (
            <>
              {/* Overlay: ahora con pointer-events-none para no bloquear el Navbar */}
              <div className="fixed inset-0 bg-black bg-opacity-40 z-40 pointer-events-none" />
              {/* Modal: con z-50 y pointer-events-auto */}
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{ pointerEvents: 'auto', marginTop: '13px' }}>
                <div className="bg-white rounded-lg p-8 w-full max-w-lg relative shadow-lg">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={closeModal}
                    aria-label="Cerrar modal"
                  >×</button>
                <h2 className="text-xl font-bold mb-4">{editingRecord ? 'Editar Registro de Competencia' : 'Agregar Registro de Competencia'}</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmitRecord}>
                  <input
                    name="competition_name"
                    className="border rounded px-3 py-2"
                    placeholder="Nombre de la competencia"
                    value={formRecord.competition_name || ''}
                    onChange={handleFormChange}
                  />
                  <input
                    name="competition_date"
                    type="date"
                    className="border rounded px-3 py-2"
                    placeholder="Fecha"
                    value={formRecord.competition_date || ''}
                    onChange={handleFormChange}
                  />
                  <input
                    name="weight_category"
                    className="border rounded px-3 py-2"
                    placeholder="Categoría"
                    value={formRecord.weight_category || ''}
                    onChange={handleFormChange}
                  />
                  <input
                    name="snatch"
                    type="number"
                    className="border rounded px-3 py-2"
                    placeholder="Arranque (kg)"
                    value={formRecord.snatch || ''}
                    onChange={e => {
                      handleFormNumber(e);
                      const snatch = Number(e.target.value) || 0;
                      const cleanAndJerk = Number(formRecord.clean_and_jerk) || 0;
                      setFormRecord(prev => ({
                        ...prev,
                        total: snatch + cleanAndJerk
                      }));
                    }}
                  />
                  <input
                    name="clean_and_jerk"
                    type="number"
                    className="border rounded px-3 py-2"
                    placeholder="Envión (kg)"
                    value={formRecord.clean_and_jerk || ''}
                    onChange={e => {
                      handleFormNumber(e);
                      const cleanAndJerk = Number(e.target.value) || 0;
                      const snatch = Number(formRecord.snatch) || 0;
                      setFormRecord(prev => ({
                        ...prev,
                        total: snatch + cleanAndJerk
                      }));
                    }}
                  />
                  <input
                    name="total"
                    type="number"
                    className="border rounded px-3 py-2 bg-gray-100"
                    placeholder="Total (kg)"
                    value={formRecord.total || ''}
                    readOnly
                  />
                  <input
                    name="place"
                    type="number"
                    className="border rounded px-3 py-2"
                    placeholder="Lugar"
                    value={formRecord.place || ''}
                    onChange={handleFormNumber}
                  />
                  {formError && <div className="text-red-600 text-sm">{formError}</div>}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded"
                      onClick={closeModal}
                    >Cancelar</button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      disabled={formLoading}
                    >{formLoading ? 'Guardando...' : 'Guardar'}</button>
                  </div>
                </form>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  </>
  );
}

export default AthleteManagement;
