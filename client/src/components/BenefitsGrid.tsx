import { Smartphone, Dumbbell, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: Smartphone,
    title: "Acesso 100% online",
    subtitle: "de onde você estiver"
  },
  {
    icon: Dumbbell,
    title: "Plano de treino",
    subtitle: "personalizado"
  },
  {
    icon: MessageCircle,
    title: "Suporte Whatsapp",
    subtitle: "para tirar dúvidas"
  }
];

export default function BenefitsGrid() {
  return (
    <section className="relative py-16" style={{
      background: 'linear-gradient(to bottom, #18181b 0%, #000000 50%, #000000 100%)'
    }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center space-y-4"
                data-testid={`benefit-${index}`}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <div className="text-white">
                  <p className="font-semibold text-lg font-montserrat">{benefit.title}</p>
                  <p className="text-gray-400 font-openSans">{benefit.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
