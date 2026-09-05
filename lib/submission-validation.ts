export type SubmissionKind = 'service' | 'professional';

export type SubmissionBody = {
  kind?: unknown;
  market?: unknown;
  contactName?: unknown;
  organization?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  fields?: unknown;
};

export type SubmissionFields = Record<string, string | boolean>;

export type NormalizedSubmission = {
  kind: SubmissionKind;
  market: string;
  contactName: string;
  organization: string;
  email: string;
  phone: string;
  fields: SubmissionFields;
  payload: string;
};

export type SubmissionValidationResult =
  | { ok: true; submission: NormalizedSubmission }
  | { ok: false; error: string; status: number };

const REQUIRED_PROFESSIONAL_FIELDS = [
  'serviceMarket',
  'homeBase',
  'yearsExperience',
  'travelRadius',
  'teamSize',
  'experienceType',
  'insuranceStatus',
  'availability',
  'experienceDetails',
  'reliableTransportation',
  'professionalEquipment',
  'backgroundCheck',
  'independentBusiness',
];

const REQUIRED_RICHMOND_FIELDS = [
  'facilityType',
  'propertyLocation',
  'squareFeet',
  'restrooms',
  'frequency',
  'floorTypes',
  'accessHours',
  'preferredStart',
  'contactWindow',
  'details',
  'consent',
];

const REQUIRED_ROCKIES_FIELDS = [
  'propertyLocation',
  'propertyCount',
  'bedrooms',
  'bathrooms',
  'monthlyTurns',
  'turnWindow',
  'linenPlan',
  'accessMethod',
  'calendarPlatform',
  'preferredStart',
  'contactWindow',
  'details',
  'consent',
];

const SERVICE_MARKETS = ['Richmond commercial', 'Rockies vacation rental'];
const PROFESSIONAL_MARKETS = [
  'Richmond commercial',
  'Rockies vacation rentals',
  'Both markets',
];

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export function isHoneypotSubmission(body: SubmissionBody) {
  return Boolean(clean(body.website, 200));
}

export function sanitizeFields(value: unknown): SubmissionFields {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const safe: SubmissionFields = {};
  for (const [key, entry] of Object.entries(value)) {
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    if (!safeKey) continue;
    if (typeof entry === 'boolean') safe[safeKey] = entry;
    if (typeof entry === 'string') safe[safeKey] = entry.trim().slice(0, 2000);
  }
  return safe;
}

export function validateSubmission(
  body: SubmissionBody,
): SubmissionValidationResult {
  const kind = clean(body.kind, 20);
  const market = clean(body.market, 80);
  const contactName = clean(body.contactName, 120);
  const organization = clean(body.organization, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);

  if (kind !== 'service' && kind !== 'professional') {
    return { ok: false, error: 'Choose a valid request type.', status: 400 };
  }

  const allowedMarkets =
    kind === 'service' ? SERVICE_MARKETS : PROFESSIONAL_MARKETS;
  if (!allowedMarkets.includes(market)) {
    return { ok: false, error: 'Choose a valid service market.', status: 400 };
  }

  if (
    !contactName ||
    !email ||
    !phone ||
    (kind === 'service' && !organization)
  ) {
    return {
      ok: false,
      error: 'Complete every required contact field.',
      status: 400,
    };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: 'Enter a valid email address.', status: 400 };
  }

  if (phone.replace(/\D/g, '').length < 7) {
    return { ok: false, error: 'Enter a valid phone number.', status: 400 };
  }

  const fields = sanitizeFields(body.fields);
  const requiredFields =
    kind === 'professional'
      ? REQUIRED_PROFESSIONAL_FIELDS
      : market === 'Richmond commercial'
        ? REQUIRED_RICHMOND_FIELDS
        : REQUIRED_ROCKIES_FIELDS;

  if (requiredFields.some((key) => !fields[key])) {
    return {
      ok: false,
      error: 'Complete every required property or application field.',
      status: 400,
    };
  }

  const payload = JSON.stringify(fields);
  if (payload.length > 20_000) {
    return { ok: false, error: 'The submission is too long.', status: 413 };
  }

  return {
    ok: true,
    submission: {
      kind,
      market,
      contactName,
      organization,
      email,
      phone,
      fields,
      payload,
    },
  };
}
