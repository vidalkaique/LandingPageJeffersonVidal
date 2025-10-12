import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá, Tudo Bem? Estou de mandando essa mensgem pois estou com uma duvida!");
    window.open(`https://wa.me/5574999794410?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="lg"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-16 h-16 p-0 shadow-xl animate-pulse"
        data-testid="button-whatsapp-float"
        title="Como posso te ajudar?"
        onClick={handleWhatsAppClick}
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
      <div className="absolute -top-12 right-0 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        Como posso te ajudar?
      </div>
    </div>
  );
}
