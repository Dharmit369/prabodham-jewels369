'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
  {
    category: 'Styling Guide',
    title: 'How to Style a Statement Ring',
    excerpt: 'Pair one bold ring with simple pieces and let it lead the look.',
    image: '/images/journal/article-1.jpg',
  },
  {
    category: 'Bridal Edit',
    title: 'Choosing Jewellery for Your Wedding Day',
    excerpt: 'Match your necklace to your neckline and build the set around it.',
    image: '/images/journal/article-2.jpg',
  },
  {
    category: 'Care Guide',
    title: 'Keeping Your Gold Shining',
    excerpt: 'Simple daily habits that keep every piece bright for years.',
    image: '/images/journal/article-3.jpg',
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function JournalSection() {
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
    <section ref={ref} className={`sec jr${visible ? ' in' : ''}`} id="journal" aria-labelledby="jr-title">
      <div className="w">
        <div className="ey">The Journal</div>
        <h2 className="sh" id="jr-title">
          Style Stories &amp; <em>Guides</em>
        </h2>
        <p className="sub">Inspiration, styling ideas and care tips from the world of PRABODHAM JEWELS.</p>

        <div className="jr-wrap">
          {/* Editor's note panel */}
          <aside className="jr-panel">
            <svg className="jr-mandala" viewBox="0 0 200 200" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth=".6">
                <circle cx="100" cy="100" r="96" />
                <circle cx="100" cy="100" r="74" strokeDasharray="2 4" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <ellipse key={i} cx="100" cy="44" rx="11" ry="34" transform={`rotate(${i * 30} 100 100)`} />
                ))}
              </g>
            </svg>
            <span className="jr-spark s1" aria-hidden="true" />
            <span className="jr-spark s2" aria-hidden="true" />

            <div className="jr-panel-in">
              <span className="jr-eyebrow">Editor&rsquo;s Note</span>
              <p className="jr-quote">
                Jewellery tells your story. Here&rsquo;s how to <em>choose it</em>, <em>wear it</em> and{' '}
                <em>care for it</em>.
              </p>
              <ul className="jr-topics" aria-label="Topics">
                <li>Styling</li>
                <li>Bridal</li>
                <li>Care</li>
              </ul>
              <Link href="#story" className="btn g jr-all">
                View All Stories
                <Arrow />
              </Link>
            </div>
          </aside>

          {/* Article list */}
          <ol className="jr-list">
            {articles.map((a, i) => (
              <li key={a.title} className="jr-row" style={{ '--i': i } as React.CSSProperties}>
                <Link href="#story" className="jr-link">
                  <span className="jr-no" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="jr-thumb">
                    <Image src={a.image} alt="" width={120} height={120} />
                  </span>
                  <div className="jr-text">
                    <span className="jr-cat">{a.category}</span>
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                  </div>
                  <span className="jr-go" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
