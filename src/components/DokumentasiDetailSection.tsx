import React from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '../types';
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';

interface DokumentasiDetailSectionProps {
  galleryId: number;
  galleryData: GalleryItem[];
  onBack: () => void;
}

export default function DokumentasiDetailSection({ galleryId, galleryData, onBack }: DokumentasiDetailSectionProps) {
  const item = galleryData.find((g) => String(g.id) === String(galleryId));

  if (!item) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Dokumentasi Tidak Ditemukan</h2>
        <button onClick={onBack} className="text-brand font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Kembali ke Galeri
        </button>
      </div>
    );
  }
  
  // Combine all available images into an array
  const allImages = [item.image];
  if (item.image2) allImages.push(item.image2);
  if (item.image3) allImages.push(item.image3);
  if (item.image4) allImages.push(item.image4);
  if (item.image5) allImages.push(item.image5);

  return (
    <div className="pt-12 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-brand transition-colors font-bold mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Dokumentasi
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <span className="bg-brand/10 text-brand px-4 py-1.5 rounded-full font-bold text-sm">
              {item.kategori || 'Umum'}
            </span>
            <span className="flex items-center gap-2 text-stone-500 text-sm font-medium">
              <ImageIcon size={16} /> {allImages.length} Foto
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-stone-900 mb-12 leading-tight">
            {item.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allImages.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden aspect-video ${index === 0 && allImages.length % 2 !== 0 ? 'md:col-span-2' : ''}`}
              >
                <img 
                  src={getImageUrl(img)} 
                  alt={`${item.title} - Foto ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
