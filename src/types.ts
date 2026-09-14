export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'Elektrikli' | 'Spor' | 'Premium';
  price: number;
  priceFormatted: string;
  engine: string;
  horsepower: number;
  torque: number; // Nm
  acceleration: number; // 0-100 km/s sn
  topSpeed: number; // km/s
  consumption: string; // lt/100km veya kWh/100km
  fuelType: 'Benzin' | 'Dizel' | 'Hibrit' | 'Elektrik';
  transmission: 'Otomatik' | 'Manuel' | 'Çift Kavrama (PDK/DCT)';
  driveTrain: 'AWD (4x4)' | 'RWD (Arkadan İtiş)' | 'FWD (Önden Çekiş)';
  trunkCapacity: number; // Litre
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  isFeatured?: boolean;
  isElectric?: boolean;
  electricSpecs?: {
    range: number; // km
    battery: number; // kWh
    chargeTime: string; // 10-80% DC
    powerKw: number; // kW
  };
}

export interface Category {
  id: string;
  title: string;
  slug: 'SUV' | 'Sedan' | 'Hatchback' | 'Elektrikli' | 'Spor' | 'Premium';
  image: string;
  description: string;
  iconName: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface FilterState {
  brand: string;
  model: string;
  fuelType: string;
  category: string;
  maxPrice: number;
  searchQuery: string;
}
