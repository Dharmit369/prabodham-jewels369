import { Shield, Truck, BadgeCheck, Heart } from 'lucide-react';

export default function ProductBenefitsSection() {
  const benefits = [
    { Icon: Shield, title: 'Secure Payments', desc: 'All transactions are encrypted' },
    { Icon: Truck, title: 'Easy Returns', desc: '30‑day hassle‑free returns' },
    { Icon: BadgeCheck, title: 'Certified Authentic', desc: 'Hallmarked gold guarantee' },
    { Icon: Heart, title: 'Dedicated Support', desc: 'Personalized assistance' },
  ];

  return (
    <section className="sec bg-ivory py-12" id="benefits">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <b.Icon size={32} className="text-primary-maroon" />
            <h3 className="font-heading text-primary-text font-medium">{b.title}</h3>
            <p className="text-sm text-[#7a6a5c]">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
