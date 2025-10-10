import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "MENSAL",
    price: "R$300,00",
    installments: null,
    discount: null,
    features: [
      "Plano de 30 dias;",
      "Avaliação postural;",
      "Acompanhamento no Whatsapp;"
    ],
    link: "https://pay.kiwify.com.br/iqaEF5m"
  },
  {
    name: "TRIMESTRAL",
    price: "R$282,77",
    installments: "3x",
    discount: "20% DE DESCONTO",
    features: [
      "Plano de 30 dias;",
      "Avaliação postural;",
      "Acompanhamento no Whatsapp;"
    ],
    link: "https://pay.kiwify.com.br/uhNZZBN",
    highlighted: true
  },
  {
    name: "SEMESTRAL",
    price: "R$276,81",
    installments: "6x",
    discount: "20% DE DESCONTO",
    features: [
      "Plano de 30 dias;",
      "Avaliação postural;",
      "Acompanhamento no Whatsapp;"
    ],
    link: "https://pay.kiwify.com.br/pg5M9Rb"
  }
];

export default function PricingCards() {
  return (
    <section id="planos" className="bg-gradient-to-b from-black via-zinc-900 to-black py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Título Impactante com Urgência */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block bg-primary/20 border border-primary rounded-full px-6 py-2 mb-4">
            <span className="text-primary font-bold text-sm uppercase tracking-wider animate-pulse">🔥 OFERTA LIMITADA 🔥</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white font-montserrat uppercase text-center leading-tight" data-testid="text-pricing-title">
            <span className="text-primary">TRANSFORME</span> SEU CORPO
            <br />
            <span className="text-2xl md:text-4xl text-gray-300">ESCOLHA SEU PLANO AGORA!</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className="relative h-full flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-zinc-800 border border-zinc-700 hover:border-primary/50"
              data-testid={`plan-${index}`}
            >

              

              
              <CardHeader className="text-center space-y-4 pt-12 px-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-montserrat uppercase text-white text-center break-words">
                  {plan.name}
                </h3>

                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-white">{plan.price}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 py-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 font-openSans">{feature}</p>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="pb-8 mt-auto">
                <Button
                  className="w-full rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider min-h-[48px] !inline-flex !items-center !justify-center whitespace-nowrap transform hover:scale-105 transition-all duration-300 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30"
                  onClick={() => window.open(plan.link, '_blank')}
                  data-testid={`button-plan-${index}`}
                >
                  QUERO ESSE PLANO
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
