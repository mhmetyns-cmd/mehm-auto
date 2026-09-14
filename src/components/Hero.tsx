import React from 'react';
import { Zap, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreCars: () => void;
  onPopularCars: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCars, onPopularCars }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85"
          alt="MEHMET AUTO Hero Süperspor Otomobil"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse transition-transform duration-1000 ease-out"
          style={{ animationDuration: '8s' }}
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-[#090a0f]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/75 to-transparent" />
        {/* Subtle accent ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>2026 Otomobil Dünyasının Zirvesi</span>
          </div>

          {/* Main Titles */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-4">
            MEHMET <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">AUTO</span>
          </h1>

          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 tracking-wide mb-6">
            “Otomobili sadece sürme. <span className="text-red-500 underline decoration-red-500/40 underline-offset-8">Keşfet.</span>”
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
            Yeni nesil otomobilleri keşfet, teknik özelliklerini derinlemesine incele, modelleri birbiriyle kıyasla ve sana en uygun sürüş karakterini bul.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={onExploreCars}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>🚗 Otomobilleri Keşfet</span>
            </button>

            <button
              onClick={onPopularCars}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#161922]/90 hover:bg-[#232736] border border-[#232736] hover:border-gray-500 text-white font-bold text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span>⚡ Popüler Modeller</span>
            </button>
          </div>

          {/* Live Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">1020<span className="text-xs text-red-500 ml-1">HP</span></p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Maksimum Güç</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">2.1<span className="text-xs text-red-500 ml-1">sn</span></p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">0-100 Rekor Hız</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">630<span className="text-xs text-cyan-400 ml-1">km</span></p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Elektrikli Menzil</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">12+<span className="text-xs text-amber-400 ml-1">Seçkin</span></p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Ayrıntılı Model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-gray-400 text-xs">
        <span className="mb-1 opacity-70">Aşağı Kaydır</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-red-500" />
      </div>
    </section>
  );
};
