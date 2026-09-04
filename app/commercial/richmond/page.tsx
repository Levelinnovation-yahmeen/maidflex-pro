import type { Metadata } from 'next';
import Image from 'next/image';
import { Building2, CalendarCheck, Camera, CheckCircle2, ClipboardCheck, Clock3, ShieldCheck } from 'lucide-react';
import { RequestForm } from '@/app/request-form';
import { SiteFooter, SiteHeader } from '@/app/site-shell';

export const metadata: Metadata = {
  title: 'Commercial Cleaning in Richmond, VA | MaidFlex Pro',
  description: 'Walkthrough-based commercial cleaning plans for Richmond gyms, offices, managed properties, medical facilities and high-traffic spaces.',
  alternates: { canonical: '/commercial/richmond' },
  openGraph: {
    title: 'Richmond Commercial Cleaning | MaidFlex Pro',
    description: 'A clear scope, reliable crew coverage and documented service for Richmond facilities.',
    url: '/commercial/richmond',
    images: [{ url: '/brand/maidflex-commercial-team.png', alt: 'MaidFlex Pro commercial cleaning team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richmond Commercial Cleaning | MaidFlex Pro',
    description: 'Walkthrough-based cleaning plans for Richmond facilities.',
    images: ['/brand/maidflex-commercial-team.png'],
  },
};

const serviceTypes = [
  'Recurring janitorial service',
  'Gyms and fitness facilities',
  'Multifamily and managed properties',
  'Offices and coworking spaces',
  'Medical and dental offices',
  'Daycares and schools',
  'Banks and auto dealerships',
  'Post-construction and specialty work',
];

export default function RichmondCommercialPage() {
  return (
    <main>
      <SiteHeader ctaHref="#walkthrough" ctaLabel="Book a walkthrough" />

      <section className="route-hero route-hero-split">
        <div className="route-hero-copy">
          <p className="eyebrow">Richmond, Virginia · Commercial cleaning</p>
          <h1>A cleaning operation built around your facility.</h1>
          <p>
            MaidFlex Pro scopes the traffic, timing, surfaces, access and quality expectations before service starts—so your proposal is workable and your crew knows exactly what success looks like.
          </p>
          <div className="hero-actions">
            <a className="button" href="#walkthrough">Request a walkthrough <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="tel:+18048029639">Call 804-802-9639</a>
          </div>
          <div className="trust-row">
            <span>Walkthrough-based scopes</span>
            <span>After-hours options</span>
            <span>Documented service plans</span>
          </div>
        </div>
        <div className="route-image">
          <Image src="/brand/maidflex-commercial-team.png" alt="Commercial cleaning professionals working inside a modern Richmond facility" fill sizes="(max-width: 900px) 100vw, 48vw" priority />
        </div>
      </section>

      <section className="route-proof-bar" aria-label="Commercial service standards">
        <span><ClipboardCheck aria-hidden="true" /> Clear scope</span>
        <span><CalendarCheck aria-hidden="true" /> Confirmed schedule</span>
        <span><Camera aria-hidden="true" /> Quality documentation</span>
        <span><ShieldCheck aria-hidden="true" /> Insured professional standards</span>
      </section>

      <section className="section route-offer-grid">
        <div>
          <p className="section-label">What we scope</p>
          <h2>Not every building needs the same checklist.</h2>
          <p className="route-lead">We quote after a walkthrough or a complete photo and video review. Your plan accounts for the details that actually drive labor, quality and consistency.</p>
        </div>
        <div className="service-list">
          {serviceTypes.map((service) => <div key={service}><CheckCircle2 aria-hidden="true" /><span>{service}</span></div>)}
        </div>
      </section>

      <section className="section route-steps dark-section">
        <div>
          <p className="section-label section-label-light">The commercial launch path</p>
          <h2>From walkthrough to first clean.</h2>
        </div>
        <ol>
          <li><span>01</span><div><h3>Walk the facility</h3><p>We document square footage, floors, restrooms, trash volume, high-touch zones, access and special requirements.</p></div></li>
          <li><span>02</span><div><h3>Build the proposal</h3><p>You receive a defined scope, frequency, supply plan and price—not a vague estimate.</p></div></li>
          <li><span>03</span><div><h3>Prepare the crew</h3><p>Access instructions, checklists and site expectations are confirmed before launch.</p></div></li>
          <li><span>04</span><div><h3>Verify service</h3><p>Completion updates, checklists and issue reporting create accountability after the crew leaves.</p></div></li>
        </ol>
      </section>

      <section className="section walkthrough-page" id="walkthrough">
        <div className="walkthrough-page-intro">
          <p className="section-label">Request a walkthrough</p>
          <h2>Give us the operating facts.</h2>
          <p>Complete the intake and MaidFlex will review the property before discussing schedule and pricing. No payment is collected here.</p>
          <div className="response-standard"><Clock3 aria-hidden="true" /><div><strong>Response standard</strong><span>Initial follow-up within one business day. Proposals follow the completed walkthrough or property review.</span></div></div>
          <div className="mini-contact"><Building2 aria-hidden="true" /><div><span>Prefer to talk first?</span><a href="tel:+18048029639">804-802-9639</a></div></div>
        </div>
        <RequestForm lockedMarket="Richmond commercial" compact />
      </section>

      <SiteFooter />
    </main>
  );
}
