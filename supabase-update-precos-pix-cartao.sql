-- ============================================
-- SCRIPT PARA ADICIONAR PREÇOS PIX E CARTÃO
-- Execute este script no Supabase SQL Editor
-- ============================================

-- 1. Adicionar novas colunas para preços PIX e Cartão
ALTER TABLE public.planos 
ADD COLUMN IF NOT EXISTS preco_pix TEXT,
ADD COLUMN IF NOT EXISTS preco_cartao TEXT;

-- 2. Atualizar planos existentes com os novos preços
-- PLANOS ONLINE
UPDATE public.planos 
SET 
  preco_pix = 'R$ 200',
  preco_cartao = 'R$ 210'
WHERE nome ILIKE '%mensal%' AND tipo = 'online';

UPDATE public.planos 
SET 
  preco_pix = 'R$ 350',
  preco_cartao = 'R$ 365'
WHERE nome ILIKE '%bimestral%' AND tipo = 'online';

UPDATE public.planos 
SET 
  preco_pix = 'R$ 500',
  preco_cartao = 'R$ 520'
WHERE nome ILIKE '%trimestral%' AND tipo = 'online';

-- PLANOS PRESENCIAIS
UPDATE public.planos 
SET 
  preco_pix = 'R$ 700',
  preco_cartao = 'R$ 727'
WHERE (nome ILIKE '%3x%' OR nome ILIKE '%3 x%') AND tipo = 'presencial';

UPDATE public.planos 
SET 
  preco_pix = 'R$ 900',
  preco_cartao = 'R$ 935'
WHERE (nome ILIKE '%5x%' OR nome ILIKE '%5 x%') AND tipo = 'presencial';

-- 3. Criar ou atualizar função para retornar planos formatados com preços PIX/Cartão
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
          'preco_pix', preco_pix,
          'preco_cartao', preco_cartao,
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
          'preco_pix', preco_pix,
          'preco_cartao', preco_cartao,
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
$$ LANGUAGE plpgsql;

-- 4. Verificar se os dados foram atualizados corretamente
SELECT 
  id,
  tipo,
  nome,
  preco as preco_original,
  preco_pix,
  preco_cartao,
  ordem
FROM public.planos 
ORDER BY tipo, ordem;

-- 5. Testar a função atualizada
SELECT get_planos_formatados();

-- ============================================
-- INSTRUÇÕES PARA USAR:
-- ============================================
-- 1. Copie todo este script
-- 2. Vá para o Supabase Dashboard
-- 3. Acesse SQL Editor
-- 4. Cole o script e execute
-- 5. Verifique se os dados foram atualizados
-- ============================================
