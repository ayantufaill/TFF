import React, { useRef, useMemo } from "react";
import { Download, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

// ─── Deterministic certificate ID from user name + date ──────────
const generateCertId = (userName: string, date: string): string => {
  const seed = (userName + date)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const part = (n: number) =>
    String((seed * (n + 1) * 7919) % 10000).padStart(4, "0");
  return `TFF-${part(1)}-${part(2)}-${part(3)}`;
};

// ─── Encode certificate data into URL ────────────────────────────
const buildVerifyUrl = (
  certId: string,
  userName: string,
  courseName: string,
  date: string,
): string => {
  const base = window.location.origin;
  const params = new URLSearchParams({ n: userName, c: courseName, dt: date });
  return `${base}/verify/${certId}?${params.toString()}`;
};

// ─── Types ───────────────────────────────────────────────────────
interface CertificateViewProps {
  userName: string;
  courseName?: string;
  completedModules?: string[];
  onBack: () => void;
}

// ─── Component ───────────────────────────────────────────────────
const CertificateView: React.FC<CertificateViewProps> = ({
  userName,
  courseName = "Foundations of Faith & Islamic Practice",
  completedModules = [],
  onBack,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Persist cert ID + date in localStorage so the same cert is shown every time
  const { certId, certDate } = useMemo(() => {
    const storageKey = `tff-cert-${userName.trim().toLowerCase().replace(/\s+/g, "-")}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.certId && parsed.certDate) return parsed;
      } catch {
        /* ignore */
      }
    }
    const certDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const certId = generateCertId(userName, certDate);
    localStorage.setItem(storageKey, JSON.stringify({ certId, certDate }));
    return { certId, certDate };
  }, [userName]);

  const verifyUrl = useMemo(
    () => buildVerifyUrl(certId, userName, courseName, certDate),
    [certId, userName, courseName, certDate],
  );

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    try {
      const logoPng = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = 220; c.height = 220;
          c.getContext("2d")!.drawImage(img, 0, 0, 220, 220);
          resolve(c.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = "/logo.png";
      });

      // Convert the QR code SVG inside the certificate to a PNG for html2canvas
      const qrSvgEl =
        certificateRef.current.querySelector<SVGElement>(".cert-qr svg");
      let qrPngUrl = "";
      if (qrSvgEl) {
        const serialized = new XMLSerializer().serializeToString(qrSvgEl);
        const qrBlob = new Blob([serialized], { type: "image/svg+xml" });
        const qrBlobUrl = URL.createObjectURL(qrBlob);
        qrPngUrl = await new Promise<string>((res, rej) => {
          const i = new Image();
          i.onload = () => {
            const c = document.createElement("canvas");
            c.width = 110;
            c.height = 110;
            c.getContext("2d")!.drawImage(i, 0, 0, 90, 90);
            URL.revokeObjectURL(qrBlobUrl);
            res(c.toDataURL("image/png"));
          };
          i.onerror = rej;
          i.src = qrBlobUrl;
        });
      }

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          clonedDoc
            .querySelectorAll<HTMLImageElement>('img[src="/logo.png"]')
            .forEach((img) => {
              img.src = logoPng;
            });

          // Replace QR SVG with a PNG img in the clone
          if (qrPngUrl) {
            const qrWrapper = clonedDoc.querySelector(".cert-qr");
            if (qrWrapper) {
              qrWrapper.innerHTML = `<img src="${qrPngUrl}" width="90" height="90" style="display:block;" />`;
            }
          }

          const root = clonedDoc.documentElement;
          root.style.setProperty("--border", "#e5e7eb");
          root.style.setProperty("--ring", "#3b82f6");
          root.style.setProperty("--background", "#ffffff");
          root.style.setProperty("--foreground", "#000000");
          Array.from(clonedDoc.getElementsByTagName("*")).forEach(
            (el) => ((el as HTMLElement).style.outlineColor = "transparent"),
          );
        },
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `TFF-Certificate-${certId}.png`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        },
        "image/png",
        1.0,
      );
    } catch (err) {
      console.error("Certificate generation error:", err);
      alert("Sorry, could not generate your certificate. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
      {/* Controls */}
      <div className="w-full flex justify-between items-center mb-8 px-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1B2A4A] font-bold hover:text-[#1a3a1b] transition-all group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-lg">Back to Lesson</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-3 bg-[#1B2A4A] text-white rounded-full font-bold hover:bg-[#1a3a1b] transition-all shadow-lg active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span className="text-lg">Download Certificate</span>
        </button>
      </div>

      {/* Scroll wrapper */}
      <div className="w-full overflow-x-auto flex justify-center py-4">
        {/* ── Certificate ─────────────────────────────────────────── */}
        <div
          ref={certificateRef}
          className="relative bg-white flex-shrink-0"
          style={{
            width: "900px",
            height: "636px",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            border: "18px solid #C9A961",
            boxShadow: "0 25px 60px -10px rgba(0,0,0,0.3)",
            outline: "none",
          }}
        >
          {/* Inner gold border line */}
          <div
            className="absolute inset-[8px] pointer-events-none"
            style={{ border: "2px solid #C9A961" }}
          />

          {/* Subtle background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.07) 0%, transparent 70%)",
            }}
          />

          {/* ── Content ─────────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{ padding: "32px 48px 24px" }}
          >
            {/* ── Top row: Logo | Title ─── */}
            <div className="flex items-center justify-between mb-4">
              <img
                src="/logo.png"
                alt="TFF Logo"
                width="80"
                height="80"
                style={{ height: "80px", width: "auto", objectFit: "contain" }}
              />

              <div className="text-center flex-1 px-4">
                <div
                  style={{
                    color: "#1B2A4A",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    fontFamily: "Georgia, serif",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  بسم الله الرحمن الرحيم
                </div>
                <div
                  style={{
                    color: "#1a1a1a",
                    fontSize: "22px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  The Two Fingers Foundation
                </div>
                <div
                  style={{
                    color: "#4a4a4a",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Islamic Education &amp; Training
                </div>
              </div>

              {/* Decorative right seal placeholder */}
              <div style={{ width: "80px" }} />
            </div>

            {/* ── Gold divider ─── */}
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(to right, transparent, #C9A961, #C9A961, transparent)",
                margin: "0 0 16px",
              }}
            />

            {/* ── Certifies that ─── */}
            <div className="text-center" style={{ marginBottom: "8px" }}>
              <span
                style={{
                  color: "#555",
                  fontSize: "14px",
                  fontStyle: "italic",
                  letterSpacing: "1px",
                }}
              >
                This certifies that
              </span>
            </div>

            {/* ── Student Name ─── */}
            <div className="text-center" style={{ marginBottom: "10px" }}>
              <div
                style={{
                  color: "#111",
                  fontSize: "36px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #C9A961",
                  display: "inline-block",
                  paddingBottom: "4px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                }}
              >
                {userName}
              </div>
            </div>

            {/* ── Award text ─── */}
            <div className="text-center" style={{ marginBottom: "6px" }}>
              <span style={{ color: "#444", fontSize: "13px" }}>
                has successfully completed the comprehensive training program
              </span>
            </div>

            <div className="text-center" style={{ marginBottom: "6px" }}>
              <span
                style={{
                  color: "#1B2A4A",
                  fontSize: "16px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                "{courseName}"
              </span>
            </div>

            <div
              className="text-center"
              style={{ marginBottom: "10px", color: "#555", fontSize: "12px" }}
            >
              at The Two Fingers Foundation (TFF)
            </div>

            {/* ── Modules list ─── */}
            {completedModules.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    color: "#444",
                    fontSize: "11px",
                    textAlign: "center",
                    marginBottom: "6px",
                  }}
                >
                  by completing the following modules:
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      columnGap: "48px",
                      rowGap: "4px",
                      width: "fit-content",
                    }}
                  >
                    {completedModules.map((mod, i) => {
                      const isLastOdd =
                        completedModules.length % 2 !== 0 &&
                        i === completedModules.length - 1;
                      return (
                        <div
                          key={i}
                          style={{
                            color: "#333",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            gridColumn: isLastOdd ? "1 / -1" : "auto",
                            justifyContent: isLastOdd ? "center" : "flex-start",
                          }}
                        >
                          <span style={{ color: "#C9A961", fontSize: "10px" }}>
                            ◆
                          </span>
                          {mod}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Gold divider ─── */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, #C9A961, transparent)",
                margin: "4px 0 12px",
              }}
            />

            {/* ── Bottom row: Seal | Signature | QR+Info ─── */}
            <div
              className="flex items-end justify-between"
              style={{ marginTop: "auto" }}
            >
              {/* Seal */}
              <div
                className="flex flex-col items-center"
                style={{ width: "120px" }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "2px solid #1B2A4A",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1B2A4A",
                    fontSize: "7px",
                    letterSpacing: "1px",
                    textAlign: "center",
                    textTransform: "uppercase",
                    padding: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontSize: "8px", fontWeight: "700" }}>TFF</div>
                  <div>Two Finger</div>
                  <div>Foundation</div>
                  <div style={{ fontSize: "6px", marginTop: "2px" }}>
                    Est. 2024
                  </div>
                </div>
                <span
                  style={{
                    color: "#888",
                    fontSize: "9px",
                    marginTop: "4px",
                    letterSpacing: "1px",
                  }}
                >
                  SEAL
                </span>
              </div>

              {/* Signature */}
              <div
                className="flex flex-col items-center"
                style={{ flex: 1, paddingBottom: "4px" }}
              >
                <img
                  src="/signature.png"
                  alt="Signature"
                  style={{
                    height: "44px",
                    width: "auto",
                    objectFit: "contain",
                    marginBottom: "4px",
                  }}
                />
                <div
                  style={{
                    width: "140px",
                    height: "1px",
                    backgroundColor: "#D1D5DB",
                    marginBottom: "4px",
                  }}
                />
                <div
                  style={{
                    color: "#555",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Director, TFF
                </div>
                <div
                  style={{ color: "#888", fontSize: "9px", marginTop: "1px" }}
                >
                  Official Signature
                </div>
              </div>

              {/* QR Code + Info */}
              <div
                className="flex flex-col items-end"
                style={{ width: "180px", gap: "4px" }}
              >
                <div className="cert-qr" style={{ marginBottom: "6px" }}>
                  <QRCodeSVG
                    value={verifyUrl}
                    size={110}
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                    level="L"
                  />
                </div>
                <div
                  style={{ color: "#444", fontSize: "9px", textAlign: "right" }}
                >
                  <span style={{ color: "#888" }}>Date: </span>
                  {certDate}
                </div>
                <div
                  style={{ color: "#444", fontSize: "9px", textAlign: "right" }}
                >
                  <span style={{ color: "#888" }}>Cert No.: </span>
                  <span style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                    {certId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ── End Certificate ──────────────────────────────────── */}
      </div>
    </div>
  );
};

export default CertificateView;
