export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div className="bg-white px-6 py-2 rounded-md inline-block">
          <h2 className="text-xl md:text-2xl font-bold text-black font-montserrat">
            PERSONAL TRAINER
          </h2>
        </div>
        <p className="text-gray-400 font-openSans" data-testid="text-copyright">
          Todos os Direitos Reservados©
        </p>
      </div>
    </footer>
  );
}
