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
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff',
        });
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `TFF-Certificate-${userName.replace(/\s+/g, '-')}.png`;
        link.href = image;
        link.click();
      } catch (error) {
        console.error('Error generating certificate image:', error);
      }
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
      <div className="w-full overflow-visible flex justify-center bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-inner">
        <div
          ref={certificateRef}
          className="relative w-[800px] h-[560px] bg-white shadow-2xl overflow-hidden flex-shrink-0"
          style={{
            fontFamily: "'Playfair Display', serif",
            border: '20px solid #2C5F2D',
          }}
        >
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
              <div className="w-20 h-20 bg-[#2C5F2D] rounded-full flex items-center justify-center shadow-lg relative">
                <Award className="w-12 h-12 text-[#C9A961]" />
                <div className="absolute -bottom-1 -right-1 bg-[#C9A961] rounded-full p-1 border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-[#2C5F2D] mb-2 uppercase tracking-widest">
              Certificate of Completion
            </h1>
            <div className="w-32 h-1 bg-[#C9A961] mb-8" />

            <p className="text-lg italic text-gray-600 mb-2">This is to certify that</p>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-serif border-b-2 border-gray-100 pb-2 px-8">
              {userName}
            </h2>

            <p className="text-lg text-gray-700 max-w-lg leading-relaxed mb-8">
              has successfully completed the comprehensive training program 
              <span className="block font-bold text-[#2C5F2D] mt-1">"Foundations of Faith & Islamic Practice"</span>
              at The Faithful Foundation (TFF).
            </p>

            <div className="mt-auto w-full flex justify-between items-end px-4">
              <div className="flex flex-col items-center">
                <div className="w-40 h-0.5 bg-gray-300 mb-2" />
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <Calendar className="w-4 h-4" /> {today}
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-tighter">Date of Achievement</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2 text-[#2C5F2D] font-bold italic text-xl font-serif">
                  TFF Academy
                </div>
                <div className="w-40 h-0.5 bg-gray-300 mb-2" />
                <span className="text-xs text-gray-400 uppercase tracking-tighter">Official Certification</span>
              </div>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#C9A961] m-4" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#C9A961] m-4" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#C9A961] m-4" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#C9A961] m-4" />
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
