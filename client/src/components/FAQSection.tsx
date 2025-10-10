import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Quais são as formas de pagamento?",
    answer: "Você pode realizar o pagamento através de um Cartão de Crédito, Boleto, ou Pix."
  },
  {
    question: "Nunca Pratiquei exercícios, posso fazer a sua consultoria?",
    answer: "Com certeza, o plano de treino que iremos passar para você será totalmente personalizado de acordo com seu momento atual, sem contar que você terá os vídeos para acompanhar a execução dos exercícios e nosso suporte para tirar qualquer dúvida."
  },
  {
    question: "Quantas fichas de treino eu vou receber",
    answer: "A quantidade de fichas que você irá receber não é pré-definida, pois avaliamos uma série de fatores e a individualidade de cada aluno ao realizar a mudança da ficha de treino."
  },
  {
    question: "Como saberei se estou executando o treino corretamente?",
    answer: "Quando tiver insegurança ao realizar algum exercício, poderá gravar e compartilhar em nosso WhatsApp, assim faremos a correção caso seja necessário."
  },
  {
    question: "Como iniciar?",
    answer: "Basta escolher o plano que mais faz sentido para você e realizar o pagamento, após isso já iniciamos seu processo! Te esperamos para fazer parte do time!"
  }
];

export default function FAQSection() {
  return (
    <section className="bg-zinc-900 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat uppercase text-center mb-12" data-testid="text-faq-title">
          DÚVIDAS FREQUENTES
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-black border border-zinc-800 rounded-lg overflow-hidden"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="px-6 py-4 text-left text-white font-semibold font-montserrat hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300 font-openSans leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-black p-8 rounded-lg text-center space-y-4">
            <p className="text-white font-semibold text-xl font-montserrat">Restou alguma dúvida?</p>
            <p className="text-gray-300 font-openSans">Chame-nos no WhatsApp, estamos a disposição para sanar qualquer dúvida.</p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 text-base font-bold uppercase tracking-wider"
              data-testid="button-whatsapp-faq"
            >
              SABER MAIS PELO WHATSAPP
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
