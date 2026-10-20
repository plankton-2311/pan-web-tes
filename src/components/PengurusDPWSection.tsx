import React from 'react';
import { TeamMember } from '../types';
import { getImageUrl } from '../utils/helpers';
import { motion } from 'motion/react';

const OrgCard: React.FC<{ p: TeamMember }> = ({ p }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 p-5 w-56 flex flex-col items-center text-center relative z-10"
  >
    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-brand/10">
      <img src={getImageUrl(p.image)} alt={p.nama} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-brand font-black text-[11px] uppercase tracking-widest mb-1.5">{p.jabatan}</h3>
    <p className="text-base font-bold text-stone-900 leading-snug">{p.nama}</p>
  </motion.div>
);

export default function PengurusDPWSection({ teamData }: { teamData: TeamMember[] }) {
  // Classification logic for the org chart
  const isKetua = (p: TeamMember) => p.jabatan.toLowerCase().includes('ketua') && !p.jabatan.toLowerCase().includes('wakil') && !p.jabatan.toLowerCase().includes('bidang');
  const isSekretaris = (p: TeamMember) => p.jabatan.toLowerCase().includes('sekretaris') && !p.jabatan.toLowerCase().includes('wakil');
  const isBendahara = (p: TeamMember) => p.jabatan.toLowerCase().includes('bendahara') && !p.jabatan.toLowerCase().includes('wakil');
  const isWakil = (p: TeamMember) => p.jabatan.toLowerCase().includes('wakil');

  const ketuaList = teamData.filter(isKetua);
  const sekretarisList = teamData.filter(isSekretaris);
  const bendaharaList = teamData.filter(isBendahara);
  const wakilList = teamData.filter(isWakil);

  // Determine if we have enough core data to show the org chart meaningfully
  const hasCoreStructure = ketuaList.length > 0 || sekretarisList.length > 0 || bendaharaList.length > 0;

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black mb-6">Struktur Pengurus DPW PAN NTT</h1>
          <p className="text-lg text-stone-600">
            Kader-kader terbaik yang berdedikasi memimpin dan menjalankan roda organisasi di tingkat wilayah Nusa Tenggara Timur.
          </p>
        </div>

        {hasCoreStructure && (
          <div className="mb-24 bg-gradient-to-b from-stone-50 to-white py-12 px-4 rounded-3xl border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand"></div>
            <h2 className="text-2xl font-black text-center mb-12 text-stone-800">Bagan Struktur Inti</h2>
            
            <div className="flex flex-col items-center relative">
              
              {/* KETUA */}
              {ketuaList.length > 0 && (
                <div className="flex flex-col items-center">
                  <div className="flex justify-center gap-6 flex-wrap">
                    {ketuaList.map((p, i) => <OrgCard key={p.id || `ketua-${i}`} p={p} />)}
                  </div>
                  {/* Vertical Line from Ketua */}
                  {(sekretarisList.length > 0 || bendaharaList.length > 0 || wakilList.length > 0) && (
                    <div className="w-0.5 h-12 bg-brand/30"></div>
                  )}
                </div>
              )}

              {/* SEKRETARIS & BENDAHARA */}
              {(sekretarisList.length > 0 || bendaharaList.length > 0) && (
                <div className="flex flex-col items-center relative w-full max-w-4xl">
                  {/* Horizontal joining line for Sekretaris & Bendahara */}
                  {sekretarisList.length > 0 && bendaharaList.length > 0 && (
                    <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-brand/30 hidden md:block z-0"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row justify-around w-full gap-8 md:gap-0 relative z-10 pt-0 md:pt-0">
                    {/* For MD screens, the line is at top-0, cards need to connect to it. We use matching border/padding tricks or just place cards over it */}
                    {sekretarisList.length > 0 && (
                      <div className="flex flex-col items-center w-full md:w-1/2">
                        {ketuaList.length > 0 && sekretarisList.length > 0 && bendaharaList.length > 0 && (
                          <div className="w-0.5 h-6 bg-brand/30 hidden md:block"></div>
                        )}
                        <div className="flex flex-wrap justify-center gap-4">
                          {sekretarisList.map((p, i) => <OrgCard key={p.id || `sek-${i}`} p={p} />)}
                        </div>
                      </div>
                    )}
                    
                    {bendaharaList.length > 0 && (
                      <div className="flex flex-col items-center w-full md:w-1/2">
                        {ketuaList.length > 0 && sekretarisList.length > 0 && bendaharaList.length > 0 && (
                          <div className="w-0.5 h-6 bg-brand/30 hidden md:block"></div>
                        )}
                        <div className="flex flex-wrap justify-center gap-4">
                          {bendaharaList.map((p, i) => <OrgCard key={p.id || `ben-${i}`} p={p} />)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vertical line continuing to Wakil */}
                  {wakilList.length > 0 && (
                    <div className="w-0.5 h-12 bg-brand/30 mt-8"></div>
                  )}
                </div>
              )}

              {/* WAKIL-WAKIL */}
              {wakilList.length > 0 && (
                <div className="flex flex-col items-center w-full max-w-5xl">
                   {/* Optional top branching line if there are many */}
                   {wakilList.length > 1 && (
                      <div className="w-[80%] h-0.5 bg-brand/30 mb-6 hidden md:block"></div>
                   )}
                   <div className="flex flex-wrap justify-center gap-6 relative z-10">
                     {wakilList.map((p, i) => (
                       <div key={p.id || `wakil-${i}`} className="flex flex-col items-center">
                         {wakilList.length > 1 && <div className="w-0.5 h-6 bg-brand/30 hidden md:block -mt-6"></div>}
                         <OrgCard p={p} />
                       </div>
                     ))}
                   </div>
                </div>
              )}
              
            </div>
          </div>
        )}

        {hasCoreStructure && (
          <div className="mb-10 text-center">
             <h2 className="text-3xl font-bold">Daftar Lengkap Pengurus</h2>
             <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
          {teamData.map((p, i) => (
            <div key={p.id || i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-xl transition-all">
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img src={getImageUrl(p.image)} alt={p.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 md:p-8 text-center bg-white">
                <h3 className="text-brand font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">{p.jabatan}</h3>
                <p className="text-sm md:text-xl font-bold text-stone-900">{p.nama}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
