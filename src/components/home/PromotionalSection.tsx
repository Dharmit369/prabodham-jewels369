import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function PromotionalSection() {
  return (
    <section className="sec bg-gold py-12" id="promotions">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-heading text-dark-maroon mb-4">Special Offers</h2>
        <p className="text-dark-maroon mb-6 max-w-2xl mx-auto">
          Enjoy exclusive discounts on our signature gold collections. Limited time only!
        </p>
        <Link
          href="#collections"
          className="btn bg-primary-maroon text-white hover:bg-deep-maroon inline-block px-4 py-2 rounded"
        >
          Shop Collections
        </Link>
        <div className="mt-8 relative aspect-square max-w-md mx-auto">
          <Image src="/images/placeholder.svg" alt="Promotion" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}
