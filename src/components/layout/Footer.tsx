'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'New Arrivals', href: '#collections' },
  { label: 'Best Sellers', href: '#collections' },
  { label: 'Offers', href: '#offers' },
];

const careLinks = ['Track Your Order', 'Returns & Exchanges', 'Shipping & Delivery', 'FAQs', 'Size Guide'];

const payments = ['VISA', 'Mastercard', 'RuPay', 'UPI'];

const Mark = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 32 24" aria-hidden="true">
    <path d="M16 0c3 4 4 8 0 14-4-6-3-10 0-14zM3 6c5 1 9 5 11 12C8 17 4 13 3 6zm26 0c-1 7-5 11-11 12 2-7 6-11 11-12zM0 12c4 0 8 3 11 10-6 0-10-3-11-10zm32 0c-1 7-5 10-11 10 3-7 7-10 11-10z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMsg({ ok: true, text: 'Thank you for subscribing!' });
      setEmail('');
    } else {
      setMsg({ ok: false, text: 'Enter a valid email address.' });
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="ft">
      <span className="ft-line" aria-hidden="true" />
      <span className="ft-water" aria-hidden="true">
        PRABODHAM
      </span>

      <div className="w ft-in">
        <div className="ft-brand">
          <Link href="#home" className="ft-logo" aria-label="Prabodham Jewels home">
            <Mark className="ft-mark" />
            <span>
              PRABODHAM JEWELS
              <small>FINE GOLD JEWELLERY</small>
            </span>
          </Link>
          <p className="ft-tagline">Timeless Gold Jewellery for Every Occasion</p>
          <div className="ft-orn" aria-hidden="true">
            <i />
            <svg viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
            <i />
          </div>
        </div>

        <nav className="ft-col" aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="ft-col" aria-label="Customer care">
          <h3>Customer Care</h3>
          <ul>
            {careLinks.map((l) => (
              <li key={l}>
                <Link href="#">{l}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ft-col">
          <h3>Stay Updated</h3>
          <p className="ft-sub">Get exclusive offers and new collections.</p>
          <form onSubmit={handleSubmit} className="ft-form" noValidate>
            <label className="sr-only" htmlFor="ft-email">
              Email address
            </label>
            <input
              id="ft-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          {msg && (
            <p className={`ft-msg${msg.ok ? ' ok' : ''}`} role="status">
              {msg.text}
            </p>
          )}
        </div>
      </div>

      <div className="w ft-bot">
        <span>&copy; 2026 PRABODHAM JEWELS. All Rights Reserved.</span>
        <ul className="ft-pay" aria-label="Accepted payments">
          {payments.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <button type="button" className="ft-top" onClick={toTop} aria-label="Back to top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
