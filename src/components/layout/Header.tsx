'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

type MegaItem = { label: string; href: string; image: string };
type NavItem = {
  label: string;
  href: string;
  mega?: { title: string; links: { label: string; href: string }[]; cards: MegaItem[] };
};

const navItems: NavItem[] = [
  {
    label: 'Shop',
    href: '#collections',
    mega: {
      title: 'Shop by Category',
      links: [
        { label: 'Necklaces', href: '#collections' },
        { label: 'Earrings', href: '#collections' },
        { label: 'Rings', href: '#collections' },
        { label: 'Bangles', href: '#collections' },
        { label: 'Bestsellers', href: '#collections' },
        { label: 'New Arrivals', href: '#collections' },
      ],
      cards: [
        { label: 'Necklaces', href: '#collections', image: '/images/products/modern-necklaces.jpg' },
        { label: 'Earrings', href: '#collections', image: '/images/products/elegant-earrings.jpg' },
        { label: 'Rings', href: '#collections', image: '/images/products/designer-rings.jpg' },
      ],
    },
  },
  {
    label: 'Collections',
    href: '#occasion',
    mega: {
      title: 'Shop by Occasion',
      links: [
        { label: 'Wedding', href: '/collections/wedding' },
        { label: 'Festive', href: '/collections/festive' },
        { label: 'Party Wear', href: '/collections/party' },
        { label: 'Everyday', href: '/collections/everyday' },
        { label: 'Heritage Sets', href: '/collections/heritage-sets' },
        { label: 'Modern Twist', href: '/collections/modern-twist' },
      ],
      cards: [
        { label: 'Wedding', href: '/collections/wedding', image: '/images/occasions/wedding.jpg' },
        { label: 'Festive', href: '/collections/festive', image: '/images/occasions/festive.jpg' },
        { label: 'Everyday', href: '/collections/everyday', image: '/images/occasions/everyday.jpg' },
      ],
    },
  },
  { label: 'Bridal', href: '#bridal' },
  { label: 'Gifting', href: '#gift' },
  { label: 'Our Story', href: '#story' },
  { label: 'Offers', href: '#offers' },
];

const Icon = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  heart: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" />,
  bag: (
    <>
      <path d="M6 8h12l1 12H5z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  chevron: <path d="M6 9l6 6 6-6" />,
};

function Svg({ children, className = 'hd-ico' }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Header() {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Cart and wishlist start empty on the server and first client render
  // (see useLocalStorage), so these counts never cause a hydration mismatch.
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setDrawerOpen(false);
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchForm = (id: string) => (
    <form className="hd-search" role="search" onSubmit={handleSearch}>
      <label htmlFor={id} className="sr-only">
        Search jewellery
      </label>
      <Svg>{Icon.search}</Svg>
      <input
        id={id}
        type="search"
        placeholder="Search for necklaces, rings, earrings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );

  return (
    <header className={`hd${scrolled ? ' sc' : ''}`}>
      <div className="hd-wrap hd-main">
        <button className="hd-btn hd-burger" type="button" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
          <Svg>{Icon.menu}</Svg>
        </button>

        <Link href="/" className="hd-logo" aria-label="Prabodham Jewels home">
          <svg className="hd-mark" viewBox="0 0 32 24" aria-hidden="true">
            <path d="M16 0c3 4 4 8 0 14-4-6-3-10 0-14zM3 6c5 1 9 5 11 12C8 17 4 13 3 6zm26 0c-1 7-5 11-11 12 2-7 6-11 11-12zM0 12c4 0 8 3 11 10-6 0-10-3-11-10zm32 0c-1 7-5 10-11 10 3-7 7-10 11-10z" />
          </svg>
          <span>
            PRABODHAM JEWELS
            <small>FINE GOLD JEWELLERY</small>
          </span>
        </Link>

        <div className="hd-search-wrap">{searchForm('search-desktop')}</div>

        <div className="hd-actions">
          <Link href="#contact" className="hd-btn hd-hide-sm" aria-label="Contact us">
            <Svg>{Icon.phone}</Svg>
            <span className="hd-lbl">Contact</span>
          </Link>
          <button className="hd-btn" type="button" aria-label={`Wishlist, ${wishlistCount} items`}>
            <Svg>{Icon.heart}</Svg>
            <span className="hd-lbl">Wishlist</span>
            {wishlistCount > 0 && <span className="hd-badge">{wishlistCount}</span>}
          </button>
          <button className="hd-btn" type="button" aria-label={`Cart, ${totalItems} items`}>
            <Svg>{Icon.bag}</Svg>
            <span className="hd-lbl">Cart</span>
            {totalItems > 0 && <span className="hd-badge">{totalItems}</span>}
          </button>
        </div>
      </div>

      <div className="hd-search-mobile">{searchForm('search-mobile')}</div>

      <nav className="hd-nav" aria-label="Main">
        <ul className="hd-wrap">
          {navItems.map((item) => (
            <li key={item.label} className={item.mega ? 'has-mega' : undefined}>
              <Link href={item.href}>
                {item.label}
                {item.mega && <Svg className="hd-chev">{Icon.chevron}</Svg>}
              </Link>
              {item.mega && (
                <div className="hd-mega">
                  <div className="hd-wrap hd-mega-in">
                    <div>
                      <p className="hd-mega-title">{item.mega.title}</p>
                      <ul>
                        {item.mega.links.map((l) => (
                          <li key={l.label}>
                            <Link href={l.href}>{l.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="hd-mega-cards">
                      {item.mega.cards.map((c) => (
                        <Link key={c.label} href={c.href} className="hd-card">
                          <span className="hd-card-img">
                            <Image src={c.image} alt={c.label} fill sizes="220px" className="object-cover" />
                          </span>
                          <span>{c.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      <div className={`hd-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside className={`hd-drawer${drawerOpen ? ' open' : ''}`} aria-hidden={!drawerOpen} aria-label="Menu">
        <div className="hd-drawer-top">
          <span className="hd-drawer-brand">PRABODHAM JEWELS</span>
          <button className="hd-btn" type="button" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <Svg>{Icon.close}</Svg>
          </button>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={() => setDrawerOpen(false)}>
                {item.label}
              </Link>
              {item.mega && (
                <ul className="hd-drawer-sub">
                  {item.mega.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} onClick={() => setDrawerOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link href="#contact" className="btn g hd-drawer-cta" onClick={() => setDrawerOpen(false)}>
          Contact Us
        </Link>
      </aside>
    </header>
  );
}
