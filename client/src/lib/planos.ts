import { supabase } from './supabase';

// Tipos TypeScript para planos
export interface PlanoItem {
  id?: string;
  tipo: 'online' | 'presencial';
  nome: string;
  preco: string;
  preco_pix?: string;
  preco_cartao?: string;
  periodo?: string;
  features: string[];
  link?: string;
  ordem?: number;
  ativo?: boolean;
}

export interface PlanoFormatado {
  id?: string;
  name: string;
  price: string;
  preco_pix?: string;
  preco_cartao?: string;
  period?: string;
  features: string[];
  link?: string;
}

export interface PlanosAgrupados {
  online: PlanoFormatado[];
  presencial: PlanoFormatado[];
}

// Classe para gerenciar planos
export class PlanosService {
  
  // Buscar todos os planos formatados
  static async getPlanos(): Promise<PlanosAgrupados> {
    try {
      const { data, error } = await supabase.rpc('get_planos_formatados');
      
      if (error) {
        console.error('Erro ao buscar planos:', error);
        return this.getPlanosPadrao();
      }
      
      return data || this.getPlanosPadrao();
    } catch (error) {
      console.error('Erro de conexão:', error);
      return this.getPlanosPadrao();
    }
  }
  
  // Buscar planos por tipo para edição
  static async getPlanosPorTipo(tipo: 'online' | 'presencial'): Promise<PlanoItem[]> {
    try {
      const { data, error } = await supabase
        .from('planos')
        .select('*')
        .eq('tipo', tipo)
        .eq('ativo', true)
        .order('ordem');
      
      if (error) {
        console.error('Erro ao buscar planos por tipo:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro de conexão:', error);
      return [];
    }
  }
  
  // Salvar plano (criar ou atualizar)
  static async salvarPlano(plano: PlanoItem): Promise<boolean> {
    try {
      if (plano.id) {
        // Atualizar plano existente
        const { error } = await supabase
          .from('planos')
          .update({
            nome: plano.nome,
            preco: plano.preco,
            periodo: plano.periodo,
            features: plano.features,
            link: plano.link,
            ordem: plano.ordem
          })
          .eq('id', plano.id);
        
        if (error) {
          console.error('Erro ao atualizar plano:', error);
          return false;
        }
      } else {
        // Criar novo plano
        const { error } = await supabase
          .from('planos')
          .insert({
            tipo: plano.tipo,
            nome: plano.nome,
            preco: plano.preco,
            periodo: plano.periodo,
            features: plano.features,
            link: plano.link,
            ordem: plano.ordem || 0,
            ativo: true
          });
        
        if (error) {
          console.error('Erro ao criar plano:', error);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      return false;
    }
  }
  
  // Deletar plano (desativar)
  static async deletarPlano(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('planos')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) {
        console.error('Erro ao deletar plano:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao deletar plano:', error);
      return false;
    }
  }
  
  // Planos padrão (fallback)
  static getPlanosPadrao(): PlanosAgrupados {
    return {
      online: [
        {
          name: "MENSAL",
          price: "R$200,00",
          period: "por mês",
          features: [
            "Treino personalizado online",
            "Acompanhamento via WhatsApp",
            "Ajustes semanais no treino",
            "Suporte nutricional básico",
            "Acesso ao app exclusivo"
          ],
          link: "https://wa.me/5511999999999?text=Olá! Tenho interesse no plano MENSAL ONLINE"
        },
        {
          name: "TRIMESTRAL",
          price: "R$540,00",
          period: "3 meses (R$180/mês)",
          features: [
            "Treino personalizado online",
            "Acompanhamento via WhatsApp",
            "Ajustes semanais no treino",
            "Suporte nutricional completo",
            "Acesso ao app exclusivo",
            "Desconto de 10%"
          ],
          link: "https://wa.me/5511999999999?text=Olá! Tenho interesse no plano TRIMESTRAL ONLINE"
        },
        {
          name: "SEMESTRAL",
          price: "R$960,00",
          period: "6 meses (R$160/mês)",
          features: [
            "Treino personalizado online",
            "Acompanhamento via WhatsApp",
            "Ajustes semanais no treino",
            "Suporte nutricional completo",
            "Acesso ao app exclusivo",
            "Desconto de 20%",
            "Consultoria nutricional mensal"
          ],
          link: "https://wa.me/5511999999999?text=Olá! Tenho interesse no plano SEMESTRAL ONLINE"
        }
      ],
      presencial: [
        {
          name: "MENSAL PRESENCIAL",
          price: "R$400,00",
          period: "por mês",
          features: [
            "Treino personalizado na academia",
            "Acompanhamento presencial direto",
            "Ajustes em tempo real",
            "Suporte nutricional completo",
            "2x por semana"
          ],
          link: "https://wa.me/5511999999999?text=Olá! Tenho interesse no plano MENSAL PRESENCIAL"
        },
        {
          name: "TRIMESTRAL PRESENCIAL",
          price: "R$1080,00",
          period: "3 meses (R$360/mês)",
          features: [
            "Treino personalizado na academia",
            "Acompanhamento presencial direto",
            "Ajustes em tempo real",
            "Suporte nutricional completo",
            "2x por semana",
            "Desconto de 10%",
            "Avaliação física mensal"
          ],
          link: "https://wa.me/5511999999999?text=Olá! Tenho interesse no plano TRIMESTRAL PRESENCIAL"
        }
      ]
    };
  }
  
  // Verificar se Supabase está configurado
  static isConfigured(): boolean {
    return !!(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY);
  }
}
