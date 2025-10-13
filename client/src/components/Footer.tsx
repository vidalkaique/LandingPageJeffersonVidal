export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div className="flex justify-center">
          <img 
            src="/img/logodejeffvidal.png" 
            alt="Logo Jefferson Vidal"
            className="h-8 md:h-10 w-auto object-contain cursor-pointer hover:scale-105 transition-transform select-none"
            onClick={() => {
              window.open('https://jeffersonvidalpersonal.vercel.app', '_blank');
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
        <p className="text-gray-400 font-openSans" data-testid="text-copyright">
          Todos os Direitos Reservados©
        </p>
      </div>
    </footer>
  );
}
