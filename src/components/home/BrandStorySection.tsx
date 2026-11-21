'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const values = [
  {
    title: 'Heritage of Excellence',
    text: 'Designs rooted in timeless tradition.',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
  {
    title: 'Crafted with Love',
    text: 'Every detail shaped with care.',
    icon: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />,
  },
  {
    title: 'Trusted for Generations',
    text: 'Jewellery families pass down.',
    icon: (
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M8.5 12l2.5 2.5L16 9.5" />
      </>
    ),
  },
];

const headingWords = ['Timeless', 'Tradition,'];

export default function BrandStorySection() {
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
    <section ref={ref} className={`sec alt bs${visible ? ' in' : ''}`} id="story" aria-labelledby="bs-title">
      <svg className="bs-mandala" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth=".6">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="76" strokeDasharray="2 4" />
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="42" rx="12" ry="36" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
        </g>
      </svg>

      <div className="w bs-in">
        {/* Visual */}
        <div className="bs-visual">
          <span className="bs-frame" aria-hidden="true" />
          <div className="bs-photo">
            <Image
              src="/images/brand-story.jpg"
              alt="Artisan setting stones in a gold necklace"
              fill
              sizes="(max-width: 860px) 90vw, 520px"
              className="bs-img"
            />
          </div>

          <div className="bs-stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="bs-stamp-ring">
              <defs>
                <path id="bs-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#bs-circle" textLength="286" lengthAdjust="spacing">
                  OUR STORY • OUR CRAFT • OUR LEGACY •
                </textPath>
              </text>
            </svg>
            <svg viewBox="0 0 32 24" className="bs-stamp-mark">
              <path d="M16 0c3 4 4 8 0 14-4-6-3-10 0-14zM3 6c5 1 9 5 11 12C8 17 4 13 3 6zm26 0c-1 7-5 11-11 12 2-7 6-11 11-12zM0 12c4 0 8 3 11 10-6 0-10-3-11-10zm32 0c-1 7-5 10-11 10 3-7 7-10 11-10z" />
            </svg>
          </div>

          <div className="bs-note">
            <span className="bs-note-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9z" />
              </svg>
            </span>
            <span>
              <b>Love, Culture &amp; Craft</b>
              <small>In every piece we make</small>
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="bs-text">
          <div className="bs-eyebrow">
            <span aria-hidden="true" />
            Our Story
          </div>

          <h2 id="bs-title">
            {headingWords.map((w, i) => (
              <span key={w} className="bs-word" style={{ '--w': i } as React.CSSProperties}>
                {w}{' '}
              </span>
            ))}
            <br />
            <span className="bs-word" style={{ '--w': 2 } as React.CSSProperties}>
              <em>Modern Elegance</em>
            </span>
          </h2>

          <div className="bs-orn" aria-hidden="true">
            <i />
            <svg viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
            <i />
          </div>

          <p className="bs-lead">
            At PRABODHAM JEWELS, we believe jewellery is more than an accessory — it&rsquo;s a legacy of love, culture
            and craft. Our journey is rooted in tradition and inspired by you.
          </p>

          <blockquote className="bs-quote">More than an accessory — a legacy you pass on.</blockquote>

          <ul className="bs-values">
            {values.map((v, i) => (
              <li key={v.title} style={{ '--i': i } as React.CSSProperties}>
                <span className="bs-vico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {v.icon}
                  </svg>
                </span>
                <b>{v.title}</b>
                <small>{v.text}</small>
              </li>
            ))}
          </ul>

          <div className="bs-ctas">
            <Link href="#collections" className="btn">
              Explore Collections
            </Link>
            <Link href="#contact" className="bs-link">
              Visit or Contact Us
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
