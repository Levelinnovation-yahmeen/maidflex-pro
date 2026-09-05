import type { Metadata } from 'next';
import Image from 'next/image';
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { ProfessionalApplication } from '@/app/professional-application';
import { SiteFooter, SiteHeader } from '@/app/site-shell';

export const metadata: Metadata = {
  title: 'Join the MaidFlex Pro Cleaning Network',
  description:
    'Apply for independent commercial cleaning and vacation-rental turnover opportunities in MaidFlex Pro service markets.',
  alternates: { canonical: '/cleaners/apply' },
  openGraph: {
    title: 'Cleaning Professionals | MaidFlex Pro',
    description:
      'Bring the skill. MaidFlex brings scoped cleaning opportunities in active service markets.',
    url: '/cleaners/apply',
    images: [
      {
        url: '/brand/maidflex-cleaning-team.png',
        alt: 'MaidFlex Pro cleaning professionals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Professionals | MaidFlex Pro',
    description:
      'Apply for independent cleaning opportunities in active MaidFlex markets.',
    images: ['/brand/maidflex-cleaning-team.png'],
  },
};

export default function CleanerApplicationPage() {
  return (
    <main>
      <SiteHeader ctaHref="#application" ctaLabel="Start application" />

      <section className="route-hero route-hero-split professional-hero">
        <div className="route-hero-copy">
          <p className="eyebrow">
            Cleaning professionals · Network application
          </p>
          <h1>Bring the skill. We&apos;ll bring the scope.</h1>
          <p>
            MaidFlex Pro coordinates clearly scoped commercial cleaning and
            vacation-rental turnover opportunities for qualified independent
            professionals and cleaning teams.
          </p>
          <div className="hero-actions">
            <a className="button" href="#application">
              Apply to the network <span aria-hidden="true">↘</span>
            </a>
          </div>
          <p className="coverage-note coverage-note-dark">
            Applications are reviewed against active service areas, current
            demand and each property&apos;s requirements.
          </p>
        </div>
        <div className="route-image">
          <Image
            src="/brand/maidflex-professional-ready.jpg"
            alt="A cleaning professional prepared with equipment and supplies"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            priority
          />
        </div>
      </section>

      <section
        className="route-proof-bar professional-proof"
        aria-label="MaidFlex professional network benefits"
      >
        <span>
          <BriefcaseBusiness aria-hidden="true" /> Scoped opportunities
        </span>
        <span>
          <CalendarCheck aria-hidden="true" /> Clear property schedules
        </span>
        <span>
          <BadgeCheck aria-hidden="true" /> Documented expectations
        </span>
        <span>
          <ShieldCheck aria-hidden="true" /> Professional standards
        </span>
      </section>

      <section
        className="section route-image-story professional-image-story"
        id="professional-network"
        aria-labelledby="professional-network-title"
      >
        <div className="route-image-story-copy">
          <p className="section-label section-label-light">
            Built for professionals
          </p>
          <h2 id="professional-network-title">
            Independent doesn&apos;t have to mean unsupported.
          </h2>
          <p>
            MaidFlex brings the confirmed scope, schedule and property
            expectations so experienced professionals can focus on delivering
            the work.
          </p>
        </div>
        <figure className="route-story-image route-story-image-wide">
          <Image
            src="/brand/maidflex-team-service.jpg"
            alt="A coordinated cleaning team completing a property service"
            fill
            sizes="(max-width: 760px) 100vw, 44vw"
          />
          <figcaption>Opportunities sized for individuals and teams</figcaption>
        </figure>
        <figure className="route-story-image">
          <Image
            src="/brand/maidflex-coordination.jpg"
            alt="A cleaning professional reviewing assignment details on her phone"
            fill
            sizes="(max-width: 760px) 100vw, 24vw"
          />
          <figcaption>Clear assignment details before the job</figcaption>
        </figure>
      </section>

      <section className="section pro-expectations">
        <div>
          <p className="section-label">The right fit</p>
          <h2>Reliable is the baseline. Professional is the difference.</h2>
          <p>
            We look for people who communicate clearly, protect the property,
            follow the confirmed scope and take ownership of the finish.
          </p>
        </div>
        <div className="expectations-list">
          <div>
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>Operationally ready</strong>
              <span>
                Reliable transportation, working phone and the ability to reach
                the agreed service area.
              </span>
            </div>
          </div>
          <div>
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>Properly equipped</strong>
              <span>
                Professional equipment, approved products and any insurance
                required for the opportunity.
              </span>
            </div>
          </div>
          <div>
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>Detail accountable</strong>
              <span>
                Checklist discipline, completion updates and prompt issue
                reporting.
              </span>
            </div>
          </div>
          <div>
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>Client ready</strong>
              <span>
                Respectful communication, clean presentation and dependable
                arrival.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section application-section" id="application">
        <div className="application-intro">
          <p className="section-label section-label-light">
            Start the application
          </p>
          <h2>Tell us where and how you work.</h2>
          <p>
            This first step checks service area, capacity and professional
            readiness. It does not ask for identity documents, banking details
            or tax forms.
          </p>
          <ol>
            <li>
              <span>1</span>
              <div>
                <strong>Submit your fit</strong>
                <small>Experience, coverage and availability</small>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Complete screening</strong>
                <small>Only when an active need may fit</small>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Review opportunities</strong>
                <small>
                  Property scope and terms are confirmed before work
                </small>
              </div>
            </li>
          </ol>
          <p className="independent-note">
            MaidFlex network participation does not guarantee assignments.
            Opportunity terms, requirements and compensation are provided before
            acceptance.
          </p>
        </div>
        <ProfessionalApplication />
      </section>

      <SiteFooter />
    </main>
  );
}
