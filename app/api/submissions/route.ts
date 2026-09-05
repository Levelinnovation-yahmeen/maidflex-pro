import { getDb } from '@/db';
import { submissions } from '@/db/schema';
import {
  deliverSubmission,
  isSubmissionDeliveryConfigured,
} from '@/lib/submission-delivery';
import {
  isHoneypotSubmission,
  validateSubmission,
  type SubmissionBody,
} from '@/lib/submission-validation';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json(
      { error: 'Please submit the form again.' },
      { status: 415 },
    );
  }

  let body: SubmissionBody;
  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return Response.json(
      { error: 'We could not read that submission.' },
      { status: 400 },
    );
  }

  if (isHoneypotSubmission(body)) {
    return Response.json({ ok: true, confirmationCode: 'MFP-RECEIVED' });
  }

  const validation = validateSubmission(body);
  if (!validation.ok) {
    return Response.json(
      { error: validation.error },
      { status: validation.status },
    );
  }

  const submission = validation.submission;
  const id = crypto.randomUUID();
  const confirmationCode = `MFP-${id.slice(0, 8).toUpperCase()}`;
  const createdAt = new Date();
  const deliveryConfigured = isSubmissionDeliveryConfigured();
  const db = getDb();

  try {
    await db.insert(submissions).values({
      id,
      confirmationCode,
      kind: submission.kind,
      market: submission.market,
      contactName: submission.contactName,
      organization: submission.organization || null,
      email: submission.email,
      phone: submission.phone,
      payload: submission.payload,
      deliveryStatus: deliveryConfigured ? 'pending' : 'not_configured',
      createdAt,
    });
  } catch (error) {
    console.error('MaidFlex form submission failed', error);
    return Response.json(
      { error: 'We could not save your request. Please call 804-802-9639.' },
      { status: 500 },
    );
  }

  let deliveryStatus: 'not_configured' | 'delivered' | 'failed' =
    'not_configured';
  if (deliveryConfigured) {
    try {
      const delivery = await deliverSubmission({
        ...submission,
        id,
        confirmationCode,
        submittedAt: createdAt.toISOString(),
      });
      deliveryStatus = 'delivered';

      try {
        await db
          .update(submissions)
          .set({
            deliveryStatus,
            deliveryAttempts: 1,
            deliveredAt: new Date(),
            externalRecordId: delivery.externalRecordId,
            lastDeliveryError: null,
          })
          .where(eq(submissions.id, id));
      } catch (error) {
        console.error('MaidFlex delivery tracking update failed', {
          confirmationCode,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    } catch (error) {
      deliveryStatus = 'failed';
      const message =
        error instanceof Error ? error.message : 'Unknown delivery error';

      console.error('MaidFlex submission delivery failed', {
        confirmationCode,
        error: message,
      });

      try {
        await db
          .update(submissions)
          .set({
            deliveryStatus,
            deliveryAttempts: 1,
            lastDeliveryError: message.slice(0, 500),
          })
          .where(eq(submissions.id, id));
      } catch (trackingError) {
        console.error('MaidFlex delivery failure tracking failed', {
          confirmationCode,
          error:
            trackingError instanceof Error
              ? trackingError.message
              : 'Unknown error',
        });
      }
    }
  }

  return Response.json(
    { ok: true, confirmationCode, deliveryStatus },
    { status: 201 },
  );
}
