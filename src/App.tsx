import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Step4 } from './components/Step4';
import { BookingData } from './types';

const bgImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDuFaqI1Jn1h4yBlSw1fqAo5HmonS7PV98pdf56666W3x5z1CE1nxgUB4wkY9--aDVln3bpHhErpIt6CdwCQRzgFzr9fJo_Rkb3IQ-QipDPrTD_KBpU1_YLkfwveFtHDHgCrIGC3Rycy2jBiK10LlGmdG3ra_WFb74meK21bCHqOhN2LOG87pBQ8YQQfNlKZuO18u2xS1xo4_Ks1KOgoe2c6pmiWW6AcYqHAajQ-IcmtleWFNev7W-kVIG9YTlJf3mX4S9tRjvR-3Cn";

export default function App() {
  const [view, setView] = useState<'landing' | 'booking'>('landing');
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    date: null,
    selectedPackage: null,
    fullName: '',
    email: '',
    phone: '',
    groupSize: 0,
    specialRequests: '',
    paymentMethod: null,
  });
  
  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));
  
  const startBooking = () => {
    setView('booking');
    setStep(1);
  };
  
  const cancelBooking = () => {
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onBook={startBooking} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased overflow-x-hidden ${step > 1 ? 'bg-background text-on-background' : 'bg-white text-on-surface'}`}>
      <Header step={step} onCancel={cancelBooking} />
      
      <main className="flex-grow flex flex-col items-center justify-center relative w-full overflow-hidden bg-white">
        {step > 1 && (
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-700" 
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.05
            }}
          >
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} transition={{duration:0.5}}>
                <Step1 onNext={handleNext} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="2" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} transition={{duration:0.5}} className="w-full flex justify-center">
                <Step2 data={data} setData={setData} onNext={handleNext} onPrev={handlePrev} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="3" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} transition={{duration:0.5}} className="w-full flex justify-center">
                <Step3 data={data} setData={setData} onNext={handleNext} onPrev={handlePrev} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="4" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} transition={{duration:0.5}} className="w-full flex justify-center">
                <Step4 data={data} setData={setData} onPrev={handlePrev} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
