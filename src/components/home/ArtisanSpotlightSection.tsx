'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    title: 'Hand-Set Stones',
    text: 'Every stone is placed and secured by hand.',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
  {
    title: 'Hallmarked Gold',
    text: 'Certified purity you can trust.',
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Heirloom Finish',
    text: 'Polished to be treasured for generations.',
    icon: <path d="M12 3c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9z" />,
  },
];

export default function ArtisanSpotlightSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger the entrance animation once the section scrolls into view
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
    <section ref={ref} className={`art${visible ? ' in' : ''}`} aria-labelledby="art-title">
      {/* Decorative mandala pattern */}
      <svg className="art-mandala" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth=".6">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="78" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="40" />
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="42" rx="12" ry="36" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
        </g>
      </svg>

      <div className="w art-in">
        <div className="art-visual">
          <span className="art-outline" aria-hidden="true" />
          <div className="art-frame">
            <Image
              src="/images/artisan-spotlight.jpg"
              alt="Artisan setting a ruby into a handcrafted necklace"
              fill
              sizes="(max-width: 860px) 90vw, 480px"
              className="art-img"
            />
            <span className="art-spark k1" aria-hidden="true" />
            <span className="art-spark k2" aria-hidden="true" />
            <span className="art-spark k3" aria-hidden="true" />
          </div>

          {/* Rotating stamp */}
          <div className="art-stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="art-stamp-ring">
              <defs>
                <path id="art-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#art-circle" textLength="286" lengthAdjust="spacing">
                  HANDCRAFTED • FINE GOLD JEWELLERY •
                </textPath>
              </text>
            </svg>
            <svg viewBox="0 0 32 24" className="art-stamp-mark">
              <path d="M16 0c3 4 4 8 0 14-4-6-3-10 0-14zM3 6c5 1 9 5 11 12C8 17 4 13 3 6zm26 0c-1 7-5 11-11 12 2-7 6-11 11-12zM0 12c4 0 8 3 11 10-6 0-10-3-11-10zm32 0c-1 7-5 10-11 10 3-7 7-10 11-10z" />
            </svg>
          </div>
        </div>

        <div className="art-text">
          <div className="art-eyebrow">
            <span aria-hidden="true" />
            Artisan Spotlight
          </div>
          <h2 id="art-title">
            Handcrafted
            <br />
            with <em>Heritage</em>
          </h2>
          <p>
            Each piece is a labour of love. Our skilled artisans shape, set and polish every design by hand,
            with fine detailing and care.
          </p>

          <ul className="art-features">
            {features.map((f, i) => (
              <li key={f.title} style={{ '--d': `${500 + i * 130}ms` } as React.CSSProperties}>
                <span className="art-f-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </span>
                <span>
                  <b>{f.title}</b>
                  <small>{f.text}</small>
                </span>
              </li>
            ))}
          </ul>

          <div className="art-ctas">
            <Link href="#story" className="btn g">
              Meet Our Artisans
            </Link>
            <Link href="#collections" className="art-link">
              View Handcrafted Pieces
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
