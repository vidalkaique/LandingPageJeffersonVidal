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
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          {/* Right image - Jefferson Vidal - Aparece primeiro em mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[3/4] relative overflow-hidden">
              {/* Imagem com efeito de bordas transparentes suaves */}
              <div className="relative w-full h-full">
                <img 
                  src="/img/jeffarranhao.jpeg" 
                  alt="Jefferson Vidal - Personal Trainer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Múltiplos gradientes para transição suave - efeito reduzido */}
                {/* Gradientes laterais */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/15 via-transparent via-black/15 to-black opacity-50"></div>
                
                {/* Gradientes verticais */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 via-transparent via-black/5 to-black/40 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-black/15 to-black opacity-50"></div>
                
                {/* Máscara radial para efeito mais suave no centro */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse 75% 85% at center, transparent 40%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.6) 100%)'
                }}></div>
                
                {/* Gradiente adicional para cantos - reduzido */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-black/30 via-transparent to-black/40 opacity-35"></div>
              </div>
            </div>
          </div>

          {/* Logo Jefferson - Entre a foto e o texto */}
          <div className="flex justify-center items-center py-1 order-2 lg:order-3 lg:absolute lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:z-20">
            <img 
              src="/img/logodejeffvidal.png" 
              alt="Logo Jefferson Vidal"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg cursor-pointer hover:scale-105 transition-transform select-none"
              onClick={() => {
                window.open('https://jeffersonvidalpersonal.vercel.app', '_blank');
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>

          {/* Left content - Aparece depois em mobile */}
          <div className="text-white space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left order-3 lg:order-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat uppercase leading-tight tracking-wide" data-testid="text-hero-title">
              Alcance o corpo e a performance que você sempre quis com uma <span className="text-red-500">consultoria fitness</span> feita para você.
            </h1>
            <p className="text-base md:text-lg font-openSans leading-relaxed text-gray-200" data-testid="text-hero-subtitle">
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
        </div>
      </div>
    </section>
  );
}
