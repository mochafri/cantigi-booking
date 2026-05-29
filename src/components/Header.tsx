import { X } from 'lucide-react';

export function Header({ step, onCancel }: { step: number, onCancel: () => void }) {
  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
        <a href="#" className="font-display text-2xl md:text-3xl font-bold text-primary">Cantigi</a>
        
        <div className="hidden md:flex flex-col items-center justify-center">
            <div className="flex items-center gap-3">
                <div className="h-0.5 w-6 bg-primary rounded-full" />
                <span className="font-sans text-xs text-on-surface-variant uppercase tracking-widest font-semibold flex flex-col leading-tight items-start">
                    <span className="text-primary font-bold">LANGKAH {step}</span>
                    <span className="opacity-70 text-[10px]">DARI 4</span>
                </span>
            </div>
        </div>
        
        <button onClick={onCancel} className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
          <X size={20} />
          Batal
        </button>
      </div>
    </header>
  );
}
