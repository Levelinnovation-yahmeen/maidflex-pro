import { getDb } from '@/db';
import { submissions } from '@/db/schema';

export const runtime = 'edge';

type SubmissionBody = {
  kind?: unknown;
  market?: unknown;
  contactName?: unknown;
  organization?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  fields?: unknown;
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

function sanitizeFields(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const safe: Record<string, string | boolean> = {};
  for (const [key, entry] of Object.entries(value)) {
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    if (!safeKey) continue;
    if (typeof entry === 'boolean') safe[safeKey] = entry;
    if (typeof entry === 'string') safe[safeKey] = entry.trim().slice(0, 2000);
  }
  return safe;
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Please submit the form again.' }, { status: 415 });
  }

  let body: SubmissionBody;
  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return Response.json({ error: 'We could not read that submission.' }, { status: 400 });
  }

  const kind = clean(body.kind, 20);
  const market = clean(body.market, 80);
  const contactName = clean(body.contactName, 120);
  const organization = clean(body.organization, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);

  if (clean(body.website, 200)) {
    return Response.json({ ok: true, confirmationCode: 'MFP-RECEIVED' });
  }

  if (kind !== 'service' && kind !== 'professional') {
    return Response.json({ error: 'Choose a valid request type.' }, { status: 400 });
  }

  if (!market || !contactName || !email || !phone || (kind === 'service' && !organization)) {
    return Response.json({ error: 'Complete every required contact field.' }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  if (phone.replace(/\D/g, '').length < 7) {
    return Response.json({ error: 'Enter a valid phone number.' }, { status: 400 });
  }

  const fields = sanitizeFields(body.fields);
  const requiredFields =
    kind === 'professional'
      ? [
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
        ]
      : market === 'Richmond commercial'
        ? [
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
          ]
        : [
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

  if (requiredFields.some((key) => !fields[key])) {
    return Response.json({ error: 'Complete every required property or application field.' }, { status: 400 });
  }

  const payload = JSON.stringify(fields);
  if (payload.length > 20_000) {
    return Response.json({ error: 'The submission is too long.' }, { status: 413 });
  }

  const id = crypto.randomUUID();
  const confirmationCode = `MFP-${id.slice(0, 8).toUpperCase()}`;

  try {
    await getDb().insert(submissions).values({
      id,
      confirmationCode,
      kind,
      market,
      contactName,
      organization: organization || null,
      email,
      phone,
      payload,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('MaidFlex form submission failed', error);
    return Response.json(
      { error: 'We could not save your request. Please call 804-802-9639.' },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, confirmationCode }, { status: 201 });
}
