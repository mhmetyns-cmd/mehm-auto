import React, { useState } from 'react';
import { newsData } from '../data/news';
import { Newspaper, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';
import type { NewsItem } from '../types';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const mainNews = newsData[0];
  const sideNews = newsData.slice(1);

  return (
    <section id="haberler" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-widest uppercase mb-2">
            <Newspaper className="w-4 h-4" />
            <span>Gelişmeler & İncelemeler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Otomobil Dünyasından Son Haberler</h2>
        </div>
        <p className="text-gray-400 text-sm max-w-md">
          Otomotiv endüstrisindeki en yeni mühendislik atılımları, tasarım trendleri ve pist testleri.
        </p>
      </div>

      {/* Grid: 1 Main Featured Article + 3 Side Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Big News */}
        <div 
          onClick={() => setSelectedNews(mainNews)}
          className="lg:col-span-7 group bg-[#11131a] rounded-3xl border border-[#232736] overflow-hidden hover:border-red-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                {mainNews.category}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-red-400" /> {mainNews.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-red-400" /> {mainNews.readTime}</span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-colors mb-3 leading-snug">
                {mainNews.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {mainNews.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#232736]">
              <span className="text-xs text-gray-400 font-medium">Yazar: {mainNews.author}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 group-hover:translate-x-1 transition-transform">
                Devamını Oku <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Side Smaller Articles */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          {sideNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="group bg-[#11131a] rounded-2xl border border-[#232736] p-4 sm:p-5 hover:border-red-500/50 transition-all duration-300 cursor-pointer flex gap-4 items-center"
            >
              <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-black">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-red-400 font-semibold mb-1">
                  <span>{news.category}</span>
                  <span>·</span>
                  <span className="text-gray-400">{news.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-1">
                  {news.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                  {news.summary}
                </p>
                <span className="text-[11px] font-bold text-red-500 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Devamını Oku →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#11131a] border border-[#232736] rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
            <div className="relative h-60 w-full overflow-hidden shrink-0">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-bold uppercase">
                  {selectedNews.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-red-400" /> {selectedNews.date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-red-400" /> {selectedNews.author}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{selectedNews.title}</h3>
              <p className="text-sm font-semibold text-gray-300 leading-relaxed italic border-l-2 border-red-500 pl-3">
                {selectedNews.summary}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed pt-2">
                {selectedNews.content}
              </p>
            </div>

            <div className="p-4 bg-[#0d0f15] border-t border-[#232736] flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 rounded-xl bg-[#232736] hover:bg-red-600 text-white text-xs font-semibold transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
