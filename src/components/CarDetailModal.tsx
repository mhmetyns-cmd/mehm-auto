import React from 'react';
import { X, Heart, Gauge, Zap, GitCompare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Car } from '../types';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onCompareWith: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCompareWith
}) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md transition-all">
      <div 
        className="relative w-full max-w-4xl bg-[#11131a] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header / Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-black">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-[#11131a]/40 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(car.id)}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-all border border-white/20"
              title={isFavorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-gray-300 hover:text-white hover:bg-red-600 transition-all border border-white/20"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-md bg-red-600 text-xs font-black uppercase tracking-wider text-white mb-2 inline-block">
              {car.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{car.name}</h2>
            <p className="text-sm text-gray-300 font-medium">{car.brand} · {car.year} Model</p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Price and Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#161922] border border-[#232736]">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Tavsiye Edilen Başlangıç Fiyatı</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{car.priceFormatted}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onCompareWith(car);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-sm transition-all"
              >
                <GitCompare className="w-4 h-4" />
                <span>Karşılaştırmaya Ekle</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Genel Bakış</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{car.description}</p>
          </div>

          {/* Detailed Technical Specifications Grid */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-red-500" />
              <span>Teknik Özellikler</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Motor Ünitesi</span>
                <span className="font-bold text-white text-xs sm:text-sm">{car.engine}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Beygir Gücü</span>
                <span className="font-bold text-red-400 text-base">{car.horsepower} HP</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Tork Değeri</span>
                <span className="font-bold text-white">{car.torque} Nm</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">0-100 km/s Hızlanma</span>
                <span className="font-bold text-amber-400 text-base">{car.acceleration} sn</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Maksimum Sürat</span>
                <span className="font-bold text-white">{car.topSpeed} km/s</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Ortalama Tüketim</span>
                <span className="font-bold text-white">{car.consumption}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Şanzıman</span>
                <span className="font-bold text-white">{car.transmission}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Çekiş Sistemi</span>
                <span className="font-bold text-white">{car.driveTrain}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Bagaj Kapasitesi</span>
                <span className="font-bold text-white">{car.trunkCapacity} Litre</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161922] border border-[#232736]">
                <span className="text-[11px] text-gray-400 block mb-1">Yakıt Türü</span>
                <span className="font-bold text-white">{car.fuelType}</span>
              </div>
            </div>
          </div>

          {/* Electric Specs (If applicable) */}
          {car.electricSpecs && (
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
              <h3 className="text-base font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Elektrikli Güç Verileri</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-400 block">WLTP Menzil</span>
                  <span className="text-xl font-black text-white">{car.electricSpecs.range} km</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Batarya Kapasitesi</span>
                  <span className="text-xl font-black text-white">{car.electricSpecs.battery} kWh</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Hızlı Şarj (10-80%)</span>
                  <span className="text-sm font-bold text-cyan-300">{car.electricSpecs.chargeTime}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Elektrik Gücü</span>
                  <span className="text-xl font-black text-white">{car.electricSpecs.powerKw} kW</span>
                </div>
              </div>
            </div>
          )}

          {/* Features and Equipment List */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>Öne Çıkan Donanım & Teknolojiler</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {car.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#161922] text-sm text-gray-200 border border-[#232736]">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0d0f15] border-t border-[#232736] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#232736] hover:bg-[#2e3347] text-white text-sm font-semibold transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
