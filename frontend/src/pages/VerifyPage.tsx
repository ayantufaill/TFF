import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router';

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
    const n = searchParams.get('n');
    const c = searchParams.get('c');
    const dt = searchParams.get('dt');
    if (n && c && dt) {
      return { certId: certId ?? '', userName: n, courseName: c, date: dt };
    }
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f0 0%, #faf8f3 50%, #f0f4f0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img src="/logo.svg" alt="TFF Logo" style={{ height: '72px', width: 'auto', marginBottom: '12px' }} />
        <div style={{ color: '#1B2A4A', fontSize: '22px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
          The Two Fingers Foundation
        </div>
        <div style={{ color: '#888', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '4px' }}>
          Certificate Verification Portal
        </div>
      </div>

      {/* Main card */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '560px',
        border: '1px solid #e8e4dc',
      }}>

        {/* Status banner */}
        <div style={{
          background: isValid ? '#1B2A4A' : '#b91c1c',
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', flexShrink: 0,
          }}>
            {isValid ? '✓' : '✗'}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>
              {isValid ? 'Certificate Verified' : 'Certificate Not Found'}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '2px' }}>
              {isValid
                ? 'This certificate is authentic and was issued by The Two Fingers Foundation.'
                : 'No certificate data found. The link may be incomplete or invalid.'}
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, #C9A961, #e8d5a3, #C9A961)' }} />

        {/* Certificate details */}
        {isValid && certData ? (
          <div style={{ padding: '32px' }}>

            {/* Mini certificate display */}
            <div style={{
              border: '2px solid #C9A961',
              borderRadius: '8px',
              padding: '24px',
              background: 'linear-gradient(135deg, #fdfcf8 0%, #faf6ed 100%)',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Background pattern */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at top right, rgba(201,169,97,0.08) 0%, transparent 60%)',
              }} />

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ color: '#888', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  This certifies that
                </div>
                <div style={{
                  color: '#111', fontSize: '26px', fontWeight: '700',
                  textTransform: 'uppercase', letterSpacing: '1px',
                  borderBottom: '2px solid #C9A961',
                  display: 'inline-block', paddingBottom: '4px',
                  paddingLeft: '16px', paddingRight: '16px',
                }}>
                  {certData.userName}
                </div>
              </div>

              <div style={{ textAlign: 'center', color: '#444', fontSize: '13px', marginBottom: '4px' }}>
                has successfully completed
              </div>
              <div style={{
                textAlign: 'center', color: '#1B2A4A',
                fontSize: '15px', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px',
              }}>
                "{certData.courseName}"
              </div>
              <div style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
                at The Two Fingers Foundation (TFF)
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <DetailBox label="Date of Completion" value={certData.date} />
              <DetailBox label="Certificate No." value={certData.certId} mono />
            </div>

            {/* Issued by */}
            <div style={{
              textAlign: 'center', padding: '12px',
              background: '#f8f9f8', borderRadius: '8px',
              border: '1px solid #e0e8e0',
            }}>
              <span style={{ color: '#1B2A4A', fontSize: '12px', fontWeight: '600' }}>
                ✓ Officially issued by The Two Fingers Foundation
              </span>
              <div style={{ color: '#888', fontSize: '11px', marginTop: '2px' }}>
                Islamic Education &amp; Training
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ color: '#aaa', fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
              The verification link appears to be incomplete.<br />
              Please scan the QR code directly from the certificate.
            </div>
            <div style={{ marginTop: '20px', color: '#aaa', fontSize: '12px' }}>
              For assistance, contact{' '}
              <a href="mailto:info@twofingerfoundation.org"
                style={{ color: '#1B2A4A', textDecoration: 'underline' }}>
                info@twofingerfoundation.org
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '24px', color: '#aaa', fontSize: '11px', textAlign: 'center', letterSpacing: '1px' }}>
        twofingerfoundation.org — Certificate Verification Portal
      </div>
    </div>
  );
};

const DetailBox: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div style={{
    padding: '12px 16px',
    background: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  }}>
    <div style={{ color: '#aaa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
      {label}
    </div>
    <div style={{
      color: '#222', fontSize: '13px', fontWeight: '600',
      fontFamily: mono ? 'monospace' : 'inherit',
      letterSpacing: mono ? '0.5px' : 'normal',
    }}>
      {value}
    </div>
  </div>
);

export default VerifyPage;
