import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Search } from 'lucide-react';
import { NewsItem } from '../types';
import { getImageUrl, formatDate } from '../utils/helpers';

export default function BeritaSection({ onNewsClick, newsData }: { onNewsClick: (id: number | string) => void, newsData: NewsItem[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 1024 ? 4 : 6);
    };
    handleResize(); // Initial check
  }, []);

  const categories = ['Semua', 'Kegiatan Kader', 'Pernyataan Resmi', 'Kebijakan Publik', 'Nasional', 'Daerah', 'Umum'];

  const filteredNews = Array.isArray(newsData) 
    ? newsData.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (news.excerpt && news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const newsCategory = news.kategori || 'Umum';
        const matchesCategory = activeCategory === 'Semua' || newsCategory === activeCategory;

        return matchesSearch && matchesCategory;
      }) 
    : [];

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-black mb-6">Pusat Berita</h1>
          <p className="text-lg text-stone-600">
            Informasi terkini mengenai kebijakan, kegiatan, dan pernyataan resmi DPW PAN NTT.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berita berdasarkan judul atau isi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6); // Reset pagination on search
              }}
              className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-stone-100 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all text-stone-700 bg-white shadow-sm"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={24} />
          </div>
          
          {/* Mobile Category Scroll */}
          <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-brand text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main News List */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-12">
            <AnimatePresence mode="popLayout">
              {visibleNews.length > 0 ? visibleNews.map((news, i) => (
                <motion.div
                  key={news.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.1 }}
                  layout
                  onClick={() => onNewsClick(news.id)}
                  className="flex flex-col lg:flex-row gap-4 md:gap-8 group cursor-pointer"
                >
                  <div className="w-full lg:w-64 h-32 md:h-48 rounded-none overflow-hidden shrink-0 shadow-sm relative">
                    <img src={getImageUrl(news.image)} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-widest">
                       <span className="text-brand">{formatDate(news.date)}</span>
                       <span className="bg-stone-100 text-stone-500 px-2 py-1 rounded">{news.kategori || 'Umum'}</span>
                    </div>
                    <h2 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 group-hover:text-brand transition-colors leading-tight line-clamp-2">{news.title}</h2>
                    <p className="text-stone-500 mb-6 line-clamp-2 leading-relaxed hidden md:block">{news.excerpt}</p>
                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                      Baca Selengkapnya <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-stone-50 rounded-3xl p-12 text-center border border-stone-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-200 text-stone-400 mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Tidak Ada Hasil</h3>
                  <p className="text-stone-500">Pencarian untuk kriteria yang diminta tidak menemukan berita apapun. Silakan coba kata kunci atau kategori lain.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {filteredNews.length > visibleCount && (
              <div className="pt-12 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="bg-white border-2 border-stone-200 text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-stone-50 hover:border-brand hover:text-brand transition-all flex items-center gap-2 mx-auto shadow-sm"
                >
                  Muat Lebih Banyak ({filteredNews.length - visibleCount} tersisa) <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hidden lg:block">
              <h3 className="font-bold text-xl mb-6">Kategori Berita</h3>
              <ul className="space-y-4">
                {categories.map(cat => {
                   const count = cat === 'Semua' 
                     ? newsData.length 
                     : newsData.filter(n => (n.kategori || 'Umum') === cat).length;
                   
                   return (
                    <li 
                      key={cat} 
                      onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                      className={`flex justify-between items-center cursor-pointer transition-colors group ${activeCategory === cat ? 'text-brand font-bold' : 'text-stone-600 hover:text-brand'}`}
                    >
                      <span>{cat}</span>
                      <span className={`${activeCategory === cat ? 'bg-brand text-white' : 'bg-stone-50 text-stone-400 group-hover:bg-brand-light group-hover:text-brand'} text-xs font-bold px-2 py-1 rounded transition-colors`}>{count}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-brand p-8 rounded-3xl text-white shadow-xl shadow-brand-light/20 relative overflow-hidden group">
              <div className="absolute -top-[100px] -right-[100px] w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-4">Media Center</h3>
                <p className="text-sm text-brand-light mb-6 leading-relaxed">
                  Untuk pertanyaan media dan wawancara eksklusif, silakan hubungi tim komunikasi publik kami.
                </p>
                <button className="bg-white text-brand w-full py-3 rounded-xl font-bold hover:bg-stone-100 transition-all shadow-lg shadow-black/10 active:scale-95">
                  Hubungi Humas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
