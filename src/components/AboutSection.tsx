import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="hakkimizda" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual & Badge Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#232736] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
              alt="MEHMET AUTO Hakkımızda"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/40 to-transparent" />
          </div>

          {/* Floating Feature Card */}
          <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-[#161922]/95 backdrop-blur-xl border border-red-500/30 p-5 rounded-2xl shadow-2xl max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black text-white">%100 Özgün</p>
                <p className="text-xs text-gray-400">Tarafsız Otomobil Verisi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-widest uppercase">
            <Compass className="w-4 h-4" />
            <span>Vizyon & Tutku</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Otomobili Sadece Sürmüyor, <span className="text-red-500">Ruhunu Keşfediyoruz.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            <strong className="text-white">MEHMET AUTO</strong>; otomobil dünyasının hızla değişen dinamiklerini, içten yanmalı motorların saf mekanik heyecanını ve elektrikli geleceğin yenilikçi teknolojilerini tek bir çatı altında toplayan bağımsız bir dijital keşif merkezidir.
          </p>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Amacımız, otomobil tutkunlarına ve yeni bir araç arayışında olan sürücülere kafa karıştırıcı pazarlama sloganları yerine gerçek fabrika verilerini, şeffaf teknik kıyaslamaları ve derinlemesine incelemeleri sunmaktır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Gerçekçi Performans Verileri</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Bağımsız Model İncelemeleri</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Anlık Karşılaştırma Motoru</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Geleceğin Elektrikli Mimarisi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
