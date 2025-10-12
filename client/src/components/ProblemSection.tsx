export default function ProblemSection() {
  return (
    <section className="relative py-24" style={{
      background: 'linear-gradient(to bottom, #000000 0%, #000000 85%, #18181b 100%)'
    }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat uppercase mb-8" data-testid="text-problem-title">
            <span className="text-red-500">já se perguntou por que...</span>
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-gray-300 font-openSans leading-relaxed">
            <p>
              Muitas pessoas tentam alcançar um corpo satisfatório e atraente, mas não conseguem resultados duradouros, mesmo sendo disciplinadas em treinar pesado e seguir dieta.
            </p>
            <p>
              Isso acontece devido aos desvios posturais que prejudicam o desenvolvimento muscular.
            </p>
            <p>
              Seguir fichas de treino genéricas apenas agrava o problema.
            </p>
            <p className="text-primary font-semibold">
              Na minha Consultoria, você recebe acompanhamento personalizado e uma análise postural para criar o melhor plano de treinos. E o melhor: tudo de forma online, sem depender de horários com um personal trainer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
