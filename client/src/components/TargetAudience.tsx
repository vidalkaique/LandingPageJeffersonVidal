const audiences = [
  "Deseja melhorar sua composição corporal, aumentar a massa muscular, reduzir o percentual de gordura corporal ou fortalecer áreas específicas do corpo.",
  "Busca aumentar sua resistência cardiovascular, melhorar sua capacidade aeróbica e ter mais energia para realizar atividades diárias.",
  "Sofre com desequilíbrios musculares, dores crônicas ou lesões frequentes, a consultoria conta com uma análise postural detalhada e exercícios específicos para corrigir esses desequilíbrios, fortalecer os músculos envolvidos e prevenir lesões futuras."
];

export default function TargetAudience() {
  return (
    <section className="relative py-24" style={{
      background: 'linear-gradient(to bottom, #18181b 0%, #18181b 85%, #000000 100%)'
    }}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase text-center mb-12" data-testid="text-audience-title">
          Minha consultoria é para você que
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {audiences.map((text, index) => (
            <div 
              key={index} 
              className="bg-black p-8 rounded-lg border-l-4 border-primary"
              data-testid={`audience-${index}`}
            >
              <p className="text-gray-300 text-lg font-openSans leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
