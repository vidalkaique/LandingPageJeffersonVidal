import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('planos');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* White vertical bars with glow effect */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex gap-12 pointer-events-none">
        <div className="w-1 h-full bg-primary blur-sm opacity-60"></div>
        <div className="w-2 h-full bg-primary blur-md opacity-80"></div>
        <div className="w-1 h-full bg-primary blur-sm opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat uppercase leading-tight tracking-wide" data-testid="text-hero-title">
              CONSULTORIA FITNESS PERSONALIZADA PARA VOCÊ ALCANÇAR SEUS OBJETIVOS
            </h1>
            <p className="text-lg md:text-xl font-openSans leading-relaxed text-gray-200" data-testid="text-hero-subtitle">
              Tenha um plano de treino exclusivo e estratégico para alcançar seus objetivos. Gaste sua energia com o que realmente funciona.
            </p>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-transform min-h-[56px] inline-flex items-center justify-center"
              onClick={scrollToPlans}
              data-testid="button-start-now"
            >
              QUERO COMEÇAR AGORA!
            </Button>
          </div>

          {/* Right image - placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] bg-zinc-800 rounded-lg flex items-center justify-center">
              <p className="text-zinc-500 text-center px-8">
                Imagem do Personal Trainer
                <br />
                <span className="text-sm">(Substituir pela foto real)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
