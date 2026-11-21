export default function TrustSection() {
  return (
    <div className="trust">
      <div className="w">
        <div>
          <i>
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
              <path d="M8.5 12l2.5 2.5L16 9.5" />
            </svg>
          </i>
          <p style={{ margin: 0 }}>
            <b>Certified Gold</b>
            <span>Pure &amp; premium quality</span>
          </p>
        </div>

        <div>
          <i>
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="8" width="18" height="4" />
              <path d="M12 8v13M5 12v9h14v-9M12 8c-1-3-4-4-5-2.5S9 8 12 8zM12 8c1-3 4-4 5-2.5S15 8 12 8z" />
            </svg>
          </i>
          <p style={{ margin: 0 }}>
            <b>Elegant Packaging</b>
            <span>Gift-ready every order</span>
          </p>
        </div>

        <div>
          <i>
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4 14v-2a8 8 0 0116 0v2" />
              <rect x="3" y="13" width="4" height="6" rx="1.5" />
              <rect x="17" y="13" width="4" height="6" rx="1.5" />
              <path d="M19 19c0 2-2 3-5 3" />
            </svg>
          </i>
          <p style={{ margin: 0 }}>
            <b>Dedicated Support</b>
            <span>We’re here to help</span>
          </p>
        </div>
      </div>
    </div>
  );
}
