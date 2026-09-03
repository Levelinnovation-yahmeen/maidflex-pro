'use client';

import { FormEvent, useState } from 'react';

export function RequestForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const phone = String(form.get('phone') || '');
    const service = String(form.get('service') || '');
    const timing = String(form.get('timing') || '');
    const details = String(form.get('details') || '');
    const subject = encodeURIComponent(`Cleaning request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nTiming: ${timing}\n\nDetails:\n${details}`,
    );

    setSent(true);
    window.location.href = `mailto:info@maidflexpro.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Your name
          <input name="name" autoComplete="name" placeholder="First and last name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
        </label>
      </div>
      <div className="field-row">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" placeholder="(804) 555-0000" required />
        </label>
        <label>
          Cleaning type
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Residential</option>
            <option>Move-in / Move-out</option>
            <option>Post-construction</option>
            <option>Commercial</option>
            <option>Specialty</option>
          </select>
        </label>
      </div>
      <label>
        When do you need it?
        <select name="timing" defaultValue="" required>
          <option value="" disabled>Select timing</option>
          <option>As soon as possible</option>
          <option>Within the next week</option>
          <option>Within the next month</option>
          <option>I am flexible</option>
        </select>
      </label>
      <label>
        Tell us about the space
        <textarea
          name="details"
          rows={4}
          placeholder="Property size, condition, frequency, special requests..."
          required
        />
      </label>
      <button className="button form-button" type="submit">
        Request my quote <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note" aria-live="polite">
        {sent
          ? 'Your request is ready to send in your email app.'
          : 'No spam. Just the details we need to quote your clean.'}
      </p>
    </form>
  );
}
