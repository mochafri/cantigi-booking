import { ArrowLeft, CreditCard, Landmark, QrCode, Calendar, Users, Lock, ShieldCheck } from 'lucide-react';
import { BookingData } from '../types';

const headerBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuATw_TtLqwUUxNuH_vcDSbjp4SA_xaVIUVzv-i26DPKN33f-uufqvk4L0VH126LkrxYE2zCFnK8c7qxfAeO8dpYwoAW4SX6NtgIpMr3u5wcyXpQFNAEbot1QisXOLD4iSzcROJq1pM7owbsPjy4VCJApgeuI2DW3F8JsyCemlZf8Mufd4F-rrM253DQTBYwcrQfM6_liOEqFncSsHzJLwg46v8OCipaQKGiG3d0M3qomtC99oSnH-_12LUPhqXoaPNNd-ru5ViQlg88";

export function Step4({ data, setData, onPrev }: { data: BookingData, setData: (d: any) => void, onPrev: () => void }) {
  
  const basePrice = 1500000;
  const total = data.groupSize * basePrice;
  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total);

  const isValid = data.paymentMethod !== null;

  return (
    <section className="flex flex-col w-full max-w-5xl gap-8">
      <div className="text-center mb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">Selesaikan Pemesanan Anda</h2>
        <p className="font-sans text-base text-on-surface-variant">Tinjau detail pemesanan Anda dan pilih metode pembayaran.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-surface rounded-2xl ambient-shadow-1 p-6 md:p-8 flex flex-col gap-6">
          <h3 className="font-display text-lg font-semibold text-primary border-b border-outline-variant/20 pb-4">Metode Pembayaran</h3>
          <div className="space-y-4">
            {[
              { id: 'cc', label: 'Kartu Kredit / Debit', icon: <CreditCard size={20} className="text-on-surface-variant" /> },
              { id: 'transfer', label: 'Transfer Bank', icon: <Landmark size={20} className="text-on-surface-variant" /> },
              { id: 'ewallet', label: 'E-Wallet (QRIS)', icon: <QrCode size={20} className="text-on-surface-variant" /> },
            ].map(method => (
               <label key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-outline-variant cursor-pointer hover:border-primary hover:bg-surface-container-low transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative ${data.paymentMethod === method.id ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method.id} 
                      checked={data.paymentMethod === method.id}
                      onChange={() => setData({...data, paymentMethod: method.id as any})}
                      className="peer opacity-0 absolute inset-0 cursor-pointer" 
                    />
                    <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${data.paymentMethod === method.id ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                  <span className="font-sans text-base font-semibold text-on-surface">{method.label}</span>
                </div>
                <div className="flex gap-2">
                  {method.icon}
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl ambient-shadow-2 border border-outline-variant/20 overflow-hidden flex flex-col">
          <div className="h-32 relative flex items-end p-6" style={{ backgroundImage: `url('${headerBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <h3 className="relative z-10 font-display text-lg font-bold text-on-primary">Pengalaman Khas Cantigi</h3>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-grow">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
              <span className="font-sans text-base text-on-surface-variant flex items-center gap-2"><Calendar size={18} /> Tanggal</span>
              <span className="font-sans text-base font-semibold text-on-surface">{data.date || '-'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
              <span className="font-sans text-base text-on-surface-variant flex items-center gap-2"><Users size={18} /> Jumlah Tamu</span>
              <span className="font-sans text-base font-semibold text-on-surface">{data.groupSize > 0 ? `${data.groupSize} Orang` : '-'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
              <span className="font-sans text-base text-on-surface-variant">Subtotal</span>
              <span className="font-sans text-base text-on-surface">{data.groupSize > 0 ? formattedTotal : 'Rp 0'}</span>
            </div>
            <div className="flex justify-between items-center pt-4 mt-auto">
              <span className="font-display text-lg font-bold text-primary">Total</span>
              <span className="font-display text-2xl font-bold text-primary">{data.groupSize > 0 ? formattedTotal : 'Rp 0'}</span>
            </div>
          </div>
          <div className="p-6 bg-surface-container-low mt-auto">
            <button 
              disabled={!isValid}
              className={`w-full bg-on-tertiary-container hover:bg-tertiary-container text-on-primary font-sans text-sm font-semibold px-6 py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Lock size={18} />
              Konfirmasi & Bayar
            </button>
            <p className="text-center font-sans text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Pembayaran aman & terenkripsi
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-start items-center">
        <button onClick={onPrev} className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container bg-surface shadow-sm">
          <ArrowLeft size={18} />
          Kembali ke Detail
        </button>
      </div>
    </section>
  );
}
