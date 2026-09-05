import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader({
  ctaHref = '/#contact',
  ctaLabel = 'Request a plan',
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className="site-header route-header">
      <Link className="brand" href="/" aria-label="MaidFlex Pro home">
        <Image
          src="/brand/maidflex-pro-logo.png"
          alt="MaidFlex Pro"
          width={293}
          height={75}
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/commercial/richmond">Richmond commercial</Link>
        <Link href="/vacation-rentals/rockies">Rockies rentals</Link>
        <Link href="/cleaners/apply">Cleaning professionals</Link>
      </nav>
      <Link className="button button-small" href={ctaHref}>
        {ctaLabel}
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Link className="footer-brand" href="/" aria-label="MaidFlex Pro home">
        <Image
          src="/brand/maidflex-pro-logo.png"
          alt="MaidFlex Pro"
          width={293}
          height={75}
        />
      </Link>
      <p>Richmond commercial. Rockies vacation rentals.</p>
      <div>
        <a href="tel:+18048029639">804-802-9639</a>
        <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
        <span>
          <Link href="/privacy">Privacy</Link> ·{' '}
          <Link href="/terms">Website terms</Link>
        </span>
        <span>© 2026 MaidFlex Pro</span>
      </div>
    </footer>
  );
}
