import type { Metadata } from 'next';
import Image from 'next/image';
import { CalendarClock, Camera, CheckCircle2, Clock3, KeyRound, PackageCheck, Sparkles } from 'lucide-react';
import { RequestForm } from '@/app/request-form';
import { SiteFooter, SiteHeader } from '@/app/site-shell';

export const metadata: Metadata = {
  title: 'Vacation-Rental Turnovers in the Rockies | MaidFlex Pro',
  description: 'Guest-ready vacation-rental turnovers built around checkout windows, linens, restocking, access and completion documentation across supported Rocky Mountain markets.',
  alternates: { canonical: '/vacation-rentals/rockies' },
  openGraph: {
    title: 'Rockies Vacation-Rental Turnovers | MaidFlex Pro',
    description: 'Deadline-driven property resets for owners and managers across supported Rocky Mountain markets.',
    url: '/vacation-rentals/rockies',
    images: [{ url: '/brand/maidflex-cleaning-team.png', alt: 'MaidFlex Pro vacation-rental turnover team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rockies Vacation-Rental Turnovers | MaidFlex Pro',
    description: 'Guest-ready turnovers with documented completion.',
    images: ['/brand/maidflex-cleaning-team.png'],
  },
};

const standards = [
  { icon: Sparkles, title: 'Full property reset', copy: 'Beds, baths, kitchen, floors and presentation are worked from a property-specific checklist.' },
  { icon: PackageCheck, title: 'Restock accountability', copy: 'Consumables and amenities are checked against the agreed par level and shortages are surfaced.' },
  { icon: Camera, title: 'Completion evidence', copy: 'Photos and issue flags document the property condition before the next guest arrives.' },
  { icon: KeyRound, title: 'Access discipline', copy: 'Lockbox, smart-lock and property instructions are documented for the assigned team.' },
];

export default function RockiesTurnoversPage() {
  return (
    <main>
      <SiteHeader ctaHref="#turnover-plan" ctaLabel="Plan a turnover" />

      <section className="route-hero route-hero-split route-hero-dark">
        <div className="route-hero-copy">
          <p className="eyebrow section-label-light">Rocky Mountain region · Vacation rentals</p>
          <h1>Every checkout starts a clock.</h1>
          <p>
            MaidFlex Pro treats vacation-rental cleaning as hospitality operations: a defined turn window, a property-specific reset, visible issue reporting and a guest-ready finish.
          </p>
          <div className="hero-actions">
            <a className="button" href="#turnover-plan">Build a turnover plan <span aria-hidden="true">↘</span></a>
            <a className="text-link text-link-light" href="tel:+18048029639">Call 804-802-9639</a>
          </div>
          <p className="coverage-note">Coverage is confirmed by exact property location and active crew capacity.</p>
        </div>
        <div className="route-image">
          <Image src="/brand/maidflex-guest-ready-property.jpg" alt="A guest-ready vacation rental prepared for the next arrival" fill sizes="(max-width: 900px) 100vw, 48vw" priority />
        </div>
      </section>

      <section className="section standards-section">
        <div className="section-heading">
          <div><p className="section-label">The turnover standard</p><h2>Guest-ready means more than clean.</h2></div>
          <p>The property has to be reset, checked and ready on time. Each scope is built around the home and the booking rhythm.</p>
        </div>
        <div className="standards-grid">
          {standards.map(({ icon: Icon, title, copy }) => (
            <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="section route-image-story route-image-story-warm" id="guest-ready-reset" aria-labelledby="rockies-reset-title">
        <div className="route-image-story-copy">
          <p className="section-label">The reset in view</p>
          <h2 id="rockies-reset-title">Clean, restocked and put back together.</h2>
          <p>The standard is the full guest experience—not merely the surfaces. Presentation, details and property condition are handled as one turnover.</p>
        </div>
        <figure className="route-story-image route-story-image-wide">
          <Image src="/brand/maidflex-hospitality-reset.jpg" alt="A MaidFlex professional resetting the living area of a vacation rental" fill sizes="(max-width: 760px) 100vw, 44vw" />
          <figcaption>Guest-ready property reset</figcaption>
        </figure>
        <figure className="route-story-image">
          <Image src="/brand/maidflex-quality-detail.jpg" alt="Detailed upholstery cleaning during a vacation-rental turnover" fill sizes="(max-width: 760px) 100vw, 24vw" />
          <figcaption>Detail work when the property needs it</figcaption>
        </figure>
      </section>

      <section className="section turnover-clock-section">
        <div>
          <p className="section-label section-label-light">A documented turn</p>
          <h2>Built around the arrival—not a weekly route.</h2>
          <p>Back-to-back bookings leave no room for assumptions. The turn plan aligns the cleaner, access, linen method, restocking and final check to the property deadline.</p>
        </div>
        <div className="turnover-timeline">
          <div className="timeline-head"><CalendarClock aria-hidden="true" /><div><span>Example turn window</span><strong>10:00 AM → 4:00 PM</strong></div></div>
          <ol>
            <li><span>10:00</span><div><strong>Guest departure</strong><small>Access and condition check</small></div></li>
            <li><span>10:30</span><div><strong>Reset begins</strong><small>Clean, linen and restock scope</small></div></li>
            <li><span>2:45</span><div><strong>Final quality pass</strong><small>Checklist, issue flags and images</small></div></li>
            <li><span>3:30</span><div><strong>Property released</strong><small>Ready ahead of guest arrival</small></div></li>
          </ol>
          <p>Illustrative timing; every property plan is confirmed separately.</p>
        </div>
      </section>

      <section className="section portfolio-fit-section">
        <div><p className="section-label">Who this is built for</p><h2>One home, a growing portfolio or local operations.</h2></div>
        <div className="portfolio-fit-list">
          <div><CheckCircle2 aria-hidden="true" /><span>Owners managing active Airbnb or VRBO calendars</span></div>
          <div><CheckCircle2 aria-hidden="true" /><span>Property managers coordinating multiple homes</span></div>
          <div><CheckCircle2 aria-hidden="true" /><span>Teams that need same-day and back-to-back turnover planning</span></div>
          <div><CheckCircle2 aria-hidden="true" /><span>Operators who need completion visibility without being on-site</span></div>
        </div>
      </section>

      <section className="section walkthrough-page" id="turnover-plan">
        <div className="walkthrough-page-intro">
          <p className="section-label">Request a turnover plan</p>
          <h2>Start with the property facts.</h2>
          <p>Tell us where the property is, how often it turns and how the operation works today. We will confirm whether the location and timing fit current coverage.</p>
          <div className="response-standard"><Clock3 aria-hidden="true" /><div><strong>Response standard</strong><span>Initial follow-up within one business day. Availability is not confirmed until the property and calendar are reviewed.</span></div></div>
        </div>
        <RequestForm lockedMarket="Rockies vacation rental" compact />
      </section>

      <SiteFooter />
    </main>
  );
}
