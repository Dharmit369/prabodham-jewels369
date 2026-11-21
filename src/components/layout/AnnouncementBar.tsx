'use client';

import { useState, useEffect, useRef } from 'react';

const announcementMessages = [
  'TIMELESS JEWELLERY, ROOTED IN ROYAL HERITAGE',
  'ELEGANCE THAT BECOMES YOUR SIGNATURE',
  'CRAFTED TO CAPTURE THE RADIANCE OF EVERY MOMENT',
];

interface AnnouncementBarProps {
  activeSlide?: number;
}

export default function AnnouncementBar({ activeSlide = 0 }: AnnouncementBarProps) {
  const [displayIndex, setDisplayIndex] = useState(activeSlide);
  const [transitionState, setTransitionState] = useState<'active' | 'exiting' | 'entering'>('active');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeSlide === displayIndex) return;

    // Fade out and drift up slightly
    setTransitionState('exiting');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDisplayIndex(activeSlide);
      setTransitionState('entering');

      // Next frame: smoothly fade in and settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionState('active');
        });
      });
    }, 280);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeSlide, displayIndex]);

  return (
    <div className="ann" role="region" aria-label="Announcement">
      <span className={`ann-text ${transitionState}`}>
        {announcementMessages[displayIndex]}
      </span>
    </div>
  );
}
