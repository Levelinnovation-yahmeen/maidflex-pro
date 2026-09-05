import { describe, expect, it } from 'vitest';
import {
  isHoneypotSubmission,
  sanitizeFields,
  validateSubmission,
  type SubmissionBody,
} from '../lib/submission-validation';

const richmondFields = {
  facilityType: 'Office or coworking space',
  propertyLocation: '100 Main Street, Richmond, VA 23219',
  squareFeet: '8500',
  restrooms: '6',
  frequency: '2–3x per week',
  floorTypes: 'Carpet and tile',
  accessHours: 'After 9 PM',
  preferredStart: '2026-10-01',
  contactWindow: 'Morning',
  details: 'High-touch common areas',
  consent: 'yes',
};

const rockiesFields = {
  propertyLocation: 'Breckenridge, Colorado',
  propertyCount: '2',
  bedrooms: '3',
  bathrooms: '2.5',
  monthlyTurns: '10',
  turnWindow: '10 AM to 4 PM',
  linenPlan: 'On-site laundry',
  accessMethod: 'Smart lock',
  calendarPlatform: 'Guesty',
  preferredStart: '2026-11-01',
  contactWindow: 'Afternoon',
  details: 'Back-to-back weekend turns',
  consent: 'yes',
};

const professionalFields = {
  serviceMarket: 'Richmond commercial',
  homeBase: 'Richmond, Virginia',
  yearsExperience: '4',
  travelRadius: '25 miles',
  teamSize: '2-person team',
  experienceType: 'Commercial janitorial',
  insuranceStatus: 'Active policy',
  availability: 'Weekday evenings',
  experienceDetails: 'Offices and medical facilities',
  reliableTransportation: 'yes',
  professionalEquipment: 'yes',
  backgroundCheck: 'yes',
  independentBusiness: 'yes',
};

const customer = (overrides: Partial<SubmissionBody> = {}): SubmissionBody => ({
  kind: 'service',
  market: 'Richmond commercial',
  contactName: '  Alex Morgan  ',
  organization: 'River City Offices',
  email: 'ALEX@EXAMPLE.COM',
  phone: '(804) 555-0100',
  fields: richmondFields,
  ...overrides,
});

describe('submission validation', () => {
  it('normalizes a valid Richmond service request', () => {
    const result = validateSubmission(customer());

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.submission.contactName).toBe('Alex Morgan');
    expect(result.submission.email).toBe('alex@example.com');
    expect(result.submission.kind).toBe('service');
  });

  it('accepts a complete Rockies request', () => {
    const result = validateSubmission(
      customer({ market: 'Rockies vacation rental', fields: rockiesFields }),
    );

    expect(result.ok).toBe(true);
  });

  it('accepts a complete professional application without a business name', () => {
    const result = validateSubmission({
      kind: 'professional',
      market: 'Richmond commercial',
      contactName: 'Jordan Lee',
      email: 'jordan@example.com',
      phone: '8045550199',
      fields: professionalFields,
    });

    expect(result.ok).toBe(true);
  });

  it('requires an organization for customer requests', () => {
    const result = validateSubmission(customer({ organization: '' }));

    expect(result).toMatchObject({
      ok: false,
      error: 'Complete every required contact field.',
      status: 400,
    });
  });

  it('rejects malformed contact details', () => {
    expect(validateSubmission(customer({ email: 'not-an-email' })).ok).toBe(
      false,
    );
    expect(validateSubmission(customer({ phone: '123' })).ok).toBe(false);
  });

  it('rejects unsupported markets instead of treating them as Rockies requests', () => {
    const result = validateSubmission(
      customer({ market: 'Unapproved market', fields: rockiesFields }),
    );

    expect(result).toMatchObject({
      ok: false,
      error: 'Choose a valid service market.',
      status: 400,
    });
  });

  it('rejects a request when a market-specific field is missing', () => {
    const { consent: _consent, ...incompleteFields } = richmondFields;
    const result = validateSubmission(customer({ fields: incompleteFields }));

    expect(result).toMatchObject({
      ok: false,
      error: 'Complete every required property or application field.',
    });
  });

  it('sanitizes field keys and limits field values', () => {
    const fields = sanitizeFields({
      'unsafe key!': '  retained  ',
      tooLong: 'x'.repeat(2_500),
      keepBoolean: true,
      rejectNumber: 42,
    });

    expect(fields.unsafekey).toBe('retained');
    expect(fields.tooLong).toHaveLength(2_000);
    expect(fields.keepBoolean).toBe(true);
    expect(fields).not.toHaveProperty('rejectNumber');
  });

  it('rejects an oversized sanitized payload', () => {
    const oversizedFields = {
      ...richmondFields,
      ...Object.fromEntries(
        Array.from({ length: 11 }, (_, index) => [
          `extra${index}`,
          'x'.repeat(2_000),
        ]),
      ),
    };
    const result = validateSubmission(customer({ fields: oversizedFields }));

    expect(result).toMatchObject({ ok: false, status: 413 });
  });

  it('detects the hidden website spam field', () => {
    expect(
      isHoneypotSubmission(customer({ website: 'https://spam.example' })),
    ).toBe(true);
    expect(isHoneypotSubmission(customer({ website: '' }))).toBe(false);
  });
});
