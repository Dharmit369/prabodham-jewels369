'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

type Recipient = 'Her' | 'Mother' | 'Bride' | 'Friend';
type Budget = 'under2' | '2to5' | 'over5';

const recipients: { id: Recipient; icon: React.ReactNode }[] = [
  { id: 'Her', icon: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" /> },
  { id: 'Mother', icon: <path d="M12 3l2.6 5.6L20 9.5l-4 4 1 6-5-2.8-5 2.8 1-6-4-4 5.4-.9z" /> },
  { id: 'Bride', icon: <path d="M3 18h18M4 18l-1-10 5 4 4-7 4 7 5-4-1 10" /> },
  { id: 'Friend', icon: <path d="M12 3c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9z" /> },
];

const budgets: { id: Budget; label: string; min: number; max: number }[] = [
  { id: 'under2', label: 'Under ₹2,000', min: 0, max: 1999 },
  { id: '2to5', label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { id: 'over5', label: '₹5,000 +', min: 5001, max: Infinity },
];

// Which categories suit each recipient
const recipientFit: Record<Recipient, (p: Product) => boolean> = {
  Her: () => true,
  Mother: (p) => p.category === 'Necklaces' || p.category === 'Bangles',
  Bride: (p) => p.category === 'Necklaces' || !!p.tags?.includes('prem'),
  Friend: (p) => p.category === 'Earrings' || p.category === 'Rings',
};

const styling = ['Outfit matching', 'Occasion advice', 'Budget-friendly picks'];

function findGifts(recipient: Recipient, budgetId: Budget) {
  const b = budgets.find((x) => x.id === budgetId)!;
  const fits = products.filter(recipientFit[recipient]);
  const inBudget = fits.filter((p) => p.price >= b.min && p.price <= b.max);
  if (inBudget.length) return { items: inBudget.slice(0, 3), total: inBudget.length, exact: true };
  // Nothing in this range: suggest the closest-priced pieces instead
  const target = Number.isFinite(b.max) ? b.max : b.min;
  const closest = [...fits].sort((x, y) => Math.abs(x.price - target) - Math.abs(y.price - target));
  return { items: closest.slice(0, 3), total: 0, exact: false };
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function GiftFinderSection() {
  const [recipient, setRecipient] = useState<Recipient>('Her');
  const [budget, setBudget] = useState<Budget>('2to5');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const result = findGifts(recipient, budget);

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

  return (
    <section ref={ref} className={`sec gf${visible ? ' in' : ''}`} id="gift">
      <div className="w gf-in">
        {/* Personal styling card */}
        <div className="gf-style">
          <Image src="/images/personal-styling.jpg" alt="" fill sizes="(max-width: 992px) 92vw, 600px" className="gf-style-img" />
          <div className="gf-style-tx">
            <div className="gf-eyebrow">
              <span aria-hidden="true" />
              Personal Styling
            </div>
            <h2>
              Talk to a
              <br />
              <em>Jewellery Expert</em>
            </h2>
            <p>Not sure what suits you? Get personal recommendations for your outfit and occasion.</p>
            <ul className="gf-perks">
              {styling.map((s) => (
                <li key={s}>
                  <Check />
                  {s}
                </li>
              ))}
            </ul>
            <Link href="#contact" className="btn g gf-cta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
              </svg>
              Chat with Expert
            </Link>
          </div>
        </div>

        {/* Gift finder */}
        <div className="gf-box">
          <div className="gf-head">
            <span className="gf-gift" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="4" />
                <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
              </svg>
            </span>
            <div>
              <h2>Gift Finder</h2>
              <p>Two quick choices, perfect ideas.</p>
            </div>
          </div>

          <div className="gf-q">
            <span className="gf-step">1</span>
            <small>Who is it for?</small>
          </div>
          <div className="gf-opts" role="radiogroup" aria-label="Who is it for?">
            {recipients.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={recipient === r.id}
                className={recipient === r.id ? 'on' : ''}
                onClick={() => setRecipient(r.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {r.icon}
                </svg>
                {r.id}
              </button>
            ))}
          </div>

          <div className="gf-q">
            <span className="gf-step">2</span>
            <small>Budget</small>
          </div>
          <div className="gf-opts" role="radiogroup" aria-label="Budget">
            {budgets.map((b) => (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={budget === b.id}
                className={budget === b.id ? 'on' : ''}
                onClick={() => setBudget(b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="gf-result" aria-live="polite">
            <p className="gf-count">
              {result.exact
                ? `${result.total} gift ${result.total === 1 ? 'idea' : 'ideas'} for ${recipient}`
                : 'No pieces in this range yet. Closest picks:'}
            </p>
            <div className="gf-items" key={`${recipient}-${budget}`}>
              {result.items.map((p, i) => (
                <Link key={p.id} href="#collections" className="gf-item" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                  <span className="gf-thumb">
                    <Image src={p.images[0]} alt={p.name} width={120} height={120} />
                  </span>
                  <span className="gf-name">{p.name}</span>
                  <b>₹{p.price.toLocaleString('en-IN')}</b>
                </Link>
              ))}
            </div>
          </div>

          <Link href="#collections" className="btn gf-show">
            Show All Gift Ideas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
