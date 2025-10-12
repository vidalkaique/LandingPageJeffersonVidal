const steps = [
  "Escolha o plano que melhor te atende.",
  "Preencha a anamnese e envie as fotos para avaliação.",
  "Preparação e envio do protocolo de treino personalizado.",
  "Acompanhamento e feedbacks."
];

export default function ProcessSteps() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            {/* Imagem com efeito de bordas transparentes suaves */}
            <div className="relative w-full h-full">
              <img 
                src="/img/sessaocomofunciona.heic" 
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
          
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat uppercase" data-testid="text-process-title">
              <span className="text-red-500">Como funciona nosso processo</span>
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4" data-testid={`process-step-${index}`}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-lg font-openSans pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
