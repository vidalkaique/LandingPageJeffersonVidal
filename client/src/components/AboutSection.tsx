import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('planos');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            {/* Imagem com efeito de bordas transparentes suaves */}
            <div className="relative w-full h-full">
              <img 
                src="/img/fotojeffvidal2.png" 
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
          
          <div className="space-y-6 flex flex-col items-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase" data-testid="text-about-title">
              QUEM É JEFFERSON VIDAL?
            </h2>
            
            <div className="space-y-4 text-gray-300 text-lg font-openSans leading-relaxed">
              <p>
                Sou Jefferson Vidal, graduado e licenciado em Educação Física com mais de 5 anos de experiência no treinamento personalizado e mais de 100 alunos satisfeitos.
              </p>
              <p className="text-primary font-semibold">
                Minha missão é sempre ir além do conhecimento técnico. É primordial entender o corpo, a mente, as necessidades e individualidades de cada ser humano para criar um plano verdadeiramente eficaz.
              </p>
            </div>

            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-transform min-h-[56px] inline-flex items-center justify-center"
              onClick={scrollToPlans}
              data-testid="button-start-about"
            >
              QUERO COMEÇAR AGORA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
