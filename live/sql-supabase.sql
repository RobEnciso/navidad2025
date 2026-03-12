-- ═══════════════════════════════════════════════════════════════
-- CREAFILMS LIVE — Base de datos Supabase
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- TABLA: eventos (una fila por cada boda que transmites)
CREATE TABLE IF NOT EXISTS eventos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_pareja text NOT NULL,
  fecha text NOT NULL,
  lugar text NOT NULL,
  youtube_id text NOT NULL,
  mensaje_bienvenida text DEFAULT 'Gracias por acompañarnos en este día tan especial',
  activo boolean DEFAULT false,
  color_tema jsonb DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

-- TABLA: comentarios (mensajes de invitados en tiempo real)
CREATE TABLE IF NOT EXISTS comentarios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_id uuid REFERENCES eventos(id) ON DELETE CASCADE,
  nombre_visitante text NOT NULL,
  mensaje text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Índice para búsquedas rápidas de comentarios por evento
CREATE INDEX IF NOT EXISTS idx_comentarios_evento
  ON comentarios(evento_id, created_at DESC);

-- ═══════════════════════════════════════════════════════════════
-- SEGURIDAD: Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Habilitar RLS en ambas tablas
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;

-- EVENTOS: solo lectura pública (cualquiera puede ver)
DROP POLICY IF EXISTS "eventos_select" ON eventos;
CREATE POLICY "eventos_select"
  ON eventos FOR SELECT
  USING (true);

-- COMENTARIOS: lectura pública (cualquiera puede ver)
DROP POLICY IF EXISTS "comentarios_select" ON comentarios;
CREATE POLICY "comentarios_select"
  ON comentarios FOR SELECT
  USING (true);

-- COMENTARIOS: inserción pública (cualquiera puede comentar)
DROP POLICY IF EXISTS "comentarios_insert" ON comentarios;
CREATE POLICY "comentarios_insert"
  ON comentarios FOR INSERT
  WITH CHECK (true);

-- EVENTOS: inserción pública (el admin crea eventos)
DROP POLICY IF EXISTS "eventos_insert" ON eventos;
CREATE POLICY "eventos_insert"
  ON eventos FOR INSERT
  WITH CHECK (true);

-- EVENTOS: actualización pública (el admin activa/edita eventos)
DROP POLICY IF EXISTS "eventos_update" ON eventos;
CREATE POLICY "eventos_update"
  ON eventos FOR UPDATE
  USING (true);

-- EVENTOS: eliminación pública (el admin borra eventos)
DROP POLICY IF EXISTS "eventos_delete" ON eventos;
CREATE POLICY "eventos_delete"
  ON eventos FOR DELETE
  USING (true);

-- ═══════════════════════════════════════════════════════════════
-- REALTIME: Habilitar actualizaciones en tiempo real
-- ═══════════════════════════════════════════════════════════════

-- Agregar ambas tablas a la publicación de Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE eventos;
ALTER PUBLICATION supabase_realtime ADD TABLE comentarios;

-- NOTA: También debes habilitar Realtime desde el dashboard:
-- Database → Replication → Habilitar para "comentarios"

-- ═══════════════════════════════════════════════════════════════
-- DATOS DE PRUEBA (comentar/descomentar según necesites)
-- ═══════════════════════════════════════════════════════════════

-- Ejemplo de evento de prueba
-- Descomenta las siguientes 4 líneas para crear un evento de prueba:

/*
INSERT INTO eventos (nombre_pareja, fecha, lugar, youtube_id, activo)
VALUES (
  'Ana & Carlos',
  '15 de Marzo 2025',
  'Hacienda Los Arcos, Puerto Vallarta',
  'jfKfPfyJRdk',
  true
);
*/

-- CÓMO OBTENER EL youtube_id:
-- De esta URL: https://www.youtube.com/watch?v=jfKfPfyJRdk
-- El youtube_id es: jfKfPfyJRdk (lo que viene después de "v=")

-- ═══════════════════════════════════════════════════════════════
-- FIN DEL SCRIPT
-- ═══════════════════════════════════════════════════════════════
