import Link from 'next/link';
import Image from 'next/image';

const occasions = [
  { id: 'wedding', title: 'Wedding', image: '/images/occasions/wedding.jpg' },
  { id: 'festive', title: 'Festive', image: '/images/occasions/festive.jpg' },
  { id: 'gifting', title: 'Gifting', image: '/images/occasions/gifting.jpg' },
  { id: 'party', title: 'Party', image: '/images/occasions/party.jpg' },
  { id: 'everyday', title: 'Everyday', image: '/images/occasions/everyday.jpg' },
  { id: 'earrings', title: 'Earrings', image: '/images/occasions/earrings.jpg' },
];

export default function CollectionsSection() {
  return (
    <section className="sec" id="occasion">
      <div className="w">
        <div className="ey">Curated for Every Moment</div>
        <h2 className="sh">
          Shop by <em>Occasion</em>
        </h2>
        <p className="sub">
          From grand weddings to festive celebrations, find the perfect piece for every occasion.
        </p>

        <div className="oc">
          {occasions.map((item) => (
            <Link key={item.id} href={`/collections/${item.id}`}>
              <div className="ci">
                <span className="ci-in">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={140}
                    height={140}
                    className="rounded-full object-cover"
                  />
                </span>
              </div>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
