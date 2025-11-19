// ========== client/src/components/Dashboard/UpiDisplay.jsx ==========
import { useState } from 'react';
import { FaCopy, FaDownload, FaShareAlt } from 'react-icons/fa';

const UpiDisplay = ({ upiId, qrCodeData }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  if (!upiId || !qrCodeData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = `${upiId}-qr.png`;
    link.click();
  };

  const handleShare = async () => {
    const shareText = `My Saarthi UPI ID: ${upiId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Saarthi UPI', text: shareText });
      } else {
        navigator.clipboard.writeText(shareText);
        setShareFeedback('Details copied to clipboard!');
        setTimeout(() => setShareFeedback(''), 2000);
      }
    } catch (error) {
      setShareFeedback('Unable to share right now.');
      setTimeout(() => setShareFeedback(''), 2000);
    }
  };

  return (
    <>
      <div className="upi-section">
        <div className="section-heading">
          <h3>My QR & UPI</h3>
          <p>Receive money quickly from anyone, anywhere.</p>
        </div>
        <div className="card-grid">
          <button className="feature-card qr-card" onClick={() => setShowQrModal(true)}>
            <div className="icon-circle">▢</div>
            <h4>My QR</h4>
            <p>Tap to enlarge or download.</p>
            <div className="qr-mini">
              <img src={qrCodeData} alt="UPI QR preview" />
            </div>
            <span className="cta-link">View QR</span>
          </button>

          <button className="feature-card upi-card" onClick={handleCopy}>
            <div className="icon-circle">＠</div>
            <h4>UPI ID</h4>
            <p>{upiId}</p>
            <span className="cta-link">
              <FaCopy /> {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>

          <button className="feature-card share-card" onClick={handleShare}>
            <div className="icon-circle">↗</div>
            <h4>Share Details</h4>
            <p>Send your QR or UPI to friends.</p>
            <span className="cta-link">
              <FaShareAlt /> Share
            </span>
            {shareFeedback && <small>{shareFeedback}</small>}
          </button>
        </div>
      </div>

      {showQrModal && (
        <div className="qr-modal">
          <div className="modal-overlay" onClick={() => setShowQrModal(false)} />
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowQrModal(false)}>
              ×
            </button>
            <h3>My QR Code</h3>
            <div className="modal-qr">
              <img src={qrCodeData} alt="Full QR" />
            </div>
            <button className="btn-primary large" onClick={handleDownloadQR}>
              <FaDownload /> Download QR
            </button>
          </div>
        </div>
      )}

      <style>{`
        .upi-section {
          padding: 30px;
          background: linear-gradient(135deg, #5f259f 0%, #3b82f6 100%);
          border-radius: 32px;
          color: white;
          overflow: hidden;
        }

        .section-heading h3 {
          font-size: 28px;
          margin-bottom: 4px;
        }

        .section-heading p {
          margin-bottom: 24px;
          opacity: 0.85;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .feature-card {
          border: none;
          border-radius: 24px;
          padding: 24px;
          background: white;
          color: #0f172a;
          text-align: left;
          box-shadow: 0 20px 35px rgba(15, 23, 42, 0.15);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 55px rgba(59, 130, 246, 0.3);
        }

        .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #eff6ff;
          color: #1d4ed8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .qr-card .icon-circle {
          background: #f0fdf4;
          color: #047857;
        }

        .share-card .icon-circle {
          background: #eef2ff;
          color: #4c1d95;
        }

        .qr-mini {
          margin: 16px 0;
          background: #f8fafc;
          padding: 12px;
          border-radius: 16px;
          display: inline-flex;
        }

        .qr-mini img {
          width: 100px;
          height: 100px;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2563eb;
          font-weight: 600;
        }

        .share-card small {
          display: block;
          margin-top: 10px;
          color: #047857;
        }

        .qr-modal {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 32px;
          z-index: 1;
          width: min(90vw, 420px);
          text-align: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-qr {
          margin: 20px 0;
          background: white;
          padding: 20px;
          border-radius: 18px;
        }

        .modal-qr img {
          width: 220px;
          height: 220px;
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 24px;
          background: rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 900px) {
          .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .card-grid {
            grid-template-columns: repeat(3, minmax(200px, 1fr));
            overflow-x: auto;
            gap: 12px;
          }
          .feature-card {
            min-width: 220px;
          }
        }
      `}</style>
    </>
  );
};

export default UpiDisplay;