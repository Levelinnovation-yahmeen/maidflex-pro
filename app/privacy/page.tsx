import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/app/site-shell';

export const metadata: Metadata = {
  title: 'Privacy Notice | MaidFlex Pro',
  description:
    'How MaidFlex Pro handles information submitted through this website.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <article className="legal-page">
        <p className="section-label">Privacy notice</p>
        <h1>Your information should have a clear job.</h1>
        <p className="legal-updated">Last updated September 4, 2026</p>
        <p>
          This notice explains how MaidFlex Pro handles information submitted
          through this website. It applies to prospective customers, property
          operators and cleaning professionals using our online forms.
        </p>

        <h2>Information we collect</h2>
        <p>
          We collect the contact and operational information you choose to
          provide, such as your name, business or property name, email, phone
          number, service location, property details, schedule, cleaning needs,
          professional experience and availability.
        </p>
        <p>
          Do not submit Social Security numbers, driver&apos;s-license images,
          bank information, W-9 forms or insurance documents through the public
          application. Qualified applicants receive separate instructions for
          any later verification.
        </p>

        <h2>How we use it</h2>
        <p>
          We use submitted information to evaluate service requests, confirm
          coverage, prepare walkthroughs or turnover plans, review
          professional-network applications, communicate with you and improve
          our operating process.
        </p>

        <h2>How information is shared</h2>
        <p>
          We may share information with service providers that support our
          website, communications, scheduling, customer management and
          operations, or when required to protect legal rights and comply with
          law. We do not sell personal information.
        </p>

        <h2>Retention and safeguards</h2>
        <p>
          We retain information only as long as reasonably needed for the
          purpose it was collected, our operating records and applicable legal
          obligations. We use reasonable administrative and technical
          safeguards, but no internet transmission or storage method can be
          guaranteed completely secure.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask to review, correct or delete information you submitted,
          subject to records we must retain. You may also ask us to stop
          nonessential communications.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or requests can be sent to{' '}
          <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a> or made
          by phone at <a href="tel:+18048029639">804-802-9639</a>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
