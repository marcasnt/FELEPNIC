import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import InputField from '../components/form/InputField';
import EmailField from '../components/form/EmailField';
import PasswordField from '../components/form/PasswordField';
import SelectField from '../components/form/SelectField';
import { authService } from '../services/authService';
import type { Athlete } from '../lib/supabase';

const initialErrors = {
  first_name: '',
  last_name: '',
  birth_date: '',
  gender: '',
  weight_category: '',
  document_id: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const AthleteRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialErrors);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    weight_category: '',
    federation_id: '',
    document_id: '', // Cédula nicaragüense
    phone: '',
    email: '',
    address: '',
    club: '',
    coach: '',
    password: '',
    confirmPassword: ''
  });

  // Validar formato de cédula nicaragüense
  const validateNicaraguanId = (id: string) => {
    // Formato: XXX-XXXXXX-XXXXXA
    const regex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
    return regex.test(id);
  };

  // Generar ID de federación a partir de la cédula
  const generateFederationId = (documentId: string) => {
    // Eliminar solo los guiones, mantener todos los números y la letra
    return documentId.replace(/-/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let errorMsg = '';
    
    if (name === 'document_id') {
      // Formatear automáticamente la cédula mientras se escribe
      let formattedValue = value.replace(/[^0-9A-Z]/g, '');
      if (formattedValue.length > 14) {
        formattedValue = formattedValue.slice(0, 14);
      }
      
      // Agregar guiones automáticamente
      if (formattedValue.length >= 3) {
        formattedValue = formattedValue.slice(0, 3) + '-' + formattedValue.slice(3);
      }
      if (formattedValue.length >= 10) {
        formattedValue = formattedValue.slice(0, 10) + '-' + formattedValue.slice(10);
      }

      // Actualizar el ID de federación automáticamente
      if (validateNicaraguanId(formattedValue)) {
        const fedId = generateFederationId(formattedValue);
        setFormData(prev => ({
          ...prev,
          document_id: formattedValue,
          federation_id: fedId
        }));
        errorMsg = '';
      } else {
        setFormData(prev => ({
          ...prev,
          document_id: formattedValue,
          federation_id: ''
        }));
        errorMsg = formattedValue.length > 0 ? 'Formato inválido de cédula' : '';
      }
      setErrors(prev => ({ ...prev, document_id: errorMsg }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Validaciones en tiempo real para otros campos
      switch (name) {
        case 'first_name':
        case 'last_name':
          errorMsg = value.trim() === '' ? 'Este campo es obligatorio' : '';
          break;
        case 'birth_date':
          errorMsg = value === '' ? 'Este campo es obligatorio' : '';
          break;
        case 'gender':
          errorMsg = value === '' ? 'Este campo es obligatorio' : '';
          break;
        case 'weight_category':
          errorMsg = value === '' ? 'Este campo es obligatorio' : '';
          break;
        case 'email':
          errorMsg = value === '' ? 'Este campo es obligatorio' : (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? 'Email inválido' : '');
          break;
        case 'password':
          if (value.length < 8) {
            errorMsg = 'La contraseña debe tener al menos 8 caracteres';
          } else if (!/[A-Z]/.test(value)) {
            errorMsg = 'Debe incluir al menos una letra mayúscula';
          } else if (!/[a-z]/.test(value)) {
            errorMsg = 'Debe incluir al menos una letra minúscula';
          } else if (!/[0-9]/.test(value)) {
            errorMsg = 'Debe incluir al menos un número';
          } else {
            errorMsg = '';
          }
          break;
        case 'confirmPassword':
          errorMsg = value !== formData.password ? 'Las contraseñas no coinciden' : '';
          break;
        default:
          errorMsg = '';
      }
      setErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  // Verifica si hay errores o campos obligatorios vacíos
  const isFormInvalid = () => {
    for (const key of Object.keys(errors)) {
      if (errors[key]) return true;
    }
    for (const key of Object.keys(initialErrors)) {
      if (!formData[key as keyof typeof formData]) return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validaciones básicas
      if (!formData.email || !formData.password) {
        setError('El email y la contraseña son obligatorios');
        toast.error('El email y la contraseña son obligatorios');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        toast.error('Las contraseñas no coinciden');
        return;
      }

      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        toast.error('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      // Validar campos requeridos
      const requiredFields = {
        first_name: 'Nombre',
        last_name: 'Apellido',
        birth_date: 'Fecha de nacimiento',
        gender: 'Género',
        weight_category: 'Categoría de peso',
        document_id: 'Cédula de Identidad'
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData[field as keyof typeof formData]) {
          setError(`El campo ${label} es obligatorio`);
          toast.error(`El campo ${label} es obligatorio`);
          return;
        }
      }

      setLoading(true);
      console.log('Iniciando registro con datos:', { ...formData, password: '***' });

      // Preparar datos del atleta
      const athleteData: Omit<Athlete, 'id' | 'created_at' | 'updated_at' | 'auth_user_id'> = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        gender: formData.gender as 'M' | 'F',
        weight_category: formData.weight_category,
        federation_id: formData.federation_id || undefined,
        document_id: formData.document_id || undefined,
        phone: formData.phone || undefined,
        email: formData.email,
        address: formData.address || undefined,
        club: formData.club || undefined,
        coach: formData.coach || undefined,
        active: true,
      };

      // Registrar atleta
      const result = await authService.registerAthlete(athleteData, formData.password);
      console.log('Registro exitoso:', result);
      
      // Redirigir al login
      navigate('/atleta-login', { 
        state: { message: 'Registro exitoso. Por favor, inicia sesión.' } 
      });
    } catch (err) {
      console.error('Error en el registro:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar atleta';
      setError(errorMessage);

      // Mostrar detalles del error en la consola para depuración
      if (err instanceof Error) {
        console.error('Detalles del error:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const weightCategories = {
    'M': ['61kg', '67kg', '73kg', '81kg', '89kg', '96kg', '102kg', '109kg', '+109kg'],
    'F': ['45kg', '49kg', '55kg', '59kg', '64kg', '71kg', '76kg', '81kg', '87kg', '+87kg']
  };

  // Obtener las categorías según el género seleccionado
  const getWeightCategoriesByGender = () => {
    if (!formData.gender) return [];
    return weightCategories[formData.gender as 'M' | 'F'] || [];
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-8 px-2 sm:px-4">
        <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-navy">Registro de Atleta</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div className="bg-slate-50 rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold mb-2 text-navy">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InputField
                    label="Nombre"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    error={errors.first_name}
                  />
                </div>
                <div>
                  <InputField
                    label="Apellido"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                    error={errors.last_name}
                  />
                </div>
                <div>
                  <InputField
                    label="Fecha de nacimiento"
                    name="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    required
                    error={errors.birth_date}
                  />
                </div>
                <div>
                  <SelectField
                    label="Género"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    error={errors.gender}
                    options={[
                      { value: '', label: 'Seleccionar...' },
                      { value: 'M', label: 'Masculino' },
                      { value: 'F', label: 'Femenino' }
                    ]}
                  />
                </div>
            </div>
          </div>

          {/* Información de Cuenta */}
          <div className="bg-slate-50 rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold mb-2 text-navy">Información de Cuenta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <EmailField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
              </div>
              <div>
                <PasswordField
                  label="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />
              </div>
              <div>
                <PasswordField
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={errors.confirmPassword}
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Información Deportiva */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Información Deportiva</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SelectField
                  label="Categoría de Peso"
                  name="weight_category"
                  value={formData.weight_category}
                  onChange={handleChange}
                  required
                  error={errors.weight_category}
                  options={getWeightCategoriesByGender().map(category => ({ value: category, label: category }))}
                  disabled={!formData.gender}
                  helpText={!formData.gender ? 'Selecciona un género primero' : undefined}
                />
              </div>
              <div>
                <InputField
                  label="Cédula de Identidad"
                  name="document_id"
                  id="document_id"
                  placeholder="000-000000-0000A"
                  value={formData.document_id}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  error={errors.document_id}
                />
                <p className="mt-1 text-sm text-gray-500">Formato: 000-000000-0000A</p>
              </div>
              <div>
                <InputField
                  label="ID de Federación (se genera automáticamente)"
                  name="federation_id"
                  id="federation_id"
                  value={formData.federation_id}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
                <p className="mt-1 text-sm text-gray-500">Se genera automáticamente de la cédula</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-6">
            <div className="flex-1 flex items-center">
              <a href="/atleta-login" className="text-blue-600 hover:underline text-sm mr-4">¿Ya tienes cuenta? Inicia sesión</a>
              <a href="/" className="text-gray-600 hover:underline text-sm">Cancelar / Volver al inicio</a>
            </div>
            <button
              type="submit"
              className={`w-full md:w-auto bg-navy text-white py-2 px-6 rounded hover:bg-gold transition-colors font-semibold flex items-center justify-center ${loading || isFormInvalid() ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={loading || isFormInvalid()}
            >
              {loading && (
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              )}
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
);
};
export default AthleteRegistration;
