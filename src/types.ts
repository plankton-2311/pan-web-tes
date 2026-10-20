/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Section = 'home' | 'profil' | 'visi-misi' | 'dokumentasi' | 'dokumentasi-detail' | 'berita' | 'news-detail' | 'sejarah-dpw' | 'pengurus-dpw' | 'admin' | 'agenda';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  kategori?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  kategori?: string;
}

export interface TeamMember {
  id: number;
  nama: string;
  jabatan: string;
  image: string;
}

export interface AgendaItem {
  id: number;
  title: string;
  date: string;
  location: string;
}

export interface StatItem {
  id: number;
  key_name: string;
  label: string;
  value: number;
  suffix: string;
}
