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
          <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
            <p className="text-zinc-500 text-center">
              Foto do Personal Trainer
              <br />
              <span className="text-sm">(Foto profissional)</span>
            </p>
          </div>
          
          <div className="space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-transform min-h-[56px] flex items-center justify-center"
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
