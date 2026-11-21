'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

const perks = [
  {
    label: 'New Collection Alerts',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
  {
    label: 'Exclusive Offers',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" />
        <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
      </>
    ),
  },
  {
    label: 'Early Access to Launches',
    icon: <path d="M12 3c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9z" />,
  },
  {
    label: 'Members-Only Privileges',
    icon: <path d="M3 18h18M4 18l-1-10 5 4 4-7 4 7 5-4-1 10" />,
  },
];

// Brand mark used on the invitation box lid
const Mark = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 32 24" aria-hidden="true">
    <path d="M16 0c3 4 4 8 0 14-4-6-3-10 0-14zM3 6c5 1 9 5 11 12C8 17 4 13 3 6zm26 0c-1 7-5 11-11 12 2-7 6-11 11-12zM0 12c4 0 8 3 11 10-6 0-10-3-11-10zm32 0c-1 7-5 10-11 10 3-7 7-10 11-10z" />
  </svg>
);

export default function NewsletterSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(null);
      setDone(true);
      setEmail('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <section ref={ref} className={`sec alt nl2${visible ? ' in' : ''}`} id="newsletter" aria-labelledby="nl2-title">
      <div className="w nl2-in">
        {/* Invitation box visual (built in code, on-brand) */}
        <div className="nl2-visual" aria-hidden="true">
          <span className="nl2-glow" />
          <div className="nl2-box">
            <div className="nl2-lid">
              <Mark className="nl2-mark" />
              <span className="nl2-brand">PRABODHAM JEWELS</span>
            </div>
            <div className="nl2-card">
              <span className="nl2-card-line" />
              <p>
                Be the First
                <br />
                to Discover
              </p>
              <ul>
                <li>New Collections</li>
                <li>Exclusive Offers</li>
                <li>Special Events</li>
              </ul>
              <span className="nl2-orn">
                <i />
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                </svg>
                <i />
              </span>
            </div>
            <svg className="nl2-bow" viewBox="0 0 120 60">
              <defs>
                <linearGradient id="nl2-silk" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff3d0" />
                  <stop offset=".5" stopColor="#e2bf7c" />
                  <stop offset="1" stopColor="#b98a3e" />
                </linearGradient>
              </defs>
              <path d="M60 30C40 4 8 6 10 28c2 18 30 12 50 2z" fill="url(#nl2-silk)" />
              <path d="M60 30c20-26 52-24 50-2-2 18-30 12-50 2z" fill="url(#nl2-silk)" />
              <path d="M56 32l-14 26 10-2 6 6 4-26zM64 32l14 26-10-2-6 6-4-26z" fill="url(#nl2-silk)" opacity=".9" />
              <rect x="53" y="22" width="14" height="16" rx="5" fill="#c9a064" />
            </svg>
          </div>
          <span className="nl2-spark k1" />
          <span className="nl2-spark k2" />
          <span className="nl2-spark k3" />
          <span className="nl2-spark k4" />
        </div>

        {/* Text + form */}
        <div className="nl2-text">
          <div className="nl2-eyebrow">
            <span aria-hidden="true" />
            Stay Connected
          </div>
          <h2 id="nl2-title">
            Join Our <em>Exclusive Circle</em>
          </h2>
          <p className="nl2-lead">
            Subscribe to our newsletter and get early access to new collections, festive launches, special offers and
            more.
          </p>

          <ul className="nl2-perks">
            {perks.map((p, i) => (
              <li key={p.label} style={{ '--i': i } as React.CSSProperties}>
                <span className="nl2-pico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          {done ? (
            <div className="nl2-done" role="status">
              <svg className="nl2-check" viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" fill="none" />
                <path d="M15 27l7 7 15-15" fill="none" />
              </svg>
              <div>
                <b>Welcome to the circle!</b>
                <span>Thank you for subscribing. Look out for our first note soon.</span>
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <i key={i} className="nl2-burst" style={{ '--a': `${i * 45}deg` } as React.CSSProperties} aria-hidden="true" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="nl2-form" noValidate>
              <label className="nl2-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nl2-err' : undefined}
                  required
                />
              </label>
              <button className="btn g nl2-btn" type="submit">
                Subscribe Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          )}
          {error && (
            <p className="nl2-err" id="nl2-err" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
