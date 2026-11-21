const services = [
  {
    title: 'Easy Returns',
    text: 'Within 7 days',
    icon: (
      <>
        <path d="M4 12a8 8 0 1 0 2.3-5.6" />
        <path d="M4 4v4h4" />
      </>
    ),
  },
  {
    title: 'Secure Payments',
    text: 'UPI · Cards · RuPay',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3M12 14v2" />
      </>
    ),
  },
  {
    title: 'Certified Authentic',
    text: 'Pure gold assured',
    icon: (
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M8.5 12l2.5 2.5L16 9.5" />
      </>
    ),
  },
  {
    title: 'Dedicated Support',
    text: 'We’re here to help',
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0116 0v2" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19c0 2-2 3-5 3" />
      </>
    ),
  },
];

export default function ServiceBar() {
  return (
    <section className="svx" aria-label="Our services">
      <ul className="w svx-grid">
        {services.map((s) => (
          <li key={s.title}>
            <span className="svx-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {s.icon}
              </svg>
            </span>
            <span>
              <b>{s.title}</b>
              <small>{s.text}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
