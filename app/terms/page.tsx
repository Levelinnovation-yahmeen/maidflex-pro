import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/app/site-shell';

export const metadata: Metadata = {
  title: 'Website Terms | MaidFlex Pro',
  description: 'Terms governing use of the MaidFlex Pro website and online request forms.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <article className="legal-page">
        <p className="section-label">Website terms</p>
        <h1>Clear expectations start before the walkthrough.</h1>
        <p className="legal-updated">Last updated September 4, 2026</p>
        <p>These terms govern use of the MaidFlex Pro website. They are website terms only. Any cleaning service is governed by the proposal, scope of work and service agreement accepted for that property.</p>

        <h2>Requests are not bookings</h2>
        <p>Submitting a form requests follow-up. It does not guarantee service, crew availability, pricing, a particular start date or acceptance into the professional network. Coverage and scope must be confirmed by MaidFlex Pro.</p>

        <h2>Quotes and property information</h2>
        <p>Commercial quotes generally require a walkthrough or complete property review. Vacation-rental availability depends on location, turn timing, access and operating requirements. You agree to provide accurate information so MaidFlex can evaluate the request.</p>

        <h2>Acceptable use</h2>
        <p>You may not misuse the website, attempt to interfere with its operation, submit unlawful or misleading material, impersonate another person or use automated means to overload the forms.</p>

        <h2>Website content</h2>
        <p>Website descriptions explain general service capabilities and may change as coverage and offerings develop. Illustrative workflows are examples, not guarantees for a particular property. MaidFlex Pro names, branding and original website content may not be copied or represented as another business&apos;s materials.</p>

        <h2>Third-party systems</h2>
        <p>The website may rely on service providers for hosting, communications, scheduling or operations. MaidFlex Pro is not responsible for third-party services outside its reasonable control.</p>

        <h2>Contact</h2>
        <p>Questions about these website terms can be sent to <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a> or made by phone at <a href="tel:+18048029639">804-802-9639</a>.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
