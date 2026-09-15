import React from 'react';
import { RefreshCw, GitCompare, Cpu, Layout, CheckCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      title: 'Güncel Otomobil Bilgileri',
      description: 'Global ve yerel otomotiv pazarına giren en yeni modeller, fabrika teknik verileri ve anlık güncellemeler tek ekranda.'
    },
    {
      icon: <GitCompare className="w-6 h-6 text-amber-500" />,
      title: 'Kolay Karşılaştırma',
      description: 'Seçtiğiniz iki aracı beygir gücünden yakıt tüketimine, bagaj hacminden hızlanmasına kadar saniyeler içinde yan yana kıyaslayın.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: 'Detaylı Teknik Özellikler',
      description: 'Motor hacmi, tork eğrileri, şanzıman tipleri ve elektrikli menzil değerleri dahil en ince mühendislik ayrıntıları.'
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      title: 'Modern ve Kullanıcı Dostu Tasarım',
      description: 'Gözü yormayan premium karanlık tema, akıcı animasyonlar ve mobil cihazlarla tam uyumlu kesintisiz kullanıcı deneyimi.'
    }
  ];

  return (
    <section className="py-20 relative bg-[#0d0f15] border-y border-[#232736]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Farkımız</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">Neden <span className="brand-shimmer-red">MEHMET AUTO</span>?</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Otomobil tutkunlarına ve bilinçli alıcılara en doğru teknik verileri, bağımsız analizleri ve modern keşif araçlarını sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#11131a] border border-[#232736] hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#161922] border border-[#232736] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
