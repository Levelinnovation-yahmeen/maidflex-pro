# Submission Routing Setup

The MaidFlex site can now deliver every saved submission to one secure server-side destination. The destination can be a Zapier Catch Hook, a small MaidFlex integration worker, or another HTTPS endpoint that routes customer requests to Housecall Pro and professional applications to Airtable.

The integration is intentionally optional. Without credentials, the website continues to save submissions to D1 and marks them `not_configured`. Once configured, the same endpoint records whether each delivery succeeded or failed.

## Environment variables

Configure these as hosted runtime values. Never place live values in the repository.

| Variable                       | Required               | Purpose                                                         |
| ------------------------------ | ---------------------- | --------------------------------------------------------------- |
| `MFP_SUBMISSION_WEBHOOK_URL`   | Yes, to enable routing | HTTPS endpoint that receives every saved submission             |
| `MFP_SUBMISSION_WEBHOOK_TOKEN` | Recommended            | Bearer token used to authenticate MaidFlex to a custom endpoint |

Use `.env.example` only as a key reference. The empty file is safe to commit; a populated `.env` file is not.

## Delivery contract

The site sends an HTTPS `POST` request with JSON after the D1 record is created.

Headers:

```text
Content-Type: application/json
Idempotency-Key: <submission UUID>
X-MaidFlex-Confirmation: <MFP confirmation number>
Authorization: Bearer <token>  # only when configured
```

Representative customer payload:

```json
{
  "id": "af876a34-52ab-4fbf-b5ce-f4c223bdb644",
  "confirmationCode": "MFP-AF876A34",
  "submittedAt": "2026-09-05T04:00:00.000Z",
  "kind": "service",
  "market": "Richmond commercial",
  "contactName": "Alex Morgan",
  "organization": "River City Offices",
  "email": "alex@example.com",
  "phone": "804-555-0100",
  "fields": {
    "facilityType": "Office or coworking space",
    "propertyLocation": "Richmond, VA",
    "squareFeet": "8500",
    "frequency": "2–3x per week"
  },
  "payload": "{...the same sanitized market-specific fields...}"
}
```

The destination may return an empty successful response. If it returns JSON containing `externalRecordId` or `id`, MaidFlex stores that identifier on the D1 submission.

The destination must treat `Idempotency-Key` as unique. A repeated request with the same key must return the original result instead of creating another HCP Lead or Airtable record.

## Delivery states

| State            | Meaning                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| `not_configured` | Submission was saved, but no external destination is enabled              |
| `pending`        | Submission was saved and delivery began                                   |
| `delivered`      | The external endpoint returned a successful HTTP response                 |
| `failed`         | Delivery timed out, could not connect, or returned a non-success response |

The website still returns the visitor's confirmation number when external delivery fails because D1 already holds the full request. The failure reason is limited before storage and logs identify the record by confirmation number rather than printing the submitted personal data.

The current adapter makes one bounded delivery attempt. Add a queue or scheduled retry before relying on it for unattended high-volume operation. Retries must use the stored UUID as the idempotency key.

## Recommended Zapier implementation

### Shared intake Zap

1. Create a Zapier Catch Hook and use its URL as `MFP_SUBMISSION_WEBHOOK_URL`.
2. Submit one non-sensitive test request from each website funnel.
3. Add Paths based on `kind` and `market`:
   - `service` + `Richmond commercial`
   - `service` + `Rockies vacation rental`
   - `professional`
   - fallback/manual review
4. For both customer paths, call the supported Housecall Pro Lead API or forward the normalized record to the HCP integration worker.
5. For the professional path, create an Airtable `Applicants` record.
6. Send an immediate owner/operations alert containing the market, contact name, organization, confirmation number, and direct CRM record link.
7. Return the created HCP or Airtable record ID when the Zapier response step supports it.

Do not assume the standard Housecall Pro Zapier connector creates Leads. Confirm the MaidFlex HCP plan and use its Lead API or supported lead webhooks. A native HCP website form can be used as a short-term alternative, but it would replace much of the richer MaidFlex qualification form.

## Housecall Pro field mapping

Minimum customer mapping:

| MaidFlex                  | Housecall Pro destination                       |
| ------------------------- | ----------------------------------------------- |
| `confirmationCode`        | External/source ID or lead note                 |
| `market`                  | Tag, lead source, or pipeline routing field     |
| `contactName`             | Customer/contact name                           |
| `organization`            | Company or property name                        |
| `email`                   | Contact email                                   |
| `phone`                   | Contact phone                                   |
| `fields.propertyLocation` | Service address or lead note                    |
| Remaining `fields`        | Structured lead note or supported custom fields |

Create the customer and the Lead as separate idempotent steps if the HCP API requires both. Do not create a Job until the property has been reviewed and the service has reached the correct sales stage.

## Airtable field mapping

Create explicit columns for contact details, service market, home base, experience, travel radius, team size, insurance status, availability, readiness confirmations, MaidFlex confirmation number, application status, and created time.

Do not store W-9s, IDs, bank details, background-check reports, or insurance documents inside the website payload. Use a secure document workflow after an applicant has qualified.

## Go-live verification

- Submit one Richmond request and confirm exactly one HCP Lead.
- Submit one Rockies request and confirm exactly one HCP Lead.
- Submit one professional application and confirm exactly one Airtable record.
- Confirm all three create immediate notifications.
- Confirm D1 shows `delivered` and the external record ID when returned.
- Force a destination failure and confirm D1 shows `failed` without losing the lead.
- Repeat a request with the same idempotency key and confirm no duplicate record is created.
- Remove all test records from production systems after verification.
