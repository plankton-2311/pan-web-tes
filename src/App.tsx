/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import {
  Home,
  User,
  Target,
  Image as ImageIcon,
  Newspaper,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Search,
} from "lucide-react";
import {
  Section,
  NewsItem,
  GalleryItem,
  TeamMember,
  AgendaItem,
  StatItem,
} from "./types";
import Lenis from "lenis";
import HomeSection from "./components/HomeSection";
import SejarahDPWSection from "./components/SejarahDPWSection";
import PengurusDPWSection from "./components/PengurusDPWSection";
import DokumentasiSection from "./components/DokumentasiSection";
import BeritaSection from "./components/BeritaSection";
import NewsDetailSection from "./components/NewsDetailSection";
import AgendaSection from "./components/AgendaSection";
import DokumentasiDetailSection from "./components/DokumentasiDetailSection";
import { NewsletterForm } from "./components/ui/NewsletterForm";

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 1,
    jabatan: "Ketua",
    nama: "Ir. H. Ahmad Pratama",
    image: "https://picsum.photos/seed/leader1/400/400",
  },
  {
    id: 2,
    jabatan: "Sekretaris",
    nama: "Drs. Maria G. Sose",
    image: "https://picsum.photos/seed/leader2/400/400",
  },
  {
    id: 3,
    jabatan: "Bendahara",
    nama: "Budi Santoso, S.E.",
    image: "https://picsum.photos/seed/leader3/400/400",
  },
  {
    id: 4,
    jabatan: "Wakil Ketua I",
    nama: "Yohanes L. Keraf",
    image: "https://picsum.photos/seed/leader4/400/400",
  },
  {
    id: 5,
    jabatan: "Wakil Ketua II",
    nama: "Siti Aminah, M.Si.",
    image: "https://picsum.photos/seed/leader5/400/400",
  },
  {
    id: 6,
    jabatan: "Wakil Sekretaris",
    nama: "Antonius R. Bala",
    image: "https://picsum.photos/seed/leader6/400/400",
  },
];

const CAROUSEL_DATA = [
  {
    id: 1,
    image: "/1.png",
    title: "Bersatu Untuk Indonesia Lebih Baik",
    subtitle: "Membangun Masa Depan",
    description:
      "Kami hadir sebagai wadah aspirasi rakyat untuk mewujudkan keadilan sosial bagi seluruh bangsa Indonesia.",
  },
  {
    id: 2,
    image: "/2.png",
    title: "Matahari Bersinar Untuk Semua",
    subtitle: "Inklusif & Modern",
    description:
      "DPW PAN NTT berkomitmen untuk merangkul seluruh lapisan masyarakat tanpa memandang perbedaan.",
  },
  {
    id: 3,
    image: "/3.png",
    title: "Kedaulatan Pangan & Ekonomi",
    subtitle: "Program Strategis",
    description:
      "Fokus pada pemberdayaan petani, nelayan, dan pelaku UMKM di seluruh wilayah Nusa Tenggara Timur.",
  },
  {
    id: 4,
    image: "/4.png",
    title: "Pendidikan & Kesehatan Berkualitas",
    subtitle: "Program Unggulan",
    description:
      "Lebih dari sekadar partai politik, kami adalah gerakan perubahan untuk masa depan yang lebih cerah bagi Nusa Tenggara Timur.",
  },
];

const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: 1,
    title: "Rapimwil DPW PAN NTT",
    date: "2026-03-24",
    location: "Kupang",
  },
  {
    id: 2,
    title: "Baksos Kesehatan Massal",
    date: "2026-04-02",
    location: "Timor Tengah Selatan",
  },
];

const INITIAL_STATS: StatItem[] = [
  {
    id: 1,
    key_name: "dpd_aktif",
    label: "DPD Kab/Kota Aktif",
    value: 22,
    suffix: "",
  },
  {
    id: 2,
    key_name: "dpc_kecamatan",
    label: "DPC Tingkat Kecamatan",
    value: 314,
    suffix: "",
  },
  {
    id: 3,
    key_name: "kader_aktif",
    label: "Kader Terverifikasi",
    value: 45,
    suffix: "K+",
  },
  {
    id: 4,
    key_name: "peningkatan_suara",
    label: "Peningkatan Suara",
    value: 12,
    suffix: "%",
  },
];

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Konsolidasi Kader PAN NTT Menjelang Pemilu 2024",
    date: "10 Maret 2026",
    excerpt:
      "DPW PAN NTT menggelar rapat konsolidasi besar-besaran untuk memantapkan strategi pemenangan.",
    content:
      "Kupang - Dewan Pimpinan Wilayah (DPW) Partai Amanat Nasional (PAN) Nusa Tenggara Timur menggelar rapat konsolidasi yang dihadiri oleh seluruh pengurus DPD dari 22 Kabupaten/Kota. Rapat ini bertujuan untuk menyatukan visi dan misi dalam menghadapi kontestasi politik mendatang.\n\nKetua DPW PAN NTT menegaskan pentingnya kerja keras dan turun langsung ke masyarakat untuk mendengar aspirasi mereka.",
    image: "https://picsum.photos/seed/news1/800/600",
  },
  {
    id: 2,
    title: "Program Pemberdayaan UMKM Pesisir Diluncurkan",
    date: "08 Maret 2026",
    excerpt:
      "PAN NTT meluncurkan inisiatif baru untuk membantu pelaku usaha kecil di wilayah pesisir.",
    content:
      'Maumere - Sebagai bentuk kepedulian terhadap ekonomi kerakyatan, PAN NTT meluncurkan program pendampingan UMKM bagi masyarakat pesisir. Program ini mencakup pelatihan pengolahan hasil laut dan akses permodalan.\n\n"Kami ingin memastikan ekonomi masyarakat kecil tetap tumbuh di tengah tantangan global," ujar salah satu fungsionaris partai.',
    image: "https://picsum.photos/seed/news2/800/600",
  },
  {
    id: 3,
    title: "Bantuan Sosial untuk Korban Bencana di Adonara",
    date: "05 Maret 2026",
    excerpt:
      "Tim relawan PAN NTT bergerak cepat menyalurkan bantuan logistik kepada warga terdampak.",
    content:
      "Adonara - Respon cepat ditunjukkan oleh tim relawan PAN NTT dalam membantu warga yang terdampak bencana alam di Adonara. Bantuan berupa bahan makanan, pakaian, dan obat-obatan disalurkan langsung ke posko pengungsian.\n\nIni merupakan wujud nyata dari nilai gotong royong yang selalu dijunjung tinggi oleh partai.",
    image: "https://picsum.photos/seed/news3/800/600",
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "Rapat Kerja Wilayah",
    image: "https://picsum.photos/seed/gal1/800/600",
  },
  {
    id: 2,
    title: "Kunjungan ke Pasar Tradisional",
    image: "https://picsum.photos/seed/gal2/800/600",
  },
  {
    id: 3,
    title: "Pelatihan Kepemimpinan Muda",
    image: "https://picsum.photos/seed/gal3/800/600",
  },
  {
    id: 4,
    title: "Baksos Kesehatan Gratis",
    image: "https://picsum.photos/seed/gal4/800/600",
  },
  {
    id: 5,
    title: "Deklarasi Dukungan Rakyat",
    image: "https://picsum.photos/seed/gal5/800/600",
  },
  {
    id: 6,
    title: "Diskusi Publik Ekonomi NTT",
    image: "https://picsum.photos/seed/gal6/800/600",
  },
];

const getImageUrl = (path: string) => {
  if (!path) return "https://picsum.photos/seed/placeholder/800/600";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  // Sesuaikan dengan folder di Hostinger
  return `https://panwebtes.katongpung.com/public/uploads/${path}`;
};
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export default function App() {
  // Load initial state from localStorage if available
  // Load initial state from hash or localStorage
  const sectionMap: Record<string, Section> = {
    beranda: "home",
    profil: "profil",
    "sejarah-dpw": "sejarah-dpw",
    "pengurus-dpw": "pengurus-dpw",
    dokumentasi: "dokumentasi",
    berita: "berita",
    agenda: "agenda",
  };

  const [activeSection, setActiveSection] = useState<Section>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("news/")) return "news-detail";
    if (hash.startsWith("dokumentasi/")) return "dokumentasi-detail";
    const section = sectionMap[hash];
    if (section) return section;
    return (localStorage.getItem("pan_active_section") as Section) || "home";
  });

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("news/")) return hash.split("/")[1];
    return localStorage.getItem("pan_selected_news_id");
  });

  const [selectedGalleryId, setSelectedGalleryId] = useState<number | null>(
    () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("dokumentasi/")) return Number(hash.split("/")[1]);
      const stored = localStorage.getItem("pan_selected_gallery_id");
      return stored ? Number(stored) : null;
    },
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const [newsData, setNewsData] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem("pan_news_data");
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch (e) {
      return INITIAL_NEWS;
    }
  });

  const [isLoading, setIsLoading] = useState(() => {
    try {
      const savedNews = localStorage.getItem("pan_news_data");
      const savedId = localStorage.getItem("pan_selected_news_id");
      const savedSection = localStorage.getItem("pan_active_section");

      // Jika sedang baca detail berita, pastikan beritanya ada di cache
      if (savedSection === "news-detail" && savedId && savedNews) {
        const news = JSON.parse(savedNews).find(
          (n: any) => String(n.id) === String(savedId),
        );
        if (!news) return true; // Berita tidak ada di cache, harus loading
      }
      return !savedNews;
    } catch (e) {
      return true;
    }
  });

  const [galleryData, setGalleryData] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem("pan_gallery_data");
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch (e) {
      return INITIAL_GALLERY;
    }
  });

  const [teamData, setTeamData] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem("pan_team_data");
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch (e) {
      return INITIAL_TEAM;
    }
  });

  const [agendaData, setAgendaData] = useState<AgendaItem[]>(() => {
    try {
      const saved = localStorage.getItem("pan_agenda_data");
      return saved ? JSON.parse(saved) : INITIAL_AGENDA;
    } catch (e) {
      return INITIAL_AGENDA;
    }
  });

  const [statsData, setStatsData] = useState<StatItem[]>(() => {
    try {
      const saved = localStorage.getItem("pan_stats_data");
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch (e) {
      return INITIAL_STATS;
    }
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Fetch data from local API (MySQL)
    const fetchData = async () => {
      const API_BASE = "https://panwebtes.katongpung.com/api.php";

      const savedId = localStorage.getItem("pan_selected_news_id");
      const savedSection = localStorage.getItem("pan_active_section");
      const isNewsMissing =
        savedSection === "news-detail" &&
        savedId &&
        !newsData.find((n) => String(n.id) === String(savedId));

      // Hanya set loading jika data saat ini kosong, masih data awal, atau berita yang dicari tidak ada
      if (newsData.length === 0 || newsData === INITIAL_NEWS || isNewsMissing) {
        setIsLoading(true);
      }

      try {
        // Fetch Berita
        fetch(`${API_BASE}?resource=berita`)
          .then((res) =>
            res.ok ? res.json() : Promise.reject("Gagal load berita"),
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setNewsData((prev) => {
                // Gabungkan data lama dan baru berdasarkan ID agar tidak ada yang hilang
                const combined = [...data];
                prev.forEach((oldItem) => {
                  if (
                    !combined.find(
                      (newItem) => String(newItem.id) === String(oldItem.id),
                    )
                  ) {
                    combined.push(oldItem);
                  }
                });
                localStorage.setItem("pan_news_data", JSON.stringify(combined));
                return combined;
              });
            }
          })
          .catch((err) => console.warn("Berita: Menggunakan data lokal"))
          .finally(() => setIsLoading(false));

        // Fetch Dokumentasi
        fetch(`${API_BASE}?resource=dokumentasi`)
          .then((res) =>
            res.ok ? res.json() : Promise.reject("Gagal load dokumentasi"),
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setGalleryData(data);
              localStorage.setItem("pan_gallery_data", JSON.stringify(data));
            }
          })
          .catch((err) => console.warn("Dokumentasi: Menggunakan data lokal"));

        // Fetch Pengurus
        fetch(`${API_BASE}?resource=pengurus`)
          .then((res) =>
            res.ok ? res.json() : Promise.reject("Gagal load pengurus"),
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setTeamData(data);
              localStorage.setItem("pan_team_data", JSON.stringify(data));
            }
          })
          .catch((err) => console.warn("Pengurus: Menggunakan data lokal"));

        // Fetch Agenda
        fetch(`${API_BASE}?resource=agenda`)
          .then((res) =>
            res.ok ? res.json() : Promise.reject("Gagal load agenda"),
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setAgendaData(data);
              localStorage.setItem("pan_agenda_data", JSON.stringify(data));
            }
          })
          .catch((err) => console.warn("Agenda: Menggunakan data lokal"));

        // Fetch Statistik
        fetch(`${API_BASE}?resource=statistik`)
          .then((res) =>
            res.ok ? res.json() : Promise.reject("Gagal load statistik"),
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setStatsData(data);
              localStorage.setItem("pan_stats_data", JSON.stringify(data));
            }
          })
          .catch((err) => console.warn("Statistik: Menggunakan data lokal"));
      } catch (error) {
        console.error("Koneksi ke API PHP gagal.");
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  // Persist state to localStorage whenever it changes
  // Sync hash with state
  useEffect(() => {
    if (activeSection === "news-detail" && selectedNewsId) {
      window.location.hash = `news/${selectedNewsId}`;
    } else if (
      activeSection === "dokumentasi-detail" &&
      selectedGalleryId !== null
    ) {
      window.location.hash = `dokumentasi/${selectedGalleryId}`;
    } else {
      const hash = Object.keys(sectionMap).find(
        (key) => sectionMap[key] === activeSection,
      );
      if (hash) window.location.hash = hash;
      else window.location.hash = ""; // Clear hash if not a known section
    }
    localStorage.setItem("pan_active_section", activeSection); // Still persist for direct access
  }, [activeSection, selectedNewsId, selectedGalleryId]);

  // Listen for hash changes (back button/manual entry)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("news/")) {
        const id = hash.split("/")[1];
        setSelectedNewsId(id);
        setActiveSection("news-detail");
      } else if (hash.startsWith("dokumentasi/")) {
        const id = Number(hash.split("/")[1]);
        setSelectedGalleryId(id);
        setActiveSection("dokumentasi-detail");
      } else {
        const section = sectionMap[hash];
        if (section) {
          setActiveSection(section);
          setSelectedNewsId(null);
          setSelectedGalleryId(null);
        } else {
          // If hash is unknown or empty, default to home
          setActiveSection("home");
          setSelectedNewsId(null);
          setSelectedGalleryId(null);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (selectedNewsId !== null) {
      localStorage.setItem("pan_selected_news_id", selectedNewsId);
    } else {
      localStorage.removeItem("pan_selected_news_id");
    }
  }, [selectedNewsId]);

  useEffect(() => {
    if (selectedGalleryId !== null) {
      localStorage.setItem(
        "pan_selected_gallery_id",
        String(selectedGalleryId),
      );
    } else {
      localStorage.removeItem("pan_selected_gallery_id");
    }
  }, [selectedGalleryId]);

  const handleNewsClick = (id: number | string) => {
    setSelectedNewsId(String(id));
    setActiveSection("news-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    const targetSection = sectionMap[targetId];

    // On mobile, if clicking 'profil', don't close the menu or navigate immediately
    // unless it's already open or we want to allow navigation.
    // BUT for better UX, let's just make it simpler.
    if (targetSection) {
      setActiveSection(targetSection);
    }

    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <HomeSection
            onNavigate={setActiveSection}
            onNewsClick={handleNewsClick}
            newsData={newsData}
            galleryData={galleryData}
            agendaData={agendaData}
            statsData={statsData}
          />
        );
      case "profil":
      case "sejarah-dpw":
        return <SejarahDPWSection teamData={teamData} />;
      case "pengurus-dpw":
        return <PengurusDPWSection teamData={teamData} />;
      case "dokumentasi":
        return (
          <DokumentasiSection
            galleryData={galleryData}
            onNavigateToDetail={(id) => {
              setSelectedGalleryId(id);
              setActiveSection("dokumentasi-detail");
              window.scrollTo(0, 0);
            }}
          />
        );
      case "dokumentasi-detail":
        return (
          <DokumentasiDetailSection
            galleryId={selectedGalleryId!}
            galleryData={galleryData}
            onBack={() => setActiveSection("dokumentasi")}
          />
        );
      case "berita":
        return (
          <BeritaSection onNewsClick={handleNewsClick} newsData={newsData} />
        );
      case "news-detail":
        return (
          <NewsDetailSection
            newsId={selectedNewsId}
            onBack={() => setActiveSection("berita")}
            newsData={newsData}
            isLoading={isLoading}
          />
        );
      case "agenda":
        return <AgendaSection agendaData={agendaData} />;
      default:
        return (
          <HomeSection
            onNavigate={setActiveSection}
            onNewsClick={handleNewsClick}
            newsData={newsData}
            galleryData={galleryData}
            agendaData={agendaData}
            statsData={statsData}
          />
        );
    }
  };

  // Basic Error Boundary logic
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 flex-col gap-4">
        <h1 className="text-2xl font-bold">Terjadi Kesalahan</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="px-6 py-2 bg-brand text-white rounded-lg"
        >
          Reset Aplikasi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav
        id="navbar"
        className={`z-50 transition-all duration-300 ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "nav-links-mobile-open" : ""}`}
      >
        <div className="nav-inner">
          <a
            href="#beranda"
            className="nav-brand flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#beranda");
            }}
          >
            <img
              src="/logo2.jpeg"
              alt="Logo PAN"
              className="h-10 w-10 object-contain"
            />
            <div className="nav-brand-text">
              <span>DPW Provinsi</span>
              <span>Nusa Tenggara Timur</span>
            </div>
          </a>

          <ul className="nav-links" id="navLinks">
            <li>
              <a
                href="#beranda"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#beranda");
                }}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#profil"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#profil");
                }}
              >
                Profil
              </a>
            </li>
            <li>
              <a
                href="#pengurus-dpw"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#pengurus-dpw");
                }}
              >
                Pengurus DPW
              </a>
            </li>
            <li>
              <a
                href="#dokumentasi"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#dokumentasi");
                }}
              >
                Dokumentasi
              </a>
            </li>
            <li>
              <a
                href="#berita"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#berita");
                }}
              >
                Berita
              </a>
            </li>
          </ul>

          <div
            className="hamburger"
            id="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile overlay class for animations */}

      {/* Main Content */}
      <main
        className={
          activeSection === "profil" || activeSection === "sejarah-dpw"
            ? "-mt-16 md:-mt-20"
            : "pt-16 md:pt-20"
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-0 m-0"
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <img
                  src="/logo.png"
                  alt="DPW PAN NTT"
                  className="h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Bersama membangun bangsa yang berdaulat, adil, dan makmur untuk
                masa depan Indonesia yang lebih baik.
              </p>
              <div className="flex gap-4">
                <Facebook
                  size={20}
                  className="hover:text-white cursor-pointer transition-colors"
                />
                <Twitter
                  size={20}
                  className="hover:text-white cursor-pointer transition-colors"
                />
                <Instagram
                  size={20}
                  className="hover:text-white cursor-pointer transition-colors"
                />
                <Youtube
                  size={20}
                  className="hover:text-white cursor-pointer transition-colors"
                />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#beranda"
                    className="hover:text-white transition-colors block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#beranda");
                    }}
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#profil"
                    className="hover:text-white transition-colors block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#profil");
                    }}
                  >
                    Profil
                  </a>
                </li>
                <li>
                  <a
                    href="#pengurus-dpw"
                    className="hover:text-white transition-colors block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#pengurus-dpw");
                    }}
                  >
                    Pengurus DPW
                  </a>
                </li>
                <li>
                  <a
                    href="#dokumentasi"
                    className="hover:text-white transition-colors block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#dokumentasi");
                    }}
                  >
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a
                    href="#berita"
                    className="hover:text-white transition-colors block"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#berita");
                    }}
                  >
                    Berita
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-sm mb-6">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand shrink-0" />
                  <span>
                    Jl. Sam Ratulangi 5 No.12a, Oesapa Bar., Kec. Klp. Lima,
                    Kota Kupang, Nusa Tenggara Tim. 85228
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand shrink-0" />
                  <span>(0380) 123456</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand shrink-0" />
                  <span>info@pan-ntt.id</span>
                </li>
              </ul>
              <div className="w-full h-40 rounded-xl overflow-hidden border border-stone-700 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.28420120155!2d123.63021157601676!3d-10.152149089960243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c5683007be060e3%3A0x512bfe4a0f7cb7e1!2sRUMAH%20PAN%20NTT!5e0!3m2!1sen!2sid!4v1715000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor DPW PAN NTT"
                ></iframe>
              </div>
            </div>

            <NewsletterForm />
          </div>
          <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs">
            <p>
              &copy; 2026 DPW PAN NTT. Seluruh hak cipta dilindungi
              undang-undang.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
