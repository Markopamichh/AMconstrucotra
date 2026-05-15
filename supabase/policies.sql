-- ============================================================
-- RLS Policies — AM Soluciones Constructivas
-- Correr en: Supabase Dashboard → SQL Editor
--
-- ADVERTENCIA: antes de aplicar, verificar que los proyectos
-- existentes tengan publicado = true o no serán visibles.
-- ============================================================

-- ------------------------------------------------------------
-- TABLA: proyectos
-- ------------------------------------------------------------
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- Eliminar policies previas para evitar duplicados
DROP POLICY IF EXISTS "Proyectos públicos visibles" ON proyectos;
DROP POLICY IF EXISTS "Proyectos: lectura total auth" ON proyectos;
DROP POLICY IF EXISTS "Proyectos: insertar auth" ON proyectos;
DROP POLICY IF EXISTS "Proyectos: actualizar auth" ON proyectos;
DROP POLICY IF EXISTS "Proyectos: eliminar auth" ON proyectos;

-- SELECT público: solo proyectos publicados
CREATE POLICY "Proyectos públicos visibles"
  ON proyectos FOR SELECT
  TO anon
  USING (publicado = true);

-- SELECT total para usuarios autenticados (admin)
CREATE POLICY "Proyectos: lectura total auth"
  ON proyectos FOR SELECT
  TO authenticated
  USING (true);

-- INSERT solo autenticados
CREATE POLICY "Proyectos: insertar auth"
  ON proyectos FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE solo autenticados
CREATE POLICY "Proyectos: actualizar auth"
  ON proyectos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE solo autenticados
CREATE POLICY "Proyectos: eliminar auth"
  ON proyectos FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- TABLA: contactos
-- ------------------------------------------------------------
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Contactos: insertar público" ON contactos;
DROP POLICY IF EXISTS "Contactos: lectura auth" ON contactos;
DROP POLICY IF EXISTS "Contactos: actualizar auth" ON contactos;
DROP POLICY IF EXISTS "Contactos: eliminar auth" ON contactos;

-- INSERT público (formulario de contacto del sitio)
CREATE POLICY "Contactos: insertar público"
  ON contactos FOR INSERT
  TO anon
  WITH CHECK (true);

-- SELECT solo autenticados
CREATE POLICY "Contactos: lectura auth"
  ON contactos FOR SELECT
  TO authenticated
  USING (true);

-- UPDATE solo autenticados (marcar como leído)
CREATE POLICY "Contactos: actualizar auth"
  ON contactos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE solo autenticados
CREATE POLICY "Contactos: eliminar auth"
  ON contactos FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- TABLA: galeria
-- ------------------------------------------------------------
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Galería: lectura pública" ON galeria;
DROP POLICY IF EXISTS "Galería: lectura auth" ON galeria;
DROP POLICY IF EXISTS "Galería: insertar auth" ON galeria;
DROP POLICY IF EXISTS "Galería: actualizar auth" ON galeria;
DROP POLICY IF EXISTS "Galería: eliminar auth" ON galeria;

-- SELECT público (galería siempre visible)
CREATE POLICY "Galería: lectura pública"
  ON galeria FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Galería: lectura auth"
  ON galeria FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Galería: insertar auth"
  ON galeria FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Galería: actualizar auth"
  ON galeria FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Galería: eliminar auth"
  ON galeria FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------
-- STORAGE: bucket proyectos-imagenes
-- Correr en: Supabase Dashboard → Storage → Policies
-- ------------------------------------------------------------

-- SELECT público (imágenes accesibles sin auth)
-- INSERT/UPDATE/DELETE solo autenticados
-- Estas policies se configuran en el dashboard de Storage o via:

INSERT INTO storage.buckets (id, name, public)
VALUES ('proyectos-imagenes', 'proyectos-imagenes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Storage: lectura pública" ON storage.objects;
DROP POLICY IF EXISTS "Storage: escritura auth" ON storage.objects;
DROP POLICY IF EXISTS "Storage: actualizar auth" ON storage.objects;
DROP POLICY IF EXISTS "Storage: eliminar auth" ON storage.objects;

CREATE POLICY "Storage: lectura pública"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'proyectos-imagenes');

CREATE POLICY "Storage: escritura auth"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'proyectos-imagenes');

CREATE POLICY "Storage: actualizar auth"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'proyectos-imagenes');

CREATE POLICY "Storage: eliminar auth"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'proyectos-imagenes');
