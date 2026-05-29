import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Landmark, 
  QrCode, 
  Calendar, 
  Users, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Percent, 
  Sparkles, 
  Download, 
  Check, 
  RefreshCw, 
  Smartphone,
  Info
} from 'lucide-react';
import { BookingData } from '../types';

const headerBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuATw_TtLqwUUxNuH_vcDSbjp4SA_xaVIUVzv-i26DPKN33f-uufqvk4L0VH126LkrxYE2zCFnK8c7qxfAeO8dpYwoAW4SX6NtgIpMr3u5wcyXpQFNAEbot1QisXOLD4iSzcROJq1pM7owbsPjy4VCJApgeuI2DW3F8JsyCemlZf8Mufd4F-rrM253DQTBYwcrQfM6_liOEqFncSsHzJLwg46v8OCipaQKGiG3d0M3qomtC99oSnH-_12LUPhqXoaPNNd-ru5ViQlg88";

export function Step4({ data, setData, onPrev }: { data: BookingData, setData: (d: any) => void, onPrev: () => void }) {
  // Local UI States
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bni' | 'bri'>('bca');
  const [isCopying, setIsCopying] = useState(false);
  
  // Promo states
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);

  // Credit Card Form States
  const [ccNumber, setCcNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvv, setCcCvv] = useState('');
  const [ccName, setCcName] = useState('');

  // QRIS Timer state (15 minutes = 900 seconds)
  const [qrisTimer, setQrisTimer] = useState(900);

  useEffect(() => {
    if (data.paymentMethod === 'ewallet' && qrisTimer > 0) {
      const timer = setInterval(() => {
        setQrisTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [data.paymentMethod, qrisTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplyPromo = () => {
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'CANTIGICAMP' || cleanCode === 'PROMO2026') {
      setAppliedPromo(cleanCode);
      setPromoSuccessMsg('Selamat! Diskon 10% berhasil dipasang.');
      setPromoError(null);
    } else if (cleanCode === '') {
      setPromoError('Masukkan kode promo terlebih dahulu.');
      setPromoSuccessMsg(null);
    } else {
      setPromoError('Kode promo tidak valid atau sudah kedaluwarsa.');
      setPromoSuccessMsg(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccessMsg(null);
    setPromoInput('');
  };

  // Card formatting
  const handleCcNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || '';
    if (formatted.length <= 19) {
      setCcNumber(formatted);
    }
  };

  const handleCcExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    let formatted = clean;
    if (clean.length > 2) {
      formatted = `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
    }
    if (formatted.length <= 5) {
      setCcExpiry(formatted);
    }
  };

  const detectCardBrand = (number: string) => {
    const firstChar = number.trim().charAt(0);
    if (firstChar === '4') return 'Visa';
    if (firstChar === '5') return 'Mastercard';
    if (number.length > 0) return 'Card';
    return '';
  };

  // Price calculations
  const getBasePrice = () => {
    if (data.selectedPackage === 'outing_2d1n') return 350000;
    if (data.selectedPackage === 'outing_1d') return 120000;
    if (data.selectedPackage === 'umum') return 20000;
    return 0;
  };

  const basePrice = getBasePrice();
  const subtotal = data.groupSize * basePrice;
  
  // 10% Discount
  const discount = appliedPromo ? Math.round(subtotal * 0.10) : 0;
  const adminFee = 2500;
  const total = subtotal - discount + adminFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const getBankVa = () => {
    switch (selectedBank) {
      case 'bca': return '88301827364521';
      case 'mandiri': return '1030092817263';
      case 'bni': return '9880018273645';
      case 'bri': return '1250018273645';
    }
  };

  const handleCopyVa = () => {
    navigator.clipboard.writeText(getBankVa());
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleDownloadTicket = () => {
    // Simulate invoice ticket download
    const originalText = document.title;
    document.title = `E-Ticket-Cantigi-${data.fullName.replace(/\s+/g, '-')}`;
    const btn = document.getElementById('dl-btn');
    if (btn) {
      btn.innerHTML = `<span class="animate-spin mr-2">&#9696;</span> Mengunduh...`;
      setTimeout(() => {
        btn.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Tersimpan!`;
        // Show simulated browser notification/alert
        alert("E-Tiket & Bukti Pembayaran berhasil diunduh ke folder Downloads perangkat Anda.");
        document.title = originalText;
        // reset button
        setTimeout(() => {
          btn.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> Unduh E-Tiket PDF`;
        }, 2000);
      }, 1500);
    }
  };

  const isFormValid = () => {
    if (!data.paymentMethod) return false;
    if (data.paymentMethod === 'cc') {
      return ccNumber.length === 19 && ccExpiry.length === 5 && ccCvv.length >= 3 && ccName.trim().length > 2;
    }
    return true;
  };

  const bookingId = `CTC-${data.selectedPackage?.toUpperCase().substring(7, 10) || 'GEN'}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (isSuccess) {
    return (
      <section className="flex flex-col w-full max-w-2xl bg-white rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden p-6 md:p-10 animate-fade-in text-center items-center">
        {/* Success Animated Mark */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-ping opacity-25"></div>
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-500">
            <CheckCircle2 size={42} className="text-emerald-500 animate-bounce" />
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#01261f] mb-2">Transaksi Anda Berhasil!</h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-md mb-8">
          Pembayaran Anda telah diverifikasi oleh sistem. Silakan simpan e-tiket digital Anda di bawah ini untuk ditunjukkan saat kedatangan.
        </p>

        {/* E-Ticket Card Layout */}
        <div className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-2xl p-6 text-left relative overflow-hidden mb-8 shadow-sm">
          {/* Ticket Top Tear line */}
          <div className="absolute -left-3 top-24 w-6 h-6 bg-white rounded-full border-r border-outline-variant/30"></div>
          <div className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full border-l border-outline-variant/30"></div>
          <div className="absolute left-6 right-6 top-27 border-t border-dashed border-outline-variant/40"></div>

          {/* Ticket Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Official E-Ticket</span>
              <h4 className="font-display font-bold text-lg text-[#01261f] mt-1.5">Cantigi Outdoor Camp</h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-on-surface-variant block">Kode Booking</span>
              <span className="font-display font-bold text-sm text-emerald-600">{bookingId}</span>
            </div>
          </div>

          {/* Ticket Middle Details */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 mt-2">
            <div>
              <span className="text-[10px] text-on-surface-variant block">KONTAK UTAMA</span>
              <span className="font-sans text-sm font-semibold text-[#01261f]">{data.fullName}</span>
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant block">TANGGAL OUTING</span>
              <span className="font-sans text-sm font-semibold text-[#01261f] flex items-center gap-1">
                <Calendar size={12} className="text-emerald-600" /> {data.date}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant block">PAKET PROGRAM</span>
              <span className="font-sans text-sm font-semibold text-[#01261f]">
                {data.selectedPackage === 'outing_2d1n' && '🏕️ Outing 2D1N (Camp)'}
                {data.selectedPackage === 'outing_1d' && '🎒 Outing 1 Hari (Full)'}
                {data.selectedPackage === 'umum' && '🎟️ Layanan Umum'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant block">JUMLAH PESERTA</span>
              <span className="font-sans text-sm font-semibold text-[#01261f] flex items-center gap-1">
                <Users size={12} className="text-emerald-600" /> {data.groupSize} Orang
              </span>
            </div>
          </div>

          {/* Ticket Bottom QR details */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-center sm:text-left">
              <span className="text-[10px] text-on-surface-variant block">METODE PEMBAYARAN</span>
              <span className="font-sans text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block mt-1">
                {data.paymentMethod === 'cc' && '💳 Kartu Kredit / Debit'}
                {data.paymentMethod === 'transfer' && '🏛️ Transfer Bank Terverifikasi'}
                {data.paymentMethod === 'ewallet' && '📱 QRIS Instan Lunas'}
              </span>
              <span className="text-[10px] text-emerald-600/80 block mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck size={12} /> Terverifikasi Aman
              </span>
            </div>
            
            {/* Elegant Vector QR Code for Check-in */}
            <div className="w-20 h-20 bg-white p-1 rounded-lg border border-outline-variant/30 flex items-center justify-center shadow-inner">
              <svg className="w-18 h-18 text-[#01261f]" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <path d="M10,10 h30 v30 h-30 z M20,20 h10 v10 h-10 z M60,10 h30 v30 h-30 z M70,20 h10 v10 h-10 z M10,60 h30 v30 h-30 z M20,70 h10 v10 h-10 z M60,60 h10 v10 h-10 z M80,60 h10 v30 h-30 z M60,80 h10 v10 h-10 z" fill="currentColor" />
                <rect x="45" y="10" width="8" height="8" fill="currentColor" />
                <rect x="45" y="25" width="8" height="8" fill="currentColor" />
                <rect x="10" y="45" width="8" height="8" fill="currentColor" />
                <rect x="25" y="45" width="8" height="8" fill="currentColor" />
                <rect x="75" y="45" width="15" height="8" fill="currentColor" />
                <rect x="45" y="60" width="8" height="15" fill="currentColor" />
                <rect x="80" y="80" width="10" height="10" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button 
            id="dl-btn"
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#0da170] text-white font-sans text-sm font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 active:scale-95"
          >
            <Download size={16} />
            Unduh E-Tiket PDF
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container text-[#01261f] font-sans text-sm font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer hover:border-primary/40 active:scale-95"
          >
            Selesai & Beranda
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-5xl gap-8 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#01261f] mb-2">Selesaikan Pemesanan Anda</h2>
        <p className="font-sans text-base text-on-surface-variant">Tinjau kembali rincian liburan Cantigi Anda dan lakukan pembayaran aman.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Payment Mode details */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-outline-variant/30 shadow-xl p-6 md:p-8 flex flex-col gap-6">
          <h3 className="font-display text-lg font-bold text-[#01261f] border-b border-outline-variant/20 pb-4">
            Metode Pembayaran
          </h3>
          
          <div className="space-y-3">
            {[
              { id: 'transfer', label: 'Transfer Bank (VA Manual)', desc: 'BCA, Mandiri, BNI, BRI', icon: <Landmark size={20} className="text-emerald-600" /> },
              { id: 'ewallet', label: 'E-Wallet / QRIS Instan', desc: 'Scan QRIS GoPay, OVO, Dana, ShopeePay', icon: <QrCode size={20} className="text-emerald-600" /> },
              { id: 'cc', label: 'Kartu Kredit / Debit Online', desc: 'Visa, MasterCard secure checkout', icon: <CreditCard size={20} className="text-emerald-600" /> },
            ].map(method => {
              const isSelected = data.paymentMethod === method.id;
              return (
                <label 
                  key={method.id} 
                  className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                    isSelected 
                      ? 'border-[#10b981] bg-emerald-500/5 ring-1 ring-[#10b981]' 
                      : 'border-outline-variant/50 hover:border-primary/40 hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative ${isSelected ? 'border-[#10b981]' : 'border-outline-variant group-hover:border-primary/50'}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={method.id} 
                          checked={data.paymentMethod === method.id}
                          onChange={() => setData({...data, paymentMethod: method.id as any})}
                          className="peer opacity-0 absolute inset-0 cursor-pointer" 
                        />
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#10b981] transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-sm md:text-base font-bold text-[#01261f]">{method.label}</span>
                      <span className="font-sans text-xs text-on-surface-variant/80 mt-0.5">{method.desc}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    {method.icon}
                  </div>
                </label>
              );
            })}
          </div>

          {/* Sub-forms container based on active payment method */}
          {data.paymentMethod && (
            <div className="mt-2 p-5 bg-[#f8f9fa] border border-outline-variant/30 rounded-2xl animate-slide-up">
              
              {/* CC Details Form */}
              {data.paymentMethod === 'cc' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#01261f]">Informasi Kartu Kredit / Debit</span>
                    {ccNumber && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {detectCardBrand(ccNumber)}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant">Nomor Kartu</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={ccNumber}
                          onChange={e => handleCcNumberChange(e.target.value)}
                          placeholder="4123 4567 8901 2345"
                          className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 pl-10 font-sans text-sm text-on-surface focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-colors"
                        />
                        <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant">Masa Berlaku (MM/YY)</label>
                      <input 
                        type="text" 
                        value={ccExpiry}
                        onChange={e => handleCcExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-colors text-center"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant">CVV (3 Digit)</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        value={ccCvv}
                        onChange={e => setCcCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-colors text-center font-mono tracking-widest"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-sans text-xs font-semibold text-on-surface-variant">Nama Pemegang Kartu</label>
                      <input 
                        type="text" 
                        value={ccName}
                        onChange={e => setCcName(e.target.value.toUpperCase())}
                        placeholder="CONTOH NAMA LENGKAP"
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Details Form */}
              {data.paymentMethod === 'transfer' && (
                <div className="space-y-4">
                  <span className="font-display text-sm font-bold text-[#01261f] block">Pilih Bank Tujuan</span>
                  
                  {/* Bank Tab Selector */}
                  <div className="grid grid-cols-4 gap-2">
                    {(['bca', 'mandiri', 'bni', 'bri'] as const).map(bank => (
                      <button 
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`py-2 px-1 font-display font-extrabold text-xs tracking-wider rounded-lg border uppercase transition-all ${
                          selectedBank === bank 
                            ? 'bg-white border-[#10b981] text-[#10b981] shadow-sm' 
                            : 'bg-white/50 border-outline-variant/40 text-on-surface-variant hover:bg-white'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  {/* Virtual Account display card */}
                  <div className="bg-white border border-outline-variant/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-inner">
                    <div>
                      <span className="text-[10px] text-on-surface-variant block tracking-wider uppercase font-semibold">Nomor Virtual Account ({selectedBank.toUpperCase()})</span>
                      <span className="font-mono text-base md:text-lg font-bold text-[#01261f] tracking-wide mt-1 block">
                        {getBankVa()}
                      </span>
                      <span className="text-[10px] text-on-surface-variant/80 mt-1 block font-semibold">Atas Nama: <strong className="text-emerald-700">PT CANTIGI CAMP NUSANTARA</strong></span>
                    </div>
                    <button 
                      type="button"
                      onClick={handleCopyVa}
                      className="self-start sm:self-center bg-[#10b981]/10 hover:bg-[#10b981]/25 text-[#10b981] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      {isCopying ? (
                        <>
                          <Check size={14} />
                          Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Salin Kode
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="text-[11px] text-[#545f72] space-y-1 bg-[#10b981]/5 p-3 rounded-lg border border-[#10b981]/10">
                    <p className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                      <Info size={12} /> Panduan Transfer:
                    </p>
                    <p>1. Transaksi VA akan terverifikasi secara manual oleh finance kami dalam 10-15 menit.</p>
                    <p>2. Pastikan nominal transfer pas dengan total invoice untuk proses verifikasi yang lancar.</p>
                  </div>
                </div>
              )}

              {/* QRIS / E-Wallet QR Code Box */}
              {data.paymentMethod === 'ewallet' && (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold text-[#01261f]">QRIS Standar Nasional</span>
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-mono font-semibold animate-pulse">
                      Valid: {formatTime(qrisTimer)}
                    </span>
                  </div>

                  {/* Animated QRIS Card Frame */}
                  <div className="relative bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-inner overflow-hidden flex flex-col items-center">
                    {/* Simulated Laser Scan Line Animation */}
                    <div className="absolute left-0 right-0 top-0 h-0.5 bg-emerald-500 opacity-80 animate-[ping_2s_infinite]"></div>
                    <div className="absolute left-4 right-4 h-1 bg-[#10b981] opacity-75 shadow-md shadow-emerald-500 rounded animate-[bounce_4s_infinite]"></div>

                    {/* QR Code Illustration */}
                    <svg className="w-36 h-36 text-[#01261f] m-2" viewBox="0 0 120 120">
                      <rect width="120" height="120" fill="white" />
                      {/* Anchor Corners */}
                      <path d="M10,10 h24 v24 h-24 z M16,16 h12 v12 h-12 z" fill="currentColor" />
                      <path d="M86,10 h24 v24 h-24 z M92,16 h12 v12 h-12 z" fill="currentColor" />
                      <path d="M10,86 h24 v24 h-24 z M16,92 h12 v12 h-12 z" fill="currentColor" />
                      {/* Random QR structures */}
                      <rect x="42" y="10" width="8" height="8" fill="currentColor" />
                      <rect x="42" y="24" width="16" height="8" fill="currentColor" />
                      <rect x="58" y="10" width="8" height="8" fill="currentColor" />
                      <rect x="10" y="42" width="16" height="8" fill="currentColor" />
                      <rect x="34" y="42" width="8" height="16" fill="currentColor" />
                      <rect x="50" y="42" width="16" height="8" fill="currentColor" />
                      <rect x="74" y="42" width="8" height="24" fill="currentColor" />
                      <rect x="90" y="42" width="20" height="8" fill="currentColor" />
                      
                      <rect x="10" y="58" width="8" height="16" fill="currentColor" />
                      <rect x="24" y="66" width="18" height="8" fill="currentColor" />
                      <rect x="50" y="58" width="8" height="8" fill="currentColor" />
                      <rect x="90" y="58" width="8" height="16" fill="currentColor" />
                      
                      <rect x="42" y="74" width="8" height="8" fill="currentColor" />
                      <rect x="42" y="90" width="24" height="8" fill="currentColor" />
                      <rect x="74" y="74" width="16" height="16" fill="currentColor" />
                      <rect x="98" y="74" width="12" height="8" fill="currentColor" />
                      <rect x="74" y="98" width="24" height="8" fill="currentColor" />
                      <rect x="104" y="90" width="6" height="18" fill="currentColor" />
                      
                      {/* Decorative QRIS logo text inside QR */}
                      <rect x="48" y="48" width="24" height="24" fill="white" rx="2" />
                      <text x="60" y="63" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#10b981" fontFamily="sans-serif">QRIS</text>
                    </svg>
                    
                    <span className="text-[9px] font-sans font-bold text-on-surface-variant tracking-wider uppercase mt-1">Scan QR Code dengan aplikasi pembayaran Anda</span>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
        
        {/* Right Panel: Invoice Summary Box */}
        <div className="lg:col-span-5 bg-[#ffffff] rounded-3xl border border-outline-variant/30 shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl">
          <div className="h-28 relative flex items-end p-6" style={{ backgroundImage: `url('${headerBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#01261f]/95 via-[#01261f]/70 to-transparent"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-0.5">Ringkasan Tagihan</span>
              <h3 className="font-display text-lg font-bold text-white leading-tight">Petualangan Cantigi Camp</h3>
            </div>
          </div>
          
          <div className="p-6 flex flex-col gap-4 flex-grow bg-white">
            <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/20">
              <span className="font-sans text-sm text-on-surface-variant flex items-center gap-2"><Calendar size={16} className="text-[#10b981]" /> Tanggal</span>
              <span className="font-sans text-sm font-semibold text-[#01261f]">{data.date || '-'}</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/20">
              <span className="font-sans text-sm text-on-surface-variant flex items-center gap-2">📦 Paket Pilihan</span>
              <span className="font-sans text-sm font-semibold text-[#01261f]">
                {data.selectedPackage === 'outing_2d1n' && 'Outing 2D1N'}
                {data.selectedPackage === 'outing_1d' && 'Outing 1 Hari'}
                {data.selectedPackage === 'umum' && 'Layanan Umum'}
                {!data.selectedPackage && '-'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/20">
              <span className="font-sans text-sm text-on-surface-variant flex items-center gap-2"><Users size={16} className="text-[#10b981]" /> Jumlah Tamu</span>
              <span className="font-sans text-sm font-semibold text-[#01261f]">{data.groupSize > 0 ? `${data.groupSize} Orang` : '-'}</span>
            </div>

            <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/20 text-xs">
              <span className="font-sans text-on-surface-variant">Rincian Paket ({data.groupSize} org x {formatCurrency(basePrice)})</span>
              <span className="font-sans font-semibold text-[#01261f]">{formatCurrency(subtotal)}</span>
            </div>

            {/* Interactive Promo Code Form inside Summary Card */}
            <div className="py-2.5 border-b border-outline-variant/20 flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <Percent size={14} className="text-[#10b981]" /> Punya Kode Promo?
              </span>
              
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Contoh: CANTIGICAMP" 
                    value={promoInput}
                    onChange={e => {
                      setPromoInput(e.target.value);
                      setPromoError(null);
                    }}
                    className="flex-grow bg-[#f8f9fa] border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#10b981] placeholder:text-on-surface-variant/40 uppercase"
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyPromo}
                    className="bg-[#10b981]/15 hover:bg-[#10b981] text-[#10b981] hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    Terapkan
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs">
                  <span className="font-sans font-bold text-emerald-800 flex items-center gap-1">
                    <Sparkles size={12} className="text-emerald-500" />
                    Promo {appliedPromo} Aktif
                  </span>
                  <button 
                    type="button" 
                    onClick={handleRemovePromo}
                    className="text-red-500 hover:text-red-700 font-bold hover:underline transition-all cursor-pointer px-1"
                  >
                    Hapus
                  </button>
                </div>
              )}
              {promoError && <p className="text-[10px] text-red-500 font-semibold">{promoError}</p>}
              {promoSuccessMsg && <p className="text-[10px] text-emerald-600 font-semibold">{promoSuccessMsg}</p>}
            </div>

            {appliedPromo && (
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10 text-xs">
                <span className="font-sans text-emerald-700 font-semibold">Diskon Promo (10%)</span>
                <span className="font-sans font-bold text-emerald-700">-{formatCurrency(discount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/20 text-xs">
              <span className="font-sans text-on-surface-variant">Biaya Administrasi</span>
              <span className="font-sans font-semibold text-[#01261f]">{formatCurrency(adminFee)}</span>
            </div>

            <div className="flex justify-between items-center pt-4 mt-2">
              <span className="font-display text-base font-bold text-[#01261f]">Total Tagihan</span>
              <span className="font-display text-xl md:text-2xl font-extrabold text-[#10b981]">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="p-6 bg-[#f8f9fa] border-t border-outline-variant/20 mt-auto">
            <button 
              disabled={!isFormValid() || isProcessing}
              onClick={handlePay}
              className={`w-full text-white font-sans text-sm font-bold px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 ${
                !isFormValid() || isProcessing
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none border border-neutral-300' 
                  : 'bg-[#10b981] hover:bg-[#0da170] shadow-emerald-500/20 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Konfirmasi & Bayar {formatCurrency(total)}
                </>
              )}
            </button>
            <p className="text-center font-sans text-xs text-on-surface-variant/80 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-emerald-600" />
              Sistem checkout dilindungi enkripsi SSL 256-bit
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Back navigation */}
      <div className="mt-4 flex justify-start items-center">
        <button 
          onClick={onPrev} 
          disabled={isProcessing}
          className="font-sans text-sm font-bold text-on-surface-variant hover:text-[#01261f] transition-colors flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-[#f8f9fa] bg-white border border-outline-variant/30 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} />
          Kembali ke Detail
        </button>
      </div>
    </section>
  );
}
