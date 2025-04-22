import { supabase } from '../lib/supabase';
import type { Athlete } from '../lib/supabase';

export const authService = {
  // Registrar un nuevo atleta con autenticación
  async registerAthlete(athlete: Omit<Athlete, 'id' | 'created_at' | 'updated_at' | 'auth_user_id'>, password: string) {
    try {
      // Verificar si ya existe un atleta con ese correo
      const { data: existingAthletes, error: checkError } = await supabase
        .from('athletes')
        .select('id')
        .eq('email', athlete.email);
      if (checkError) {
        console.error('Error al verificar duplicados:', checkError);
        throw new Error('Error al verificar si el correo ya está registrado.');
      }
      if (existingAthletes && existingAthletes.length > 0) {
        throw new Error('Ya existe un atleta registrado con este correo electrónico.');
      }
      console.log('Iniciando registro de atleta:', { ...athlete, password: '***' });

      // 1. Crear usuario en auth.users
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: athlete.email,
        password: password,
        options: {
          data: {
            first_name: athlete.first_name,
            last_name: athlete.last_name,
          }
        }
      });

      if (authError) {
        console.error('Error al crear usuario en auth:', authError);
        // Si el error es de email duplicado, mostrar mensaje claro
        if (authError.message && authError.message.toLowerCase().includes('user already registered')) {
          throw new Error('Ya existe una cuenta registrada con este correo electrónico.');
        }
        throw new Error(`Error al crear usuario: ${authError.message}`);
      }

      if (!authData.user) {
        console.error('No se recibieron datos del usuario después del registro');
        throw new Error('No se pudo crear el usuario');
      }

      console.log('Usuario creado exitosamente:', authData.user.id);

      // Esperar un poco más para asegurar que el usuario esté creado en auth.users
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Crear el perfil del atleta
      const athleteProfile = {
        ...athlete,
        auth_user_id: authData.user.id,
      };

      console.log('Intentando crear perfil de atleta:', athleteProfile);

      // Intentar crear el perfil varias veces si es necesario
      let attempts = 0;
      let athleteData = null;
      let lastError = null;

      while (attempts < 3) {
        const { data, error } = await supabase
          .from('athletes')
          .insert([athleteProfile])
          .select()
          .single();

        if (error) {
          // Si el error es de llave foránea, dar mensaje claro
          if (error.message.includes('foreign key constraint')) {
            lastError = { ...error, message: 'Error: El usuario no está disponible en la base de datos de autenticación. Intenta de nuevo en unos segundos.' };
          } else {
            lastError = error;
          }
          console.error(`Intento ${attempts + 1} fallido:`, error);
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar más entre intentos
        } else {
          athleteData = data;
          break;
        }
      }

      if (!athleteData) {
        // Si todos los intentos fallaron, limpiar el usuario auth
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
          console.log('Usuario auth eliminado después de error');
        } catch (deleteError) {
          console.error('Error al limpiar usuario auth:', deleteError);
        }
        // Mensaje de error más claro para el usuario
        throw new Error(`Error al crear perfil de atleta. ${lastError?.message || ''} El usuario fue eliminado. Intenta de nuevo en unos segundos.`);
      }

      console.log('Perfil de atleta creado exitosamente:', athleteData);
      return athleteData;
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      throw error instanceof Error ? error : new Error('Error desconocido en el registro');
    }
  },

  // Iniciar sesión
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Obtener el rol del usuario
    const userRole = data.user?.user_metadata?.role;

    // Si es admin, no buscar perfil de atleta
    if (userRole === 'admin') {
      return {
        session: data.session,
        athlete: null
      };
    }

    // Buscar perfiles de atleta asociados SOLO si NO es admin
    const { data: athletes, error: athleteError } = await supabase
      .from('athletes')
      .select('*')
      .eq('auth_user_id', data.user.id);

    if (athleteError) throw athleteError;

    if (!athletes || athletes.length === 0) {
      throw new Error('No se encontró un perfil de atleta asociado a este usuario.');
    }
    if (athletes.length > 1) {
      throw new Error('Hay más de un perfil de atleta asociado a este usuario. Contacta al administrador.');
    }

    return {
      session: data.session,
      athlete: athletes[0]
    };
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obtener sesión actual
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Obtener perfil del atleta actual
  async getCurrentAthlete() {
    const session = await this.getCurrentSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('auth_user_id', session.user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Restablecer contraseña
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  // Actualizar contraseña
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  }
};
