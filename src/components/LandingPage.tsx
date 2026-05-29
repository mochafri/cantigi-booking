import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Mountain, TreePine, Map, Compass, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070";
const act1 = "https://images.unsplash.com/photo-1544334346-63e808d4b3eb?auto=format&fit=crop&q=80&w=800";
const act2 = "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800";
const act3 = "https://images.unsplash.com/photo-1506197061617-7f5c0b093236?auto=format&fit=crop&q=80&w=800";

const gal1 = "https://images.unsplash.com/photo-1504280390214-31bdf7abbbdc?auto=format&fit=crop&q=80&w=800";
const gal2 = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"; 
const gal3 = "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800"; 
const gal4 = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800"; 
const gal5 = "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800"; 
const gal6 = "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800"; 

// Helper to split text into spans of characters for typewriter animation
const splitTextToSpans = (text: string, charClassName: string = "char") => {
  return text.split('').map((char, index) => (
    <span 
      key={index} 
      className={`${charClassName} inline-block opacity-0`} 
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

export function LandingPage({ onBook }: { onBook: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Navbar Animation (slide down and fade in)
      gsap.fromTo(".nav-anim", 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Hero Typewriter Timeline
      const tl = gsap.timeline();
      tl.to(".hero-char-1", {
        opacity: 1,
        stagger: 0.06,
        ease: "power1.out",
        duration: 0.05
      })
      .fromTo(".hero-arrow", 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.05"
      )
      .to(".hero-char-2", {
        opacity: 1,
        stagger: 0.06,
        ease: "power1.out",
        duration: 0.05
      }, "+=0.05")
      .to(".hero-char-3", {
        opacity: 1,
        stagger: 0.06,
        ease: "power1.out",
        duration: 0.05
      }, "+=0.05");

      // Loop animation for ArrowRight icon inside the circle (subtle bouncing horizontal slide)
      gsap.to(".hero-arrow svg", {
        x: 5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // 3. Hero Image Reveal (Clip Path + Scale zoom out)
      gsap.fromTo(".hero-image-wrap", 
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", opacity: 1, duration: 1.4, ease: "power4.inOut" }
      );
      gsap.fromTo(".hero-image", 
        { scale: 1.2 },
        { scale: 1, duration: 1.8, ease: "power3.out" }
      );

      // 4. Subnav Section scroll animation
      gsap.fromTo(".subnav-item", 
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".subnav-section",
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );

      // 5. Activities Section ScrollTrigger
      gsap.fromTo(".activity-text-anim", 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".activities-section",
            start: "top 80%"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15
        }
      );
      gsap.fromTo(".activity-marquee", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".activities-section",
            start: "top 75%"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );

      // Infinite scrolling for the marquee
      const marquee = gsap.to(".activity-marquee", {
        x: () => {
          const firstSet = document.querySelector(".activity-set-1");
          return firstSet ? -(firstSet.clientWidth + 24) : -972;
        },
        duration: 22,
        ease: "none",
        repeat: -1
      });

      // Hover controls to pause/play
      const marqueeEl = document.querySelector(".activity-marquee");
      if (marqueeEl) {
        marqueeEl.addEventListener("mouseenter", () => marquee.pause());
        marqueeEl.addEventListener("mouseleave", () => marquee.play());
      }

      // 6. Packages Section ScrollTrigger
      gsap.fromTo(".package-left-anim", 
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".packages-section",
            start: "top 80%"
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
      gsap.fromTo(".package-card-anim", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".packages-section",
            start: "top 75%"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }
      );

      // 7. Gallery Section ScrollTrigger
      gsap.fromTo(".gallery-header-anim", 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 85%"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
      gsap.fromTo(".gallery-item-anim", 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 75%"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out"
        }
      );

      // 8. Footer CTA Section ScrollTrigger
      gsap.fromTo(".footer-cta-anim", 
        { y: 30, scale: 0.95, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".footer-cta-section",
            start: "top 85%"
          },
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
      <div className="bg-surface text-on-surface min-h-screen font-sans">
         {/* Navigation */}
         <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
           isScrolled 
             ? "bg-surface/85 backdrop-blur-md border-b border-outline-variant/10 shadow-sm" 
             : "bg-surface/0 border-b border-transparent"
         }`}>
            <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
               <div className="hidden md:flex gap-6 font-semibold text-sm text-on-surface-variant">
                 <a href="#" className="nav-anim hover:text-primary transition-colors opacity-0">Beranda</a>
                 <a href="#" className="nav-anim hover:text-primary transition-colors opacity-0">Tentang</a>
                 <a href="#" className="nav-anim hover:text-primary transition-colors opacity-0">Aktivitas</a>
                 <a href="#" className="nav-anim hover:text-primary transition-colors opacity-0">Lokasi</a>
               </div>
               <div className="nav-anim font-display text-2xl font-bold text-primary tracking-tight opacity-0">Cantigi</div>
               <button onClick={onBook} className="nav-anim bg-primary hover:bg-primary/90 text-on-primary px-6 py-2 rounded-full font-semibold text-sm transition-colors cursor-pointer opacity-0">
                 Pesan Sekarang
               </button>
            </nav>
         </header>

         {/* Hero */}
         <section className="px-8 pt-12 pb-24 max-w-7xl mx-auto flex flex-col items-center">
            <div className="w-full text-center md:text-left mb-12">
               <h1 className="font-display text-[48px] md:text-[80px] leading-[1.05] font-bold text-primary tracking-tight max-w-4xl">
                 {splitTextToSpans("Where", "hero-char-1")}
                 <span className="hero-arrow opacity-0 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-[24px] border border-outline-variant align-middle ml-2">
                   <ArrowRight className="text-primary w-6 h-6 md:w-8 md:h-8" />
                 </span>
                 <br/>
                 <span className="text-outline-variant">
                   {splitTextToSpans("The Wild", "hero-char-2")}
                 </span>
                 <br/>
                 {splitTextToSpans("Meets The Fun", "hero-char-3")}
                 <span className="border-r-4 border-primary ml-1 h-[0.8em] inline-block align-middle animate-pulse"></span>
               </h1>
            </div>
            <div className="hero-image-wrap w-full aspect-[21/9] rounded-[32px] overflow-hidden opacity-0">
               <img src={heroImage} alt="Majestic mountain landscape" className="hero-image w-full h-full object-cover" />
            </div>
         </section>

         {/* Sub-nav */}
         <section className="subnav-section border-y border-outline-variant/30 py-8">
            <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 font-semibold text-on-surface-variant">
               <div className="subnav-item flex items-center gap-2 hover:text-primary cursor-pointer transition-colors opacity-0"><TreePine size={20} /> Alam Liar</div>
               <div className="subnav-item flex items-center gap-2 hover:text-primary cursor-pointer transition-colors opacity-0"><Mountain size={20} /> Puncak</div>
               <div className="subnav-item flex items-center gap-2 hover:text-primary cursor-pointer transition-colors opacity-0"><Compass size={20} /> Jelajah</div>
               <div className="subnav-item flex items-center gap-2 hover:text-primary cursor-pointer transition-colors opacity-0"><Map size={20} /> Rintis Jalur</div>
            </div>
         </section>

         {/* Activities */}
         <section className="activities-section py-24 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
               <p className="activity-text-anim font-semibold text-sm mb-3 text-[#10b981] tracking-wider uppercase opacity-0">Semua Aktivitas</p>
               <h2 className="activity-text-anim font-display text-[36px] md:text-[48px] leading-[1.15] font-bold text-primary mb-6 opacity-0">
                 Lebih Dari Sekadar<br/>
                 <span className="text-outline-variant">Pemandangan</span>
               </h2>
               <p className="activity-text-anim text-on-surface-variant text-base md:text-lg leading-relaxed max-w-md opacity-0">
                 Kami menciptakan petualangan luar ruangan yang sesungguhnya. Pendekatan terpandu kami menyempurnakan setiap perjalanan dengan mengutamakan keselamatan dan kenyamanan Anda.
               </p>
            </div>
            <div className="lg:col-span-7 w-full overflow-hidden py-4">
               <div className="activity-marquee flex gap-6 w-max cursor-pointer opacity-0">
                  {/* Set 1 */}
                  <div className="activity-set-1 flex gap-6">
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group">
                        <img src={act1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                           <p className="text-white/80 text-xs font-semibold mb-1">Meluncur Kecepatan Tinggi</p>
                           <h3 className="text-white font-display text-xl font-bold">Pengalaman Flying Fox</h3>
                        </div>
                     </div>
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group">
                        <img src={act2} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                           <p className="text-white/80 text-xs font-semibold mb-1">Tantangan Navigasi</p>
                           <h3 className="text-white font-display text-xl font-bold">Labirin</h3>
                        </div>
                     </div>
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl bg-surface-container-high relative group flex items-center justify-center">
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary"><ArrowUpRight size={16} /></div>
                        <Map className="w-12 h-12 text-outline-variant" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                           <p className="text-on-surface-variant text-xs font-semibold mb-1">Pemandangan Kanopi</p>
                           <h3 className="text-primary font-display text-xl font-bold">Jembatan Gantung</h3>
                        </div>
                     </div>
                  </div>
                  {/* Set 2 (Duplicate for Infinite Loop) */}
                  <div className="activity-set-2 flex gap-6">
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group">
                        <img src={act1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                           <p className="text-white/80 text-xs font-semibold mb-1">Meluncur Kecepatan Tinggi</p>
                           <h3 className="text-white font-display text-xl font-bold">Pengalaman Flying Fox</h3>
                        </div>
                     </div>
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group">
                        <img src={act2} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                           <p className="text-white/80 text-xs font-semibold mb-1">Tantangan Navigasi</p>
                           <h3 className="text-white font-display text-xl font-bold">Labirin</h3>
                        </div>
                     </div>
                     <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl bg-surface-container-high relative group flex items-center justify-center">
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary"><ArrowUpRight size={16} /></div>
                        <Map className="w-12 h-12 text-outline-variant" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                           <p className="text-on-surface-variant text-xs font-semibold mb-1">Pemandangan Kanopi</p>
                           <h3 className="text-primary font-display text-xl font-bold">Jembatan Gantung</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Packages */}
         <section className="packages-section bg-primary text-white py-24">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="package-left-anim lg:col-span-5 flex flex-col justify-center opacity-0">
                  <p className="font-display text-[80px] leading-none font-bold text-white/5 pb-4">2025</p>
                  <h2 className="font-display text-[40px] leading-tight font-bold mb-4">Pilih <br/>Program & Sewa<span className="text-[#10b981]">.</span></h2>
                  <h3 className="font-display text-2xl font-semibold mb-2">Mulai Rp 20.000</h3>
                  <p className="text-sm font-semibold text-white/50 mb-6 tracking-wide">OUTING PROGRAM & CAMPING SERVICES</p>
                  <p className="text-white/70 max-w-md">Program petualangan terstruktur untuk anak-anak, dewasa, dan keluarga. Dilengkapi fasilitas sewa tenda dan area camp lengkap di Bandung.</p>
               </div>
               <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Recommended */}
                  <div className="package-card-anim bg-[#10b981] rounded-2xl p-8 flex flex-col sm:col-span-2 md:col-span-1 h-full shadow-2xl shadow-[#10b981]/20 opacity-0">
                     <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2">Rekomendasi • Terpopuler</p>
                     <h3 className="font-display text-2xl font-bold mb-4">Outing 2D1N</h3>
                     
                     <div className="mb-6 flex flex-col gap-2">
                        <div className="flex justify-between border-b border-white/20 pb-1">
                           <span className="text-sm font-semibold opacity-90">Anak (SD - SMA)</span>
                           <span className="font-bold text-lg">Rp 230rb</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-1">
                           <span className="text-sm font-semibold opacity-90">Dewasa</span>
                           <span className="font-bold text-lg">Rp 350rb</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-semibold opacity-90">Family Gathering</span>
                           <span className="font-bold text-lg">Rp 950rb</span>
                        </div>
                        <p className="text-[10px] text-white/60 mt-1">*Family min. 5 keluarga</p>
                     </div>

                     <ul className="space-y-3 mb-8 flex-grow text-sm">
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Instruktur & Wahana Games</li>
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Flying Fox & 1 High Rope</li>
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Tenda, Matras & Sleeping Bag</li>
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Games Harta Karun & Camp Craft</li>
                     </ul>
                     <button onClick={onBook} className="w-full bg-white text-[#10b981] font-bold py-3 rounded-xl hover:bg-white/90 transition-colors shadow-sm cursor-pointer">Pesan Sekarang</button>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                     <div className="package-card-anim bg-primary-container/40 border border-white/10 rounded-2xl p-6 opacity-0">
                        <h3 className="font-display text-xl font-bold mb-3">Outing 1 Hari</h3>
                        
                        <div className="mb-4 flex flex-col gap-1.5 text-xs">
                           <div className="flex justify-between border-b border-white/10 pb-1">
                              <span className="opacity-80">Anak (TK - SMA)</span>
                              <span className="font-bold">Rp 79rb</span>
                           </div>
                           <div className="flex justify-between border-b border-white/10 pb-1">
                              <span className="opacity-80">Dewasa</span>
                              <span className="font-bold">Rp 120rb</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="opacity-80">Family Gathering</span>
                              <span className="font-bold">Rp 290rb</span>
                           </div>
                        </div>

                        <ul className="space-y-2 text-xs text-white/70">
                           <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Instruktur & Fun Games</li>
                           <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Berkebun & Tanah Liat</li>
                           <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Flying Fox & Tangkap Kelinci</li>
                        </ul>
                     </div>
                     <div className="package-card-anim bg-primary-container/40 border border-white/10 rounded-2xl p-6 opacity-0">
                        <h3 className="font-display text-xl font-bold mb-3">Layanan Umum</h3>
                        
                        <div className="mb-4 flex flex-col gap-1.5 text-xs">
                           <div className="flex justify-between border-b border-white/10 pb-1">
                              <span className="opacity-80">Tiket Masuk Umum</span>
                              <span className="font-bold">Rp 20.000</span>
                           </div>
                           <div className="flex justify-between border-b border-white/10 pb-1">
                              <span className="opacity-80">Sewa Tempat Camping</span>
                              <span className="font-bold">Rp 40rb - 60rb</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="opacity-80">Sewa Tenda (Isi 6 - 10)</span>
                              <span className="font-bold">Mulai Rp 145rb</span>
                           </div>
                        </div>

                        <ul className="space-y-2 text-xs text-white/70">
                           <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Sewa Sleeping Bag & Matras</li>
                           <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Kamar Mandi, Bilas & Mushola</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Gallery */}
         <section className="gallery-section py-24 max-w-7xl mx-auto px-8">
            <p className="gallery-header-anim font-semibold text-sm mb-2 text-on-surface-variant tracking-wider uppercase text-center md:text-left opacity-0">Pengalaman</p>
            <h2 className="gallery-header-anim font-display text-[40px] leading-tight font-bold text-primary mb-12 text-center md:text-left opacity-0">Pengalaman Cantigi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal1} className="gallery-item-anim w-full rounded-2xl object-cover aspect-[4/5] hover:opacity-90 transition-opacity cursor-pointer opacity-0" />
                  <img src={gal2} className="gallery-item-anim w-full rounded-2xl object-cover aspect-square hover:opacity-90 transition-opacity cursor-pointer opacity-0" />
               </div>
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal3} className="gallery-item-anim w-full rounded-2xl object-cover aspect-[4/3] md:mt-12 hover:opacity-90 transition-opacity cursor-pointer opacity-0" />
                  <img src={gal5} className="gallery-item-anim w-full rounded-2xl object-cover aspect-square hover:opacity-90 transition-opacity cursor-pointer opacity-0" />
               </div>
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal4} className="gallery-item-anim w-full rounded-2xl object-cover aspect-[3/4] hover:opacity-90 transition-opacity cursor-pointer opacity-0" />
                  <div className="gallery-item-anim bg-primary-container rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden relative cursor-pointer group opacity-0">
                    <img src={gal6} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute font-display font-bold text-white text-3xl tracking-widest text-center">JELAJAH<br/>ALAM</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer CTA */}
         <section className="footer-cta-section bg-surface-container-low py-24 text-center px-8 border-t border-outline-variant/20">
            <h2 className="footer-cta-anim font-display text-[40px] font-bold text-primary mb-4 opacity-0">Siap untuk Petualangan?</h2>
            <p className="footer-cta-anim text-on-surface-variant max-w-2xl mx-auto mb-8 text-lg opacity-0">Bergabunglah bersama kami untuk pengalaman tak terlupakan di jantung alam. Baik Anda mencari keseruan atau ketenangan, kami memiliki perjalanan sempurna yang menanti Anda.</p>
            <button onClick={onBook} className="footer-cta-anim bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-[#10b981]/20 cursor-pointer opacity-0">
              Pesan Perjalanan Anda Sekarang
            </button>
         </section>
      </div>
  );
}

