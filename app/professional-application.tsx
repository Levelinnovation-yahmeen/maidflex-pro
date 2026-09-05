'use client';

import { useState, type SyntheticEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

type SubmitState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'success'; code: string }
  | { status: 'error'; message: string };

export function ProfessionalApplication() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setState({ status: 'sending' });
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'professional',
          market: values.serviceMarket,
          contactName: values.contactName,
          organization: values.businessName,
          email: values.email,
          phone: values.phone,
          website: values.website,
          fields: Object.fromEntries(
            Object.entries(values).filter(
              ([key]) =>
                ![
                  'contactName',
                  'businessName',
                  'email',
                  'phone',
                  'website',
                ].includes(key),
            ),
          ),
        }),
      });
      const result = (await response.json()) as {
        confirmationCode?: string;
        error?: string;
      };
      if (!response.ok || !result.confirmationCode)
        throw new Error(result.error || 'We could not save your application.');
      setState({ status: 'success', code: result.confirmationCode });
      form.reset();
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not save your application.',
      });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="form-success form-success-dark" aria-live="polite">
        <CheckCircle2 aria-hidden="true" />
        <p className="section-label section-label-light">
          Application received
        </p>
        <h2>Now we review the fit.</h2>
        <p>
          Your application is saved under <strong>{state.code}</strong>. If your
          availability and coverage match an active need, MaidFlex will contact
          you about the next screening step.
        </p>
        <Button
          className="button"
          type="button"
          onClick={() => setState({ status: 'idle' })}
        >
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form
      className="walkthrough-form professional-form"
      onSubmit={handleSubmit}
    >
      <div className="form-heading">
        <span>Step 1 of 2</span>
        <strong>Professional fit application</strong>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="professional-website">Website</label>
        <Input
          id="professional-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field-row">
        <label htmlFor="professional-contact-name">
          Full name
          <Input
            id="professional-contact-name"
            name="contactName"
            autoComplete="name"
            required
          />
        </label>
        <label htmlFor="professional-business-name">
          Business name <small>Optional</small>
          <Input
            id="professional-business-name"
            name="businessName"
            autoComplete="organization"
            placeholder="Your company or team name"
          />
        </label>
      </div>
      <div className="field-row">
        <label htmlFor="professional-email">
          Email
          <Input
            id="professional-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label htmlFor="professional-phone">
          Mobile phone
          <Input
            id="professional-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </label>
      </div>
      <div className="field-row">
        <label htmlFor="professional-home-base">
          Home base
          <Input
            id="professional-home-base"
            name="homeBase"
            placeholder="City and state"
            required
          />
        </label>
        <label htmlFor="professional-service-market">
          Service market
          <NativeSelect
            id="professional-service-market"
            name="serviceMarket"
            defaultValue=""
            required
            className="select-wrap"
          >
            <NativeSelectOption value="" disabled>
              Select one
            </NativeSelectOption>
            <NativeSelectOption>Richmond commercial</NativeSelectOption>
            <NativeSelectOption>Rockies vacation rentals</NativeSelectOption>
            <NativeSelectOption>Both markets</NativeSelectOption>
          </NativeSelect>
        </label>
      </div>
      <div className="field-row field-row-three">
        <label htmlFor="professional-years-experience">
          Years cleaning
          <Input
            id="professional-years-experience"
            name="yearsExperience"
            inputMode="decimal"
            placeholder="e.g. 3"
            required
          />
        </label>
        <label htmlFor="professional-travel-radius">
          Travel radius
          <Input
            id="professional-travel-radius"
            name="travelRadius"
            placeholder="e.g. 25 miles"
            required
          />
        </label>
        <label htmlFor="professional-team-size">
          Team size
          <NativeSelect
            id="professional-team-size"
            name="teamSize"
            defaultValue=""
            required
            className="select-wrap"
          >
            <NativeSelectOption value="" disabled>
              Select one
            </NativeSelectOption>
            <NativeSelectOption>Solo professional</NativeSelectOption>
            <NativeSelectOption>2-person team</NativeSelectOption>
            <NativeSelectOption>3–5 person team</NativeSelectOption>
            <NativeSelectOption>6+ person company</NativeSelectOption>
          </NativeSelect>
        </label>
      </div>
      <div className="field-row">
        <label htmlFor="professional-experience-type">
          Relevant experience
          <NativeSelect
            id="professional-experience-type"
            name="experienceType"
            defaultValue=""
            required
            className="select-wrap"
          >
            <NativeSelectOption value="" disabled>
              Select one
            </NativeSelectOption>
            <NativeSelectOption>Commercial janitorial</NativeSelectOption>
            <NativeSelectOption>Vacation-rental turnovers</NativeSelectOption>
            <NativeSelectOption>
              Both commercial and turnovers
            </NativeSelectOption>
            <NativeSelectOption>Residential only</NativeSelectOption>
            <NativeSelectOption>
              New to professional cleaning
            </NativeSelectOption>
          </NativeSelect>
        </label>
        <label htmlFor="professional-insurance-status">
          General liability insurance
          <NativeSelect
            id="professional-insurance-status"
            name="insuranceStatus"
            defaultValue=""
            required
            className="select-wrap"
          >
            <NativeSelectOption value="" disabled>
              Select one
            </NativeSelectOption>
            <NativeSelectOption>Active policy</NativeSelectOption>
            <NativeSelectOption>
              Can obtain before accepting work
            </NativeSelectOption>
            <NativeSelectOption>Need more information</NativeSelectOption>
          </NativeSelect>
        </label>
      </div>
      <label htmlFor="professional-availability">
        Availability
        <Input
          id="professional-availability"
          name="availability"
          placeholder="Days, evenings, weekends and earliest start date"
          required
        />
      </label>
      <label htmlFor="professional-experience-details">
        Tell us about your strongest work
        <Textarea
          id="professional-experience-details"
          name="experienceDetails"
          rows={5}
          placeholder="Properties you have cleaned, equipment you use, team capacity, quality standards and any specialty experience…"
          required
        />
      </label>

      <div className="application-checks">
        <label className="consent-row" htmlFor="professional-transportation">
          <input
            id="professional-transportation"
            name="reliableTransportation"
            type="checkbox"
            value="yes"
            required
          />
          <span>I have reliable transportation for the service area.</span>
        </label>
        <label className="consent-row" htmlFor="professional-equipment">
          <input
            id="professional-equipment"
            name="professionalEquipment"
            type="checkbox"
            value="yes"
            required
          />
          <span>
            I can provide professional cleaning equipment and approved supplies
            when a scope requires it.
          </span>
        </label>
        <label className="consent-row" htmlFor="professional-background-check">
          <input
            id="professional-background-check"
            name="backgroundCheck"
            type="checkbox"
            value="yes"
            required
          />
          <span>
            I am willing to complete identity and background screening before
            accepting work.
          </span>
        </label>
        <label
          className="consent-row"
          htmlFor="professional-independent-business"
        >
          <input
            id="professional-independent-business"
            name="independentBusiness"
            type="checkbox"
            value="yes"
            required
          />
          <span>
            I understand this application is for independent cleaning
            opportunities and does not guarantee work.
          </span>
        </label>
      </div>

      {state.status === 'error' && (
        <div className="form-error" role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{state.message}</span>
        </div>
      )}

      <Button
        className="button form-button"
        type="submit"
        disabled={state.status === 'sending'}
      >
        {state.status === 'sending' ? (
          <>
            <LoaderCircle className="spin" aria-hidden="true" /> Saving your
            application…
          </>
        ) : (
          <>
            Submit my application <span aria-hidden="true">↗</span>
          </>
        )}
      </Button>
      <p className="form-note">
        <LockKeyhole aria-hidden="true" /> Do not email or upload your ID, W-9,
        bank details or insurance documents here. Qualified applicants receive a
        secure next-step request.
      </p>
    </form>
  );
}
