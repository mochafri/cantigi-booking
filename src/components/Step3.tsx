import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { BookingData } from '../types';

export function Step3({ data, setData, onNext, onPrev }: { data: BookingData, setData: (d: any) => void, onNext: () => void, onPrev: () => void }) {
  
  const isValid = data.fullName.trim() !== '' && 
                  data.email.trim() !== '' && 
                  data.phone.trim() !== '' && 
                  data.groupSize > 0 &&
                  data.selectedPackage !== null;

  return (
    <section className="flex flex-col w-full max-w-3xl bg-surface rounded-2xl ambient-shadow-2 p-6 md:p-12">
      <div className="mb-6 border-b border-outline-variant/20 pb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">Detail Pemesanan & Tamu</h2>
        <p className="font-sans text-base text-on-surface-variant">Lengkapi detail paket outing pilihan Anda dan data diri kontak utama.</p>
      </div>

      {/* Selected Date Summary from Step 2 */}
      <div className="bg-primary/5 rounded-xl border border-primary/10 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="font-sans text-sm font-semibold text-on-surface-variant">Tanggal Kedatangan Terpilih:</span>
        <span className="font-display text-base font-bold text-primary px-3 py-1 bg-white border border-primary/10 rounded-full shadow-sm">{data.date || 'Belum Dipilih'}</span>
      </div>
      
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if(isValid) onNext(); }}>
        {/* Package Card Selectors based on flyer pricelist */}
        <div className="flex flex-col gap-3 pb-2 border-b border-outline-variant/15">
          <label className="font-sans text-sm font-bold text-on-surface">Pilih Paket Outing & Layanan</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'outing_2d1n', label: 'Outing 2D1N', price: 'Rp 230rb - 350rb / org', desc: 'Camping, High Rope, Flying Fox, Harta Karun' },
              { id: 'outing_1d', label: 'Outing 1 Hari', price: 'Rp 79rb - 120rb / org', desc: 'Fun Games, Flying Fox, Berkebun, Tanah Liat' },
              { id: 'umum', label: 'Layanan Umum', price: 'Mulai Rp 20.000', desc: 'Tiket Masuk & Sewa Tenda/Matras Mandiri' }
            ].map(pkg => {
              const isSelected = data.selectedPackage === pkg.id;
              return (
                <div 
                  key={pkg.id} 
                  onClick={() => setData({...data, selectedPackage: pkg.id as any})}
                  className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-1 hover:border-primary/60 hover:bg-surface-container-low ${isSelected ? 'border-primary bg-primary-container/10 ring-1 ring-primary' : 'border-outline-variant bg-surface'}`}
                >
                  <span className="font-display font-bold text-sm text-primary">{pkg.label}</span>
                  <span className="font-sans font-bold text-xs text-[#10b981]">{pkg.price}</span>
                  <span className="font-sans text-[10px] text-on-surface-variant/80 leading-relaxed mt-1">{pkg.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

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
            className={`bg-primary hover:bg-primary/90 text-on-primary font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : 'shadow-md shadow-primary/20 cursor-pointer'}`}
          >
            Tinjau & Bayar
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
