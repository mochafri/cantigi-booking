import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { BookingData } from '../types';

export function Step3({ data, setData, onNext, onPrev }: { data: BookingData, setData: (d: any) => void, onNext: () => void, onPrev: () => void }) {
  
  const isValid = data.fullName.trim() !== '' && data.email.trim() !== '' && data.phone.trim() !== '' && data.groupSize > 0;

  return (
    <section className="flex flex-col w-full max-w-3xl bg-surface rounded-2xl ambient-shadow-2 p-6 md:p-12">
      <div className="mb-8 border-b border-outline-variant/20 pb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">Detail Tamu</h2>
        <p className="font-sans text-base text-on-surface-variant">Mohon berikan informasi tamu utama untuk pemesanan ini.</p>
      </div>
      
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if(isValid) onNext(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="font-sans text-sm font-semibold text-on-surface">Nama Lengkap</label>
            <input 
              type="text" 
              id="fullName" 
              value={data.fullName}
              onChange={e => setData({...data, fullName: e.target.value})}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/50" 
              placeholder="Masukkan nama lengkap Anda" 
              required 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-sm font-semibold text-on-surface">Alamat Email</label>
            <input 
              type="email" 
              id="email" 
              value={data.email}
              onChange={e => setData({...data, email: e.target.value})}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/50" 
              placeholder="email@anda.com" 
               required 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="font-sans text-sm font-semibold text-on-surface">Nomor Telepon</label>
            <input 
              type="tel" 
              id="phone" 
              value={data.phone}
              onChange={e => setData({...data, phone: e.target.value})}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/50" 
              placeholder="+62 812..." 
              required 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="groupSize" className="font-sans text-sm font-semibold text-on-surface">Jumlah Tamu</label>
            <div className="relative">
              <select 
                id="groupSize" 
                value={data.groupSize || ""}
                onChange={e => setData({...data, groupSize: parseInt(e.target.value)})}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer" 
                required
              >
                <option disabled value="">Pilih jumlah tamu</option>
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
                <option value="5">5+ Orang</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 pt-4">
          <label htmlFor="specialRequests" className="font-sans text-sm font-semibold text-on-surface">Permintaan Khusus (Opsional)</label>
          <textarea 
            id="specialRequests" 
            value={data.specialRequests}
            onChange={e => setData({...data, specialRequests: e.target.value})}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/50 resize-none" 
            placeholder="Persyaratan diet, kebutuhan aksesibilitas, dll." 
            rows={3}
          ></textarea>
        </div>
        
        <div className="mt-10 flex justify-between items-center border-t border-outline-variant/20 pt-6">
          <button type="button" onClick={onPrev} className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container">
            <ArrowLeft size={18} />
            Kembali
          </button>
          <button 
            type="submit"
            disabled={!isValid}
            className={`bg-primary hover:bg-primary/90 text-on-primary font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Tinjau & Bayar
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
