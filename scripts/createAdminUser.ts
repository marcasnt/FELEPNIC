import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Debes definir las variables VITE_SUPABASE_URL y VITE_SUPABASE_SERVICE_ROLE_KEY en tu entorno.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  const email = 'admin@email.com'; // Cambia por el email que desees
  const password = 'AdminFelepnic2025*'; // Cambia por una contraseña segura
  const first_name = 'Administrador';
  const last_name = 'FELEPNIC';

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      role: 'admin',
      first_name,
      last_name
    },
    email_confirm: true
  });

  if (error) {
    console.error('Error creando usuario admin:', error.message);
    process.exit(1);
  }
  console.log('Usuario administrador creado correctamente:', data.user);
}

createAdminUser();
