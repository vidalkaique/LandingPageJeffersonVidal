export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div className="bg-white px-4 py-3 rounded-md inline-block cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/img/logo_jeffersonvidal.png" 
            alt="Logo Jefferson Vidal"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>
        <p className="text-gray-400 font-openSans" data-testid="text-copyright">
          Todos os Direitos Reservados©
        </p>
      </div>
    </footer>
  );
}
