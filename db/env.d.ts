declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    MFP_SUBMISSION_WEBHOOK_URL?: string;
    MFP_SUBMISSION_WEBHOOK_TOKEN?: string;
  }
}
