import React, { useState, useEffect, useCallback } from 'react';
import { X, Heart, Gauge, Zap, GitCompare, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { Car } from '../types';
import { LicensePlate } from './LicensePlate';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onCompareWith: (car: Car) => void;
}

const angleLabels = [
  { title: 'Ön Görünüm & Tasarım', badge: 'Ön Açı' },
  { title: 'Arka Tasarım & Stoplar', badge: 'Arka Açı' },
  { title: 'Kokpit & İç Mekan', badge: 'İç Mekan' },
  { title: 'Yan Profil & Silüet', badge: 'Yan Profil' }
];

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCompareWith
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active photo index whenever car changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [car?.id]);

  const images = car?.gallery && car.gallery.length > 0 ? car.gallery : (car ? [car.image] : []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!car) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [car, handlePrev, handleNext, onClose]);

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-all">
      <div 
        className="relative w-full max-w-4xl bg-[#11131a] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header / Banner (Interactive Gallery Slider) */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden shrink-0 bg-black group select-none">
          <img
            key={images[activeImageIndex] || car.image}
            src={images[activeImageIndex] || car.image}
            alt={`${car.name} - ${angleLabels[activeImageIndex]?.title || 'Görsel'}`}
            className="w-full h-full object-cover object-center transition-all duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-[#11131a]/30 to-black/40" />

          {/* Top Left Angle & Photo Counter Badge */}
          <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg">
              <Camera className="w-3.5 h-3.5 text-red-400" />
              <span>{activeImageIndex + 1}/{images.length}</span>
              <span className="text-gray-400 hidden sm:inline">·</span>
              <span className="text-red-300 hidden sm:inline">{angleLabels[activeImageIndex]?.title || 'Açı'}</span>
            </span>
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onToggleFavorite(car.id)}
              className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-all border border-white/20 shadow-lg cursor-pointer"
              title={isFavorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-gray-300 hover:text-white hover:bg-red-600 transition-all border border-white/20 shadow-lg cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gallery Slider Previous & Next Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 transition-all opacity-80 group-hover:opacity-100 shadow-xl cursor-pointer"
                aria-label="Önceki Fotoğraf"
                title="Önceki Fotoğraf"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 transition-all opacity-80 group-hover:opacity-100 shadow-xl cursor-pointer"
                aria-label="Sonraki Fotoğraf"
                title="Sonraki Fotoğraf"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 flex justify-center items-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                    }}
                    className={`transition-all rounded-full cursor-pointer ${
                      activeImageIndex === idx
                        ? 'w-7 h-2 bg-red-500 shadow-lg'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/90'
                    }`}
                    aria-label={`Fotoğraf ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-[11px] font-black uppercase tracking-wider text-white inline-block">
                {car.category}
              </span>
              <span className="text-xs font-semibold text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-0.5 rounded-md">
                {angleLabels[activeImageIndex]?.badge || 'Görünüm'}
              </span>
              <LicensePlate plate={car.plate || '34 MMT 34'} size="sm" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{car.name}</h2>
            <p className="text-xs sm:text-sm text-gray-300 font-medium">{car.brand} · {car.year} Model</p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          {/* Photo Gallery Thumbnails (Different Angles) */}
          {images.length > 1 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <Camera className="w-4 h-4 text-red-500" />
                  <span>Fotoğraf Galerisi (4 Farklı Açı)</span>
                </h3>
                <span className="text-[11px] text-gray-400">Açıyı değiştirmek için tıklayın</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {images.map((imgUrl, idx) => {
                  const isActive = activeImageIndex === idx;
                  const label = angleLabels[idx] || { title: `Açı ${idx + 1}`, badge: `Açı ${idx + 1}` };
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`group relative rounded-xl overflow-hidden border text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-red-500 ring-2 ring-red-500/60 scale-[1.02] shadow-lg shadow-red-500/10'
                          : 'border-[#232736] hover:border-gray-500 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full bg-black">
                        <img
                          src={imgUrl}
                          alt={label.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2 bg-[#161922] border-t border-[#232736]/60 flex items-center justify-between">
                        <span className={`text-[11px] font-semibold block truncate ${isActive ? 'text-red-400' : 'text-gray-300'}`}>
                          {label.badge}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price and Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#161922] border border-[#232736]">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Tavsiye Edilen Başlangıç Fiyatı</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{car.priceFormatted}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <LicensePlate plate={car.plate || '34 MMT 34'} size="md" />
              <button
                onClick={() => {
                  onCompareWith(car);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-sm transition-all cursor-pointer"
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
            className="px-6 py-2.5 rounded-xl bg-[#232736] hover:bg-[#2e3347] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
