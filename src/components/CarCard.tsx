import React from 'react';
import { Heart, Gauge, Eye, GitCompare } from 'lucide-react';
import type { Car } from '../types';
import { LicensePlate } from './LicensePlate';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onAddToCompare?: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  onToggleFavorite,
  onSelectCar,
  onAddToCompare
}) => {
  return (
    <div className="group bg-[#161922] rounded-2xl border border-[#232736] overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161922] via-transparent to-black/30" />

        {/* Category & Year Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 uppercase tracking-wider">
            {car.category}
          </span>
          <span className="px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md text-[11px] font-semibold text-gray-200">
            {car.year}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-all border border-white/10"
          title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          aria-label="Favori Butonu"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300 hover:text-red-400'
            }`}
          />
        </button>

        {/* License Plate */}
        <div className="absolute bottom-2 left-3 z-10">
          <LicensePlate plate={car.plate || '34 MMT 34'} size="sm" />
        </div>

        {/* Acceleration Badge */}
        <div className="absolute bottom-2 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs text-white">
          <Gauge className="w-3.5 h-3.5 text-red-500" />
          <span className="font-bold">{car.acceleration} sn</span>
          <span className="text-[10px] text-gray-400">0-100</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div className="mb-2">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">{car.brand}</span>
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
              {car.name}
            </h3>
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 mb-4">
            {car.description}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#232736]/70 mb-4 bg-[#11131a]/40 rounded-xl px-2">
            <div className="text-center">
              <span className="block text-[10px] text-gray-400 uppercase">Güç</span>
              <span className="text-xs font-bold text-white">{car.horsepower} HP</span>
            </div>
            <div className="text-center border-x border-[#232736]">
              <span className="block text-[10px] text-gray-400 uppercase">Yakıt</span>
              <span className="text-xs font-bold text-white truncate px-1">{car.fuelType}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-gray-400 uppercase">Tüketim</span>
              <span className="text-xs font-bold text-white truncate">{car.consumption}</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">Başlangıç Fiyatı</span>
              <span className="text-lg font-black text-white">{car.priceFormatted}</span>
            </div>
            {onAddToCompare && (
              <button
                onClick={() => onAddToCompare(car)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                title="Karşılaştırmaya Ekle"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Kıyasla</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onSelectCar(car)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#232736] hover:bg-red-600 text-gray-200 hover:text-white font-semibold text-xs transition-all duration-200 shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Detayları Gör</span>
          </button>
        </div>
      </div>
    </div>
  );
};
