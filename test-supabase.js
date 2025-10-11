// Script para testar conexão com Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwizypzzocupqoepaauv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3aXp5cHp6b2N1cHFvZXBhYXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMTM3OTUsImV4cCI6MjA3NTc4OTc5NX0.J37CHnD640cu53vWJunrM27FcLGfEGRoDt4iThA42cI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testando conexão com Supabase...');
  
  try {
    // Teste 1: Verificar se consegue conectar
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message);
      console.log('\n📋 Próximos passos:');
      console.log('1. Execute o script SQL no Supabase Dashboard');
      console.log('2. Vá para SQL Editor e cole o conteúdo de supabase-setup.sql');
      console.log('3. Execute o script completo');
      return;
    }
    
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log('📊 Dados encontrados:', data?.length || 0, 'registros');
    
    // Teste 2: Testar função personalizada
    const { data: funcData, error: funcError } = await supabase.rpc('get_horarios_formatados');
    
    if (funcError) {
      console.log('⚠️  Função get_horarios_formatados não encontrada');
      console.log('📋 Execute o script SQL completo no Supabase');
    } else {
      console.log('✅ Função personalizada funcionando!');
      console.log('📅 Horários formatados:', Object.keys(funcData || {}).length, 'dias');
    }
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
  }
}

testConnection();
