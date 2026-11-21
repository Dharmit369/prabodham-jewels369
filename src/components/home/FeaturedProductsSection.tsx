'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import type { Product } from '@/types/product';

type FilterType = 'all' | 'best' | 'new' | 'prem';

const AUTO_SCROLL_MS = 3000;

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'best', label: 'Best Sellers' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'prem', label: 'Premium Edit' },
];

const matches = (p: Product, f: FilterType) => f === 'all' || !!p.tags?.includes(f);

function badgeFor(p: Product): { text: string; kind: string } | null {
  if (p.tags?.includes('best')) return { text: 'Bestseller', kind: 'best' };
  if (p.tags?.includes('new')) return { text: 'New', kind: 'new' };
  if (p.tags?.includes('prem')) return { text: 'Premium', kind: 'prem' };
  return null;
}

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8h12l1 12H5z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'left' ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
);

export default function FeaturedProductsSection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [popId, setPopId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const filteredProducts = products.filter((p) => matches(p, filter));

  // Sliding tab indicator follows the active tab
  const moveIndicator = useCallback(() => {
    const active = tabsRef.current?.querySelector<HTMLButtonElement>('button.on');
    if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
  }, []);

  useLayoutEffect(() => {
    moveIndicator();
  }, [filter, moveIndicator]);

  useEffect(() => {
    window.addEventListener('resize', moveIndicator);
    return () => window.removeEventListener('resize', moveIndicator);
  }, [moveIndicator]);

  // Carousel progress + arrow state
  const updateScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    const raf = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(raf);
  }, [filter, updateScroll]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => clearTimeout(id));
  }, []);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>('.p');
    if (!el || !card) return;
    const max = el.scrollWidth - el.clientWidth;
    // Loop: at the end go back to the first product, at the start jump to the last
    if (dir === 1 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir === -1 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: dir * (card.offsetWidth + 22), behavior: 'smooth' });
    }
  }, []);

  // Auto-scroll one product at a time; pauses on hover/touch/focus,
  // when the section is off-screen or the tab is hidden, and for reduced-motion users.
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [filter]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current || document.hidden) return;
      scrollByCard(1);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [scrollByCard]);

  const pause = (value: boolean) => {
    pausedRef.current = value;
  };

  const handleAdd = (id: string) => {
    addToCart(id, 1);
    setAddedMap((prev) => ({ ...prev, [id]: true }));
    timers.current.push(
      window.setTimeout(() => setAddedMap((prev) => ({ ...prev, [id]: false })), 2000)
    );
  };

  const handleWish = (id: string) => {
    toggleWishlist(id);
    setPopId(id);
    timers.current.push(window.setTimeout(() => setPopId(null), 500));
  };

  return (
    <section className="sec fp" id="collections">
      <div className="w">
        <div className="ey">The Collection</div>
        <h2 className="sh">
          Curated <em>Collections</em>
        </h2>
        <p className="sub">
          Discover the latest designs and customer favourites, crafted to add timeless charm to every look.
        </p>

        <div className="fp-bar">
          <div className="pt" id="pt" ref={tabsRef} role="tablist" aria-label="Filter products">
            <span className="pt-ind" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} aria-hidden="true" />
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={filter === f.id ? 'on' : ''}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="pt-count">{products.filter((p) => matches(p, f.id)).length}</span>
              </button>
            ))}
          </div>

          <div className="fp-nav">
            <button type="button" aria-label="Previous products" onClick={() => scrollByCard(-1)} disabled={!canPrev}>
              <Arrow dir="left" />
            </button>
            <button type="button" aria-label="Next products" onClick={() => scrollByCard(1)} disabled={!canNext}>
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div
          className="pg"
          id="pg"
          ref={trackRef}
          onScroll={updateScroll}
          key={filter}
          onMouseEnter={() => pause(true)}
          onMouseLeave={() => pause(false)}
          onTouchStart={() => pause(true)}
          // after a swipe, wait a moment before auto-scrolling again
          onTouchEnd={() => timers.current.push(window.setTimeout(() => pause(false), AUTO_SCROLL_MS))}
          onFocus={() => pause(true)}
          onBlur={() => pause(false)}
        >
          {filteredProducts.map((p, i) => {
            const isFav = isWishlisted(p.id);
            const isAdded = addedMap[p.id];
            const badge = badgeFor(p);

            return (
              <article key={p.id} className="p" style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                <div className="im">
                  <Image
                    src={p.images[0] || '/images/placeholder.svg'}
                    alt={p.name}
                    width={320}
                    height={320}
                    className="w-full aspect-square object-cover"
                  />
                  {badge && <span className={`p-badge ${badge.kind}`}>{badge.text}</span>}
                  <button
                    type="button"
                    className={`hr${isFav ? ' on' : ''}${popId === p.id ? ' pop' : ''}`}
                    aria-label={isFav ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                    aria-pressed={isFav}
                    onClick={() => handleWish(p.id)}
                  >
                    <HeartIcon />
                  </button>
                  <button type="button" className="p-quick" onClick={() => handleAdd(p.id)} tabIndex={-1} aria-hidden="true">
                    {isAdded ? <CheckIcon /> : <BagIcon />}
                    {isAdded ? 'Added' : 'Quick Add'}
                  </button>
                </div>

                <div className="p-body">
                  <span className="p-cat">{p.category}</span>
                  <h3>{p.name}</h3>
                  <div className="p-row">
                    <b>₹{p.price.toLocaleString('en-IN')}</b>
                    <button
                      type="button"
                      className={`add${isAdded ? ' done' : ''}`}
                      onClick={() => handleAdd(p.id)}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      {isAdded ? <CheckIcon /> : <BagIcon />}
                      <span>{isAdded ? 'Added' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="fp-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
        </div>
      </div>
    </section>
  );
}
