import React from 'react';
import { X, Heart, Trash2, Eye, GitCompare } from 'lucide-react';
import type { Car } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Car[];
  onRemoveFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onCompareWith: (car: Car) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectCar,
  onCompareWith
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-[#11131a] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#232736]">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="text-xl font-black text-white">Favori Araçlarım ({favorites.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#161922] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-base font-bold text-gray-300">Henüz favori araç eklemediniz</p>
              <p className="text-xs text-gray-500 mt-1">
                Beğendiğiniz araçların kartlarındaki kalp simgesine tıklayarak buraya ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            favorites.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#161922] border border-[#232736] hover:border-red-500/40 transition-all"
              >
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-red-400 uppercase">{car.brand}</span>
                  <h4 className="text-sm font-bold text-white truncate">{car.name}</h4>
                  <p className="text-xs font-black text-gray-200">{car.priceFormatted}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectCar(car);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-[#232736] hover:bg-red-600 text-white text-xs transition-colors"
                    title="İncele"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onCompareWith(car);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-[#232736] hover:bg-amber-600 text-white text-xs transition-colors"
                    title="Kıyasla"
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(car.id)}
                    className="p-2 rounded-xl bg-[#232736] hover:bg-red-950 text-gray-400 hover:text-red-400 text-xs transition-colors"
                    title="Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d0f15] border-t border-[#232736] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#232736] hover:bg-[#2e3347] text-white text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
