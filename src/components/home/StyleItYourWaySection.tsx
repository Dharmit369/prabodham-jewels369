'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';

// Each look slot uses a styled bundle photo, linked to a real product in the catalogue
const lookSlots = [
  { label: 'Necklace', productId: '1', image: '/images/bundle/necklace.jpg' },
  { label: 'Earrings', productId: '6', image: '/images/bundle/earrings.jpg' },
  { label: 'Ring', productId: '7', image: '/images/bundle/ring.jpg' },
  { label: 'Bangles', productId: '5', image: '/images/bundle/bangles.jpg' },
].flatMap((slot) => {
  const product = products.find((p) => p.id === slot.productId);
  return product ? [{ ...slot, name: product.name, price: product.price }] : [];
});

const formatINR = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** Smoothly animates a number to its new value. */
function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fromRef.current = target;
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (target - from) * (1 - Math.pow(1 - t, 3));
      fromRef.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function StyleItYourWaySection() {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<string[]>(() => lookSlots.map((s) => s.productId));
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const chosen = lookSlots.filter((s) => selected.includes(s.productId));
  const total = chosen.reduce((sum, s) => sum + s.price, 0);
  const animatedTotal = useAnimatedNumber(total);

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
    return () => {
      observer.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleAdd = () => {
    if (!chosen.length) return;
    chosen.forEach((s) => addToCart(s.productId, 1));
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section ref={ref} className={`sec alt sy${visible ? ' in' : ''}`} id="bundle">
      <div className="w">
        <div className="ey">Complete the Look</div>
        <h2 className="sh">
          Style It <em>Your Way</em>
        </h2>
        <p className="sub">Tap to pick your pieces and build a complete, elegant look.</p>

        <div className="sy-grid">
          {lookSlots.map((s, i) => {
            const on = selected.includes(s.productId);
            return (
              <div key={s.productId} className="sy-slot" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <button
                  type="button"
                  className={`sy-card${on ? ' on' : ''}`}
                  onClick={() => toggle(s.productId)}
                  aria-pressed={on}
                  aria-label={`${on ? 'Remove' : 'Add'} ${s.name} ${on ? 'from' : 'to'} your look`}
                >
                  <span className="sy-img">
                    <Image src={s.image} alt="" width={300} height={330} sizes="(max-width: 640px) 45vw, 260px" />
                  </span>
                  <span className="sy-label">{s.label}</span>
                  <span className="sy-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="sy-body">
                    <span className="sy-name">{s.name}</span>
                    <span className="sy-price">{formatINR(s.price)}</span>
                    <span className="sy-state">{on ? 'In your look' : 'Tap to add'}</span>
                  </span>
                </button>
                {i < lookSlots.length - 1 && (
                  <span className="sy-plus" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 6v12M6 12h12" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="sy-bar">
          <div className="sy-bar-left">
            <div className="sy-thumbs" aria-hidden="true">
              {chosen.map((s) => (
                <span key={s.productId} className="sy-thumb">
                  <Image src={s.image} alt="" width={52} height={52} />
                </span>
              ))}
            </div>
            <div>
              <small>Your Look</small>
              <span className="sy-count">
                {chosen.length} {chosen.length === 1 ? 'piece' : 'pieces'} selected
              </span>
            </div>
          </div>

          <div className="sy-total">
            <small>Total</small>
            <b>{formatINR(animatedTotal)}</b>
          </div>

          <button
            type="button"
            className={`btn g sy-btn${added ? ' done' : ''}`}
            onClick={handleAdd}
            disabled={!chosen.length}
          >
            {added
              ? 'Added to Cart ✓'
              : chosen.length === lookSlots.length
                ? 'Add Full Set to Cart'
                : `Add ${chosen.length} ${chosen.length === 1 ? 'Piece' : 'Pieces'} to Cart`}
          </button>
        </div>
      </div>
    </section>
  );
}
