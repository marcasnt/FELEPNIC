import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Debes definir las variables VITE_SUPABASE_URL y VITE_SUPABASE_SERVICE_ROLE_KEY en tu entorno.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdminUser() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error al listar usuarios:', error.message);
    process.exit(1);
  }
  const admins = data.users.filter(
    (u: any) => u.user_metadata && u.user_metadata.role === 'admin'
  );
  if (admins.length === 0) {
    console.log('No hay usuarios administradores registrados.');
  } else {
    console.log('Usuarios administradores encontrados:');
    admins.forEach((u: any) => {
      console.log(`- ${u.email}`);
    });
  }
}

checkAdminUser();
