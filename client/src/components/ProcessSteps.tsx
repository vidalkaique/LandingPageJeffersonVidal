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
          <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
            <p className="text-zinc-500 text-center">
              Imagem do Personal
              <br />
              <span className="text-sm">(Foto profissional)</span>
            </p>
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
