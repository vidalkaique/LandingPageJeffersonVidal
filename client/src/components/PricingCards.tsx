import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HorariosService, type HorariosAgrupados } from "@/lib/supabase";
import { PlanosService, type PlanosAgrupados } from "@/lib/planos";
import { Check, Clock, Calendar } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
}



const DAYS_LABELS = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
  domingo: 'Domingo'
};

// Arrays removidos - agora os planos vêm do Supabase dinamicamente

// Componente para mostrar horários
function HorariosModal() {
  const [schedule, setSchedule] = useState<HorariosAgrupados>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega horários do Supabase
    const loadHorarios = async () => {
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
    
    loadHorarios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="space-y-4">
        {Object.entries(DAYS_LABELS).map(([dayKey, dayLabel]) => {
          const daySchedule = schedule[dayKey] || [];
          return (
            <div key={dayKey} className="border-b border-zinc-700 pb-4 last:border-b-0">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {dayLabel}
              </h4>
              {daySchedule.length === 0 ? (
                <p className="text-gray-400 text-sm ml-6">Não disponível</p>
              ) : (
                <div className="space-y-2 ml-6">
                  {daySchedule.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Clock className="w-3 h-3 text-primary" />
                      <span className="text-gray-300">
                        {slot.start} às {slot.end}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PricingCards() {
  const [planos, setPlanos] = useState<PlanosAgrupados | null>(null);
  const [loadingPlanos, setLoadingPlanos] = useState(true);
  const [, setLocation] = useLocation();

  // Mapeamento dos nomes dos planos para os parâmetros da URL
  const getPlanParam = (planName: string): string => {
    const name = planName.toLowerCase();
    if (name.includes('mensal')) return 'mensal';
    if (name.includes('bimestral')) return 'bimestral';
    if (name.includes('trimestral')) return 'trimestral';
    if (name.includes('3x') || name.includes('3 x')) return 'presencial-3x';
    if (name.includes('5x') || name.includes('5 x')) return 'presencial-5x';
    return 'mensal'; // fallback
  };

  // Função para obter preços específicos PIX e Cartão
  const calculatePrices = (originalPrice: string, planName: string, plan?: any) => {
    // Se o plano tem preços PIX/Cartão do banco, usa eles
    if (plan?.preco_pix && plan?.preco_cartao) {
      return {
        pix: plan.preco_pix,
        card: plan.preco_cartao
      };
    }
    
    // Fallback para preços hardcoded (caso o banco não tenha os dados ainda)
    const name = planName.toLowerCase();
    const priceMap = {
      'mensal': { pix: 'R$ 200', card: 'R$ 210' },
      'bimestral': { pix: 'R$ 350', card: 'R$ 365' },
      'trimestral': { pix: 'R$ 500', card: 'R$ 520' },
      'presencial-3x': { pix: 'R$ 700', card: 'R$ 727' },
      'presencial-5x': { pix: 'R$ 900', card: 'R$ 935' }
    };
    
    let planType = 'mensal';
    if (name.includes('mensal')) planType = 'mensal';
    else if (name.includes('bimestral')) planType = 'bimestral';
    else if (name.includes('trimestral')) planType = 'trimestral';
    else if (name.includes('3x') || name.includes('3 x')) planType = 'presencial-3x';
    else if (name.includes('5x') || name.includes('5 x')) planType = 'presencial-5x';
    
    return priceMap[planType] || { pix: originalPrice, card: originalPrice };
  };

  useEffect(() => {
    const loadPlanos = async () => {
      try {
        const planosData = await PlanosService.getPlanos();
        setPlanos(planosData);
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        setPlanos(PlanosService.getPlanosPadrao());
      } finally {
        setLoadingPlanos(false);
      }
    };
    
    loadPlanos();
  }, []);

  if (loadingPlanos) {
    return (
      <section id="planos" className="bg-gradient-to-b from-black via-zinc-900 to-black py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando planos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!planos) {
    return null;
  }

  return (
    <section id="planos" className="bg-gradient-to-b from-black via-zinc-900 to-black py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Título Principal */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-montserrat uppercase text-center leading-tight" data-testid="text-pricing-title">
            <span className="text-primary">ESCOLHA</span> SEU PLANO
          </h2>
          <p className="text-xl text-gray-300">
            Encontre a opção perfeita para seus objetivos
          </p>
        </div>
        
        {/* Seção Planos Online */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase mb-4">
              ACOMPANHAMENTO ONLINE
            </h3>
            <p className="text-gray-400">Treino personalizado onde você estiver</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {planos.online.map((plan, index) => (
              <Card 
                key={`online-${index}`}
                className="relative h-full flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-zinc-800 border-2 border-primary shadow-lg shadow-primary/30"
                data-testid={`online-plan-${index}`}
              >
                <CardHeader className="text-center space-y-4 pt-8 px-4">
                  <h4 className="text-xl md:text-2xl font-bold font-montserrat uppercase text-white text-center break-words">
                    {plan.name}
                  </h4>
                  <div className="space-y-2">
                    {(() => {
                      const prices = calculatePrices(plan.price, plan.name, plan);
                      return (
                        <div className="text-center space-y-1">
                          <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                              <p className="text-2xl md:text-3xl font-bold font-montserrat text-green-400">{prices.pix}</p>
                              <p className="text-xs text-green-300 uppercase tracking-wide">PIX</p>
                            </div>
                            <div className="text-gray-400 text-xl">|</div>
                            <div className="text-center">
                              <p className="text-2xl md:text-3xl font-bold font-montserrat text-blue-400">{prices.card}</p>
                              <p className="text-xs text-blue-300 uppercase tracking-wide">Cartão</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()} 
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 py-6 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-300 font-openSans text-sm">{feature}</p>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="pb-6 mt-auto">
                  <Button
                    className="w-full rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider min-h-[44px] !inline-flex !items-center !justify-center whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30"
                    onClick={() => {
                      const planParam = getPlanParam(plan.name);
                      setLocation(`/payment?plan=${planParam}`);
                    }}
                    data-testid={`button-online-${index}`}
                  >
                    QUERO ESSE PLANO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Seção Planos Presenciais */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase mb-4">
              ACOMPANHAMENTO PRESENCIAL
            </h3>
            <p className="text-gray-400">Treino personalizado na academia com acompanhamento direto</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {planos.presencial.map((plan, index) => (
              <Card 
                key={`presencial-${index}`}
                className="relative h-full flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-zinc-800 border-2 border-primary shadow-lg shadow-primary/30"
                data-testid={`presencial-plan-${index}`}
              >
                <CardHeader className="text-center space-y-4 pt-8 px-4">
                  <h4 className="text-xl md:text-2xl font-bold font-montserrat uppercase text-white text-center break-words">
                    {plan.name}
                  </h4>
                  <div className="space-y-2">
                    {(() => {
                      const prices = calculatePrices(plan.price, plan.name, plan);
                      return (
                        <div className="text-center space-y-1">
                          <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                              <p className="text-2xl md:text-3xl font-bold font-montserrat text-green-400">{prices.pix}</p>
                              <p className="text-xs text-green-300 uppercase tracking-wide">PIX</p>
                            </div>
                            <div className="text-gray-400 text-xl">|</div>
                            <div className="text-center">
                              <p className="text-2xl md:text-3xl font-bold font-montserrat text-blue-400">{prices.card}</p>
                              <p className="text-xs text-blue-300 uppercase tracking-wide">Cartão</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()} 
                    {plan.period && (
                      <p className="text-sm text-gray-400">{plan.period}</p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 py-6 flex-grow px-4">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-300 font-openSans text-sm">{feature}</p>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="pb-6 mt-auto px-4">
                  <div className="w-full space-y-3">
                    {/* Botão Ver Horários - Apenas Contorno */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full rounded-full px-4 py-2 text-sm font-medium border-2 border-primary text-primary hover:bg-primary/5 hover:border-primary/80 min-h-[40px] !inline-flex !items-center !justify-center whitespace-nowrap transition-all duration-300"
                          data-testid={`button-horarios-${index}`}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          VER HORÁRIOS DISPONÍVEIS
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Horários Disponíveis
                          </DialogTitle>
                        </DialogHeader>
                        <HorariosModal />
                      </DialogContent>
                    </Dialog>
                    
                    {/* Botão Principal */}
                    <Button
                      className="w-full rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider min-h-[44px] !inline-flex !items-center !justify-center whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30"
                      onClick={() => {
                        if (plan.link === '#contato') {
                          window.open('https://wa.me/5511999999999?text=Ol%C3%A1!%20Tenho%20interesse%20no%20plano%20' + encodeURIComponent(plan.name), '_blank');
                        } else {
                          const planParam = getPlanParam(plan.name);
                          setLocation(`/payment?plan=${planParam}`);
                        }
                      }}
                      data-testid={`button-presencial-${index}`}
                    >
                      QUERO ESSE PLANO
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
