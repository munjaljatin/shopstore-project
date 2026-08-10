import { useEffect, useState } from "react";
import { Check, X, ShoppingCart, Home } from "lucide-react";

const NotFound = () => {
  const [settled, setSettled] = useState(false);
  const orderId = "404-ERR-0000";

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 80);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { label: "Ordered", state: "done" },
    { label: "Packed", state: "done" },
    { label: "Shipped", state: "done" },
    { label: "Delivered", state: "lost" },
  ];

  return (
    <div className="ef-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .ef-page {
          --bg: #eaf1ec;
          --card: #ffffff;
          --ink: #24303d;
          --ink-soft: #67737e;
          --kraft: #bd8f61;
          --kraft-dark: #8c6239;
          --cta: #e8963c;
          --cta-dark: #c97423;
          --alert: #dd4b5b;
          --success: #2e9e6d;
          --border: #e3e7e2;

          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.25rem;
          box-sizing: border-box;
          background: var(--bg);
          font-family: 'Inter', sans-serif;
        }

        .ef-wrap {
          width: 100%;
          max-width: 420px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .ef-wrap.in { opacity: 1; transform: translateY(0); }

        .ef-card {
          background: var(--card);
          border-radius: 20px;
          padding: 2rem 1.75rem 1.5rem;
          box-shadow: 0 10px 30px rgba(36, 48, 61, 0.08);
          border: 1px solid var(--border);
        }

        .ef-track-id {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--ink-soft);
          text-align: center;
          margin: 0 0 1.1rem;
        }

        .ef-illustration {
          display: block;
          margin: 0 auto 0.75rem;
          width: 100%;
          max-width: 220px;
          height: auto;
        }

        .ef-headline {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: clamp(1.35rem, 5vw, 1.65rem);
          color: var(--ink);
          text-align: center;
          margin: 0.25rem 0 0.5rem;
          line-height: 1.25;
        }

        .ef-copy {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--ink-soft);
          text-align: center;
          margin: 0 0 1.5rem;
        }

        .ef-timeline {
          list-style: none;
          margin: 0 0 1.6rem;
          padding: 0;
          display: flex;
          align-items: flex-start;
        }
        .ef-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          text-align: center;
        }
        .ef-step::before {
          content: '';
          position: absolute;
          top: 13px;
          left: -50%;
          width: 100%;
          height: 2px;
          background: var(--border);
          z-index: 0;
        }
        .ef-step:first-child::before { display: none; }
        .ef-step.done::before { background: var(--success); }

        .ef-dot {
          position: relative;
          z-index: 1;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card);
          border: 2px solid var(--success);
          color: var(--success);
        }
        .ef-step.lost .ef-dot {
          border-color: var(--alert);
          color: var(--alert);
          animation: efShake 2.2s ease-in-out infinite;
        }
        .ef-step-label {
          margin-top: 6px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-soft);
        }
        .ef-step.lost .ef-step-label { color: var(--alert); font-weight: 600; }

        @keyframes efShake {
          0%, 80%, 100% { transform: rotate(0deg); }
          83% { transform: rotate(-8deg); }
          86% { transform: rotate(7deg); }
          89% { transform: rotate(-5deg); }
          92% { transform: rotate(0deg); }
        }

        .ef-actions {
          display: flex;
          gap: 10px;
        }

        .ef-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .ef-btn-primary {
          background: var(--cta);
          color: #ffffff;
          box-shadow: 0 6px 14px rgba(232, 150, 60, 0.35);
        }
        .ef-btn-primary:hover { background: var(--cta-dark); transform: translateY(-1px); }
        .ef-btn-secondary {
          background: var(--card);
          color: var(--ink);
          border: 1px solid var(--border);
        }
        .ef-btn-secondary:hover { border-color: var(--ink-soft); transform: translateY(-1px); }
        .ef-btn:focus-visible { outline: 2px solid var(--cta-dark); outline-offset: 2px; }

        .ef-coupon {
          margin-top: -1px;
          background: var(--kraft);
          border-radius: 0 0 20px 20px;
          padding: 0.9rem 1.75rem 1rem;
          position: relative;
          text-align: center;
        }
        .ef-coupon::before {
          content: '';
          position: absolute;
          top: -9px;
          left: 0;
          right: 0;
          height: 18px;
          background-image: radial-gradient(circle at 12px 0, transparent 9px, var(--kraft) 9.5px);
          background-size: 24px 18px;
          background-repeat: repeat-x;
        }
        .ef-coupon-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #fff;
          letter-spacing: 0.03em;
          margin: 0;
        }
        .ef-coupon-code {
          font-weight: 700;
          text-decoration: line-through;
          text-decoration-color: rgba(255,255,255,0.6);
        }

        @media (prefers-reduced-motion: reduce) {
          .ef-wrap, .ef-btn { transition: none; }
          .ef-step.lost .ef-dot { animation: none; }
        }
      `}</style>

      <div className={`ef-wrap ${settled ? "in" : ""}`}>
        <div className="ef-card">
          <p className="ef-track-id">TRACKING ID &middot; {orderId}</p>

          <svg
            className="ef-illustration"
            viewBox="0 0 220 140"
            aria-hidden="true"
          >
            <path
              d="M4 118 C 40 118, 70 108, 108 110 S 175 122, 216 108"
              fill="none"
              stroke="#d8ddd6"
              strokeWidth="3"
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
            <g transform="translate(70,52) rotate(-14)">
              <rect x="0" y="18" width="60" height="46" rx="4" fill="#cf9c6a" />
              <rect
                x="0"
                y="18"
                width="60"
                height="46"
                rx="4"
                fill="none"
                stroke="#8c6239"
                strokeWidth="2"
              />
              <path
                d="M0 18 L30 34 L60 18"
                fill="none"
                stroke="#8c6239"
                strokeWidth="2"
              />
              <rect
                x="26"
                y="18"
                width="8"
                height="46"
                fill="#8c6239"
                opacity="0.5"
              />
              <circle cx="20" cy="40" r="2.6" fill="#3a2a1a" />
              <circle cx="40" cy="40" r="2.6" fill="#3a2a1a" />
              <path
                d="M17 47 Q30 41 43 47"
                fill="none"
                stroke="#3a2a1a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <text
              x="128"
              y="34"
              fontFamily="Baloo 2, sans-serif"
              fontSize="22"
              fill="#67737e"
              fontWeight="700"
            >
              ?
            </text>
            <text
              x="140"
              y="24"
              fontFamily="Baloo 2, sans-serif"
              fontSize="14"
              fill="#67737e"
              fontWeight="700"
              opacity="0.6"
            >
              ?
            </text>
          </svg>

          <h1 className="ef-headline">This order never left the warehouse</h1>
          <p className="ef-copy">
            We scanned the barcode twice. The page you're looking for isn't in
            this shipment — it may have been discontinued, moved, or never
            stocked in the first place.
          </p>

          <ol className="ef-timeline">
            {steps.map((s) => (
              <li
                key={s.label}
                className={`ef-step ${s.state === "done" ? "done" : "lost"}`}
              >
                <span className="ef-dot">
                  {s.state === "done" ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <X size={14} strokeWidth={3} />
                  )}
                </span>
                <span className="ef-step-label">{s.label}</span>
              </li>
            ))}
          </ol>

          <div className="ef-actions">
            <a className="ef-btn ef-btn-primary" href="/">
              <ShoppingCart size={15} strokeWidth={2} />
              Continue shopping
            </a>
            <a className="ef-btn ef-btn-secondary" href="/">
              <Home size={15} strokeWidth={2} />
              Go home
            </a>
          </div>
        </div>

        <div className="ef-coupon">
          <p className="ef-coupon-text">
            Consolation code <span className="ef-coupon-code">SORRY404</span> —
            doesn't work, we checked.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
