import { Button } from "@/components/ui/button";

// Mock testimonial data
const testimonials = [
  { id: 1, name: "Cliente 1" },
  { id: 2, name: "Cliente 2" },
  { id: 3, name: "Cliente 3" },
];

export default function ResultsCarousel() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('planos');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24" style={{
      background: 'linear-gradient(to bottom, #18181b 0%, #18181b 85%, #000000 100%)'
    }}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase text-center mb-12" data-testid="text-results-title">
          ALGUNS RESULTADOS DE NOSSOS ALUNOS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="aspect-[3/4] bg-zinc-800 rounded-lg flex items-center justify-center"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <p className="text-zinc-500 text-center">
                Depoimento {testimonial.name}
                <br />
                <span className="text-sm">(Antes/Depois)</span>
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-transform min-h-[56px] inline-flex items-center justify-center"
            onClick={scrollToPlans}
            data-testid="button-start-results"
          >
            QUERO COMEÇAR AGORA!
          </Button>
        </div>
      </div>
    </section>
  );
}
