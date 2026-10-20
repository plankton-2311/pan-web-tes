import { TeamMember, NewsItem, GalleryItem } from "../types";

export const INITIAL_TEAM: TeamMember[] = [
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

export const CAROUSEL_DATA = [
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

export const INITIAL_NEWS: NewsItem[] = [
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

export const INITIAL_GALLERY: GalleryItem[] = [
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

export const SECTION_MAP: Record<string, any> = {
  beranda: "home",
  profil: "profil",
  "sejarah-dpw": "sejarah-dpw",
  "pengurus-dpw": "pengurus-dpw",
  dokumentasi: "dokumentasi",
  berita: "berita",
};
