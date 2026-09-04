'use client';

import { FormEvent, useState } from 'react';

export function RequestForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const contact = String(form.get('contact') || '');
    const company = String(form.get('company') || '');
    const email = String(form.get('email') || '');
    const phone = String(form.get('phone') || '');
    const market = String(form.get('market') || '');
    const facility = String(form.get('facility') || '');
    const size = String(form.get('size') || '');
    const frequency = String(form.get('frequency') || '');
    const details = String(form.get('details') || '');
    const subject = encodeURIComponent(`MaidFlex service request - ${company}`);
    const body = encodeURIComponent(
      `Contact: ${contact}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nMarket: ${market}\nProperty type: ${facility}\nApprox. size: ${size}\nDesired frequency: ${frequency}\n\nProperty details:\n${details}`,
    );

    setSent(true);
    window.location.href = `mailto:info@maidflexpro.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="walkthrough-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Your name
          <input name="contact" autoComplete="name" placeholder="First and last name" required />
        </label>
        <label>
          Company
          <input name="company" autoComplete="organization" placeholder="Business or property name" required />
        </label>
      </div>
      <div className="field-row">
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" placeholder="(804) 555-0000" required />
        </label>
      </div>
      <div className="field-row field-row-three">
        <label>
          Service market
          <select name="market" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Richmond commercial</option>
            <option>Rockies vacation rental</option>
          </select>
        </label>
        <label>
          Property type
          <select name="facility" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Vacation rental</option>
            <option>Vacation-rental portfolio</option>
            <option>Gym or fitness center</option>
            <option>Property or apartment community</option>
            <option>Medical or dental office</option>
            <option>Daycare or school</option>
            <option>Office or coworking space</option>
            <option>Bank or financial institution</option>
            <option>Auto dealership</option>
            <option>Construction site</option>
            <option>Other commercial facility</option>
          </select>
        </label>
        <label>
          Approx. square feet
          <input name="size" inputMode="numeric" placeholder="e.g. 8,500" required />
        </label>
        <label>
          Service pattern
          <select name="frequency" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>One-time or trial clean</option>
            <option>Per guest checkout</option>
            <option>Multiple turns per week</option>
            <option>1x per week</option>
            <option>2-3x per week</option>
            <option>5-7x per week</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label>
        What should we know about the property?
        <textarea
          name="details"
          rows={4}
          placeholder="Location, number of properties, turn windows or access hours, current pain points, and preferred start date..."
          required
        />
      </label>
      <button className="button form-button" type="submit">
        Request my service plan <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note" aria-live="polite">
        {sent
          ? 'Your service request is ready to send in your email app.'
          : 'We scope Richmond facilities and Rockies rentals through separate service lanes.'}
      </p>
    </form>
  );
}
