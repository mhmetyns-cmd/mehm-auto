import React from 'react';
import { Search, Filter, RotateCcw, DollarSign, Fuel, Tag, CarFront } from 'lucide-react';
import type { FilterState } from '../types';

interface SearchFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalResults
}) => {
  const brands = ['Tümü', 'Porsche', 'BMW', 'Mercedes-Benz', 'Tesla', 'Audi', 'Ferrari', 'Land Rover', 'Volkswagen'];
  const fuelTypes = ['Tümü', 'Benzin', 'Hibrit', 'Elektrik', 'Dizel'];
  const categories = ['Tümü', 'SUV', 'Sedan', 'Hatchback', 'Elektrikli', 'Spor', 'Premium'];

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, brand: e.target.value });
  };

  const handleFuelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, fuelType: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, category: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, searchQuery: e.target.value });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, maxPrice: Number(e.target.value) });
  };

  return (
    <section id="filtre" className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#11131a]/95 backdrop-blur-xl border border-[#232736] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#232736]/70">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-semibold text-sm mb-1 uppercase tracking-wider">
              <Filter className="w-4 h-4" />
              <span>Gelişmiş Filtreleme</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Hayalindeki Otomobili Bul</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 bg-[#161922] px-3 py-1.5 rounded-lg border border-[#232736]">
              <strong className="text-white">{totalResults}</strong> araç bulundu
            </span>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161922] hover:bg-[#232736] text-xs font-medium text-gray-300 hover:text-white border border-[#232736] transition-all"
              title="Filtreleri Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Free Text / Model Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-red-400" /> Model Ara
            </label>
            <input
              type="text"
              placeholder="Örn: 911, M4, Plaid..."
              value={filter.searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#161922] border border-[#232736] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Brand */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-red-400" /> Marka
            </label>
            <select
              value={filter.brand}
              onChange={handleBrandChange}
              className="w-full bg-[#161922] border border-[#232736] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b} value={b} className="bg-[#161922] text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Category / Kasa Tipi */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <CarFront className="w-3.5 h-3.5 text-red-400" /> Kasa Tipi
            </label>
            <select
              value={filter.category}
              onChange={handleCategoryChange}
              className="w-full bg-[#161922] border border-[#232736] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#161922] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-red-400" /> Yakıt Türü
            </label>
            <select
              value={filter.fuelType}
              onChange={handleFuelChange}
              className="w-full bg-[#161922] border border-[#232736] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              {fuelTypes.map((f) => (
                <option key={f} value={f} className="bg-[#161922] text-white">
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-red-400" /> Maksimum Bütçe
            </label>
            <select
              value={filter.maxPrice}
              onChange={handleBudgetChange}
              className="w-full bg-[#161922] border border-[#232736] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="0" className="bg-[#161922]">Fark Etmez (Limitsiz)</option>
              <option value="6000000" className="bg-[#161922]">6.000.000 ₺'ye kadar</option>
              <option value="10000000" className="bg-[#161922]">10.000.000 ₺'ye kadar</option>
              <option value="15000000" className="bg-[#161922]">15.000.000 ₺'ye kadar</option>
              <option value="20000000" className="bg-[#161922]">20.000.000 ₺'ye kadar</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
