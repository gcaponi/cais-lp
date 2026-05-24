import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  // SMTP Configuration for email notifications
  // Required for contact form email delivery
  // Gmail users: use App Password (not your regular password)
  // Generate at: Google Account > Security > 2-Step Verification > App passwords
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  // Fallback: set to "true" to skip SMTP if not available
  skipEmail: process.env.SKIP_EMAIL === "true",
};
