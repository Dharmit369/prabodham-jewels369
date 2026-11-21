'use client';

import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onSlideChange?: (index: number) => void;
  activeSlide?: number;
}

export default function HeroSection({ onSlideChange, activeSlide = 0 }: HeroSectionProps) {
  const activeIndexRef = useRef(activeSlide);

  // Keep ref in sync with external activeSlide
  useEffect(() => {
    activeIndexRef.current = activeSlide;
  }, [activeSlide]);

  // Rotate announcement bar messages every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (activeIndexRef.current + 1) % 3;
      activeIndexRef.current = nextSlide;
      onSlideChange?.(nextSlide);
    }, 7000);

    return () => clearInterval(timer);
  }, [onSlideChange]);

  return (
    <section className="hv" id="home" aria-label="Prabodham Jewels">
      <video className="hv-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/videos/Klickpin.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
