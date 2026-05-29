import { ArrowRight, ArrowLeft, Mountain, TreePine, Map, Compass, ArrowUpRight } from 'lucide-react';

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

export function LandingPage({ onBook }: { onBook: () => void }) {
  return (
      <div className="bg-surface text-on-surface min-h-screen font-sans">
         {/* Navigation */}
         <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
            <div className="hidden md:flex gap-6 font-semibold text-sm text-on-surface-variant">
              <a href="#" className="hover:text-primary transition-colors">Beranda</a>
              <a href="#" className="hover:text-primary transition-colors">Tentang</a>
              <a href="#" className="hover:text-primary transition-colors">Aktivitas</a>
              <a href="#" className="hover:text-primary transition-colors">Lokasi</a>
            </div>
            <div className="font-display text-2xl font-bold text-primary tracking-tight">Cantigi</div>
            <button onClick={onBook} className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm transition-colors cursor-pointer">
              Pesan Sekarang
            </button>
         </nav>

         {/* Hero */}
         <section className="px-8 pt-12 pb-24 max-w-7xl mx-auto flex flex-col items-center">
            <div className="w-full text-center md:text-left mb-12">
               <h1 className="font-display text-[48px] md:text-[80px] leading-[1.05] font-bold text-primary tracking-tight max-w-4xl">
                 Where<span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-[24px] border border-outline-variant align-middle ml-2"><ArrowRight className="text-primary w-6 h-6 md:w-8 md:h-8" /></span><br/>
                 <span className="text-outline-variant">The Wild</span><br/>
                 Meets The Fun
               </h1>
            </div>
            <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden">
               <img src={heroImage} alt="Majestic mountain landscape" className="w-full h-full object-cover" />
            </div>
         </section>

         {/* Sub-nav */}
         <section className="border-y border-outline-variant/30 py-8">
            <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 font-semibold text-on-surface-variant">
               <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"><TreePine size={20} /> Alam Liar</div>
               <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"><Mountain size={20} /> Puncak</div>
               <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"><Compass size={20} /> Jelajah</div>
               <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"><Map size={20} /> Rintis Jalur</div>
            </div>
         </section>

         {/* Activities */}
         <section className="py-24 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
               <p className="font-semibold text-sm mb-4 text-on-surface-variant tracking-wider uppercase">Semua Aktivitas</p>
               <h2 className="font-display text-[32px] md:text-[40px] leading-[1.2] font-semibold text-primary">
                 Kami melampaui sekadar melihat pemandangan—kami bersama-sama menciptakan pengalaman luar ruangan. <span className="text-outline-variant">Pendekatan terpandu kami menyempurnakan setiap perjalanan</span>, mengoptimalkan keselamatan, dan membentuk masa depan petualangan hari ini.
               </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 w-full overflow-hidden">
               <div className="flex gap-6 overflow-x-auto pb-4 snap-x no-scrollbar">
                  <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group snap-start cursor-pointer">
                     <img src={act1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                        <p className="text-white/80 text-xs font-semibold mb-1">Meluncur Kecepatan Tinggi</p>
                        <h3 className="text-white font-display text-xl font-bold">Pengalaman Flying Fox</h3>
                     </div>
                  </div>
                  <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl overflow-hidden relative group snap-start cursor-pointer">
                     <img src={act2} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><ArrowUpRight size={16} /></div>
                        <p className="text-white/80 text-xs font-semibold mb-1">Tantangan Navigasi</p>
                        <h3 className="text-white font-display text-xl font-bold">Labirin</h3>
                     </div>
                  </div>
                  <div className="min-w-[300px] w-[300px] aspect-[4/3] rounded-2xl bg-surface-container-high relative group snap-start cursor-pointer flex items-center justify-center">
                     <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary"><ArrowUpRight size={16} /></div>
                     <Map className="w-12 h-12 text-outline-variant" />
                     <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <p className="text-on-surface-variant text-xs font-semibold mb-1">Pemandangan Kanopi</p>
                        <h3 className="text-primary font-display text-xl font-bold">Jembatan Gantung</h3>
                     </div>
                  </div>
               </div>
               <div className="flex justify-end gap-3 mt-4">
                  <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"><ArrowLeft size={18} /></button>
                  <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"><ArrowRight size={18} /></button>
               </div>
            </div>
         </section>

         {/* Packages */}
         <section className="bg-primary text-white py-24">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5 flex flex-col justify-center">
                  <p className="font-display text-[80px] leading-none font-bold text-white/5 pb-4">2024</p>
                  <h2 className="font-display text-[40px] leading-tight font-bold mb-4">Pilih <br/>Petualangan Anda<span className="text-[#10b981]">.</span></h2>
                  <h3 className="font-display text-2xl font-semibold mb-2">Mulai Rp 150rb</h3>
                  <p className="text-sm font-semibold text-white/50 mb-6 tracking-wide">AKTIVITAS LUAR RUANGAN & CAMPING</p>
                  <p className="text-white/70 max-w-md">Paket fleksibel yang disesuaikan untuk individu, keluarga, dan grup perusahaan. Rasakan keindahan alam terbaik dengan pilihan terkurasi kami.</p>
               </div>
               <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Recommended */}
                  <div className="bg-[#10b981] rounded-2xl p-8 flex flex-col sm:col-span-2 md:col-span-1 h-full shadow-2xl shadow-[#10b981]/20">
                     <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2">Rekomendasi</p>
                     <h3 className="font-display text-2xl font-bold mb-2">Kombo Ultimate</h3>
                     <p className="font-display text-[32px] font-bold mb-8">Rp 350rb</p>
                     <ul className="space-y-4 mb-8 flex-grow">
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Paket Camping</li>
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Akses Semua Aktivitas</li>
                        <li className="flex items-center gap-3"><span className="text-white">✓</span> Pemandu Profesional</li>
                     </ul>
                     <button onClick={onBook} className="w-full bg-white text-[#10b981] font-bold py-3 rounded-xl hover:bg-white/90 transition-colors shadow-sm cursor-pointer">Pilih Kombo</button>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                     <div className="bg-primary-container/40 border border-white/10 rounded-2xl p-6">
                       <h3 className="font-display text-xl font-bold mb-1">Paket Camping</h3>
                       <p className="font-display text-2xl font-bold mb-4">Rp 250rb</p>
                       <ul className="space-y-2 text-sm text-white/70">
                          <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Termasuk tenda & api unggun</li>
                          <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Termasuk konsumsi</li>
                       </ul>
                     </div>
                     <div className="bg-primary-container/40 border border-white/10 rounded-2xl p-6">
                       <h3 className="font-display text-xl font-bold mb-1">Aktivitas Luar Ruangan</h3>
                       <p className="font-display text-2xl font-bold mb-4">Rp 150rb</p>
                       <ul className="space-y-2 text-sm text-white/70">
                          <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Akses penuh ke semua wahana</li>
                          <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Termasuk peralatan keselamatan</li>
                       </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Gallery */}
         <section className="py-24 max-w-7xl mx-auto px-8">
            <p className="font-semibold text-sm mb-2 text-on-surface-variant tracking-wider uppercase text-center md:text-left">Pengalaman</p>
            <h2 className="font-display text-[40px] leading-tight font-bold text-primary mb-12 text-center md:text-left">Pengalaman Cantigi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal1} className="w-full rounded-2xl object-cover aspect-[4/5] hover:opacity-90 transition-opacity cursor-pointer" />
                  <img src={gal2} className="w-full rounded-2xl object-cover aspect-square hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal3} className="w-full rounded-2xl object-cover aspect-[4/3] md:mt-12 hover:opacity-90 transition-opacity cursor-pointer" />
                  <img src={gal5} className="w-full rounded-2xl object-cover aspect-square hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
               <div className="flex flex-col gap-4 md:gap-6">
                  <img src={gal4} className="w-full rounded-2xl object-cover aspect-[3/4] hover:opacity-90 transition-opacity cursor-pointer" />
                  <div className="bg-primary-container rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden relative cursor-pointer group">
                    <img src={gal6} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute font-display font-bold text-white text-3xl tracking-widest text-center">JELAJAH<br/>ALAM</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer CTA */}
         <section className="bg-surface-container-low py-24 text-center px-8 border-t border-outline-variant/20">
            <h2 className="font-display text-[40px] font-bold text-primary mb-4">Siap untuk Petualangan?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 text-lg">Bergabunglah bersama kami untuk pengalaman tak terlupakan di jantung alam. Baik Anda mencari keseruan atau ketenangan, kami memiliki perjalanan sempurna yang menanti Anda.</p>
            <button onClick={onBook} className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-[#10b981]/20 cursor-pointer">
              Pesan Perjalanan Anda Sekarang
            </button>
         </section>
      </div>
  );
}
