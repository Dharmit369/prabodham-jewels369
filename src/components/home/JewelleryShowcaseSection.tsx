'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

const highlights = ['Emerald-Hued Stones', 'Hand-Set Detailing', 'Fine Gold Craft'];

// Featured piece shown on the floating card (from the real catalogue)
const featured = products.find((p) => p.slug === 'emerald-elegance-necklace-set');

const Corner = ({ className }: { className: string }) => (
  <svg className={`jw-corner ${className}`} viewBox="0 0 60 60" aria-hidden="true">
    <path d="M2 58V20C2 10 10 2 20 2h38" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M10 58V24c0-8 6-14 14-14h34" fill="none" stroke="currentColor" strokeWidth=".7" />
    <path d="M20 20l4-8 4 8-4 8z" fill="currentColor" />
  </svg>
);

export default function JewelleryShowcaseSection() {
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`jw${visible ? ' in' : ''}`} aria-labelledby="jw-title">
      <div className="w">
        <div className="jw-card">
          {/* Animated double gold frame + corner ornaments */}
          <span className="jw-line t" aria-hidden="true" />
          <span className="jw-line b" aria-hidden="true" />
          <span className="jw-line l" aria-hidden="true" />
          <span className="jw-line r" aria-hidden="true" />
          <Corner className="tl" />
          <Corner className="tr" />
          <Corner className="bl" />
          <Corner className="br" />

          <div className="jw-text">
            <div className="jw-eyebrow">
              <span aria-hidden="true" />
              Signature Edit
            </div>
            <h2 id="jw-title">
              The Royal
              <br />
              <em>Collection</em>
            </h2>
            <div className="jw-orn" aria-hidden="true">
              <span />
              <svg viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
              </svg>
              <span />
            </div>
            <p>
              Majestic designs inspired by heritage, crafted for modern grace and timeless elegance. Statement
              sets that turn every celebration into a royal occasion.
            </p>
            <ul className="jw-chips">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="jw-ctas">
              <Link href="#collections" className="btn">
                Explore Collection
              </Link>
              <Link href="#gift" className="jw-link">
                Book a Styling Session
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="jw-visual">
            <div className="jw-frame">
              <Image
                src="/images/royal-collection.jpg"
                alt="Royal emerald necklace, earrings, ring and bracelet on a velvet stand"
                fill
                sizes="(max-width: 860px) 92vw, 560px"
                className="jw-img"
              />
            </div>

            {featured && (
              <Link href="#collections" className="jw-feature">
                <span className="jw-feature-thumb">
                  <Image src={featured.images[0]} alt="" width={64} height={64} />
                </span>
                <span>
                  <small>Featured Piece</small>
                  <b>{featured.name}</b>
                  <em>₹{featured.price.toLocaleString('en-IN')}</em>
                </span>
              </Link>
            )}

            <span className="jw-vertical" aria-hidden="true">
              Royal · Heritage · Elegance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
