import { ArrowRight } from 'lucide-react';

export function Step1({ onNext }: { onNext: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
      <h1 className="font-display text-4xl md:text-[64px] leading-tight text-on-primary mb-6 drop-shadow-lg font-bold">
        Siapkah Anda melakukan kegiatan outdoor di Cantigi?
      </h1>
      <p className="font-sans text-lg md:text-xl text-inverse-on-surface mb-10 max-w-xl mx-auto drop-shadow-md">
        Rasakan sensasi keindahan alam yang luar biasa. Mulai perjalanan Anda untuk terhubung kembali, memulihkan energi, dan menjelajahi hal-hal luar biasa.
      </p>
      <button 
        onClick={onNext}
        className="bg-on-tertiary-container hover:bg-tertiary-container text-on-primary font-sans text-base font-semibold px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-3 group"
      >
        Mulai Pemesanan
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
}
