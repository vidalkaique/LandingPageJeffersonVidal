import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const onlinePlans = [
  {
    name: "MENSAL",
    price: "R$300,00",
    features: [
      "Plano de 30 dias",
      "Avaliação postural",
      "Acompanhamento no WhatsApp"
    ],
    link: "https://pay.kiwify.com.br/iqaEF5m"
  },
  {
    name: "TRIMESTRAL",
    price: "R$282,77",
    features: [
      "Plano de 90 dias",
      "Avaliação postural",
      "Acompanhamento no WhatsApp"
    ],
    link: "https://pay.kiwify.com.br/uhNZZBN"
  },
  {
    name: "SEMESTRAL",
    price: "R$276,81",
    features: [
      "Plano de 180 dias",
      "Avaliação postural",
      "Acompanhamento no WhatsApp"
    ],
    link: "https://pay.kiwify.com.br/pg5M9Rb"
  }
];

const presencialPlans = [
  {
    name: "MENSAL",
    price: "R$200,00",
    features: [
      "Acompanhamento presencial",
      "Treino na academia",
      "Avaliação física completa"
    ],
    link: "#contato"
  },
  {
    name: "BIMESTRAL",
    price: "R$350,00",
    features: [
      "2 meses de acompanhamento",
      "Treino na academia",
      "Avaliação física completa"
    ],
    link: "#contato",
    highlighted: true
  },
  {
    name: "TRIMESTRAL",
    price: "R$500,00",
    features: [
      "3 meses de acompanhamento",
      "Treino na academia",
      "Avaliação física completa"
    ],
    link: "#contato"
  },
  {
    name: "3X SEMANA",
    price: "R$700,00",
    period: "mensal",
    features: [
      "3 treinos por semana",
      "Acompanhamento presencial",
      "Plano personalizado"
    ],
    link: "#contato"
  },
  {
    name: "5X SEMANA",
    price: "R$900,00",
    period: "mensal",
    features: [
      "5 treinos por semana",
      "Acompanhamento presencial",
      "Plano personalizado"
    ],
    link: "#contato"
  }
];

export default function PricingCards() {
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
              📱 ACOMPANHAMENTO ONLINE
            </h3>
            <p className="text-gray-400">Treino personalizado onde você estiver</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {onlinePlans.map((plan, index) => (
              <Card 
                key={`online-${index}`}
                className="relative h-full flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-zinc-800 border border-zinc-700 hover:border-primary/50"
                data-testid={`online-plan-${index}`}
              >
                <CardHeader className="text-center space-y-4 pt-8 px-4">
                  <h4 className="text-xl md:text-2xl font-bold font-montserrat uppercase text-white text-center break-words">
                    {plan.name}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-bold font-montserrat text-white">{plan.price}</p>
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
                    onClick={() => window.open(plan.link, '_blank')}
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
              🏋️ ACOMPANHAMENTO PRESENCIAL
            </h3>
            <p className="text-gray-400">Treino personalizado na academia com acompanhamento direto</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {presencialPlans.map((plan, index) => (
              <Card 
                key={`presencial-${index}`}
                className={`relative h-full flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-primary/10 to-zinc-800 border-2 border-primary shadow-lg shadow-primary/30' 
                    : 'bg-zinc-800 border border-zinc-700 hover:border-primary/50'
                }`}
                data-testid={`presencial-plan-${index}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                      MAIS POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-3 pt-8 px-3">
                  <h4 className="text-lg md:text-xl font-bold font-montserrat uppercase text-white text-center break-words">
                    {plan.name}
                  </h4>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-bold font-montserrat text-white">{plan.price}</p>
                    {plan.period && (
                      <p className="text-xs text-gray-400">{plan.period}</p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-2 py-4 flex-grow px-3">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 font-openSans text-xs">{feature}</p>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="pb-4 mt-auto px-3">
                  <Button
                    className="w-full rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider min-h-[40px] !inline-flex !items-center !justify-center whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30"
                    onClick={() => {
                      if (plan.link === '#contato') {
                        window.open('https://wa.me/5511999999999?text=Ol%C3%A1!%20Tenho%20interesse%20no%20plano%20' + encodeURIComponent(plan.name), '_blank');
                      } else {
                        window.open(plan.link, '_blank');
                      }
                    }}
                    data-testid={`button-presencial-${index}`}
                  >
                    QUERO ESSE PLANO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
