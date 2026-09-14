import React from 'react';
import { Award, ChevronRight, Eye } from 'lucide-react';
import type { Car } from '../types';
import { LicensePlate } from './LicensePlate';

interface FeaturedCarProps {
  car: Car;
  onSelectCar: (car: Car) => void;
}

export const FeaturedCar: React.FC<FeaturedCarProps> = ({ car, onSelectCar }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-500 tracking-widest uppercase block">Özel Seçim</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Haftanın Otomobili</h2>
          </div>
        </div>

        <div className="bg-[#11131a] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Car Image Preview */}
          <div className="relative lg:col-span-7 min-h-[350px] lg:min-h-[500px] bg-black/60 overflow-hidden group">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#11131a]" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/50">
                Pist Canavarı
              </span>
              <LicensePlate plate={car.plate || '34 MMT 34'} size="sm" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 lg:hidden bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-xl font-black text-white truncate">{car.name}</h3>
                <LicensePlate plate={car.plate || '34 MMT 34'} size="sm" />
              </div>
              <p className="text-sm text-red-400 font-bold">{car.priceFormatted}</p>
            </div>
          </div>

          {/* Specifications & Narrative */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="hidden lg:block mb-6">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">{car.brand}</span>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-3xl xl:text-4xl font-black text-white">{car.name}</h3>
                  <LicensePlate plate={car.plate || '34 MMT 34'} size="md" />
                </div>
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                  {car.priceFormatted}
                </p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {car.description} Pist aerodinamiğini yollara aktaran devasa aktif kanadı ve 9.000 devir çeviren atmosferik motoruyla haftanın en çarpıcı modeli.
              </p>

              {/* Technical Data Badges */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Motor</span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">{car.engine}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Beygir Gücü</span>
                  <span className="text-sm sm:text-base font-extrabold text-red-400">{car.horsepower} HP</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Tork</span>
                  <span className="text-sm sm:text-base font-extrabold text-white">{car.torque} Nm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">0-100 km/s</span>
                  <span className="text-sm sm:text-base font-extrabold text-amber-400">{car.acceleration} sn</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Yakıt Tüketimi</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{car.consumption}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161922] border border-[#232736]">
                  <span className="text-[11px] text-gray-400 block mb-0.5">Vites & Çekiş</span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">{car.transmission} · {car.driveTrain.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectCar(car)}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Detaylı İncele</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
