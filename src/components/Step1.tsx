import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

// Helper to split text into words, and then characters, to prevent broken word wraps
const splitTextToSpans = (text: string, charClassName: string = "char") => {
  return text.split(' ').map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
      {word.split('').map((char, charIndex) => (
        <span 
          key={charIndex} 
          className={`${charClassName} inline-block opacity-0 translate-y-3`}
        >
          {char}
        </span>
      ))}
    </span>
  ));
};

export function Step1({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title letters
      gsap.to(".step1-char", {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power2.out",
        duration: 0.4
      });

      // Animate button
      gsap.fromTo(".step1-btn", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full py-8">
      <h1 className="font-display text-4xl md:text-[56px] leading-[1.15] mb-12 font-bold text-primary max-w-3xl">
        {splitTextToSpans("Siapkah Anda melakukan kegiatan outdoor di Cantigi?", "step1-char")}
      </h1>
      <button 
        onClick={onNext}
        className="step1-btn opacity-0 bg-[#10b981] hover:bg-[#059669] text-white font-sans text-base font-bold px-10 py-4.5 rounded-full transition-all duration-300 flex items-center gap-3 group shadow-lg shadow-[#10b981]/25 hover:shadow-xl cursor-pointer"
      >
        Mulai Pemesanan
        <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
      </button>
    </section>
  );
}
