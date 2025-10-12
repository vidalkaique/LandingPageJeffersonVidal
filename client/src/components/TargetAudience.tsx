const audiences = [
  "Quer conquistar o físico dos seus sonhos, definir músculos, eliminar gordura localizada e esculpir seu corpo de forma eficiente e sustentável.",
  "Precisa de mais disposição e condicionamento físico para enfrentar o dia a dia com vigor, melhorando sua qualidade de vida e bem-estar geral.",
  "Lida com desconfortos posturais, tensões musculares ou histórico de lesões, e busca uma abordagem inteligente que corrija a origem do problema e otimize seu movimento."
];

export default function TargetAudience() {
  return (
    <section className="bg-black py-24">
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
