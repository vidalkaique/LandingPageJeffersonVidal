-- ============================================
-- SCRIPT PARA GERENCIAR PLANOS NO SUPABASE
-- ============================================

-- 1. Criar tabela de planos
CREATE TABLE IF NOT EXISTS public.planos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('online', 'presencial')),
  nome TEXT NOT NULL,
  preco TEXT NOT NULL,
  periodo TEXT,
  features TEXT[] NOT NULL,
  link TEXT,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices
CREATE INDEX IF NOT EXISTS idx_planos_tipo ON public.planos(tipo);
CREATE INDEX IF NOT EXISTS idx_planos_ativo ON public.planos(ativo);
CREATE INDEX IF NOT EXISTS idx_planos_ordem ON public.planos(ordem);

-- 3. Desabilitar RLS para teste
ALTER TABLE public.planos DISABLE ROW LEVEL SECURITY;

-- 4. Inserir planos online padrão
INSERT INTO public.planos (tipo, nome, preco, periodo, features, link, ordem) VALUES
('online', 'MENSAL', 'R$200,00', 'por mês', 
 ARRAY[
   'Treino personalizado online',
   'Acompanhamento via WhatsApp',
   'Ajustes semanais no treino',
   'Suporte nutricional básico',
   'Acesso ao app exclusivo'
 ], 
 'https://wa.me/5511999999999?text=Olá! Tenho interesse no plano MENSAL ONLINE', 1),

('online', 'TRIMESTRAL', 'R$540,00', '3 meses (R$180/mês)', 
 ARRAY[
   'Treino personalizado online',
   'Acompanhamento via WhatsApp',
   'Ajustes semanais no treino',
   'Suporte nutricional completo',
   'Acesso ao app exclusivo',
   'Desconto de 10%'
 ], 
 'https://wa.me/5511999999999?text=Olá! Tenho interesse no plano TRIMESTRAL ONLINE', 2),

('online', 'SEMESTRAL', 'R$960,00', '6 meses (R$160/mês)', 
 ARRAY[
   'Treino personalizado online',
   'Acompanhamento via WhatsApp',
   'Ajustes semanais no treino',
   'Suporte nutricional completo',
   'Acesso ao app exclusivo',
   'Desconto de 20%',
   'Consultoria nutricional mensal'
 ], 
 'https://wa.me/5511999999999?text=Olá! Tenho interesse no plano SEMESTRAL ONLINE', 3);

-- 5. Inserir planos presenciais padrão
INSERT INTO public.planos (tipo, nome, preco, periodo, features, link, ordem) VALUES
('presencial', 'MENSAL PRESENCIAL', 'R$400,00', 'por mês', 
 ARRAY[
   'Treino personalizado na academia',
   'Acompanhamento presencial direto',
   'Ajustes em tempo real',
   'Suporte nutricional completo',
   '2x por semana'
 ], 
 'https://wa.me/5511999999999?text=Olá! Tenho interesse no plano MENSAL PRESENCIAL', 1),

('presencial', 'TRIMESTRAL PRESENCIAL', 'R$1080,00', '3 meses (R$360/mês)', 
 ARRAY[
   'Treino personalizado na academia',
   'Acompanhamento presencial direto',
   'Ajustes em tempo real',
   'Suporte nutricional completo',
   '2x por semana',
   'Desconto de 10%',
   'Avaliação física mensal'
 ], 
 'https://wa.me/5511999999999?text=Olá! Tenho interesse no plano TRIMESTRAL PRESENCIAL', 2);

-- 6. Criar função para buscar planos formatados
CREATE OR REPLACE FUNCTION get_planos_formatados()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'online', (
      SELECT json_agg(
        json_build_object(
          'id', id,
          'name', nome,
          'price', preco,
          'period', periodo,
          'features', features,
          'link', link
        ) ORDER BY ordem
      )
      FROM public.planos 
      WHERE tipo = 'online' AND ativo = true
    ),
    'presencial', (
      SELECT json_agg(
        json_build_object(
          'id', id,
          'name', nome,
          'price', preco,
          'period', periodo,
          'features', features,
          'link', link
        ) ORDER BY ordem
      )
      FROM public.planos 
      WHERE tipo = 'presencial' AND ativo = true
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger para updated_at
CREATE TRIGGER update_planos_updated_at
  BEFORE UPDATE ON public.planos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TESTE A FUNÇÃO:
-- SELECT get_planos_formatados();
-- ============================================
