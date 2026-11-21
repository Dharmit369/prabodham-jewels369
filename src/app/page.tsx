'use client';

import { useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import ScrollMarqueeSection from '@/components/home/ScrollMarqueeSection';
import TrustSection from '@/components/home/TrustSection';
import CollectionsSection from '@/components/home/CollectionsSection';
import ShopByPriceSection from '@/components/home/ShopByPriceSection';
import ArtisanSpotlightSection from '@/components/home/ArtisanSpotlightSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import JewelleryShowcaseSection from '@/components/home/JewelleryShowcaseSection';
import StyleItYourWaySection from '@/components/home/StyleItYourWaySection';
import BridalEditSection from '@/components/home/BridalEditSection';
import PurityPromiseSection from '@/components/home/PurityPromiseSection';
import BigTextMarqueeSection from '@/components/home/BigTextMarqueeSection';
import BrandStorySection from '@/components/home/BrandStorySection';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import GiftFinderSection from '@/components/home/GiftFinderSection';
import CareGuideSection from '@/components/home/CareGuideSection';
import CommunityGallerySection from '@/components/home/CommunityGallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import JournalSection from '@/components/home/JournalSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import OffersBar from '@/components/home/OffersBar';
import ServiceBar from '@/components/home/ServiceBar';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <AnnouncementBar activeSlide={activeSlide} />
      <Header />
      <main id="main-content">
        <HeroSection onSlideChange={setActiveSlide} activeSlide={activeSlide} />
        <ScrollMarqueeSection />
        <TrustSection />
        <CollectionsSection />
        <ShopByPriceSection />
        <ArtisanSpotlightSection />
        <FeaturedProductsSection />
        <JewelleryShowcaseSection />
        <StyleItYourWaySection />
        <BridalEditSection />
        <PurityPromiseSection />
        <BigTextMarqueeSection />
        <BrandStorySection />
        <CraftsmanshipSection />
        <GiftFinderSection />
        <CareGuideSection />
        <CommunityGallerySection />
        <TestimonialsSection />
        <JournalSection />
        <NewsletterSection />
        <OffersBar />
        <ServiceBar />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
