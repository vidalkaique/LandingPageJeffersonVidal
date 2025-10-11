import { Router } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Caminho para o arquivo de horários
const horariosPath = join(process.cwd(), 'client', 'public', 'horarios.json');

// GET - Buscar horários
router.get('/horarios', (req, res) => {
  try {
    const data = readFileSync(horariosPath, 'utf8');
    const horarios = JSON.parse(data);
    res.json(horarios);
  } catch (error) {
    console.error('Erro ao ler horários:', error);
    res.status(500).json({ error: 'Erro ao carregar horários' });
  }
});

// POST - Salvar horários
router.post('/horarios', (req, res) => {
  try {
    const { schedule } = req.body;
    
    // Validação básica
    if (!schedule || typeof schedule !== 'object') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Salva no arquivo JSON
    writeFileSync(horariosPath, JSON.stringify(schedule, null, 2), 'utf8');
    
    res.json({ 
      success: true, 
      message: 'Horários salvos com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao salvar horários:', error);
    res.status(500).json({ error: 'Erro ao salvar horários' });
  }
});

export default router;
