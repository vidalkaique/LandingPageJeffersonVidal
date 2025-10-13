import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, DollarSign, Smartphone, Wifi, WifiOff, Edit } from "lucide-react";
import { PlanosService, type PlanoItem } from "@/lib/planos";

export default function AdminPlanos() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [planosOnline, setPlanosOnline] = useState<PlanoItem[]>([]);
  const [planosPresencial, setPlanosPresencial] = useState<PlanoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'online' | 'presencial'>('online');

  const handleLogin = () => {
    if (password === 'jefferson2024') {
      setIsAuthenticated(true);
      loadPlanos();
    } else {
      alert('❌ Senha incorreta!');
    }
  };

  const loadPlanos = async () => {
    setLoading(true);
    try {
      const [online, presencial] = await Promise.all([
        PlanosService.getPlanosPorTipo('online'),
        PlanosService.getPlanosPorTipo('presencial')
      ]);
      
      setPlanosOnline(online);
      setPlanosPresencial(presencial);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlanos = () => {
    return activeTab === 'online' ? planosOnline : planosPresencial;
  };

  const setCurrentPlanos = (planos: PlanoItem[]) => {
    if (activeTab === 'online') {
      setPlanosOnline(planos);
    } else {
      setPlanosPresencial(planos);
    }
  };

  const addPlano = () => {
    const newPlano: PlanoItem = {
      tipo: activeTab,
      nome: 'Novo Plano',
      preco: 'R$0,00',
      periodo: 'por mês',
      features: ['Nova funcionalidade'],
      link: 'https://wa.me/5511999999999',
      ordem: getCurrentPlanos().length + 1
    };
    
    setCurrentPlanos([...getCurrentPlanos(), newPlano]);
  };

  const removePlano = async (index: number) => {
    const planos = getCurrentPlanos();
    const plano = planos[index];
    
    if (plano.id) {
      // Se tem ID, deletar do banco
      const sucesso = await PlanosService.deletarPlano(plano.id);
      if (!sucesso) {
        alert('❌ Erro ao deletar plano');
        return;
      }
    }
    
    // Remover da lista local
    const novosPlanos = planos.filter((_, i) => i !== index);
    setCurrentPlanos(novosPlanos);
  };

  const updatePlano = (index: number, field: keyof PlanoItem, value: any) => {
    const planos = getCurrentPlanos();
    const novosPlanos = planos.map((plano, i) => 
      i === index ? { ...plano, [field]: value } : plano
    );
    setCurrentPlanos(novosPlanos);
  };

  const addFeature = (planoIndex: number) => {
    const planos = getCurrentPlanos();
    const novosPlanos = planos.map((plano, i) => 
      i === planoIndex 
        ? { ...plano, features: [...plano.features, 'Nova funcionalidade'] }
        : plano
    );
    setCurrentPlanos(novosPlanos);
  };

  const removeFeature = (planoIndex: number, featureIndex: number) => {
    const planos = getCurrentPlanos();
    const novosPlanos = planos.map((plano, i) => 
      i === planoIndex 
        ? { ...plano, features: plano.features.filter((_, fi) => fi !== featureIndex) }
        : plano
    );
    setCurrentPlanos(novosPlanos);
  };

  const updateFeature = (planoIndex: number, featureIndex: number, value: string) => {
    const planos = getCurrentPlanos();
    const novosPlanos = planos.map((plano, i) => 
      i === planoIndex 
        ? { 
            ...plano, 
            features: plano.features.map((feature, fi) => 
              fi === featureIndex ? value : feature
            ) 
          }
        : plano
    );
    setCurrentPlanos(novosPlanos);
  };

  const savePlanos = async () => {
    setIsSaving(true);
    try {
      const todosPlanos = [...planosOnline, ...planosPresencial];
      
      for (const plano of todosPlanos) {
        const sucesso = await PlanosService.salvarPlano(plano);
        if (!sucesso) {
          throw new Error(`Erro ao salvar plano: ${plano.nome}`);
        }
      }
      
      alert('✅ Planos salvos com sucesso!');
      await loadPlanos(); // Recarregar para pegar IDs atualizados
    } catch (error) {
      console.error('Erro ao salvar planos:', error);
      alert('❌ Erro ao salvar planos. Verifique sua conexão.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPlanos();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-white text-xl">
              Gerenciar Planos
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Edite preços e informações dos planos
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
              <Smartphone className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-zinc-800 -mx-4 px-4 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Gerenciar Planos</h1>
                {PlanosService.isConfigured() ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-gray-400">Jefferson Vidal</p>
            </div>
          </div>
          <Button 
            onClick={savePlanos}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-sm px-3 py-2"
          >
            <Save className="w-4 h-4 mr-1" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => setActiveTab('online')}
          variant={activeTab === 'online' ? 'default' : 'outline'}
          className="flex-1"
        >
          Planos Online
        </Button>
        <Button
          onClick={() => setActiveTab('presencial')}
          variant={activeTab === 'presencial' ? 'default' : 'outline'}
          className="flex-1"
        >
          Planos Presenciais
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando planos...</p>
          </div>
        </div>
      ) : (
        /* Planos Cards */
        <div className="space-y-6 max-w-4xl mx-auto">
          {getCurrentPlanos().map((plano, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Plano {index + 1}
                  </CardTitle>
                  <Button
                    onClick={() => removePlano(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Nome e Preço */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Nome do Plano</label>
                    <Input
                      value={plano.nome}
                      onChange={(e) => updatePlano(index, 'nome', e.target.value)}
                      className="bg-zinc-800 border-zinc-600 text-white"
                      placeholder="Ex: MENSAL"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Preço (Legado)</label>
                    <Input
                      value={plano.preco}
                      onChange={(e) => updatePlano(index, 'preco', e.target.value)}
                      className="bg-zinc-800 border-zinc-600 text-white"
                      placeholder="Ex: R$200,00"
                    />
                  </div>
                </div>

                {/* Preços PIX e Cartão */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-green-400 block mb-1">Preço PIX</label>
                    <Input
                      value={plano.preco_pix || ''}
                      onChange={(e) => updatePlano(index, 'preco_pix', e.target.value)}
                      className="bg-zinc-800 border-zinc-600 text-white"
                      placeholder="Ex: R$ 200"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-blue-400 block mb-1">Preço Cartão</label>
                    <Input
                      value={plano.preco_cartao || ''}
                      onChange={(e) => updatePlano(index, 'preco_cartao', e.target.value)}
                      className="bg-zinc-800 border-zinc-600 text-white"
                      placeholder="Ex: R$ 210"
                    />
                  </div>
                </div>

                {/* Período */}
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Período (opcional)</label>
                  <Input
                    value={plano.periodo || ''}
                    onChange={(e) => updatePlano(index, 'periodo', e.target.value)}
                    className="bg-zinc-800 border-zinc-600 text-white"
                    placeholder="Ex: por mês"
                  />
                </div>



                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Funcionalidades</label>
                    <Button
                      onClick={() => addFeature(index)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {plano.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                          className="bg-zinc-800 border-zinc-600 text-white text-sm"
                          placeholder="Funcionalidade do plano"
                        />
                        <Button
                          onClick={() => removeFeature(index, featureIndex)}
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 px-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Botão Adicionar Plano */}
          <Card className="bg-zinc-900/50 border-zinc-700 border-dashed">
            <CardContent className="flex items-center justify-center py-8">
              <Button
                onClick={addPlano}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Novo Plano {activeTab === 'online' ? 'Online' : 'Presencial'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Save Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-zinc-800">
        <Button 
          onClick={savePlanos}
          disabled={isSaving}
          className="w-full bg-green-600 hover:bg-green-700 py-3"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Salvando Planos...' : 'Salvar Todos os Planos'}
        </Button>
      </div>
    </div>
  );
}
