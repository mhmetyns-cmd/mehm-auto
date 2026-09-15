import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Volume2, VolumeX, Flame, Zap, Gauge, Sparkles } from 'lucide-react';
import { soundEngine, getCarEngineProfile, type EngineProfileType } from '../utils/soundEngine';
import type { Car } from '../types';

interface SoundSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  initialCar?: Car | null;
}

export const SoundSimulatorModal: React.FC<SoundSimulatorModalProps> = ({
  isOpen,
  onClose,
  cars,
  initialCar
}) => {
  const [selectedCar, setSelectedCar] = useState<Car>(initialCar || cars[0]);
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [rpm, setRpm] = useState(850);
  const [isReving, setIsReving] = useState(false);
  const [showFlame, setShowFlame] = useState(false);

  const revIntervalRef = useRef<number | null>(null);

  // Sync initial car when modal opens
  useEffect(() => {
    if (initialCar) {
      setSelectedCar(initialCar);
    }
  }, [initialCar]);

  const profile: EngineProfileType = selectedCar ? getCarEngineProfile(selectedCar) : 'v8';

  // Stop engine when modal closes
  useEffect(() => {
    if (!isOpen) {
      soundEngine.stop();
      setIsEngineOn(false);
      setRpm(850);
      setIsReving(false);
      setShowFlame(false);
      if (revIntervalRef.current) clearInterval(revIntervalRef.current);
    }
  }, [isOpen]);

  const toggleEngine = useCallback(() => {
    if (isEngineOn) {
      soundEngine.stop();
      setIsEngineOn(false);
      setRpm(0);
      setIsReving(false);
      setShowFlame(false);
    } else {
      soundEngine.start(profile);
      setIsEngineOn(true);
      setRpm(850);
      soundEngine.setRpm(850);
    }
  }, [isEngineOn, profile]);

  // Handle switching car
  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
    const newProfile = getCarEngineProfile(car);
    if (isEngineOn) {
      soundEngine.start(newProfile);
      soundEngine.setRpm(rpm);
    }
  };

  // Revving loop
  const startRevving = () => {
    if (!isEngineOn) {
      soundEngine.start(profile);
      setIsEngineOn(true);
    }
    setIsReving(true);
    setShowFlame(true);

    if (revIntervalRef.current) clearInterval(revIntervalRef.current);

    revIntervalRef.current = window.setInterval(() => {
      setRpm((prevRpm) => {
        const next = Math.min(7400, prevRpm + 280);
        soundEngine.setRpm(next, 0.05);
        if (next >= 7000 && Math.random() > 0.6) {
          soundEngine.triggerPop();
        }
        return next;
      });
    }, 40);
  };

  const stopRevving = () => {
    setIsReving(false);
    if (revIntervalRef.current) {
      clearInterval(revIntervalRef.current);
      revIntervalRef.current = null;
    }

    // Trigger exhaust pops & bangs or blow off when throttle lifts from high RPM
    if (rpm > 4000) {
      if (profile === 'turbo') {
        soundEngine.triggerBlowOff();
      } else if (profile !== 'electric') {
        soundEngine.triggerPop();
      }
    }

    // Smooth return to idle
    const decayInterval = window.setInterval(() => {
      setRpm((prevRpm) => {
        if (prevRpm <= 900) {
          clearInterval(decayInterval);
          soundEngine.setRpm(850, 0.1);
          setShowFlame(false);
          return 850;
        }
        const next = Math.max(850, prevRpm - 260);
        soundEngine.setRpm(next, 0.06);
        return next;
      });
    }, 30);
  };

  const handleManualPop = () => {
    if (!isEngineOn) return;
    setShowFlame(true);
    soundEngine.triggerPop();
    setTimeout(() => setShowFlame(false), 400);
  };

  if (!isOpen) return null;

  // Calculate gauge angle: 0 RPM = -120deg, 8000 RPM = 120deg (240deg sweep)
  const gaugeAngle = -120 + (rpm / 8000) * 240;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0f1118] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#232736] flex items-center justify-between bg-gradient-to-r from-[#141824] to-[#0f1118]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">MEHMET AUTO Ses Stüdyosu</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Canlı Ses Laboratuvarı
                </span>
              </div>
              <p className="text-xs text-gray-400">Farklı motor ünitelerinin devir ve egzoz seslerini gerçek zamanlı deneyimleyin</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Car Selector Pills */}
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Araç & Motor Ünitesi Seçin
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {cars.slice(0, 7).map((car) => {
                const isSelected = selectedCar.id === car.id;
                return (
                  <button
                    key={car.id}
                    onClick={() => handleSelectCar(car)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500'
                        : 'bg-[#181c28] text-gray-300 hover:bg-[#22283a] border border-[#232736]'
                    }`}
                  >
                    <span>{car.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/30 text-white' : 'bg-black/40 text-gray-400'}`}>
                      {car.fuelType}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Tachometer & Sound Stage Panel */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#141824] to-[#0a0c12] border border-[#232736] p-6 sm:p-8 overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Exhaust Glow Effect */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                showFlame ? 'opacity-40' : 'opacity-0'
              }`}
              style={{
                background: profile === 'electric' 
                  ? 'radial-gradient(circle at center, rgba(6, 182, 212, 0.45) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(239, 68, 68, 0.5) 0%, rgba(245, 158, 11, 0.3) 40%, transparent 75%)'
              }}
            />

            {/* Selected Car Info Header in Stage */}
            <div className="text-center mb-4 relative z-10">
              <span className="text-xs font-bold text-red-400 tracking-widest uppercase">
                {selectedCar.brand} · {selectedCar.engine}
              </span>
              <h3 className="text-2xl font-black text-white">{selectedCar.name}</h3>
            </div>

            {/* Analog Tachometer Dial */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none z-10">
              <svg className="w-full h-full transform" viewBox="0 0 200 200">
                {/* Dial Outer Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#1b2030"
                  strokeWidth="8"
                  strokeDasharray="400"
                  strokeDashoffset="100"
                  strokeLinecap="round"
                  transform="rotate(130 100 100)"
                />

                {/* Redline Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray="80"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(35 100 100)"
                />

                {/* Dial RPM Tick marks */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => {
                  const angle = -120 + tick * 30;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 72 * Math.cos(rad);
                  const y1 = 100 + 72 * Math.sin(rad);
                  const x2 = 100 + 64 * Math.cos(rad);
                  const y2 = 100 + 64 * Math.sin(rad);
                  const textX = 100 + 52 * Math.cos(rad);
                  const textY = 100 + 52 * Math.sin(rad);

                  return (
                    <g key={tick}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={tick >= 6.5 ? '#ef4444' : '#8e96aa'}
                        strokeWidth={tick % 2 === 0 ? '2' : '1.2'}
                      />
                      <text
                        x={textX}
                        y={textY + 3}
                        fill={tick >= 6.5 ? '#ef4444' : '#d1d5db'}
                        fontSize="8"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Center Hub */}
                <circle cx="100" cy="100" r="14" fill="#11131a" stroke="#232736" strokeWidth="2" />
                <circle cx="100" cy="100" r="6" fill="#ef4444" />

                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="28"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${gaugeAngle} 100 100)`}
                  className="transition-transform duration-75 ease-out"
                />
              </svg>

              {/* Digital Display Inside Gauge */}
              <div className="absolute bottom-10 flex flex-col items-center">
                <span className="text-2xl font-black text-white tracking-wider font-mono">
                  {isEngineOn ? Math.round(rpm) : '0'}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  RPM / D/DAK
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${isEngineOn ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                  <span className="text-[10px] font-semibold text-gray-300">
                    {isEngineOn ? (isReving ? 'GAZ VERİLİYOR' : 'RÖLANTİ') : 'KONTAK KAPALI'}
                  </span>
                </div>
              </div>
            </div>

            {/* Exhaust Flame Indicator */}
            <div className="h-8 flex items-center justify-center mt-2 relative z-10">
              {showFlame && (
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/30 border border-red-500/60 text-red-400 text-xs font-black animate-bounce shadow-lg shadow-red-600/40">
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>{profile === 'electric' ? '⚡ ELEKTRİK AKIMI ⚡' : '🔥 EGZOZ ALEVİ & POP 🔥'}</span>
                </div>
              )}
            </div>

            {/* Interactive Control Buttons */}
            <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 relative z-10">
              {/* Start / Stop Ignition Button */}
              <button
                onClick={toggleEngine}
                className={`flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-black text-sm tracking-wider uppercase transition-all cursor-pointer shadow-xl ${
                  isEngineOn
                    ? 'bg-red-950/80 hover:bg-red-900/90 text-red-300 border border-red-500/50'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/50 shadow-emerald-600/30'
                }`}
              >
                {isEngineOn ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span>Kontak Kapat</span>
                  </>
                ) : (
                  <>
                    <Gauge className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>START / ÇALIŞTIR</span>
                  </>
                )}
              </button>

              {/* "Gazı Kökle!" (Hold to Rev) Pedal Button */}
              <button
                onMouseDown={startRevving}
                onMouseUp={stopRevving}
                onMouseLeave={stopRevving}
                onTouchStart={startRevving}
                onTouchEnd={stopRevving}
                disabled={!isEngineOn}
                className={`relative group flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-black text-sm tracking-wider uppercase transition-all select-none cursor-pointer ${
                  !isEngineOn
                    ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed opacity-60'
                    : isReving
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-2xl shadow-red-600/70 scale-95 ring-4 ring-red-500/50'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95'
                }`}
              >
                <Flame className={`w-5 h-5 ${isReving ? 'animate-bounce text-yellow-300 fill-yellow-300' : ''}`} />
                <span>{isReving ? 'DEVİR KÖKLENİYOR!' : 'GAZI KÖKLE (BASILI TUT)'}</span>
              </button>
            </div>

            {/* Quick Action Extras */}
            {isEngineOn && profile !== 'electric' && (
              <div className="mt-4 flex items-center gap-3 relative z-10">
                <button
                  onClick={handleManualPop}
                  className="px-4 py-2 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Egzoz Patlat (Pop & Bang)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#0a0c12] border-t border-[#232736] flex items-center justify-between">
          <span className="text-xs text-gray-400">
            * Web Audio API sentezleme motoru kullanılarak gerçek zamanlı üretilmektedir.
          </span>
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
