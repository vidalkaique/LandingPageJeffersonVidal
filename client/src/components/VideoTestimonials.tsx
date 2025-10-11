import { Button } from "@/components/ui/button";

const videos = [
  { id: 1, name: "Beatriz Braga" },
  { id: 2, name: "Luana Machado" }
];

export default function VideoTestimonials() {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('planos');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase text-center mb-12" data-testid="text-testimonials-title">
          RESULTADOS COMPROVADOS
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {videos.map((video) => (
            <div key={video.id} className="space-y-4" data-testid={`video-${video.id}`}>
              <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
                <p className="text-zinc-500 text-center">
                  Vídeo de Depoimento
                  <br />
                  <span className="text-sm">(Incorporar vídeo aqui)</span>
                </p>
              </div>
              <p className="text-white text-center font-semibold font-montserrat">{video.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider transform hover:scale-105 transition-transform min-h-[56px] inline-flex items-center justify-center"
            onClick={scrollToPlans}
            data-testid="button-start-testimonials"
          >
            QUERO COMEÇAR AGORA!
          </Button>
        </div>
      </div>
    </section>
  );
}
