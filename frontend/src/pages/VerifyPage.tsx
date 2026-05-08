import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { CheckCircle, XCircle, Shield } from 'lucide-react';

interface CertData {
  certId: string;
  userName: string;
  courseName: string;
  date: string;
}

const VerifyPage: React.FC = () => {
  const { certId } = useParams<{ certId: string }>();
  const [searchParams] = useSearchParams();

  const certData = useMemo<CertData | null>(() => {
    // New short format: ?n=name&c=course&dt=date
    const n = searchParams.get('n');
    const c = searchParams.get('c');
    const dt = searchParams.get('dt');
    if (n && c && dt) {
      return { certId: certId ?? '', userName: n, courseName: c, date: dt };
    }
    // Legacy base64 format: ?d=<payload>
    const raw = searchParams.get('d');
    if (!raw) return null;
    try {
      return JSON.parse(atob(raw)) as CertData;
    } catch {
      return null;
    }
  }, [searchParams, certId]);

  const isValid = certData !== null;

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="TFF Logo" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2C5F2D] tracking-wide uppercase">
            Two Finger Foundation
          </h1>
          <p className="text-sm text-gray-500 mt-1 tracking-widest uppercase">Certificate Verification</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Status banner */}
          <div className={`px-8 py-5 flex items-center gap-4 ${isValid ? 'bg-[#2C5F2D]' : 'bg-[#dc2626]'}`}>
            {isValid
              ? <CheckCircle className="w-8 h-8 text-white flex-shrink-0" />
              : <XCircle className="w-8 h-8 text-white flex-shrink-0" />
            }
            <div>
              <div className="text-white font-bold text-lg">
                {isValid ? 'Certificate Verified' : 'Invalid Certificate'}
              </div>
              <div className="text-white/80 text-sm">
                {isValid
                  ? 'This certificate is authentic and was issued by TFF.'
                  : 'This certificate could not be verified. It may be tampered or invalid.'
                }
              </div>
            </div>
          </div>

          {/* Details */}
          {isValid && certData && (
            <div className="px-8 py-6 space-y-5">

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Shield className="w-5 h-5 text-[#C9A961] flex-shrink-0" />
                <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Certificate Details</span>
              </div>

              <Row label="Awarded To" value={certData.userName} large />
              <Row label="Program Completed" value={certData.courseName} />
              <Row label="Date of Completion" value={certData.date} />
              <Row label="Certificate No." value={certData.certId} mono />

              {/* Gold divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A961] to-transparent my-4" />

              <p className="text-xs text-gray-400 text-center">
                Issued by Two Finger Foundation &mdash; Islamic Education &amp; Training
              </p>
            </div>
          )}

          {!isValid && (
            <div className="px-8 py-8 text-center text-gray-400 text-sm">
              If you believe this is an error, please contact us at{' '}
              <a href="mailto:info@twofingerfoundation.org" className="text-[#2C5F2D] underline">
                info@twofingerfoundation.org
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          twofingerfoundation.org &mdash; Certificate Verification Portal
        </p>
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string; large?: boolean; mono?: boolean }> = ({ label, value, large, mono }) => (
  <div>
    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-gray-800 font-semibold ${large ? 'text-xl' : 'text-base'} ${mono ? 'font-mono tracking-wider' : ''}`}>
      {value}
    </div>
  </div>
);

export default VerifyPage;
