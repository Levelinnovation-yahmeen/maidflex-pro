import { env } from 'cloudflare:workers';
import type { NormalizedSubmission } from './submission-validation';

type SubmissionDeliveryRecord = NormalizedSubmission & {
  id: string;
  confirmationCode: string;
  submittedAt: string;
};

export type SubmissionDeliveryResult = {
  externalRecordId: string | null;
};

export function isSubmissionDeliveryConfigured() {
  return Boolean(env.MFP_SUBMISSION_WEBHOOK_URL?.trim());
}

function getDestinationUrl() {
  const value = env.MFP_SUBMISSION_WEBHOOK_URL?.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('The submission destination URL is invalid.');
  }

  if (url.protocol !== 'https:') {
    throw new Error('The submission destination must use HTTPS.');
  }

  return url;
}

export async function deliverSubmission(
  submission: SubmissionDeliveryRecord,
): Promise<SubmissionDeliveryResult> {
  const url = getDestinationUrl();
  if (!url) return { externalRecordId: null };

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Idempotency-Key': submission.id,
    'X-MaidFlex-Confirmation': submission.confirmationCode,
  });
  const token = env.MFP_SUBMISSION_WEBHOOK_TOKEN?.trim();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(submission),
      signal: controller.signal,
    });
  } catch {
    if (controller.signal.aborted) {
      throw new Error('The submission destination timed out.');
    }
    throw new Error('The submission destination could not be reached.');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(
      `The submission destination returned HTTP ${response.status}.`,
    );
  }

  let externalRecordId: string | null = null;
  try {
    const result = (await response.json()) as {
      id?: unknown;
      externalRecordId?: unknown;
    };
    const candidate = result.externalRecordId ?? result.id;
    if (typeof candidate === 'string')
      externalRecordId = candidate.slice(0, 200);
  } catch {
    // A successful webhook does not have to return JSON.
  }

  return { externalRecordId };
}
