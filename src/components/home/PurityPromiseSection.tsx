'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

const promises = [
  {
    title: 'Certified Authenticity',
    text: 'Hallmarked and certified for genuine quality.',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
  {
    title: 'Pure & Premium Gold',
    text: 'Hallmarked gold, made to last.',
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5z" />
        <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
  },
  {
    title: 'Expert Craftsmanship',
    text: 'Shaped and finished by skilled artisans.',
    icon: (
      <>
        <path d="M14 4l6 6-3 3-6-6z" />
        <path d="M12 9L4 17a2 2 0 003 3l8-8" />
      </>
    ),
  },
  {
    title: 'Elegant Packaging',
    text: 'Gift-ready presentation with every order.',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" />
        <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
      </>
    ),
  },
];

// Fixed positions so server and client render identical particles
const dust = [
  { l: '8%', s: 4, d: 9, dl: 0 }, { l: '16%', s: 3, d: 12, dl: -5 }, { l: '27%', s: 5, d: 10, dl: -2 },
  { l: '38%', s: 3, d: 13, dl: -8 }, { l: '49%', s: 4, d: 11, dl: -4 }, { l: '61%', s: 3, d: 9, dl: -6 },
  { l: '72%', s: 5, d: 12, dl: -1 }, { l: '83%', s: 3, d: 10, dl: -7 }, { l: '92%', s: 4, d: 14, dl: -3 },
];

// Spotlight follows the cursor inside a card
const trackSpot = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  // k = page zoom factor (see html { zoom } in globals.css), so the spotlight stays under the cursor
  const k = r.width / e.currentTarget.offsetWidth || 1;
  e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left) / k}px`);
  e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top) / k}px`);
};

function PromiseCard({ p, i }: { p: (typeof promises)[number]; i: number }) {
  return (
    <li className="pu-card" style={{ '--d': `${0.5 + i * 0.12}s` } as React.CSSProperties} onMouseMove={trackSpot}>
      <span className="pu-no">0{i + 1}</span>
      <span className="pu-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {p.icon}
        </svg>
      </span>
      <b>{p.title}</b>
      <small>{p.text}</small>
    </li>
  );
}

export default function PurityPromiseSection() {
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
    <section ref={ref} className={`pu${visible ? ' in' : ''}`} aria-labelledby="pu-title">
      <div className="pu-dust" aria-hidden="true">
        {dust.map((d, i) => (
          <span key={i} style={{ left: d.l, width: d.s, height: d.s, animationDuration: `${d.d}s`, animationDelay: `${d.dl}s` }} />
        ))}
      </div>

      <div className="w">
        <div className="pu-head">
          <div className="pu-eyebrow">
            <span aria-hidden="true" />
            Our Assurance
            <span aria-hidden="true" />
          </div>
          <h2 id="pu-title">
            The Purity <em>Promise</em>
          </h2>
          <p>More than jewellery, we offer assurance, authenticity and a truly premium experience.</p>
        </div>

        <div className="pu-in">
          <ul className="pu-col left">
            {promises.slice(0, 2).map((p, i) => (
              <PromiseCard key={p.title} p={p} i={i} />
            ))}
          </ul>

          {/* Hallmark seal */}
          <div className="pu-seal" aria-label="Hallmarked Gold">
            <span className="pu-rays" aria-hidden="true" />
            <svg className="pu-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="pu-circle" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth=".8" strokeDasharray="2 5" />
              <text>
                <textPath href="#pu-circle" textLength="500" lengthAdjust="spacing">
                  PURITY • AUTHENTICITY • TRUST • PURITY • AUTHENTICITY • TRUST •
                </textPath>
              </text>
            </svg>
            <div className="pu-medal">
              <b>Gold</b>
              <span>Hallmarked</span>
            </div>
          </div>

          <ul className="pu-col right">
            {promises.slice(2).map((p, i) => (
              <PromiseCard key={p.title} p={p} i={i + 2} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
