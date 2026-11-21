'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    title: 'Design',
    tag: 'Hand-drawn concepts',
    desc: 'Inspired by heritage, crafted for today.',
    image: '/images/craft/step-1.jpg',
    alt: 'Artisan sketching a necklace design by hand',
    icon: (
      <>
        <path d="M4 20l4-1 11-11-3-3L5 16z" />
        <path d="M14 6l3 3" />
      </>
    ),
  },
  {
    step: '02',
    title: 'Craft',
    tag: 'Shaped by hand',
    desc: 'Hand-finished with exceptional care.',
    image: '/images/craft/step-2.jpg',
    alt: 'Artisan working on a piece of jewellery with a fine flame',
    icon: <path d="M12 3c2 4 6 6 6 11a6 6 0 01-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-3-1-5 0-7z" />,
  },
  {
    step: '03',
    title: 'Create',
    tag: 'Checked for perfection',
    desc: 'Every piece is meticulously checked for perfection.',
    image: '/images/craft/step-3.jpg',
    alt: 'Finished necklace displayed on velvet',
    icon: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </>
    ),
  },
];

export default function CraftsmanshipSection() {
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
    <section ref={ref} className={`sec cs${visible ? ' in' : ''}`} aria-labelledby="cs-title">
      <div className="w">
        <div className="ey">Craftsmanship &amp; Artistry</div>
        <h2 className="sh" id="cs-title">
          The Art Behind Every <em>Masterpiece</em>
        </h2>
        <p className="sub">
          A perfect blend of traditional techniques and modern precision, brought to life by our skilled artisans.
        </p>

        <div className="cs-track">
          {/* Gold timeline that draws in, with a travelling sparkle */}
          <span className="cs-line" aria-hidden="true">
            <span className="cs-fill" />
            <span className="cs-runner" />
          </span>

          <ol className="cs-steps">
            {steps.map((s, i) => (
              <li key={s.step} className="cs-step" style={{ '--i': i } as React.CSSProperties}>
                <span className="cs-node" aria-hidden="true">
                  {s.step}
                </span>

                <article className="cs-card">
                  <div className="cs-img">
                    <Image src={s.image} alt={s.alt} fill sizes="(max-width: 860px) 90vw, 360px" />
                    <span className="cs-tag">{s.tag}</span>
                  </div>
                  <div className="cs-body">
                    <span className="cs-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {s.icon}
                      </svg>
                    </span>
                    <div>
                      <small>Step {s.step}</small>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="cs-foot">
          <p>From the first sketch to the final polish, every piece passes through skilled hands.</p>
          <Link href="#story" className="cs-link">
            Meet Our Artisans
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
