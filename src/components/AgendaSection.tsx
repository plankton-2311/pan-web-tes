import React from 'react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { AgendaItem } from '../types';
import { formatDate } from '../utils/helpers';

export default function AgendaSection({ agendaData }: { agendaData: AgendaItem[] }) {
  // Sort agenda by date (closest first)
  const sortedAgenda = [...agendaData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="pt-12 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black mb-6">Kalender Agenda</h1>
          <p className="text-lg text-stone-600">
            Jadwal kegiatan, rapat koordinasi, dan aksi sosial DPW PAN NTT.
          </p>
        </div>

        <div className="space-y-6">
          {sortedAgenda.map((event) => (
            <div key={event.id} className="bg-white hover:bg-stone-50 transition-colors p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between group cursor-pointer border border-stone-100 shadow-sm hover:shadow-md">
              <div className="flex-1">
                <h4 className="font-bold text-2xl text-stone-900 mb-4">{event.title}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-stone-500 font-medium">
                  <span className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full"><Calendar size={16} className="text-brand" /> {formatDate(event.date)}</span>
                  <span className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full"><MapPin size={16} className="text-brand" /> {event.location}</span>
                </div>
              </div>
            </div>
          ))}
          {sortedAgenda.length === 0 && (
            <div className="bg-white p-12 rounded-3xl border border-stone-100 text-center">
              <Calendar size={48} className="mx-auto text-stone-300 mb-4" />
              <p className="text-stone-500 text-lg">Belum ada agenda yang dijadwalkan saat ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
