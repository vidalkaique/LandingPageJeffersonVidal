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
    link: "#"
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
    link: "#",
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
    link: "#"
  }
];

export default function PricingCards() {
  return (
    <section id="planos" className="bg-zinc-900 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase text-center mb-12" data-testid="text-pricing-title">
          ESCOLHA O MELHOR PLANO
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`bg-zinc-800 border-t-4 ${plan.highlighted ? 'border-t-primary' : 'border-t-zinc-700'} relative`}
              data-testid={`plan-${index}`}
            >
              {plan.discount && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    {plan.discount}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pt-8">
                <h3 className="text-2xl font-bold text-white font-montserrat uppercase">
                  {plan.name}
                </h3>
                {plan.installments && (
                  <p className="text-primary text-lg font-semibold">{plan.installments}</p>
                )}
                <p className="text-4xl font-bold text-white font-montserrat">{plan.price}</p>
              </CardHeader>
              
              <CardContent className="space-y-4 py-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 font-openSans">{feature}</p>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="pb-8">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base font-bold uppercase tracking-wider"
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
