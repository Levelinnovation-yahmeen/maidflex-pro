'use client';

import { FormEvent, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

type ServiceMarket = 'Richmond commercial' | 'Rockies vacation rental';

type RequestFormProps = {
  lockedMarket?: ServiceMarket;
  compact?: boolean;
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'success'; code: string }
  | { status: 'error'; message: string };

async function submitRecord(payload: Record<string, unknown>) {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as { confirmationCode?: string; error?: string };
  if (!response.ok || !result.confirmationCode) {
    throw new Error(result.error || 'We could not save your request.');
  }
  return result.confirmationCode;
}

export function RequestForm({ lockedMarket, compact = false }: RequestFormProps) {
  const [market, setMarket] = useState<ServiceMarket | ''>(lockedMarket || '');
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const selectedMarket = (lockedMarket || String(values.market)) as ServiceMarket;

    setState({ status: 'sending' });
    try {
      const code = await submitRecord({
        kind: 'service',
        market: selectedMarket,
        contactName: values.contactName,
        organization: values.organization,
        email: values.email,
        phone: values.phone,
        website: values.website,
        fields: Object.fromEntries(
          Object.entries(values).filter(
            ([key]) =>
              !['contactName', 'organization', 'email', 'phone', 'market', 'website'].includes(key),
          ),
        ),
      });
      setState({ status: 'success', code });
      form.reset();
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'We could not save your request.',
      });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <p className="section-label">Request received</p>
        <h3>You&apos;re in the right queue.</h3>
        <p>
          We saved your request under <strong>{state.code}</strong>. MaidFlex will review the property details and follow up within one business day.
        </p>
        <Button className="button button-dark" type="button" onClick={() => setState({ status: 'idle' })}>
          Send another request
        </Button>
      </div>
    );
  }

  const isCommercial = market === 'Richmond commercial';
  const isRockies = market === 'Rockies vacation rental';

  return (
    <form className={`walkthrough-form${compact ? ' walkthrough-form-compact' : ''}`} onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Property intake</span>
        <strong>{lockedMarket || 'Choose your service lane'}</strong>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label>Website<Input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field-row">
        <label>
          Your name
          <Input name="contactName" autoComplete="name" placeholder="First and last name" required />
        </label>
        <label>
          Company or property
          <Input name="organization" autoComplete="organization" placeholder="Business or property name" required />
        </label>
      </div>

      <div className="field-row">
        <label>
          Work email
          <Input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          Phone
          <Input name="phone" type="tel" autoComplete="tel" placeholder="(804) 555-0000" required />
        </label>
      </div>

      {!lockedMarket && (
        <label>
          Service market
          <NativeSelect name="market" value={market} onChange={(event) => setMarket(event.target.value as ServiceMarket)} required className="select-wrap">
            <NativeSelectOption value="" disabled>Select one</NativeSelectOption>
            <NativeSelectOption value="Richmond commercial">Richmond commercial</NativeSelectOption>
            <NativeSelectOption value="Rockies vacation rental">Rockies vacation rental</NativeSelectOption>
          </NativeSelect>
        </label>
      )}

      {isCommercial && (
        <>
          <div className="field-row">
            <label>
              Facility type
              <NativeSelect name="facilityType" defaultValue="" required className="select-wrap">
                <NativeSelectOption value="" disabled>Select one</NativeSelectOption>
                <NativeSelectOption>Gym or fitness center</NativeSelectOption>
                <NativeSelectOption>Apartment or property community</NativeSelectOption>
                <NativeSelectOption>Medical or dental office</NativeSelectOption>
                <NativeSelectOption>Daycare or school</NativeSelectOption>
                <NativeSelectOption>Office or coworking space</NativeSelectOption>
                <NativeSelectOption>Bank or financial institution</NativeSelectOption>
                <NativeSelectOption>Auto dealership</NativeSelectOption>
                <NativeSelectOption>Construction site</NativeSelectOption>
                <NativeSelectOption>Other commercial facility</NativeSelectOption>
              </NativeSelect>
            </label>
            <label>
              Facility address
              <Input name="propertyLocation" autoComplete="street-address" placeholder="Street, city and ZIP" required />
            </label>
          </div>
          <div className="field-row field-row-three">
            <label>Approx. square feet<Input name="squareFeet" inputMode="numeric" placeholder="e.g. 8,500" required /></label>
            <label>Restrooms<Input name="restrooms" inputMode="numeric" placeholder="e.g. 6" required /></label>
            <label>
              Cleaning frequency
              <NativeSelect name="frequency" defaultValue="" required className="select-wrap">
                <NativeSelectOption value="" disabled>Select one</NativeSelectOption>
                <NativeSelectOption>One-time or trial clean</NativeSelectOption>
                <NativeSelectOption>1x per week</NativeSelectOption>
                <NativeSelectOption>2–3x per week</NativeSelectOption>
                <NativeSelectOption>5–7x per week</NativeSelectOption>
                <NativeSelectOption>Not sure yet</NativeSelectOption>
              </NativeSelect>
            </label>
          </div>
          <div className="field-row">
            <label>Floor types<Input name="floorTypes" placeholder="Carpet, tile, concrete…" required /></label>
            <label>Service/access hours<Input name="accessHours" placeholder="After 9 PM, weekdays…" required /></label>
          </div>
        </>
      )}

      {isRockies && (
        <>
          <div className="field-row">
            <label>Property location<Input name="propertyLocation" placeholder="Town, resort area and state" required /></label>
            <label>Number of properties<Input name="propertyCount" inputMode="numeric" placeholder="e.g. 4" required /></label>
          </div>
          <div className="field-row field-row-three">
            <label>Bedrooms<Input name="bedrooms" inputMode="numeric" placeholder="e.g. 3" required /></label>
            <label>Bathrooms<Input name="bathrooms" inputMode="decimal" placeholder="e.g. 2.5" required /></label>
            <label>Monthly turnovers<Input name="monthlyTurns" inputMode="numeric" placeholder="e.g. 12" required /></label>
          </div>
          <div className="field-row">
            <label>Checkout → check-in window<Input name="turnWindow" placeholder="10 AM checkout / 4 PM check-in" required /></label>
            <label>
              Linen plan
              <NativeSelect name="linenPlan" defaultValue="" required className="select-wrap">
                <NativeSelectOption value="" disabled>Select one</NativeSelectOption>
                <NativeSelectOption>On-site laundry</NativeSelectOption>
                <NativeSelectOption>Owner-provided linen sets</NativeSelectOption>
                <NativeSelectOption>Need linen service</NativeSelectOption>
                <NativeSelectOption>Not sure yet</NativeSelectOption>
              </NativeSelect>
            </label>
          </div>
          <div className="field-row">
            <label>Access method<Input name="accessMethod" placeholder="Smart lock, lockbox, front desk…" required /></label>
            <label>Booking/PMS platform<Input name="calendarPlatform" placeholder="Airbnb, VRBO, Guesty…" required /></label>
          </div>
        </>
      )}

      {(isCommercial || isRockies) && (
        <>
          <div className="field-row">
            <label>Preferred start date<Input name="preferredStart" type="date" required /></label>
            <label>
              Best time to contact
              <NativeSelect name="contactWindow" defaultValue="" required className="select-wrap">
                <NativeSelectOption value="" disabled>Select one</NativeSelectOption>
                <NativeSelectOption>Morning</NativeSelectOption>
                <NativeSelectOption>Afternoon</NativeSelectOption>
                <NativeSelectOption>Evening</NativeSelectOption>
                <NativeSelectOption>Any time</NativeSelectOption>
              </NativeSelect>
            </label>
          </div>
          <label>
            Scope, pain points and special requirements
            <Textarea name="details" rows={5} placeholder={isCommercial ? 'High-touch zones, trash volume, security requirements, supply preferences and what is not working today…' : 'Restocking needs, same-day turns, pet stays, hot tub checks, known problem areas and current pain points…'} required />
          </label>
          <label className="consent-row">
            <input name="consent" type="checkbox" value="yes" required />
            <span>I agree that MaidFlex Pro may contact me about this request. No payment is collected here.</span>
          </label>
        </>
      )}

      {state.status === 'error' && (
        <div className="form-error" role="alert"><AlertCircle aria-hidden="true" /><span>{state.message}</span></div>
      )}

      <Button className="button form-button" type="submit" disabled={!market || state.status === 'sending'}>
        {state.status === 'sending' ? <><LoaderCircle className="spin" aria-hidden="true" /> Saving your request…</> : <>Request my service plan <span aria-hidden="true">↗</span></>}
      </Button>
      <p className="form-note"><ShieldCheck aria-hidden="true" /> Your information is saved securely and used only to evaluate and respond to your request.</p>
    </form>
  );
}
