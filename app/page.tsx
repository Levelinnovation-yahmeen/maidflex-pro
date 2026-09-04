import Image from 'next/image';
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Camera,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Dumbbell,
  HardHat,
  Landmark,
  School,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from 'lucide-react';
import { RequestForm } from './request-form';

const industries = [
  {
    icon: Dumbbell,
    name: 'Gyms & fitness',
    line: 'Sweat is power. Clean is trust.',
    copy: 'Detail-driven service for floors, equipment zones, locker rooms, restrooms, and the member experience.',
  },
  {
    icon: Building2,
    name: 'Property management',
    line: 'From one unit to dozens.',
    copy: 'Turnovers, common areas, move-ins, and responsive cleaning that flexes with your portfolio.',
  },
  {
    icon: Stethoscope,
    name: 'Medical & dental',
    line: 'Clean spaces build confidence.',
    copy: 'Consistent, discreet service for patient-facing facilities where presentation and reliability matter.',
  },
  {
    icon: School,
    name: 'Daycares & schools',
    line: 'Ready for the next busy day.',
    copy: 'High-touch cleaning plans with green and non-toxic product options available upon request.',
  },
  {
    icon: BriefcaseBusiness,
    name: 'Offices & coworking',
    line: 'Professional from the front door in.',
    copy: 'Flexible recurring schedules for teams that need the workplace handled before business begins.',
  },
  {
    icon: Landmark,
    name: 'Banks & dealerships',
    line: 'Presentation without disruption.',
    copy: 'Security-conscious service for glass, showrooms, customer areas, workspaces, and daily turnover.',
  },
];

const steps = [
  {
    title: 'Walk the facility',
    copy: 'We document square footage, floor types, restrooms, high-touch zones, access, and special requirements.',
  },
  {
    title: 'Build the scope',
    copy: 'You receive a clear service frequency, flat rate, supply plan, and launch path within 24 hours.',
  },
  {
    title: 'Launch the crew',
    copy: 'We confirm the team, schedule, access details, checklists, and the first-service expectations.',
  },
  {
    title: 'Verify the work',
    copy: 'Job updates, cleaner checklists, and completion images keep your team informed without follow-up chasing.',
  },
];

const faqs = [
  {
    question: 'Can you quote our facility without a walkthrough?',
    answer:
      'We quote after a walkthrough or a complete photo and video review. That protects you from vague estimates and gives the cleaning team a workable, accurate scope.',
  },
  {
    question: 'Can MaidFlex handle multiple locations or unit turns?',
    answer:
      'Yes. MaidFlex Pro is designed to scale from one facility or turnover to a recurring multi-location workload, with scope and access details documented for each site.',
  },
  {
    question: 'Will we receive proof that service was completed?',
    answer:
      'Your plan can include real-time job updates, completion images, and cleaner checklists so your team can verify progress without being on-site.',
  },
  {
    question: 'Do you provide supplies?',
    answer:
      'Supply responsibility is confirmed in the proposal. We account for product requirements, facility conditions, and any green or non-toxic preferences before launch.',
  },
  {
    question: 'Can you handle urgent or one-time commercial work?',
    answer:
      'Yes, subject to crew availability and scope. MaidFlex Pro supports specialty, emergency, post-construction, and turnover work alongside recurring janitorial service.',
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="MaidFlex Pro home">
          <Image
            src="/brand/maidflex-pro-logo.png"
            alt="MaidFlex Pro"
            width={293}
            height={75}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#industries">Industries</a>
          <a href="#difference">Why MaidFlex</a>
          <a href="#process">Our process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="button button-small" href="#contact">
          Book a walkthrough
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Commercial cleaning · Richmond, Virginia</p>
          <h1>Clean operations start with a crew that shows up.</h1>
          <p className="hero-intro">
            Reliable commercial cleaning for high-traffic facilities. Clear
            scopes, flexible schedules, and proof-of-service updates without
            chasing anyone down.
          </p>

          <div className="hero-actions">
            <a className="button" href="#contact">
              Schedule a walkthrough <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="tel:+18048029639">
              Call 804-802-9639 <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="trust-row" aria-label="MaidFlex Pro service standards">
            <span>Fully insured crews</span>
            <span>Quotes within 24 hours</span>
            <span>Real-time job updates</span>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/brand/maidflex-commercial-team.png"
            alt="A MaidFlex Pro commercial cleaning crew servicing a modern facility"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            priority
          />
          <div className="walkthrough-card">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Walkthroughs available</strong>
              <span>Clear scope. Quote within 24 hours.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="industry-ribbon" aria-label="Industries served">
        <p>Built for Richmond&apos;s high-traffic facilities.</p>
        <div>
          <span>Gyms</span>
          <span>Medical</span>
          <span>Property managers</span>
          <span>Daycares</span>
          <span>Offices</span>
          <span>Dealerships</span>
        </div>
      </section>

      <section className="positioning section" id="difference">
        <p className="section-label">The MaidFlex difference</p>
        <div className="positioning-grid">
          <h2>Your cleaner shouldn&apos;t become another vendor you manage.</h2>
          <div className="positioning-copy">
            <p>
              MaidFlex Pro is a tech-enabled, locally run commercial cleaning
              partner built around consistency, transparency, and fast response.
              We create the scope, coordinate the crew, and keep your team updated.
            </p>
            <div className="promise-row">
              <span>Scalable coverage</span>
              <span>Flexible scheduling</span>
              <span>Documented quality</span>
            </div>
          </div>
        </div>
      </section>

      <section className="industries section" id="industries">
        <div className="section-heading">
          <div>
            <p className="section-label">Commercial specialties</p>
            <h2>Cleaning built around how your facility works.</h2>
          </div>
          <p>
            Different facilities have different pressure points. We scope the
            work around traffic, timing, access, surfaces, and what your clients
            notice first.
          </p>
        </div>

        <div className="industry-grid">
          {industries.map(({ icon: Icon, name, line, copy }, index) => (
            <article className="industry-card" key={name}>
              <div className="industry-card-top">
                <span>0{index + 1}</span>
                <Icon aria-hidden="true" strokeWidth={1.7} />
              </div>
              <h3>{name}</h3>
              <strong>{line}</strong>
              <p>{copy}</p>
              <a href="#contact">
                Request a walkthrough <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="visibility section">
        <div className="visibility-copy">
          <p className="section-label section-label-light">Operational visibility</p>
          <h2>Consistency you can see.</h2>
          <p>
            Commercial cleaning breaks down when details live in texts, memory,
            or assumptions. MaidFlex turns the job into a documented operating
            plan your team and the crew can actually follow.
          </p>
          <ul>
            <li><ShieldCheck aria-hidden="true" /> Vetted, fully insured cleaning professionals</li>
            <li><CalendarClock aria-hidden="true" /> Recurring, turnover, and responsive scheduling</li>
            <li><Camera aria-hidden="true" /> Checklists, images, and real-time job updates</li>
            <li><UsersRound aria-hidden="true" /> Coverage that scales with your workload</li>
          </ul>
        </div>

        <div className="status-panel" aria-label="Example MaidFlex service status">
          <div className="status-panel-head">
            <div>
              <span>Service status</span>
              <strong>West Broad facility</strong>
            </div>
            <span className="live-pill">On track</span>
          </div>
          <ol>
            <li className="complete">
              <CheckCircle2 aria-hidden="true" />
              <div><strong>Scope confirmed</strong><span>Zones, access, supplies</span></div>
              <small>Done</small>
            </li>
            <li className="complete">
              <CheckCircle2 aria-hidden="true" />
              <div><strong>Crew assigned</strong><span>2 cleaning professionals</span></div>
              <small>Done</small>
            </li>
            <li className="active">
              <ClipboardCheck aria-hidden="true" />
              <div><strong>Service checklist</strong><span>18 of 22 items complete</span></div>
              <small>Live</small>
            </li>
            <li>
              <Camera aria-hidden="true" />
              <div><strong>Completion update</strong><span>Photos and sign-off</span></div>
              <small>Next</small>
            </li>
          </ol>
          <p>Illustrative workflow</p>
        </div>
      </section>

      <section className="process section" id="process">
        <div className="process-heading">
          <p className="section-label">From walkthrough to launch</p>
          <h2>No guessing.<br />No vague scopes.<br /><em>No chaos.</em></h2>
        </div>

        <ol className="process-list">
          {steps.map(({ title, copy }, index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="portfolio section">
        <div className="portfolio-card">
          <div className="portfolio-icon" aria-hidden="true">
            <Building2 />
          </div>
          <div>
            <p className="section-label">Property management</p>
            <h2>One unit or dozens. Same accountability.</h2>
          </div>
          <div className="portfolio-copy">
            <p>
              Turnovers, vacant units, common areas, and last-minute resets all
              move on different timelines. MaidFlex gives property teams one
              responsive cleaning partner built to flex with the workload.
            </p>
            <ul>
              <li>Vacant unit and pre-move-in cleans</li>
              <li>Routine and responsive common-area service</li>
              <li>Completion images and quality tracking</li>
            </ul>
            <a className="button button-dark" href="#contact">
              Start with a trial clean <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="fit section">
        <div className="fit-intro">
          <p className="section-label section-label-light">Where we fit</p>
          <h2>Your schedule.<br />Your standards.<br />One clear scope.</h2>
        </div>
        <div className="fit-grid">
          <article>
            <CalendarClock aria-hidden="true" />
            <h3>Recurring janitorial</h3>
            <p>One to seven days per week, aligned with your traffic and operating hours.</p>
          </article>
          <article>
            <HardHat aria-hidden="true" />
            <h3>Post-construction</h3>
            <p>Dust, debris, detail cleaning, and final presentation before turnover.</p>
          </article>
          <article>
            <CarFront aria-hidden="true" />
            <h3>Specialty & urgent</h3>
            <p>Event resets, emergency requests, showrooms, and high-priority one-time work.</p>
          </article>
        </div>
      </section>

      <section className="faq section">
        <div className="faq-heading">
          <p className="section-label">Before the walkthrough</p>
          <h2>Good questions.<br />Clear answers.</h2>
          <p>
            Need an answer now? Call{' '}
            <a href="tel:+18048029639">804-802-9639</a>.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-intro">
          <p className="section-label">Free facility walkthrough</p>
          <h2>Show us the space. We&apos;ll build the plan.</h2>
          <p>
            Tell us what you manage and where the pressure points are. We&apos;ll
            follow up to schedule a walkthrough and return a clear quote within
            24 hours of the completed review.
          </p>
          <div className="contact-links">
            <a href="tel:+18048029639">804-802-9639</a>
            <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
          </div>
        </div>
        <RequestForm />
      </section>

      <section className="recruiting-strip" id="cleaners">
        <div>
          <BadgeCheck aria-hidden="true" />
          <span>Cleaning professionals</span>
          <strong>Want commercial jobs without chasing leads?</strong>
        </div>
        <a href="mailto:info@maidflexpro.com?subject=Commercial%20Cleaning%20Pro%20Application">
          Apply to join the network <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer>
        <a className="footer-brand" href="#top" aria-label="Back to top">
          <Image
            src="/brand/maidflex-pro-logo.png"
            alt="MaidFlex Pro"
            width={293}
            height={75}
          />
        </a>
        <p>Commercial cleaning built around your operation.</p>
        <div>
          <a href="tel:+18048029639">804-802-9639</a>
          <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
          <span>© 2026 MaidFlex Pro</span>
        </div>
      </footer>
    </main>
  );
}
