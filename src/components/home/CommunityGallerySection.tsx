'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const galleryItems = [
  { alt: 'Customer moment with necklace', caption: 'Bridal Glow', src: '/images/gallery/moment-1.jpg' },
  { alt: 'Gold bracelet details', caption: 'Delicate Details', src: '/images/gallery/moment-2.jpg' },
  { alt: 'Festive celebration moment', caption: 'Festive Radiance', src: '/images/gallery/moment-3.jpg' },
  { alt: 'Gold pendant shine', caption: 'Ruby Pendant', src: '/images/gallery/moment-4.jpg' },
  { alt: 'Bridal gold styling', caption: 'Evening Elegance', src: '/images/gallery/moment-5.jpg' },
  { alt: 'Customer smile with jewellery', caption: 'Everyday Charm', src: '/images/gallery/moment-6.jpg' },
];

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function CommunityGallerySection() {
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
    <section ref={ref} className={`sec cm${visible ? ' in' : ''}`} aria-labelledby="cm-title">
      <div className="w">
        <div className="ey">Our Community</div>
        <h2 className="sh" id="cm-title">
          #Prabodham<em>Moments</em>
        </h2>
        <p className="sub">Special moments made more memorable with PRABODHAM JEWELS.</p>

        <ul className="cm-grid">
          {galleryItems.map((item, i) => (
            <li key={item.src} className="cm-item" style={{ '--i': i } as React.CSSProperties}>
              <figure className="cm-card">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 992px) 33vw, 200px" />
                <figcaption className="cm-over">
                  <span className="cm-cam">
                    <CameraIcon />
                  </span>
                  <span className="cm-cap">{item.caption}</span>
                  <span className="cm-tag">#PrabodhamMoments</span>
                </figcaption>
                <span className="cm-heart" aria-hidden="true">
                  <HeartIcon />
                </span>
              </figure>
            </li>
          ))}
        </ul>

        <div className="cm-foot">
          <span className="cm-foot-ico" aria-hidden="true">
            <CameraIcon />
          </span>
          <p>
            Wearing Prabodham? Tag your photos with <b>#PrabodhamMoments</b> to be featured here.
          </p>
        </div>
      </div>
    </section>
  );
}
