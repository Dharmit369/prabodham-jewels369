'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const bridalLook = [
  { no: '01', title: 'Statement Necklace Sets', text: 'The centrepiece of every bridal look.' },
  { no: '02', title: 'Drop Earrings', text: 'Delicate sparkle that frames the face.' },
  { no: '03', title: 'Radiant Bangles', text: 'Stacked, shining and made to celebrate.' },
];

// Fixed values (not random) so server and client render the same petals
const petals = [
  { left: '6%', size: 14, dur: 11, delay: 0 },
  { left: '18%', size: 10, dur: 14, delay: -4 },
  { left: '31%', size: 16, dur: 12, delay: -8 },
  { left: '44%', size: 9, dur: 15, delay: -2 },
  { left: '57%', size: 13, dur: 10, delay: -6 },
  { left: '69%', size: 11, dur: 13, delay: -10 },
  { left: '81%', size: 15, dur: 12, delay: -3 },
  { left: '93%', size: 10, dur: 16, delay: -7 },
];

const headingWords = ['Jewellery', 'for', 'Your'];

export default function BridalEditSection() {
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
    <section ref={ref} className={`be${visible ? ' in' : ''}`} id="bridal" aria-labelledby="be-title">
      {/* Falling petals */}
      <div className="be-petals" aria-hidden="true">
        {petals.map((p, i) => (
          <span
            key={i}
            style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="w be-in">
        <div className="be-text">
          <div className="be-eyebrow">
            <span aria-hidden="true" />
            The Bridal Edit
          </div>

          <h2 id="be-title">
            {headingWords.map((w, i) => (
              <span key={w} className="be-word" style={{ '--w': i } as React.CSSProperties}>
                {w}{' '}
              </span>
            ))}
            <br />
            <span className="be-word" style={{ '--w': 3 } as React.CSSProperties}>
              <em>Big Day</em>
            </span>
          </h2>

          <p>
            Statement necklace sets, delicate earrings and radiant bangles, chosen to complete your bridal look
            with timeless elegance.
          </p>

          <ol className="be-list">
            {bridalLook.map((item, i) => (
              <li key={item.no} style={{ '--d': `${0.7 + i * 0.15}s` } as React.CSSProperties}>
                <span className="be-no">{item.no}</span>
                <span>
                  <b>{item.title}</b>
                  <small>{item.text}</small>
                </span>
              </li>
            ))}
          </ol>

          <div className="be-ctas">
            <Link href="#collections" className="btn">
              Explore Bridal
            </Link>
            <Link href="#contact" className="be-link">
              Book a Bridal Consultation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="be-visual">
          <span className="be-glow" aria-hidden="true" />
          <div className="be-main">
            <Image
              src="/images/bridal-edit.jpg"
              alt="Ruby necklace set and earrings displayed on a velvet bust"
              fill
              sizes="(max-width: 860px) 80vw, 440px"
              className="be-main-img"
            />
          </div>

          <div className="be-round">
            <Image
              src="/images/occasions/wedding.jpg"
              alt="Bride wearing a ruby necklace, earrings and maang tikka"
              fill
              sizes="180px"
              className="be-round-img"
            />
          </div>

          <span className="be-chip" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />
            </svg>
            Made for Brides
          </span>

          <span className="be-spark s1" aria-hidden="true" />
          <span className="be-spark s2" aria-hidden="true" />
          <span className="be-spark s3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
