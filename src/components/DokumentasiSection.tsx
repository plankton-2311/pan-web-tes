import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { GalleryItem } from '../types';
import { getImageUrl } from '../utils/helpers';

export default function DokumentasiSection({ galleryData, onNavigateToDetail }: { galleryData: GalleryItem[], onNavigateToDetail?: (id: number) => void }) {
  const [activeCategory, setActiveCategory] = React.useState('Semua');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibleCount, setVisibleCount] = React.useState(6);

  const categories = ['Semua', 'Nasional', 'Daerah', 'Sosial', 'Kegiatan Kader', 'Umum'];

  const filteredData = Array.isArray(galleryData) 
    ? galleryData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const itemCat = item.kategori || 'Umum';
        const matchesCategory = activeCategory === 'Semua' || itemCat === activeCategory;
        
        return matchesSearch && matchesCategory;
      })
    : [];

  const visibleData = filteredData.slice(0, visibleCount);
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black mb-6">Dokumentasi Kegiatan</h1>
            <p className="text-lg text-stone-600 mb-8">
              Galeri foto dan video berbagai aktivitas partai di seluruh penjuru tanah air.
            </p>
            
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Cari dokumentasi..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-stone-100 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all text-stone-700 bg-white shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-brand text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleData.length > 0 ? visibleData.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout
                whileHover={{ y: -5 }}
                onClick={() => onNavigateToDetail && onNavigateToDetail(item.id)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-stone-100"
              >
                <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-8">
                  <div>
                    <span className="bg-brand text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3">{item.kategori || 'Umum'}</span>
                    <h3 className="text-white font-bold text-sm md:text-xl mb-1 md:mb-2 leading-tight line-clamp-2">{item.title}</h3>
                    <p className="text-white/70 text-sm font-bold">Lihat Detail Foto</p>
                  </div>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 px-8 text-center bg-white rounded-3xl border border-stone-100 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-400 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Dokumentasi Tidak Ditemukan</h3>
                <p className="text-stone-500">
                  Tidak ada dokumentasi yang cocok dengan {searchQuery ? `pencarian "${searchQuery}" pada kategori "${activeCategory}"` : `kategori "${activeCategory}"`}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {filteredData.length > visibleCount && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="border-2 border-stone-200 text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition-all"
            >
              Muat Lebih Banyak ({filteredData.length - visibleCount} tersisa)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
