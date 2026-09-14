import type { Category } from '../types';

export const categoriesData: Category[] = [
  {
    id: 'cat-suv',
    title: 'SUV',
    slug: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    description: 'Yüksek sürüş pozisyonu, üstün arazi yeteneği ve geniş yaşam hacmi sunan modeller.',
    iconName: 'Shield'
  },
  {
    id: 'cat-sedan',
    title: 'Sedan',
    slug: 'Sedan',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    description: 'Aerodinamik zarafet, üst düzey seyahat konforu ve prestijli iş dünyası çizgileri.',
    iconName: 'Compass'
  },
  {
    id: 'cat-hatchback',
    title: 'Hatchback',
    slug: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    description: 'Şehir içi kıvraklık, pratik bagaj yükleme alanı ve enerjik hot-hatch performansı.',
    iconName: 'Zap'
  },
  {
    id: 'cat-electric',
    title: 'Elektrikli',
    slug: 'Elektrikli',
    image: 'https://images.unsplash.com/photo-1558441719-aa3445544f50?auto=format&fit=crop&w=800&q=80',
    description: 'Sıfır emisyon, anlık tork patlaması ve yeni nesil otonom sürüş teknolojileri.',
    iconName: 'BatteryCharging'
  },
  {
    id: 'cat-sports',
    title: 'Spor',
    slug: 'Spor',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    description: 'Saf adrenalin, pist odaklı aerodinamik tasarım ve yüksek devirli motor sesleri.',
    iconName: 'Flame'
  },
  {
    id: 'cat-premium',
    title: 'Premium',
    slug: 'Premium',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    description: 'El işçiliği deri detaylar, akustik konfor ve benzersiz lüks sürüş deneyimi.',
    iconName: 'Crown'
  }
];
