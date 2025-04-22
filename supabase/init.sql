-- Crear tabla de atletas
CREATE TABLE IF NOT EXISTS public.athletes (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('M', 'F')),
    weight_category TEXT NOT NULL,
    federation_id TEXT,
    document_id TEXT,
    phone TEXT,
    email TEXT NOT NULL UNIQUE,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    address TEXT,
    club TEXT,
    coach TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- Crear tabla de registros de competencia
CREATE TABLE IF NOT EXISTS public.competition_records (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    athlete_id UUID REFERENCES public.athletes(id) ON DELETE CASCADE,
    competition_name TEXT NOT NULL,
    competition_date DATE NOT NULL,
    weight_category TEXT NOT NULL,
    snatch DECIMAL(5,2),
    clean_and_jerk DECIMAL(5,2),
    total DECIMAL(5,2),
    place INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Desactivar temporalmente RLS para la tabla athletes durante la configuración inicial
ALTER TABLE public.athletes DISABLE ROW LEVEL SECURITY;

-- Crear política permisiva para inserción inicial
DROP POLICY IF EXISTS "Athletes insert policy" ON public.athletes;
CREATE POLICY "Athletes insert policy"
    ON public.athletes
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Permitir acceso público a la tabla athletes
GRANT ALL ON public.athletes TO anon;
GRANT ALL ON public.athletes TO authenticated;

-- Asegurar que la secuencia del ID esté accesible
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Políticas para la tabla competition_records

-- 1. Los usuarios pueden ver sus propios registros
CREATE POLICY "Users can view own competition records"
    ON public.competition_records
    FOR SELECT
    USING (athlete_id IN (
        SELECT id FROM public.athletes WHERE auth_user_id = auth.uid()
    ));

-- 2. Los usuarios pueden crear registros para sí mismos
CREATE POLICY "Users can insert own competition records"
    ON public.competition_records
    FOR INSERT
    WITH CHECK (athlete_id IN (
        SELECT id FROM public.athletes WHERE auth_user_id = auth.uid()
    ));

-- 3. Los usuarios pueden actualizar sus propios registros
CREATE POLICY "Users can update own competition records"
    ON public.competition_records
    FOR UPDATE
    USING (athlete_id IN (
        SELECT id FROM public.athletes WHERE auth_user_id = auth.uid()
    ));

-- Función para actualizar el timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar el timestamp
CREATE TRIGGER update_athletes_updated_at
    BEFORE UPDATE ON public.athletes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Dar permisos necesarios
GRANT ALL ON public.athletes TO anon, authenticated;
GRANT ALL ON public.competition_records TO anon, authenticated;
