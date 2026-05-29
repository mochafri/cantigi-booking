import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { BookingData } from '../types';

export function Step2({ data, setData, onNext, onPrev }: { data: BookingData, setData: (d: any) => void, onNext: () => void, onPrev: () => void }) {
  const daysInMonth = 31;
  const startOffset = 2; // e.g. starts on Tuesday
  const bookedDates = [5, 12, 13, 19, 26]; // Just random availability mock
  
  const gridCells = [];
  for (let i = 0; i < startOffset; i++) {
    gridCells.push(<div key={`empty-${i}`} />);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isBooked = bookedDates.includes(i);
    const isSelected = data.date === i;
    
    if (isBooked) {
      gridCells.push(
        <div key={i} className="aspect-square flex items-center justify-center relative cursor-not-allowed group">
            <div className="absolute inset-1 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
                <div className="absolute inset-0 bg-outline-variant/10 line-through-pattern"></div>
            </div>
            <span className="relative z-10 font-sans text-sm text-on-surface-variant opacity-40 line-through">{i}</span>
        </div>
      );
    } else {
      gridCells.push(
        <div key={i} onClick={() => setData({...data, date: i})} className="aspect-square flex items-center justify-center relative cursor-pointer group">
            <div className={`absolute inset-1 rounded-full border transition-all ${isSelected ? 'bg-primary border-primary' : 'border-transparent group-hover:border-outline-variant group-hover:bg-surface-container'}`}></div>
            <span className={`relative z-10 font-sans text-sm transition-colors ${isSelected ? 'text-on-primary font-bold' : 'text-on-surface group-hover:text-primary'}`}>{i}</span>
        </div>
      );
    }
  }

  return (
    <section className="flex flex-col w-full max-w-4xl bg-surface rounded-2xl ambient-shadow-2 p-6 md:p-12">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">Silahkan pilih tanggal kapan Anda akan datang</h2>
        <p className="font-sans text-base text-on-surface-variant">Pilih tanggal kedatangan Anda untuk melihat ketersediaan pengalaman luar ruangan eksklusif kami.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <button className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors">
              <ChevronLeft size={24} />
            </button>
            <span className="font-display text-xl font-semibold text-primary">Oktober 2024</span>
            <button className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
              <span key={day} className="font-sans text-sm font-semibold text-on-surface-variant opacity-70">{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {gridCells}
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-xl p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-primary mb-4">Ketersediaan</h3>
              <ul className="space-y-4 font-sans text-base text-on-surface">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-surface-container border border-outline-variant"></div>
                  <span>Tersedia</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span>Terpilih</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-surface-container-high relative overflow-hidden">
                    <div className="absolute inset-0 bg-outline-variant/20 line-through-pattern"></div>
                  </div>
                  <span className="text-on-surface-variant opacity-50 line-through">Dipesan / Tidak Tersedia</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 p-4 bg-primary-container/10 rounded-lg border border-primary-container/20">
              <p className="font-sans text-sm font-semibold text-primary mb-1">Tanggal Terpilih</p>
              <p className="font-display text-lg text-primary font-semibold">
                {data.date ? `${data.date} Oktober 2024` : 'Belum Dipilih'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between items-center border-t border-outline-variant/20 pt-6">
        <button onClick={onPrev} className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container">
          <ArrowLeft size={18} />
          Kembali
        </button>
        <button 
          onClick={onNext} 
          disabled={!data.date}
          className={`bg-primary hover:bg-primary/90 text-on-primary font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2 ${!data.date ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Lanjutkan
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
