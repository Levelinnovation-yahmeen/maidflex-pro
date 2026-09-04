import Image from 'next/image';

export function SiteHeader({ ctaHref = '/#contact', ctaLabel = 'Request a plan' }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="site-header route-header">
      <a className="brand" href="/" aria-label="MaidFlex Pro home">
        <Image src="/brand/maidflex-pro-logo.png" alt="MaidFlex Pro" width={293} height={75} priority />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/commercial/richmond">Richmond commercial</a>
        <a href="/vacation-rentals/rockies">Rockies rentals</a>
        <a href="/cleaners/apply">Cleaning professionals</a>
      </nav>
      <a className="button button-small" href={ctaHref}>{ctaLabel}</a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <a className="footer-brand" href="/" aria-label="MaidFlex Pro home">
        <Image src="/brand/maidflex-pro-logo.png" alt="MaidFlex Pro" width={293} height={75} />
      </a>
      <p>Richmond commercial. Rockies vacation rentals.</p>
      <div>
        <a href="tel:+18048029639">804-802-9639</a>
        <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
        <span><a href="/privacy">Privacy</a> · <a href="/terms">Website terms</a></span>
        <span>© 2026 MaidFlex Pro</span>
      </div>
    </footer>
  );
}
