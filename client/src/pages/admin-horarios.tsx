import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save, Clock, Smartphone, Wifi, WifiOff } from "lucide-react";
import { HorariosService, type HorariosAgrupados } from "@/lib/supabase";

interface TimeSlot {
  start: string;
  end: string;
  id?: string;
}

const DAYS = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
];

export default function AdminHorarios() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [schedule, setSchedule] = useState<HorariosAgrupados>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Carrega horários quando autentica
  useEffect(() => {
    if (isAuthenticated) {
      loadSchedule();
    }
  }, [isAuthenticated]);

  const loadSchedule = async () => {
    try {
      const horarios = await HorariosService.getHorarios();
      setSchedule(horarios);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      setSchedule(HorariosService.getHorariosPadrao());
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === 'jefferson2024') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const addTimeSlot = (day: string) => {
    setSchedule((prev: HorariosAgrupados) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: '09:00', end: '10:00' }]
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setSchedule((prev: HorariosAgrupados) => ({
      ...prev,
      [day]: prev[day]?.filter((_: TimeSlot, i: number) => i !== index) || []
    }));
  };

  const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
    setSchedule((prev: HorariosAgrupados) => ({
      ...prev,
      [day]: prev[day]?.map((slot: TimeSlot, i: number) => 
        i === index ? { ...slot, [field]: value } : slot
      ) || []
    }));
  };

  const saveSchedule = async () => {
    setIsSaving(true);
    try {
      const sucesso = await HorariosService.salvarHorarios(schedule);
      
      if (sucesso) {
        alert('✅ Horários salvos com sucesso!');
      } else {
        throw new Error('Falha ao salvar no Supabase');
      }
    } catch (error) {
      console.error('Erro ao salvar horários:', error);
      alert('❌ Erro ao salvar horários. Verifique sua conexão.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-white text-xl">
              Painel do Jefferson
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Gerencie seus horários de atendimento
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header Mobile */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-zinc-800 -mx-4 px-4 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Meus Horários</h1>
                {HorariosService.isConfigured() ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-gray-400">Jefferson Vidal</p>
            </div>
          </div>
          <Button 
            onClick={saveSchedule}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-sm px-3 py-2"
          >
            <Save className="w-4 h-4 mr-1" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando horários...</p>
          </div>
        </div>
      ) : (
        /* Days Cards - Mobile Optimized */
        <div className="space-y-4 max-w-2xl mx-auto">
        {DAYS.map((day) => (
          <Card key={day.key} className="bg-zinc-900 border-zinc-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base">
                  {day.label}
                </CardTitle>
                <Button
                  onClick={() => addTimeSlot(day.key)}
                  size="sm"
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule[day.key].length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  Nenhum horário disponível
                </p>
              ) : (
                schedule[day.key]?.map((slot: TimeSlot, index: number) => (
                  <div key={index} className="bg-zinc-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Horário {index + 1}</span>
                      <Button
                        onClick={() => removeTimeSlot(day.key, index)}
                        size="sm"
                        variant="ghost"
                        className="ml-auto text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Início</label>
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(day.key, index, 'start', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Fim</label>
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(day.key, index, 'end', e.target.value)}
                          className="bg-zinc-700 border-zinc-600 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {/* Bottom Save Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-zinc-800">
        <Button 
          onClick={saveSchedule}
          disabled={isSaving}
          className="w-full bg-green-600 hover:bg-green-700 py-3"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Salvando Alterações...' : 'Salvar Todos os Horários'}
        </Button>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}