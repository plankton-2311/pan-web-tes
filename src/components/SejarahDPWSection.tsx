import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Target, Flag, ChevronRight } from 'lucide-react';
import { TeamMember } from '../types';
import { getImageUrl } from '../utils/helpers';
import { NumberTicker } from './ui/CommonComponents';

export default function SejarahDPWSection({ teamData }: { teamData: TeamMember[] }) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTesti, setActiveTesti] = useState(0);
  const [activeMisi, setActiveMisi] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 192; // Actual frames available in gifpan/

  const chairman = teamData.find(t =>
    t.jabatan?.toLowerCase().includes("ketua")
  );
  const secretary = teamData.find(t =>
    t.jabatan?.toLowerCase().includes("sekretaris")
  );
  const testimonials = [
    {
      text: "Matahari baru telah terbit di NTT. Kami berkomitmen untuk membawa perubahan nyata melalui pengabdian tulus bagi seluruh masyarakat.",
      name: chairman?.nama || "Ketua DPW PAN NTT",
      role: chairman?.jabatan || "Ketua DPW PAN NTT",
      image: getImageUrl(chairman?.image || "")
    },
    {
      text: "Berkomitmen untuk membawa perubahan nyata melalui pengabdian tulus bagi seluruh masyarakat.aasasasasasasasasasaadda adadadada ada dada",
      name: secretary?.nama || "Sekretaris DPW PAN NTT",
      role: secretary?.jabatan || "Sekretaris DPW PAN NTT",
      image: getImageUrl(secretary?.image || "")
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeTesti) {
        setActiveTesti(index);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTesti]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeTesti + 1) % testimonials.length;
      scrollToTesti(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeTesti, testimonials.length]);

  const scrollToTesti = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: 'smooth'
    });
  };

  // Preload images with Awwwards-style progress
  useEffect(() => {
    let loadedCount = 0;
    const loadImages = async () => {
      const promises = Array.from({ length: frameCount }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, '0');
          img.src = `/gifpan/ezgif-frame-${frameNum}.jpg`;
          img.onload = () => {
            imagesRef.current[i] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${frameNum}`);
            resolve();
          };
        });
      });
      try {
        await Promise.all(promises);
        setTimeout(() => setImagesPreloaded(true), 1000); // Small buffer for smoothness
      } catch (err) {
        setImagesPreloaded(true);
      }
    };
    loadImages();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Update canvas with adaptive professional scaling
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const index = Math.min(frameCount - 1, Math.max(0, Math.floor(latest)));
    const img = imagesRef.current[index];
    if (img && img.complete) {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;

      // Adaptive scaling: use cover (max) for desktop/landscape, 
      // but a more balanced approach for mobile portrait to avoid cutting off side content.
      const isPortrait = canvas.height > canvas.width;
      const ratio = isPortrait ? Math.min(hRatio, vRatio) * 1.2 : Math.max(hRatio, vRatio);

      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);
    }
  });

  // Handle Resize with High DPI and Adaptive Scaling Support
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set physical resolution
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Set logical display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (imagesRef.current && imagesRef.current.length > 0) {
        const latest = frameIndex.get();
        const index = Math.min(frameCount - 1, Math.max(0, Math.floor(latest)));
        const img = imagesRef.current[index] || imagesRef.current[0];
        const ctx = canvas.getContext('2d');
        if (ctx && img && img.complete) {
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;

          const isPortrait = canvas.height > canvas.width;
          const ratio = isPortrait ? Math.min(hRatio, vRatio) * 1.2 : Math.max(hRatio, vRatio);

          const w = img.width * ratio;
          const h = img.height * ratio;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);
        }
      }
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, [imagesPreloaded, frameIndex]);

  // Refined Opacity Transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const text4Opacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);
  const text4Y = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  return (
    <div className="bg-brand lg:bg-[#ececec] text-stone-900 font-sans selection:bg-brand selection:text-white p-0 m-0">
      {/* Premium Preloader Overlay */}
      <AnimatePresence>
        {!imagesPreloaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="h-screen w-full flex items-center justify-center bg-[#ececec] lg:bg-[#ececec] fixed inset-0 z-[100]"
          >
            <div className="text-center w-full max-w-4xl px-8">
              <motion.div
                className="text-[15vw] md:text-[10vw] font-black text-brand mb-4 tracking-tighter leading-none"
              >
                {loadingProgress}%
              </motion.div>
              <div className="w-full h-[2px] bg-stone-300 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-brand"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-[0.3em] text-stone-500">
                <span>Loading Experience</span>
                <span>Est. 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Scrollytelling Canvas Section */}
      <div ref={containerRef} className="h-[400vh] relative w-full bg-brand lg:bg-[#ececec]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-10 pointer-events-none">
            <motion.div
              style={{ opacity: text1Opacity, scale: text1Scale }}
              className="h-full w-full flex flex-col items-center justify-center p-8 text-center"
            >
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
                PROFIL<br /><span className="text-white">DPW PAN NTT</span>
              </h1>
              <p className="max-w-xl text-white/60 text-lg md:text-xl font-medium">
                Melangkah bersama rakyat, membangun Nusa Tenggara Timur dengan semangat matahari pembaruan.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: text4Opacity, y: text4Y }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              <div className="h-20 w-[1px] bg-brand mb-8 animate-bounce" />
              <p className="text-white font-bold tracking-[0.3em] uppercase">Scroll ke Bawah</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Merged Content with Overlapping Effect */}
      <div className="-mt-[100vh] relative z-30 bg-white rounded-t-[4rem] md:rounded-t-[8rem] overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        {/* Message from Chairman */}

        <section className="py-24 px-8 md:px-20 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Sejarah Perjalanan</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              { year: "1998", text: "Dideklarasikan pada tanggal 23 Agustus 1998 pasca reformasi oleh Amien Rais bersama para tokoh nasional di Jakarta sebagai wadah politik yang inklusif." },
              { year: "1999", text: "Mengikuti Pemilihan Umum pertama di era reformasi, berhasil mencuri perhatian publik dan meraih 34 kursi di Dewan Perwakilan Rakyat (DPR) RI." },
              { year: "2004", text: "Memperkuat eksistensinya dalam perpolitikan nasional dengan mengusung Amien Rais sebagai calon presiden, serta mencatatkan perolehan 53 kursi di DPR RI." },
              { year: "2014", text: "Terus berperan aktif dalam penyelenggaraan negara. Hatta Rajasa selaku Ketua Umum (2010-2015) maju sebagai Calon Wakil Presiden Republik Indonesia." },
              { year: "2024", text: "Di bawah kepemimpinan Zulkifli Hasan, PAN berhasil mengawal agenda pembangunan nasional dan konsisten mempertahankan kursi di parlemen pusat." },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="text-2xl font-black text-brand w-24 shrink-0">{item.year}</div>
                <div className="pt-1 border-l-2 border-stone-100 pl-8 pb-4 text-stone-600">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Visi & Misi Container */}
        <div className="container mx-auto max-w-7xl">
          <section className="py-24 px-8 md:px-20 bg-stone-50 rounded-[3rem] mx-4 md:mx-0">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-black mb-6">Visi & Misi</h2>
              <p className="text-lg text-stone-600">
                Landasan ideologi dan arah perjuangan kami demi memajukan bangsa dan negara.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-12 mb-24">
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-brand text-white p-4 md:p-12 rounded-3xl shadow-xl shadow-brand-light/30 transition-shadow hover:shadow-2xl hover:shadow-brand/20 relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500" />
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 flex items-center gap-2 md:gap-4 relative z-10">
                  <Target size={24} className="md:w-8 md:h-8" /> Visi
                </h3>
                <p className="text-xs md:text-2xl font-medium leading-relaxed italic relative z-10">
                  "Menjadi partai terdepan dalam mewujudkan masyarakat madani dan membangun pemerintahan yang bersih, serta negara yang berdaulat, diridhai oleh Allah SWT, Tuhan Yang Maha Esa."
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white p-4 md:p-12 rounded-3xl shadow-sm border border-stone-100 transition-shadow hover:shadow-xl group"
              >
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-stone-900 flex items-center gap-2 md:gap-4">
                  <Flag size={24} className="text-brand md:w-8 md:h-8" /> Misi
                </h3>
                <div className="space-y-2 md:space-y-4">
                  {[
                    "Memenangkan PAN dalam setiap Pemilu.",
                    "Mewujudkan kader cerdas, ikhlas, dan profesional.",
                    "Membela kepentingan rakyat dan dekat dengan mereka.",
                    "Membangun organisasi modern dan mengakar.",
                    "Mewujudkan masyarakat yang adil, makmur, dan mandiri.",
                    "Mewujudkan tata pemerintahan yang baik dan bersih.",
                    "Negara bersatu, berdaulat, bermartabat, dan berkeadilan."
                  ].map((misi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex gap-2 items-start"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand mt-1.5 shrink-0" />
                      <p className="text-[9px] md:text-base text-stone-600 leading-tight">{misi}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="text-center mb-20">
              <h3 className="text-2xl font-bold mb-12">Platform Perjuangan Utama PAN</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                {[
                  { title: "Demokrasi dan Kedaulatan Rakyat", desc: "Menjunjung tinggi hukum, menolak totaliterisme/kediktatoran, serta mewujudkan masyarakat madani yang aktif mengawasi kekuasaan." },
                  { title: "Keadilan Sosial dan Kemajemukan", desc: "Memperjuangkan persamaan hak, anti-diskriminasi, dan melindungi kemajemukan di Indonesia.." },
                  { title: "Ekonomi Produktif dan Daya Saing", desc: "Meningkatkan produktivitas nasional dan memperkuat posisi bangsa dalam persaingan global." },
                  { title: "Lingkungan Hidup", desc: "Berkomitmen melindungi lingkungan sebagai warisan untuk generasi mendatang." },
                  { title: "Keterbukaan dan Modernisasi", desc: "Menerapkan manajemen partai yang transparan, profesional, dan terbuka bagi seluruh elemen masyarakat." },
                  { title: "Partisipasi Rakyat", desc: " Menjadikan partai sebagai wadah perjuangan rakyat yang inklusif dan partisipatif." }
                ].map((val, i) => (
                  <div key={i} className="p-8 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-brand transition-colors">
                    <h4 className="text-xl font-bold mb-4 text-brand">{val.title}</h4>
                    <p className="text-stone-600 text-sm">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* History Timeline Container */}
        <div className="container mx-auto max-w-7xl py-24">

          <section className="px-4 md:px-20">
            <div className="grid grid-cols-2 gap-4 md:gap-16 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl md:shadow-2xl aspect-[4/5]">
                <img src={getImageUrl(chairman?.image || "https://picsum.photos/seed/leader/800/1000")} alt={chairman?.nama || "Ketua DPW PAN NTT"} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-sm md:text-3xl font-bold mb-2 md:mb-8"> Pesan Ketua DPW</h2>
                <div className="space-y-2 md:space-y-6 text-stone-600 leading-relaxed italic text-[10px] md:text-lg">
                  <p>"Politik bagi kami bukan sekadar perebutan kekuasaan, melainkan jalan pengabdian untuk memastikan setiap anak bangsa memiliki kesempatan yang sama untuk maju dan sejahtera."</p>
                  <p className="hidden md:block">"Di DPW PAN NTT, kami mengutamakan integritas, kerja keras, dan keberpihakan pada rakyat kecil. Kami percaya bahwa dengan gotong royong, tidak ada tantangan yang terlalu besar untuk kita hadapi."</p>
                </div>
                <div className="mt-4 md:mt-8">
                  <p className="font-bold text-xs md:text-xl text-stone-900">{chairman?.nama || "Ir. H. Ahmad Pratama"}</p>
                  <p className="text-brand text-[8px] md:text-lg font-medium">{chairman?.jabatan || "Ketua DPW PAN NTT"}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Grid, Stats, and Testimony Section */}
      <div className="relative z-20 bg-[#ececec] overflow-hidden">
        {/* Bento Grid */}

        {/* Fullscreen Slider */}
        {/* <section className="min-h-screen bg-white py-32 flex flex-col justify-center relative px-8 overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-brand rounded-full blur-[10vw] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-brand rounded-full blur-[10vw] opacity-20 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <span className="text-brand font-bold uppercase tracking-[0.5em] text-sm mb-16 block">Trust & Testimony</span>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((testi, i) => (
                <div key={i} className="min-w-full snap-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <blockquote className="text-4xl md:text-7xl font-bold text-brand tracking-tight leading-[1.1] mb-20 italic">
                      "{testi.text}"
                    </blockquote>

                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-brand relative group">
                        <img
                          src={testi.image}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={testi.name}
                        />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">{testi.name}</h4>
                        <p className="text-brand font-medium">{testi.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-16">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToTesti(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${activeTesti === i ? 'w-12 bg-brand' : 'w-4 bg-brand/20'}`}
                />
              ))}
            </div>
          </div>
        </section>*/}
      </div>
    </div>
  );
}
