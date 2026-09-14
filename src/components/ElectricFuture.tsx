import React from 'react';
import { Zap, BatteryCharging, Gauge, Sparkles, ArrowRight } from 'lucide-react';
import type { Car } from '../types';

interface ElectricFutureProps {
  electricCars: Car[];
  onSelectCar: (car: Car) => void;
}

export const ElectricFuture: React.FC<ElectricFutureProps> = ({ electricCars, onSelectCar }) => {
  return (
    <section id="elektrikli" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#090a0f] via-[#0b0e17] to-[#090a0f]">
      {/* High-tech ambient glowing lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Sıfır Emisyon & Maksimum Güç</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Elektrikli Gelecek</h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md">
            Ultra hızlı 800V şarj mimarileri, 600 km'yi aşan kesintisiz menziller ve elektrik motorlarının sunduğu anlık tork devrimi.
          </p>
        </div>

        {/* Electric Cars Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {electricCars.map((car) => {
            const specs = car.electricSpecs;
            return (
              <div
                key={car.id}
                className="group relative bg-[#111622] rounded-3xl border border-cyan-900/40 hover:border-cyan-400/60 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-black">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                      %100 Elektrikli
                    </div>
                  </div>

                  {/* Title & Brand */}
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">{car.brand}</span>
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-6">
                    {car.description}
                  </p>

                  {/* Electric Specs Matrix */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0d121c] border border-cyan-900/30 mb-6">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-0.5">
                        <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Menzil</span>
                      </div>
                      <span className="text-lg font-black text-white">{specs?.range || 550} km</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-0.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Batarya</span>
                      </div>
                      <span className="text-lg font-black text-white">{specs?.battery || 100} kWh</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-0.5">
                        <Gauge className="w-3.5 h-3.5 text-red-400" />
                        <span>Güç</span>
                      </div>
                      <span className="text-sm font-bold text-white">{car.horsepower} HP ({specs?.powerKw} kW)</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>0-100 Hız</span>
                      </div>
                      <span className="text-sm font-bold text-cyan-300">{car.acceleration} sn</span>
                    </div>
                  </div>

                  {/* Charging Speed Callout */}
                  <div className="px-3.5 py-2 rounded-xl bg-cyan-950/30 border border-cyan-800/20 text-xs text-cyan-200 mb-6">
                    <span className="font-semibold text-white">Hızlı Şarj:</span> {specs?.chargeTime || '20 dk'}
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  onClick={() => onSelectCar(car)}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-600/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>Teknik Detayları Keşfet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
