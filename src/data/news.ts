import type { NewsItem } from '../types';

export const newsData: NewsItem[] = [
  {
    id: 'news-togg-sales-record',
    title: 'Türkiye’de Elektrikli Araç Satışlarında Yeni Rekor: TOGG ve Tesla Zirvede',
    summary: '2026 yılı ilk çeyreğinde Türkiye elektrikli otomobil pazarı yüzde 40 büyüdü. Yerli modelimiz TOGG T10X ile Tesla Model Y en çok tercih edilen iki model oldu.',
    content: 'Türkiye Otomotiv Distribütörleri ve Mobilite Derneği (ODMD) verilerine göre, elektrikli otomobillerin pazar payı hızla artmaya devam ediyor. TOGG’un Gebze tesislerindeki üretim kapasitesini artırması ve yaygınlaşan Trugo şarj ağı sayesinde T10X satış liderliğini sürdürürken, %10 ÖTV dilimindeki modeller vatandaşlardan yoğun ilgi görüyor.',
    category: 'Pazar & Satış',
    date: '12 Mart 2026',
    readTime: '4 dk okuma',
    image: '/images/togg-t10x.jpg',
    author: 'Otomotiv Editörü Burak Çelik'
  },
  {
    id: 'news-otv-regulations',
    title: '2026 Otomobil Vergilendirme ve Hibrit Teşviklerinde Son Durum',
    summary: 'Yakıt tüketimi düşük hibrit ve elektrikli otomobiller için yeni matrah güncellemeleri ve emisyon bazlı vergi indirimi planları netleşiyor.',
    content: 'Çevre ve Şehircilik politikaları ile uyumlu olarak, 100 kilometrede 5 litrenin altında tüketime sahip tam hibrit araçlar ile yerli üretim otomobiller için vergi teşvik paketleri gündemde. Şehir içi hava kalitesini korumayı hedefleyen düzenlemelerin detayları açıklandı.',
    category: 'Mevzuat & Vergi',
    date: '10 Mart 2026',
    readTime: '5 dk okuma',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    author: 'Ekonomi Masası Mehmet Yılmaz'
  },
  {
    id: 'news-egea-clio-comparison',
    title: 'Şehir İçi Ekonominin Liderleri: Fiat Egea ve Renault Clio Karşılaştırması',
    summary: 'Türkiye’nin en popüler iki modeli olan Egea ve Clio’nun bakım maliyetleri, yakıt tüketimleri ve ikinci el değer koruma oranları mercek altında.',
    content: 'Türkiye yollarının iki değişmez aktörü Egea ve Clio, hem filo hem de bireysel kullanıcının ilk tercihi olmaya devam ediyor. 1.6 Multijet dizel ve 1.6 E-Tech tam hibrit motor seçeneklerinin 5 yıllık kullanım maliyetleri, parça bulunabilirliği ve ikinci el likidite analizini sizler için derledik.',
    category: 'Karşılaştırma',
    date: '08 Mart 2026',
    readTime: '6 dk okuma',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80',
    author: 'Test Editörü Caner Demir'
  },
  {
    id: 'news-trugo-charging-network',
    title: '81 İlde Yüksek Hızlı Şarj: Trugo ve Şarj Ağı 10.000 Sokete Ulaştı',
    summary: 'Türkiye otoyollarında 180 kW ve 300 kW üzeri DC hızlı şarj istasyonlarının sayısı katlanarak arttı. İstanbul-Antalya rotasında şarj sırası bekleme devri sona erdi.',
    content: 'Enerji Piyasası Düzenleme Kurumu (EPDK) tarafından lisanslanan şarj operatörlerinin yatırımları hız kazandı. Trugo, ZES ve Eşarj iş birlikleriyle her 25 kilometrede bir DC şarj istasyonuna erişim sağlanarak elektrikli araçlarla şehirlerarası yolculuklar dizel ve benzinli araçlar kadar konforlu hale getirildi.',
    category: 'Altyapı',
    date: '05 Mart 2026',
    readTime: '3 dk okuma',
    image: 'https://images.unsplash.com/photo-1558441719-aa3445544f50?auto=format&fit=crop&w=1000&q=80',
    author: 'Enerji & Teknoloji Servisi'
  }
];
