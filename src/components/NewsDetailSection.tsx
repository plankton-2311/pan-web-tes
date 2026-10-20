import React, { useState } from 'react';
import { X, Facebook, Twitter, Mail } from 'lucide-react';
import { NewsItem } from '../types';
import { getImageUrl, formatDate } from '../utils/helpers';

export default function NewsDetailSection({ newsId, onBack, newsData, isLoading }: { newsId: string | null, onBack: () => void, newsData: NewsItem[], isLoading: boolean }) {
  const news = Array.isArray(newsData) ? newsData.find(n => String(n.id) === String(newsId)) : null;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#news/${newsId}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!news) {
    if (isLoading) {
      return (
        <div className="pt-40 pb-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-500 font-medium">Memuat berita...</p>
        </div>
      );
    }
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-2xl font-bold">Berita tidak ditemukan</h2>
        <button onClick={onBack} className="mt-4 text-brand font-bold underline">Kembali ke Berita</button>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-brand transition-colors mb-8 font-bold"
        >
          <X size={20} /> Kembali ke Berita
        </button>

        <img
          src={getImageUrl(news.image)}
          alt={news.title}
          className="w-full h-[400px] object-cover rounded-none mb-12 shadow-xl"
        />

        <div className="mb-8">
          <span className="inline-block bg-brand-light text-brand text-xs font-bold px-3 py-1 rounded mb-4 tracking-widest uppercase">
            {formatDate(news.date)}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            {news.title}
          </h1>
        </div>

        <div
          className="news-content-html text-lg text-stone-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: news.content || news.excerpt || "Tidak ada konten untuk berita ini." }}
        />

        <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
          <div className="flex gap-4">
            <Facebook size={20} className="text-stone-400 hover:text-brand cursor-pointer transition-colors" />
            <Twitter size={20} className="text-stone-400 hover:text-brand cursor-pointer transition-colors" />
            <Mail size={20} className="text-stone-400 hover:text-brand cursor-pointer transition-colors" />
          </div>
          <button
            onClick={handleCopyLink}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {isCopied ? 'Tersalin!' : 'Salin Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
