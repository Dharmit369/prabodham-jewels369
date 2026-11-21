'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Priya Shah',
    avatar: '/images/testimonials/priya-shah.jpg',
    quote: 'The craftsmanship is just exceptional! The jewellery looks even more beautiful in real than in pictures.',
  },
  {
    name: 'Riddhi Mehta',
    avatar: '/images/testimonials/riddhi-mehta.jpg',
    quote: 'Pure gold, elegant designs and amazing finish. I wore it for my wedding and received so many compliments!',
  },
  {
    name: 'Ayesha Patel',
    avatar: '/images/testimonials/ayesha-patel.jpg',
    quote: 'Great quality, timely delivery and beautiful packaging. PRABODHAM JEWELS has truly won my trust!',
  },
];

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
  </svg>
);

export default function TestimonialsSection() {
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
    <section ref={ref} className={`sec alt tm${visible ? ' in' : ''}`} aria-labelledby="tm-title">
      <div className="w">
        <div className="ey">Testimonials</div>
        <h2 className="sh" id="tm-title">
          Loved by Our <em>Customers</em>
        </h2>
        <p className="sub">Hear from our happy customers who made their special moments more memorable.</p>

        <ul className="tm-grid">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={`tm-card${i === 1 ? ' feat' : ''}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="tm-top">
                <span className="tm-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <span className="tm-stars" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ '--s': s } as React.CSSProperties}>
                      <Star />
                    </span>
                  ))}
                </span>
              </div>

              <blockquote className="tm-quote">{t.quote}</blockquote>

              <div className="tm-who">
                <span className="tm-avatar">
                  <Image src={t.avatar} alt={t.name} width={56} height={56} />
                </span>
                <div>
                  <b>{t.name}</b>
                  <span className="tm-verified">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    Verified Buyer
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
