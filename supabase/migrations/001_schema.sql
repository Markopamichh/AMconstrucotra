-- ============================================================
-- AM Soluciones Constructivas — Schema inicial
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLA: proyectos
-- ============================================================
CREATE TABLE IF NOT EXISTS public.proyectos (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo          text NOT NULL,
  slug            text NOT NULL UNIQUE,
  descripcion_corta text,
  descripcion     text,
  categoria       text CHECK (categoria IN ('estructuras', 'terminaciones', 'obra_completa')),
  imagenes        text[] DEFAULT '{}',
  imagen_portada  text,
  imagen_antes    text,
  imagen_despues  text,
  destacado       boolean NOT NULL DEFAULT false,
  orden           integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLA: contactos
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contactos (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre               text NOT NULL,
  telefono             text NOT NULL,
  localidad            text NOT NULL,
  descripcion_proyecto text NOT NULL,
  disponibilidad       text NOT NULL,
  leido                boolean NOT NULL DEFAULT false,
  created_at           timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contactos  ENABLE ROW LEVEL SECURITY;

-- proyectos: lectura pública
CREATE POLICY "proyectos_select_public"
  ON public.proyectos FOR SELECT
  USING (true);

-- proyectos: escritura solo autenticados
CREATE POLICY "proyectos_insert_auth"
  ON public.proyectos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "proyectos_update_auth"
  ON public.proyectos FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "proyectos_delete_auth"
  ON public.proyectos FOR DELETE
  USING (auth.role() = 'authenticated');

-- contactos: inserción pública (formulario)
CREATE POLICY "contactos_insert_public"
  ON public.contactos FOR INSERT
  WITH CHECK (true);

-- contactos: lectura y actualización solo autenticados
CREATE POLICY "contactos_select_auth"
  ON public.contactos FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "contactos_update_auth"
  ON public.contactos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE
-- Ejecutar en Supabase Dashboard > Storage > New bucket
-- o via SQL como se muestra a continuación
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('proyectos-imagenes', 'proyectos-imagenes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "storage_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'proyectos-imagenes');

CREATE POLICY "storage_insert_auth"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'proyectos-imagenes'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "storage_delete_auth"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'proyectos-imagenes'
    AND auth.role() = 'authenticated'
  );
