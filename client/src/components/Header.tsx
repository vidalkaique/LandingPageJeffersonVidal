import { useState } from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="bg-white px-6 py-2 rounded-md">
            <h1 className="text-xl md:text-2xl font-bold text-black font-montserrat" data-testid="text-logo">
              PERSONAL TRAINER
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
