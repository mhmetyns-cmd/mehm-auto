import React from 'react';
import { GitCompare } from 'lucide-react';
import type { Car } from '../types';
import { LicensePlate } from './LicensePlate';

interface CompareSectionProps {
  cars: Car[];
  selectedCarA?: Car;
  selectedCarB?: Car;
  onSelectCarA: (car: Car) => void;
  onSelectCarB: (car: Car) => void;
}

export const CompareSection: React.FC<CompareSectionProps> = ({
  cars,
  selectedCarA: initialCarA,
  selectedCarB: initialCarB,
  onSelectCarA,
  onSelectCarB
}) => {
  const carA = initialCarA || cars[0];
  const carB = initialCarB || cars[1];

  const handleSelectA = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = cars.find((c) => c.id === e.target.value);
    if (found) onSelectCarA(found);
  };

  const handleSelectB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = cars.find((c) => c.id === e.target.value);
    if (found) onSelectCarB(found);
  };

  const isBetterHp = carA.horsepower > carB.horsepower;
  const isBetterTorque = carA.torque > carB.torque;
  const isFasterAcc = carA.acceleration < carB.acceleration;
  const isHigherSpeed = carA.topSpeed > carB.topSpeed;
  const isBiggerTrunk = carA.trunkCapacity > carB.trunkCapacity;

  return (
    <section id="karsilastir" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">
          <GitCompare className="w-4 h-4" />
          <span>Yan Yana Kıyaslama</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Otomobilleri Karşılaştır</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Merak ettiğiniz iki otomobili seçin, beygir gücünden 0-100 hızlanmasına ve bagaj hacmine kadar tüm teknik detayları tarafsız kıyaslayın.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="bg-[#11131a] border border-[#232736] rounded-3xl p-4 sm:p-8 shadow-2xl">
        {/* Car Selectors & Visuals Card */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center mb-8 pb-8 border-b border-[#232736]">
          {/* Car A Card */}
          <div className="md:col-span-5 bg-[#161922] p-4 sm:p-6 rounded-2xl border border-[#232736]">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Araç 1 (Seçiniz)
            </label>
            <select
              value={carA.id}
              onChange={handleSelectA}
              className="w-full bg-[#11131a] border border-[#232736] text-white text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 mb-4 cursor-pointer"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} - {c.name}
                </option>
              ))}
            </select>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-black">
              <img src={carA.image} alt={carA.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 z-10">
                <LicensePlate plate={carA.plate || '34 MMT 34'} size="sm" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-white">{carA.name}</h3>
              <p className="text-base font-extrabold text-red-400 mt-1">{carA.priceFormatted}</p>
            </div>
          </div>

          {/* VS Badge */}
          <div className="md:col-span-1 flex items-center justify-center my-2 md:my-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-red-600/40 border border-white/20">
              VS
            </div>
          </div>

          {/* Car B Card */}
          <div className="md:col-span-5 bg-[#161922] p-4 sm:p-6 rounded-2xl border border-[#232736]">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Araç 2 (Seçiniz)
            </label>
            <select
              value={carB.id}
              onChange={handleSelectB}
              className="w-full bg-[#11131a] border border-[#232736] text-white text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 mb-4 cursor-pointer"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} - {c.name}
                </option>
              ))}
            </select>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-black">
              <img src={carB.image} alt={carB.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 z-10">
                <LicensePlate plate={carB.plate || '34 MMT 34'} size="sm" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-white">{carB.name}</h3>
              <p className="text-base font-extrabold text-amber-400 mt-1">{carB.priceFormatted}</p>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table / Rows */}
        <div className="space-y-3">
          {/* Row: Motor */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className="font-bold text-white pr-2 truncate">{carA.engine}</div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Motor Ünitesi</div>
            <div className="text-right font-bold text-white pl-2 truncate">{carB.engine}</div>
          </div>

          {/* Row: Beygir */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className={`font-black text-sm sm:text-base ${isBetterHp ? 'text-green-400' : 'text-white'}`}>
              {carA.horsepower} HP {isBetterHp && '⭐'}
            </div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Beygir Gücü</div>
            <div className={`text-right font-black text-sm sm:text-base ${!isBetterHp && carA.horsepower !== carB.horsepower ? 'text-green-400' : 'text-white'}`}>
              {!isBetterHp && carA.horsepower !== carB.horsepower && '⭐ '} {carB.horsepower} HP
            </div>
          </div>

          {/* Row: Tork */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className={`font-black text-sm sm:text-base ${isBetterTorque ? 'text-green-400' : 'text-white'}`}>
              {carA.torque} Nm {isBetterTorque && '⭐'}
            </div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Tork Değeri</div>
            <div className={`text-right font-black text-sm sm:text-base ${!isBetterTorque && carA.torque !== carB.torque ? 'text-green-400' : 'text-white'}`}>
              {!isBetterTorque && carA.torque !== carB.torque && '⭐ '} {carB.torque} Nm
            </div>
          </div>

          {/* Row: 0-100 */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className={`font-black text-sm sm:text-base ${isFasterAcc ? 'text-green-400' : 'text-white'}`}>
              {carA.acceleration} sn {isFasterAcc && '⚡'}
            </div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">0-100 km/s</div>
            <div className={`text-right font-black text-sm sm:text-base ${!isFasterAcc && carA.acceleration !== carB.acceleration ? 'text-green-400' : 'text-white'}`}>
              {!isFasterAcc && carA.acceleration !== carB.acceleration && '⚡ '} {carB.acceleration} sn
            </div>
          </div>

          {/* Row: Maksimum Sürat */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className={`font-bold ${isHigherSpeed ? 'text-green-400' : 'text-white'}`}>
              {carA.topSpeed} km/s
            </div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Maksimum Hız</div>
            <div className={`text-right font-bold ${!isHigherSpeed && carA.topSpeed !== carB.topSpeed ? 'text-green-400' : 'text-white'}`}>
              {carB.topSpeed} km/s
            </div>
          </div>

          {/* Row: Tüketim */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className="font-bold text-white truncate pr-2">{carA.consumption}</div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Ort. Tüketim</div>
            <div className="text-right font-bold text-white truncate pl-2">{carB.consumption}</div>
          </div>

          {/* Row: Bagaj Hacmi */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className={`font-bold ${isBiggerTrunk ? 'text-green-400' : 'text-white'}`}>
              {carA.trunkCapacity} L
            </div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Bagaj Hacmi</div>
            <div className={`text-right font-bold ${!isBiggerTrunk && carA.trunkCapacity !== carB.trunkCapacity ? 'text-green-400' : 'text-white'}`}>
              {carB.trunkCapacity} L
            </div>
          </div>

          {/* Row: Yakıt Türü */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className="font-semibold text-white">{carA.fuelType}</div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Yakıt Türü</div>
            <div className="text-right font-semibold text-white">{carB.fuelType}</div>
          </div>

          {/* Row: Şanzıman */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className="font-semibold text-white truncate pr-2">{carA.transmission}</div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Şanzıman</div>
            <div className="text-right font-semibold text-white truncate pl-2">{carB.transmission}</div>
          </div>

          {/* Row: Çekiş */}
          <div className="grid grid-cols-3 p-3.5 sm:p-4 rounded-xl bg-[#161922] items-center text-xs sm:text-sm">
            <div className="font-semibold text-white truncate pr-2">{carA.driveTrain}</div>
            <div className="text-center text-gray-400 font-semibold uppercase text-[11px] sm:text-xs">Çekiş</div>
            <div className="text-right font-semibold text-white truncate pl-2">{carB.driveTrain}</div>
          </div>

          {/* Row: Fiyat */}
          <div className="grid grid-cols-3 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-red-950/30 via-[#161922] to-amber-950/30 border border-[#232736] items-center text-sm sm:text-base">
            <div className="font-black text-red-400">{carA.priceFormatted}</div>
            <div className="text-center text-white font-bold uppercase text-xs">Fiyat</div>
            <div className="text-right font-black text-amber-400">{carB.priceFormatted}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
