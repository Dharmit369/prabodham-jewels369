'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const tips = [
  {
    title: 'Store Softly',
    text: 'Keep each piece in its soft pouch or box when not worn.',
    // open jewellery box
    icon: (
      <>
        <path d="M3 11h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M4 11l1.5-6h13L20 11" />
        <path d="M10 15h4" />
        <path d="M12 7.5l.8 1.2-.8 1.2-.8-1.2z" />
      </>
    ),
  },
  {
    title: 'Wear Last',
    text: 'Put jewellery on after perfume, and remove it before bathing.',
    icon: (
      <>
        <path d="M9 3h6v3H9z" />
        <path d="M8 6h8l1 4v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9z" />
        <path d="M10 13h4" />
      </>
    ),
  },
  {
    title: 'Gentle Polish',
    text: 'Wipe with a soft, dry cloth after wearing to restore shine.',
    // sparkle with small stars
    icon: (
      <>
        <path d="M11 5c.8 4 3 6.2 7 7-4 .8-6.2 3-7 7-.8-4-3-6.2-7-7 4-.8 6.2-3 7-7z" />
        <path d="M19 2.5v4M17 4.5h4" />
        <path d="M5 17.5v3M3.5 19h3" />
      </>
    ),
  },
  {
    title: 'Store Apart',
    text: 'Keep pieces separate to avoid scratches and tangles.',
    // two rings kept apart by a divider
    icon: (
      <>
        <circle cx="6.5" cy="14.5" r="3.8" />
        <circle cx="17.5" cy="14.5" r="3.8" />
        <path d="M6.5 10.7L5 8h3zM17.5 10.7L16 8h3z" />
        <path d="M12 4v16" strokeDasharray="1.5 2" />
      </>
    ),
  },
];

const avoid = ['Perfume & sprays', 'Swimming pools', 'Harsh cleaners', 'Gym & sports'];

export default function CareGuideSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={ref} className={`sec alt cgx${visible ? ' in' : ''}`} id="care" aria-labelledby="cgx-title">
      <span className="cgx-orb o1" aria-hidden="true" />
      <span className="cgx-orb o2" aria-hidden="true" />

      <div className="w">
        <div className="ey">Care &amp; Maintenance</div>
        <h2 className="sh" id="cgx-title">
          Keep Your Gold <em>Shining</em>
        </h2>
        <p className="sub">Simple habits that keep your jewellery as radiant as the day you got it.</p>

        <ol className="cgx-grid">
          {tips.map((t, i) => (
            <li key={t.title} className="cgx-card" style={{ '--i': i } as React.CSSProperties}>
              <span className="cgx-no" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="cgx-ico" aria-hidden="true">
                <span className="cgx-ico-in">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {t.icon}
                  </svg>
                </span>
                <span className="cgx-twinkle" />
              </span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <span className="cgx-bar" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="cgx-band">
          <div className="cgx-avoid">
            <span className="cgx-avoid-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M5.6 5.6l12.8 12.8" />
              </svg>
            </span>
            <div>
              <small>Keep away from</small>
              <ul>
                {avoid.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="#contact" className="btn g cgx-cta">
            Ask Our Care Experts
          </Link>
        </div>
      </div>
    </section>
  );
}
