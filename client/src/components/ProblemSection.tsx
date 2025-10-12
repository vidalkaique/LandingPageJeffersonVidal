export default function ProblemSection() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat uppercase mb-8" data-testid="text-problem-title">
            <span className="text-red-500">já se perguntou por que...</span>
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-gray-300 font-openSans leading-relaxed">
            <p>
              Você já se esforçou tanto na academia e na dieta, mas os resultados que sonha parecem distantes e temporários?
            </p>
            <p>
              O problema não está na sua dedicação, mas sim nos desequilíbrios corporais e compensações musculares que sabotam seu progresso.
            </p>
            <p>
              Treinos padronizados ignoram suas necessidades específicas e podem até intensificar essas limitações.
            </p>
            <p className="text-primary font-semibold">
              Com minha metodologia exclusiva, você terá um programa completamente individualizado, baseado na sua biomecânica única. Transformação real, com acompanhamento 100% online e flexível.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
