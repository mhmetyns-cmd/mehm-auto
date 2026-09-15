import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, ChevronRight, Gauge } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount,
  onOpenFavorites,
  onNavigateToSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', id: 'hero' },
    { label: 'Otomobiller', id: 'otomobiller' },
    { label: 'Kategoriler', id: 'kategoriler' },
    { label: 'Karşılaştır', id: 'karsilastir' },
    { label: 'Elektrikli Gelecek', id: 'elektrikli' },
    { label: 'Haberler', id: 'haberler' },
    { label: 'Hakkımızda', id: 'hakkimizda' },
    { label: 'İletişim', id: 'iletisim' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-[#232736]/70 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#090a0f]/90 via-[#090a0f]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-red-700 flex items-center justify-center text-white font-black shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Gauge className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="brand-playful-nav">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-wider text-white group-hover:text-gray-100 transition-colors">MEHMET</span>
              <span className="text-xl font-black tracking-wider brand-shimmer-red">AUTO</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping ml-0.5"></span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase group-hover:text-red-400 transition-colors">Keşfet & İncele</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-xl bg-[#161922] border border-[#232736] text-gray-300 hover:text-red-400 hover:border-red-500/50 transition-all flex items-center gap-2"
            title="Favorilerim"
            aria-label="Favoriler"
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
            <span className="hidden sm:inline text-xs font-semibold">Favoriler</span>
            {favoriteCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleLinkClick('filtre')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all hover:-translate-y-0.5"
          >
            <span>Aracını Keşfet</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#161922] border border-[#232736] text-gray-300 hover:text-white"
            aria-label="Menüyü Aç"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#090a0f]/95 backdrop-blur-2xl border-b border-[#232736] px-6 py-6 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-gray-200 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            ))}
            
            <div className="pt-4 border-t border-[#232736] mt-2 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('filtre')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg shadow-red-600/30"
              >
                <span>Aracını Keşfet</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
