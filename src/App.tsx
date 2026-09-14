import { useState, useEffect, useMemo } from 'react';
import { carsData } from './data/cars';
import type { Car, FilterState, Category } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchFilter } from './components/SearchFilter';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { CategorySection } from './components/CategorySection';
import { FeaturedCar } from './components/FeaturedCar';
import { CompareSection } from './components/CompareSection';
import { ElectricFuture } from './components/ElectricFuture';
import { NewsSection } from './components/NewsSection';
import { WhyUs } from './components/WhyUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { CarFront, Check, Flame } from 'lucide-react';

export function App() {
  // Favorites persisted in localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mehmet_auto_favorites');
      return saved ? JSON.parse(saved) : ['togg-t10x-v2', 'toyota-corolla-hybrid'];
    } catch {
      return ['togg-t10x-v2', 'toyota-corolla-hybrid'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mehmet_auto_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [favoriteIds]);

  // Modals state
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Comparison State (Default: TOGG T10X vs Tesla Model Y)
  const [compareCarA, setCompareCarA] = useState<Car>(carsData[0]);
  const [compareCarB, setCompareCarB] = useState<Car>(carsData[6] || carsData[1]);

  // Filter State
  const initialFilter: FilterState = {
    brand: 'Tümü',
    model: '',
    fuelType: 'Tümü',
    category: 'Tümü',
    maxPrice: 0,
    searchQuery: '',
  };
  const [filter, setFilter] = useState<FilterState>(initialFilter);

  // Show toast utility
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle favorite
  const handleToggleFavorite = (carId: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(carId);
      if (exists) {
        showToast('Araç favorilerden çıkarıldı.');
        return prev.filter((id) => id !== carId);
      } else {
        showToast('Araç favorilere eklendi!');
        return [...prev, carId];
      }
    });
  };

  // Filtered cars computation
  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      // Brand filter
      if (filter.brand !== 'Tümü' && car.brand !== filter.brand) return false;

      // Category filter
      if (filter.category !== 'Tümü' && car.category !== filter.category) return false;

      // Fuel type filter
      if (filter.fuelType !== 'Tümü' && car.fuelType !== filter.fuelType) return false;

      // Max price filter
      if (filter.maxPrice > 0 && car.price > filter.maxPrice) return false;

      // Search query filter
      if (filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesEngine = car.engine.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesEngine) return false;
      }

      return true;
    });
  }, [filter]);

  // Popular cars (first 6 prominent models)
  const popularCars = useMemo(() => {
    return carsData.slice(0, 6);
  }, []);

  // Electric cars
  const electricCars = useMemo(() => {
    return carsData.filter((c) => c.fuelType === 'Elektrik' || c.isElectric);
  }, []);

  // Featured car of the week (TOGG T10X)
  const featuredCarOfWeek = useMemo(() => {
    return carsData.find((c) => c.isFeatured) || carsData[0];
  }, []);

  // Favorite car objects
  const favoriteCars = useMemo(() => {
    return carsData.filter((c) => favoriteIds.includes(c.id));
  }, [favoriteIds]);

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category select handler
  const handleCategorySelect = (categorySlug: Category['slug']) => {
    setFilter((prev) => ({ ...prev, category: categorySlug }));
    navigateToSection('otomobiller');
    showToast(`"${categorySlug}" kategorisindeki araçlar filtrelendi.`);
  };

  // Add car to comparison
  const handleAddToCompare = (car: Car) => {
    if (car.id !== compareCarA.id) {
      setCompareCarB(car);
    } else {
      setCompareCarA(car);
    }
    navigateToSection('karsilastir');
    showToast(`${car.name} karşılaştırma alanına eklendi!`);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs shadow-2xl animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        favoriteCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      {/* 4. Hero Section */}
      <Hero
        onExploreCars={() => navigateToSection('otomobiller')}
        onPopularCars={() => navigateToSection('populer')}
      />

      {/* 5. Search & Filter Area */}
      <SearchFilter
        filter={filter}
        onFilterChange={setFilter}
        onReset={() => setFilter(initialFilter)}
        totalResults={filteredCars.length}
      />

      {/* 6. Popular & Filtered Cars Showcase */}
      <main className="flex-1">
        <section id="otomobiller" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-widest uppercase mb-1">
                <CarFront className="w-4 h-4" />
                <span>Türkiye Otomobil Kataloğu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {filter.category !== 'Tümü' || filter.brand !== 'Tümü' || filter.searchQuery
                  ? 'Filtrelenmiş Sonuçlar'
                  : 'Türkiye Yollarının Tüm Modelleri'}
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              Toplam <span className="text-white font-bold">{filteredCars.length}</span> model listeleniyor
            </p>
          </div>

          {filteredCars.length === 0 ? (
            <div className="bg-[#11131a] rounded-3xl border border-[#232736] p-12 text-center my-8">
              <CarFront className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aradığınız kriterlere uygun araç bulunamadı</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                Farklı bir marka, model veya bütçe seçmeyi deneyebilir veya filtreleri sıfırlayabilirsiniz.
              </p>
              <button
                onClick={() => setFilter(initialFilter)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFavorite={favoriteIds.includes(car.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectCar={setSelectedCar}
                  onAddToCompare={handleAddToCompare}
                />
              ))}
            </div>
          )}
        </section>

        {/* 6. Dedicated Popular Cars Highlight */}
        <section id="populer" className="py-16 bg-[#0c0d13] border-y border-[#232736]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Türkiye'de Çok Satanlar</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Popüler Otomobiller</h2>
                <p className="text-gray-400 text-sm mt-1">Türkiye sokaklarında en çok tercih edilen modelleri keşfet.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCars.map((car) => (
                <CarCard
                  key={`pop-${car.id}`}
                  car={car}
                  isFavorite={favoriteIds.includes(car.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectCar={setSelectedCar}
                  onAddToCompare={handleAddToCompare}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Kategoriye Göre Keşfet */}
        <CategorySection onSelectCategory={handleCategorySelect} />

        {/* 8. Haftanın Otomobili */}
        <FeaturedCar car={featuredCarOfWeek} onSelectCar={setSelectedCar} />

        {/* 9. Araç Karşılaştırma */}
        <CompareSection
          cars={carsData}
          selectedCarA={compareCarA}
          selectedCarB={compareCarB}
          onSelectCarA={setCompareCarA}
          onSelectCarB={setCompareCarB}
        />

        {/* 11. Elektrikli Gelecek */}
        <ElectricFuture electricCars={electricCars} onSelectCar={setSelectedCar} />

        {/* 10. Otomobil Haberleri */}
        <NewsSection />

        {/* 12. Neden MEHMET AUTO? */}
        <WhyUs />

        {/* 13. Hakkımızda */}
        <AboutSection />

        {/* 14. İletişim */}
        <ContactSection />
      </main>

      {/* 15. Footer */}
      <Footer onNavigateToSection={navigateToSection} />

      {/* Detail Modal */}
      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        isFavorite={selectedCar ? favoriteIds.includes(selectedCar.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onCompareWith={handleAddToCompare}
      />

      {/* Favorites Drawer / Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteCars}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCar={setSelectedCar}
        onCompareWith={handleAddToCompare}
      />
    </div>
  );
}

export default App;
