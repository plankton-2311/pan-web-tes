import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronRight, Heart, Users, Shield, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { NewsItem, Section, GalleryItem, AgendaItem, StatItem } from '../types';
import { CAROUSEL_DATA } from '../utils/constants';
import { getImageUrl, formatDate } from '../utils/helpers';

// A simple counting animation component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number | string, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      const endNum = Number(end) || 0;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(endNum * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(endNum);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomeSection({ 
  onNavigate, 
  onNewsClick, 
  newsData, 
  galleryData = [],
  agendaData = [],
  statsData = []
}: { 
  onNavigate: (s: Section) => void, 
  onNewsClick: (id: number | string) => void, 
  newsData: NewsItem[],
  galleryData?: GalleryItem[],
  agendaData?: AgendaItem[],
  statsData?: StatItem[]
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-white">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 z-0"
          >
            <img
              src={CAROUSEL_DATA[currentSlide].image}
              alt="Hero Background"
              className="w-full h-full object-contain md:object-fill"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {CAROUSEL_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === i ? 'w-8 bg-brand' : 'w-2 bg-white/40'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Visi, Misi & Nilai Inti */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xl md:text-3xl font-black mb-4">Membangun NTT yang Mandiri & Bermartabat</h2>
            <p className="text-stone-600 text-sm md:text-lg">Platform perjuangan Partai Amanat Nasional berpijak pada nilai-nilai keadilan, kepedulian sosial, dan pemberdayaan masyarakat.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-stone-50 p-3 md:p-8 rounded-2xl md:rounded-3xl border border-stone-100 text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6">
                <Shield className="text-brand w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="font-bold text-[10px] md:text-xl mb-1 md:mb-3 leading-tight">Integritas & Keadilan</h3>
              <p className="text-stone-500 text-[8px] md:text-base leading-relaxed">Berkomitmen pada pemerintahan yang bersih.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-stone-50 p-3 md:p-8 rounded-2xl md:rounded-3xl border border-stone-100 text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6">
                <Users className="text-brand w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="font-bold text-[10px] md:text-xl mb-1 md:mb-3 leading-tight">Inklusif & Tiga Pilar</h3>
              <p className="text-stone-500 text-[8px] md:text-base leading-relaxed">Merangkul semua elemen masyarakat.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-stone-50 p-3 md:p-8 rounded-2xl md:rounded-3xl border border-stone-100 text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6">
                <Heart className="text-brand w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="font-bold text-[10px] md:text-xl mb-1 md:mb-3 leading-tight">Ekonomi Kerakyatan</h3>
              <p className="text-stone-500 text-[8px] md:text-base leading-relaxed">Mendorong kemandirian ekonomi daerah.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Angka Fakta & Agenda Mendatang Split Section */}
      <section className="py-20 bg-brand text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Stats */}
            <div>
               <h2 className="text-3xl font-black mb-8">Kekuatan Partai Menyapa Rakyat</h2>
               <div className="grid grid-cols-2 gap-8">
                  {statsData.map((stat) => (
                    <div key={stat.id}>
                      <div className="text-5xl font-black mb-2 text-brand-light">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-white/80 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Agenda */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-3"><Calendar className="text-brand-light" /> Agenda Terdekat</h3>
              </div>
              <div className="space-y-4">
                {agendaData.slice(0, 2).map((event) => (
                  <div key={event.id} className="bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-2xl flex items-center justify-between group cursor-pointer">
                    <div>
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-brand-light">
                        <span className="flex items-center gap-1 opacity-90"><Calendar size={14} /> {formatDate(event.date)}</span>
                        <span className="flex items-center gap-1 opacity-90"><MapPin size={14} /> {event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {agendaData.length === 0 && (
                  <p className="text-white/50 text-sm text-center py-4">Belum ada agenda terdekat.</p>
                )}
              </div>
              <button onClick={() => onNavigate('agenda')} className="w-full mt-6 py-4 rounded-xl border border-white/30 font-bold hover:bg-white/10 transition-all text-white">
                Lihat Seluruh Kalender
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Featured News Preview */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Berita Terkini</h2>
              <p className="text-stone-500">Ikuti perkembangan terbaru kegiatan dan kebijakan partai.</p>
            </div>
            <button
              onClick={() => onNavigate('berita')}
              className="text-brand font-bold flex items-center gap-2 hover:underline"
            >
              Lihat Semua Berita <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {Array.isArray(newsData) && newsData.slice(0, typeof window !== 'undefined' && window.innerWidth < 1024 ? 4 : 3).map((news) => (
              <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-stone-100 flex flex-col">
                <div className="h-32 md:h-48 overflow-hidden">
                  <img src={getImageUrl(news.image)} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <span className="text-[10px] md:text-xs font-bold text-brand mb-1 md:mb-2 block uppercase tracking-wider">{formatDate(news.date)}</span>
                  <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 group-hover:text-brand transition-colors h-10 md:h-14">{news.title}</h3>
                  <p className="text-stone-500 text-sm mb-6 line-clamp-3 hidden md:block">{news.excerpt}</p>
                  <div className="mt-auto">
                    <button
                      onClick={() => onNewsClick(news.id)}
                      className="text-stone-400 text-xs md:text-sm flex items-center gap-2 group/btn"
                    >
                      Baca Selengkapnya <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      {(galleryData && galleryData.length > 0) && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black mb-4">Momen Kebersamaan</h2>
                <p className="text-stone-600">Jejak langkah nyata dalam mengabdi kepada nusa dan bangsa.</p>
              </div>
              <button
                onClick={() => onNavigate('dokumentasi')}
                className="text-stone-900 font-bold flex items-center gap-2 hover:text-brand transition-colors border-b-2 border-stone-900 hover:border-brand pb-1"
              >
                Jelajahi Galeri
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {galleryData.slice(0, 4).map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ y: -5 }}
                  className={`relative rounded-3xl overflow-hidden shadow-sm group cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2 aspect-[4/3] md:aspect-[16/9]' : 'aspect-square md:aspect-[4/3]'}`}
                  onClick={() => onNavigate('dokumentasi')}
                >
                  <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA 
      <section className="py-32 bg-stone-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/1.png')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Mari Wujudkan NTT Lebih Baik bersama PAN</h2>
          <p className="text-xl text-stone-300 mb-10 leading-relaxed">Bergabunglah dengan gerakan pembaruan. Suara Anda berharga untuk menentukan arah pembangunan Nusa Tenggara Timur di masa depan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-brand/20 hover:bg-brand-light transition-all text-lg">
              Daftar Jadi Kader
            </button>
            <button className="bg-stone-800 border border-stone-700 text-white font-bold py-4 px-8 rounded-full hover:bg-stone-700 transition-all text-lg flex items-center justify-center gap-2">
              <Users size={20} /> Relawan Pemenangan
            </button>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
