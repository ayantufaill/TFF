import React, { useRef } from 'react';
import { Download, Award, CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateViewProps {
  userName: string;
  onBack: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ userName, onBack }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    console.log('Download process started...');
    if (!certificateRef.current) {
      console.error('Error: Certificate element (ref) not found.');
      return;
    }

    try {
      const element = certificateRef.current;
      console.log('Capturing element:', element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Deep fix: Remove all oklch references in variables that html2canvas might try to parse
          const root = clonedDoc.documentElement;
          const styles = getComputedStyle(root);
          // Overwrite common Tailwind 4 variables that use oklch
          root.style.setProperty('--border', '#e5e7eb');
          root.style.setProperty('--ring', '#3b82f6');
          root.style.setProperty('--background', '#ffffff');
          root.style.setProperty('--foreground', '#000000');

          // Force all elements to have standard outline-color to prevent crash
          const all = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < all.length; i++) {
            (all[i] as HTMLElement).style.outlineColor = 'transparent';
          }
        }
      });

      console.log('Canvas created successfully.');

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Error: Failed to create image blob.');
          return;
        }

        const fileName = `TFF-Certificate-${userName.trim().replace(/\s+/g, '-')}.png`;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Append to DOM for best compatibility
        document.body.appendChild(link);
        link.click();

        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('Download complete for:', fileName);
        }, 100);
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Html2canvas Error:', error);
      alert('Sorry, there was an issue generating your certificate. Please try again or check your browser settings.');
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
      {/* Controls */}
      <div className="w-full flex justify-between items-center mb-8 px-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#2C5F2D] font-bold hover:text-[#1a3a1b] transition-all group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-lg">Back to Lesson</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-3 bg-[#2C5F2D] text-white rounded-full font-bold hover:bg-[#1a3a1b] transition-all shadow-lg active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span className="text-lg">Download Certificate</span>
        </button>
      </div>

      {/* Certificate Frame */}
      <div
        className="w-full overflow-hidden flex justify-center bg-white/50 backdrop-blur-sm p-4 sm:p-8 border border-gray-100"
        style={{ borderRadius: '1.5rem', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}
      >
        <div className="w-full overflow-x-auto flex justify-center py-4 custom-scrollbar">
          <div
            ref={certificateRef}
            className="relative bg-white flex-shrink-0"
            style={{
              width: '800px',
              height: '560px',
              fontFamily: "'Playfair Display', serif",
              border: '20px solid #2C5F2D',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              outline: 'none', // Prevent oklch outline
            }}
          >
            {/* Global reset for oklch inside the certificate */}
            <style>{`
              #certificate-root * {
                outline-color: transparent !important;
                border-color: inherit;
              }
            `}</style>
            <div id="certificate-root" className="absolute inset-0">
              {/* Ornate Border Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: '2px solid #C9A961',
                  margin: '10px',
                  background: 'radial-gradient(#C9A961 0.5px, transparent 0.5px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.15
                }}
              />

              {/* Certificate Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
                <div className="mb-6">
                  <img
                    src="/logo.svg"
                    alt="TFF Seal"
                    className="h-16 w-auto object-contain mb-5"
                  />
                </div>

                <h1 className="text-4xl font-extrabold text-[#2C5F2D] mb-2 uppercase tracking-widest">
                  Certificate of Completion
                </h1>
                <div className="w-32 h-1 bg-[#C9A961] mb-8" />

                <p className="text-lg italic mb-2" style={{ color: '#4B5563' }}>This is to certify that</p>

                <h2
                  className="text-5xl font-bold mb-6 font-serif border-b-2 pb-2 px-8 uppercase"
                  style={{ color: '#111827', borderBottomColor: '#F3F4F6' }}
                >
                  {userName}
                </h2>

                <p className="text-lg max-w-lg leading-relaxed mb-8" style={{ color: '#374151' }}>
                  has successfully completed the comprehensive training program
                  <span className="block font-bold text-[#2C5F2D] mt-1">"Foundations of Faith & Islamic Practice"</span>
                  at Two Finger Foundation (TFF).
                </p>

                <div className="mt-auto w-full flex justify-between items-end px-4">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-0.5 mb-2" style={{ backgroundColor: '#D1D5DB' }} />
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#6B7280' }}>
                      <Calendar className="w-4 h-4" /> {today}
                    </div>
                    <span className="text-xs uppercase tracking-tighter" style={{ color: '#9CA3AF' }}>Date of Achievement</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="/logo.svg"
                      alt="TFF Seal"
                      className="h-12 w-auto object-contain mb-2"
                    />
                    <div className="w-40 h-0.5 mb-2" style={{ backgroundColor: '#D1D5DB' }} />
                    <span className="text-xs uppercase tracking-tighter" style={{ color: '#9CA3AF' }}>Official Certification</span>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
