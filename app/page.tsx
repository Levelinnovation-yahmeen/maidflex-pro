import Image from 'next/image';
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Camera,
  HardHat,
  Home as HomeIcon,
  KeyRound,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import { RequestForm } from './request-form';

const services = [
  {
    icon: HomeIcon,
    title: 'Residential',
    kicker: 'Where clean feels like home.',
    copy: 'From cozy condos to full-family homes, our pros bring shine, structure, and peace of mind.',
  },
  {
    icon: KeyRound,
    title: 'Move-in / Move-out',
    kicker: 'Leave it better than you found it.',
    copy: 'Handing over keys or starting fresh? We scrub every corner so you can move without the mess.',
  },
  {
    icon: HardHat,
    title: 'Post-construction',
    kicker: 'Dust out. Details in.',
    copy: 'We handle the heavy cleanup after the build so your new space is ready for the spotlight.',
  },
  {
    icon: Building2,
    title: 'Commercial',
    kicker: 'Clean that means business.',
    copy: 'Reliable, scalable cleaning for offices, storefronts, gyms, and busy commercial spaces.',
  },
  {
    icon: Sparkles,
    title: 'Specialty',
    kicker: 'We do the extra stuff too.',
    copy: 'After-party, graduation chaos, surprise guests? Tell us what happened. We will handle the reset.',
  },
];

const steps = [
  ['Choose your cleaning type', 'Home, move, construction, commercial, or something special.'],
  ['Show us the space', 'Upload photos or do a quick video walkthrough.'],
  ['Get matched & priced', 'We confirm the scope, your pro, and a clear quote.'],
  ['Enjoy the sparkle', 'Your team arrives ready. We handle the rest.'],
];

const faqs = [
  {
    question: 'How are cleaning pros vetted?',
    answer:
      'MaidFlex Pro reviews each cleaner before matching them with client work. Experience, reliability, professionalism, and service readiness all matter.',
  },
  {
    question: 'What if I need to reschedule?',
    answer:
      'Plans change. Contact the team as early as possible and we will help move your appointment to another available time.',
  },
  {
    question: 'Do I need to be home?',
    answer:
      'Not necessarily. You can share access instructions during the booking process, and we will confirm the details before your clean.',
  },
  {
    question: 'How are services priced?',
    answer:
      'Pricing is based on the service type, size, condition, frequency, and any extras. You receive a clear quote before the job is finalized.',
  },
  {
    question: 'What is the Flex Plan?',
    answer:
      'The Flex Plan lets you pre-set recurring cleanings for preferred rates and easier scheduling, without a long-term commitment.',
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
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#flex-plan">Flex Plan</a>
          <a href="#cleaners">For cleaners</a>
        </nav>

        <a className="button button-small" href="#book">
          Book a clean
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Richmond&apos;s flexible cleaning team</p>
          <h1>Cleaning on your schedule. With zero hassle.</h1>
          <p className="hero-intro">
            Book trusted pros in minutes. Tell us what needs cleaning, get a
            clear quote, and lock in your clean.
          </p>

          <div className="hero-actions">
            <a className="button" href="#book">
              Book a clean <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#cleaners">
              Apply to clean <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="trust-row" aria-label="MaidFlex Pro benefits">
            <span>Vetted pros</span>
            <span>Clear quotes</span>
            <span>Flexible scheduling</span>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/brand/maidflex-cleaning-team.png"
            alt="A MaidFlex Pro cleaning team refreshing a bright living room"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            priority
          />
          <div className="availability-card">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Now booking</strong>
              <span>Homes &amp; businesses</span>
            </div>
          </div>
        </div>
      </section>

      <section className="service-ribbon" aria-label="Service promise">
        <p>One trusted team. Every kind of clean.</p>
        <div>
          <span>Homes</span>
          <span>Moves</span>
          <span>New builds</span>
          <span>Businesses</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-label">Why MaidFlex Pro</div>
        <div className="about-grid">
          <h2>Built for Cleaners.<br />Designed for Clients.</h2>
          <div className="about-copy">
            <p>
              MaidFlex Pro isn&apos;t your typical cleaning company. We empower
              cleaners with fair opportunities and flexible schedules while
              giving customers seamless, transparent booking they can trust.
            </p>
            <p className="brand-statement">
              Real people. Real service. Smart systems that just work.
            </p>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <div>
            <p className="section-label">Services built around you</p>
            <h2>One less thing<br />on your list.</h2>
          </div>
          <p>
            Book once or build a routine. Every service starts with a clear
            scope and ends with a space that feels handled.
          </p>
        </div>

        <div className="service-grid">
          {services.map(({ icon: Icon, title, kicker, copy }, index) => (
            <article className={`service-card service-card-${index + 1}`} key={title}>
              <div className="service-icon" aria-hidden="true">
                <Icon strokeWidth={1.8} />
              </div>
              <div>
                <p className="card-number">0{index + 1}</p>
                <h3>{title}</h3>
                <strong>{kicker}</strong>
                <p>{copy}</p>
              </div>
              <a href="#book" aria-label={`Request a ${title} cleaning quote`}>
                Get a quote <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="process section" id="how-it-works">
        <div className="process-intro">
          <p className="section-label section-label-light">How it works</p>
          <h2>From click to clean in four easy steps.</h2>
          <p>
            Booking should feel easy. With MaidFlex Pro, it is.
          </p>
          <div className="process-icons" aria-hidden="true">
            <CalendarDays />
            <Camera />
            <BadgeCheck />
          </div>
        </div>

        <ol className="step-list">
          {steps.map(([title, copy], index) => (
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

      <section className="flex-section section" id="flex-plan">
        <div className="flex-card">
          <div className="flex-copy">
            <p className="section-label">The Flex Plan</p>
            <h2>Want a better rate? Flex with us.</h2>
            <p>
              Pre-set your monthly cleanings and lock in preferred pricing. No
              long-term commitments—just consistency on your terms.
            </p>
            <a className="button button-dark" href="#book">
              Start your Flex Plan <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="flex-benefits">
            <div>
              <CalendarDays aria-hidden="true" />
              <span>01</span>
              <h3>Choose frequency</h3>
              <p>Weekly, bi-weekly, or monthly.</p>
            </div>
            <div>
              <Sparkles aria-hidden="true" />
              <span>02</span>
              <h3>Customize anytime</h3>
              <p>Add deep cleaning or extras as life changes.</p>
            </div>
            <div>
              <WalletCards aria-hidden="true" />
              <span>03</span>
              <h3>Save automatically</h3>
              <p>Recurring clients unlock preferred rates.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cleaners section" id="cleaners">
        <div className="cleaner-heading">
          <p className="section-label section-label-light">For cleaning pros</p>
          <h2>Your work.<br />Your time.<br /><em>Your pay.</em></h2>
        </div>

        <div className="cleaner-content">
          <p>
            Set your hours. Skip the paperwork. Get paid weekly. No chasing
            leads and no back-and-forth—just booked jobs.
          </p>
          <ul>
            <li><BadgeCheck aria-hidden="true" /> Choose the work that fits your life</li>
            <li><BadgeCheck aria-hidden="true" /> We handle booking and customer support</li>
            <li><BadgeCheck aria-hidden="true" /> Clear job details before you accept</li>
          </ul>
          <a
            className="button"
            href="mailto:info@maidflexpro.com?subject=Cleaning%20Pro%20Application"
          >
            Apply to clean <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading">
          <p className="section-label">Good questions</p>
          <h2>Before we get<br />to the sparkle.</h2>
          <p>Need something else? Call <a href="tel:+18048029639">804-802-9639</a>.</p>
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

      <section className="booking section" id="book">
        <div className="booking-intro">
          <p className="section-label">Ready when you are</p>
          <h2>Tell us what needs cleaning.</h2>
          <p>
            A few details now means a clearer quote and a faster match. We&apos;ll
            take it from here.
          </p>
          <div className="contact-links">
            <a href="tel:+18048029639">804-802-9639</a>
            <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
          </div>
        </div>

        <RequestForm />
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
        <p>Cleaning on your schedule. With zero hassle.</p>
        <div>
          <a href="tel:+18048029639">804-802-9639</a>
          <a href="mailto:info@maidflexpro.com">info@maidflexpro.com</a>
          <span>© 2026 MaidFlex Pro</span>
        </div>
      </footer>
    </main>
  );
}
