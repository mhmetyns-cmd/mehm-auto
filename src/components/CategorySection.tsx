import React from 'react';
import { categoriesData } from '../data/categories';
import { Shield, Compass, Zap, BatteryCharging, Flame, Crown, ArrowUpRight } from 'lucide-react';
import type { Category } from '../types';

interface CategorySectionProps {
  onSelectCategory: (categorySlug: Category['slug']) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-cyan-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-500" />;
      case 'Crown': return <Crown className="w-5 h-5 text-purple-400" />;
      default: return <Compass className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="kategoriler" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Geniş Yelpaze</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">Kategoriye Göre Keşfet</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Her sürüş tarzına, konfor beklentisine ve performans tutkusuna uygun araç segmentlerini keşfedin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer border border-[#232736] hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-950/30 flex flex-col justify-end p-6"
          >
            {/* Background Image with Hover Zoom */}
            <div className="absolute inset-0 z-0">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent group-hover:via-[#090a0f]/50 transition-colors" />
            </div>

            {/* Floating Icon badge */}
            <div className="relative z-10 flex items-center justify-between mb-auto">
              <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 group-hover:border-red-500/50 transition-colors">
                {getIcon(cat.iconName)}
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-red-600 group-hover:scale-110 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-red-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-3 text-[11px] font-bold text-red-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Modelleri İncele</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
