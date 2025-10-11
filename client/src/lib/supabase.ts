import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Configurações do Supabase não encontradas. Usando modo offline.');
}

// Cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript
export interface HorarioItem {
  id?: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
  ativo?: boolean;
}

export interface HorarioFormatado {
  start: string;
  end: string;
  id?: string;
}

export interface HorariosAgrupados {
  [dia: string]: HorarioFormatado[];
}

// Classe para gerenciar horários
export class HorariosService {
  
  // Buscar todos os horários formatados
  static async getHorarios(): Promise<HorariosAgrupados> {
    try {
      const { data, error } = await supabase.rpc('get_horarios_formatados');
      
      if (error) {
        console.error('Erro ao buscar horários:', error);
        return this.getHorariosPadrao();
      }
      
      return data || this.getHorariosPadrao();
    } catch (error) {
      console.error('Erro de conexão:', error);
      return this.getHorariosPadrao();
    }
  }
  
  // Salvar horários (substitui todos)
  static async salvarHorarios(horarios: HorariosAgrupados): Promise<boolean> {
    try {
      // 1. Desativar todos os horários existentes
      const { error: deleteError } = await supabase
        .from('horarios')
        .update({ ativo: false })
        .eq('ativo', true);
      
      if (deleteError) {
        console.error('Erro ao desativar horários:', deleteError);
        return false;
      }
      
      // 2. Inserir novos horários
      const novosHorarios: Omit<HorarioItem, 'id'>[] = [];
      
      Object.entries(horarios).forEach(([dia, slots]) => {
        slots.forEach(slot => {
          novosHorarios.push({
            dia_semana: dia,
            hora_inicio: slot.start,
            hora_fim: slot.end,
            ativo: true
          });
        });
      });
      
      if (novosHorarios.length > 0) {
        const { error: insertError } = await supabase
          .from('horarios')
          .insert(novosHorarios);
        
        if (insertError) {
          console.error('Erro ao inserir horários:', insertError);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar horários:', error);
      return false;
    }
  }
  
  // Horários padrão (fallback)
  static getHorariosPadrao(): HorariosAgrupados {
    return {
      segunda: [
        { start: '06:00', end: '08:00' },
        { start: '18:00', end: '20:00' },
        { start: '20:00', end: '22:00' }
      ],
      terca: [
        { start: '06:00', end: '08:00' },
        { start: '18:00', end: '20:00' }
      ],
      quarta: [
        { start: '06:00', end: '08:00' },
        { start: '18:00', end: '20:00' },
        { start: '20:00', end: '22:00' }
      ],
      quinta: [
        { start: '06:00', end: '08:00' },
        { start: '18:00', end: '20:00' }
      ],
      sexta: [
        { start: '06:00', end: '08:00' },
        { start: '18:00', end: '20:00' },
        { start: '20:00', end: '22:00' }
      ],
      sabado: [
        { start: '08:00', end: '10:00' },
        { start: '10:00', end: '12:00' }
      ],
      domingo: []
    };
  }
  
  // Verificar se Supabase está configurado
  static isConfigured(): boolean {
    return !!(supabaseUrl && supabaseAnonKey);
  }
}
