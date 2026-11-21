import { Suspense } from 'react';
import Link from 'next/link';

export async function generateStaticParams() {
  return [
    { id: 'wedding' },
    { id: 'festive' },
    { id: 'gifting' },
    { id: 'party' },
    { id: 'everyday' },
    { id: 'earrings' },
    { id: 'classic-gold' },
    { id: 'heritage-sets' },
    { id: 'modern-twist' },
    { id: 'gift-ideas' },
  ];
}

async function CollectionContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const title = id.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="w text-center py-16">
      <div className="ey">PRABODHAM JEWELS</div>
      <h1 className="text-4xl md:text-5xl font-serif text-[#561220] mb-4">
        {title} COLLECTION
      </h1>
      <p className="text-lg text-[#7a6a5a] max-w-lg mx-auto mb-8">
        Discover handcrafted, hallmarked gold pieces curated specifically for {title.toLowerCase()}.
      </p>
      <Link href="/#collections" className="btn g">
        Explore All Collections
      </Link>
    </div>
  );
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <section className="sec" id="collection-detail">
      <Suspense fallback={<div className="text-center py-16">Loading collection...</div>}>
        <CollectionContent params={params} />
      </Suspense>
    </section>
  );
}
