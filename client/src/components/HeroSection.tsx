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
              Alcance o corpo e a performance que você sempre quis com uma <span className="text-red-500">consultoria fitness</span> feita para você.
            </h1>
            <p className="text-lg md:text-xl font-openSans leading-relaxed text-gray-200" data-testid="text-hero-subtitle">
              Estratégia, foco e resultados. Um plano de treino exclusivo feito para o seu desempenho evoluir de verdade.
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

          {/* Right image - Jefferson Vidal */}
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              {/* Imagem com efeito de bordas transparentes */}
              <div className="relative w-full h-full">
                <img 
                  src="/img/JEFFERSON_VIDAL.png" 
                  alt="Jefferson Vidal - Personal Trainer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradiente para bordas transparentes */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
