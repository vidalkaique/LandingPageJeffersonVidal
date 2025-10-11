-- ============================================
-- SCRIPT SIMPLIFICADO PARA TESTE RÁPIDO
-- ============================================

-- 1. Criar tabela de horários
CREATE TABLE IF NOT EXISTS public.horarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dia_semana TEXT NOT NULL CHECK (dia_semana IN ('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo')),
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_horarios_dia_semana ON public.horarios(dia_semana);
CREATE INDEX IF NOT EXISTS idx_horarios_ativo ON public.horarios(ativo);

-- 3. DESABILITAR RLS temporariamente para teste
ALTER TABLE public.horarios DISABLE ROW LEVEL SECURITY;

-- 4. Inserir dados iniciais (horários padrão)
INSERT INTO public.horarios (dia_semana, hora_inicio, hora_fim) VALUES
  -- Segunda-feira
  ('segunda', '06:00', '08:00'),
  ('segunda', '18:00', '20:00'),
  ('segunda', '20:00', '22:00'),
  
  -- Terça-feira
  ('terca', '06:00', '08:00'),
  ('terca', '18:00', '20:00'),
  
  -- Quarta-feira
  ('quarta', '06:00', '08:00'),
  ('quarta', '18:00', '20:00'),
  ('quarta', '20:00', '22:00'),
  
  -- Quinta-feira
  ('quinta', '06:00', '08:00'),
  ('quinta', '18:00', '20:00'),
  
  -- Sexta-feira
  ('sexta', '06:00', '08:00'),
  ('sexta', '18:00', '20:00'),
  ('sexta', '20:00', '22:00'),
  
  -- Sábado
  ('sabado', '08:00', '10:00'),
  ('sabado', '10:00', '12:00')

ON CONFLICT DO NOTHING;

-- 5. Criar função para buscar horários formatados
CREATE OR REPLACE FUNCTION get_horarios_formatados()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_object_agg(
    dia_semana,
    horarios_do_dia
  ) INTO result
  FROM (
    SELECT 
      dia_semana,
      json_agg(
        json_build_object(
          'start', hora_inicio::TEXT,
          'end', hora_fim::TEXT,
          'id', id
        ) ORDER BY hora_inicio
      ) as horarios_do_dia
    FROM public.horarios 
    WHERE ativo = true
    GROUP BY dia_semana
  ) grouped;
  
  -- Garantir que todos os dias estejam presentes
  SELECT json_object_agg(
    dia,
    COALESCE(result ->> dia, '[]'::TEXT)::JSON
  ) INTO result
  FROM (VALUES 
    ('segunda'), ('terca'), ('quarta'), 
    ('quinta'), ('sexta'), ('sabado'), ('domingo')
  ) AS dias(dia);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_horarios_updated_at
  BEFORE UPDATE ON public.horarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSTRUÇÕES:
-- ============================================
-- 1. Execute este script no SQL Editor do Supabase
-- 2. Teste a aplicação
-- 3. Se funcionar, pode habilitar RLS depois
-- ============================================
