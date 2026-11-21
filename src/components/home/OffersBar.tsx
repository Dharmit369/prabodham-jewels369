'use client';

import { useEffect, useRef, useState } from 'react';

const offers = [
  {
    tag: 'Seasonal offer',
    big: '20%',
    title: 'Flat 20% Off',
    note: 'On orders above ₹3,999',
    icon: <path d="M19 5L5 19M7.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
  },
  {
    tag: 'Festive special',
    big: '10%',
    title: 'Extra 10% Off',
    note: 'Use code',
    code: 'FESTIVE10',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" />
        <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
      </>
    ),
  },
  {
    tag: 'New user offer',
    big: '15%',
    title: 'Flat 15% Off',
    note: 'On your first order',
    icon: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />,
  },
];

export default function OffersBar() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

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
    return () => {
      observer.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS); the code stays visible to copy by hand
    }
  };

  return (
    <section ref={ref} className={`ofx${visible ? ' in' : ''}`} id="offers" aria-label="Current offers">
      <div className="w">
        <ul className="ofx-grid">
          {offers.map((o, i) => (
            <li key={o.title} className="ofx-ticket" style={{ '--i': i } as React.CSSProperties}>
              <div className="ofx-left">
                <span className="ofx-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {o.icon}
                  </svg>
                </span>
                <span className="ofx-big" aria-hidden="true">
                  {o.big}
                  <small>OFF</small>
                </span>
              </div>
              <div className="ofx-right">
                <span className="ofx-tag">{o.tag}</span>
                <b>{o.title}</b>
                {o.code ? (
                  <span className="ofx-code-row">
                    {o.note}
                    <button type="button" className={`ofx-code${copied ? ' ok' : ''}`} onClick={() => copy(o.code!)}>
                      {o.code}
                      <span>{copied ? 'Copied ✓' : 'Copy'}</span>
                    </button>
                  </span>
                ) : (
                  <span className="ofx-note">{o.note}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
