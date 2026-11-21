'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Tier = {
  name: string;
  label: string;
  values: number[]; // one value = single price, two values = range
  suffix?: string;
  note: string;
  icon: React.ReactNode;
  featured?: boolean;
};

const priceTiers: Tier[] = [
  {
    name: 'Everyday Charm',
    label: 'Under',
    values: [2000],
    note: 'Studs, rings & daily wear',
    icon: <path d="M12 3l2.6 5.6L20 9.5l-4 4 1 6-5-2.8-5 2.8 1-6-4-4 5.4-.9z" />,
  },
  {
    name: 'Gifting Picks',
    label: 'From',
    values: [2000, 5000],
    note: 'Pendants, bracelets & more',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" />
        <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
      </>
    ),
  },
  {
    name: 'Festive Edit',
    label: 'From',
    values: [5000, 10000],
    note: 'Statement sets & bangles',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
  {
    name: 'Royal Luxury',
    label: 'Above',
    values: [10000],
    suffix: '+',
    note: 'Bridal & heritage pieces',
    icon: <path d="M3 18h18M4 18l-1-10 5 4 4-7 4 7 5-4-1 10" />,
    featured: true,
  },
];

const formatINR = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** Counts prices up from ₹0 once `start` is true. Renders final values before that (SSR/SEO-safe). */
function CountUpPrice({ values, suffix = '', start, delay }: { values: number[]; suffix?: string; start: boolean; delay: number }) {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const duration = 1400;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now + delay;
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, delay]);

  return (
    <>
      {values.map((v) => formatINR(v * progress)).join(' – ')}
      {suffix}
    </>
  );
}

export default function ShopByPriceSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Reveal cards (staggered) the first time the grid scrolls into view
  useEffect(() => {
    const el = gridRef.current;
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
    <section className="sec alt">
      <div className="w">
        <div className="ey">Within Your Budget</div>
        <h2 className="sh">
          Shop by <em>Price</em>
        </h2>
        <p className="sub">Find the perfect piece at a price that feels right.</p>

        <div ref={gridRef} className={`pr${visible ? ' in' : ''}`}>
          {priceTiers.map((tier, idx) => (
            <Link
              key={tier.name}
              href="#collections"
              className={`pr-card${tier.featured ? ' pr-lux' : ''}`}
              style={{ '--d': `${idx * 120}ms`, '--i': idx } as React.CSSProperties}
            >
              <span className="pr-shine" aria-hidden="true" />
              {tier.featured && (
                <>
                  <span className="pr-spark s1" aria-hidden="true" />
                  <span className="pr-spark s2" aria-hidden="true" />
                  <span className="pr-spark s3" aria-hidden="true" />
                </>
              )}
              <span className="pr-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {tier.icon}
                </svg>
              </span>
              <span className="pr-name">{tier.name}</span>
              <span className="pr-label">{tier.label}</span>
              <span className="pr-amt">
                <CountUpPrice values={tier.values} suffix={tier.suffix} start={visible} delay={idx * 120} />
              </span>
              <span className="pr-note">{tier.note}</span>
              <span className="pr-cta">
                Shop Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
