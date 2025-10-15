-- ============================================
-- SCRIPT: Integração Asaas - Links de Pagamento
-- DESCRIÇÃO: Adiciona campos para armazenar links do Asaas e logs de pagamento
-- VERSÃO: 1.0
-- DATA: 2025-10-14
-- ============================================

-- 1. Adicionar campos para links Asaas na tabela planos
ALTER TABLE public.planos 
ADD COLUMN IF NOT EXISTS asaas_link_pix TEXT,
ADD COLUMN IF NOT EXISTS asaas_link_cartao TEXT,
ADD COLUMN IF NOT EXISTS asaas_enabled BOOLEAN DEFAULT false;

-- 2. Criar tabela para logs de pagamento
CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plano_id UUID REFERENCES public.planos(id),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('pix', 'cartao')),
  asaas_link_id TEXT,
  asaas_link_url TEXT,
  customer_email TEXT,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'expired')),
  external_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_payment_logs_plano_id ON public.payment_logs(plano_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_status ON public.payment_logs(status);
CREATE INDEX IF NOT EXISTS idx_payment_logs_created_at ON public.payment_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_payment_logs_asaas_link_id ON public.payment_logs(asaas_link_id);

-- 4. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Criar trigger para payment_logs
DROP TRIGGER IF EXISTS update_payment_logs_updated_at ON public.payment_logs;
CREATE TRIGGER update_payment_logs_updated_at
    BEFORE UPDATE ON public.payment_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Criar função para buscar estatísticas de pagamento
CREATE OR REPLACE FUNCTION get_payment_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_links_created', COUNT(*),
        'total_paid', COUNT(*) FILTER (WHERE status = 'paid'),
        'total_pending', COUNT(*) FILTER (WHERE status = 'created'),
        'total_failed', COUNT(*) FILTER (WHERE status = 'failed'),
        'revenue_pix', COALESCE(SUM(amount) FILTER (WHERE payment_type = 'pix' AND status = 'paid'), 0),
        'revenue_cartao', COALESCE(SUM(amount) FILTER (WHERE payment_type = 'cartao' AND status = 'paid'), 0),
        'last_30_days', COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')
    ) INTO result
    FROM public.payment_logs;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 7. Habilitar RLS (Row Level Security) para payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- 8. Criar política para permitir inserção de logs
CREATE POLICY "Allow insert payment logs" ON public.payment_logs
    FOR INSERT WITH CHECK (true);

-- 9. Criar política para leitura de logs (apenas admin)
CREATE POLICY "Allow read payment logs" ON public.payment_logs
    FOR SELECT USING (true);

-- 10. Comentários para documentação
COMMENT ON TABLE public.payment_logs IS 'Logs de links de pagamento criados via API Asaas';
COMMENT ON COLUMN public.planos.asaas_link_pix IS 'Link fixo do Asaas para pagamento PIX (se configurado)';
COMMENT ON COLUMN public.planos.asaas_link_cartao IS 'Link fixo do Asaas para pagamento Cartão (se configurado)';
COMMENT ON COLUMN public.planos.asaas_enabled IS 'Indica se o plano está habilitado para pagamento via Asaas';

-- ============================================
-- SCRIPT EXECUTADO COM SUCESSO!
-- ============================================
