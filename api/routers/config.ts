import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { env } from "../lib/env";

// Simple in-memory config store (persists until server restart)
// In production, use database or env vars
let runtimeSmtpConfig: {
  host: string;
  port: string;
  user: string;
  pass: string;
} | null = null;

export const configRouter = createRouter({
  // Get current email status
  status: publicQuery.query(() => {
    return {
      envConfigured: !!(env.smtpUser && env.smtpPass && env.smtpPass !== "INSERISCI_APP_PASSWORD_QUI"),
      runtimeConfigured: !!runtimeSmtpConfig,
      smtpHost: runtimeSmtpConfig?.host || env.smtpHost || "smtp.gmail.com",
      smtpPort: runtimeSmtpConfig?.port || env.smtpPort || "587",
      smtpUser: runtimeSmtpConfig?.user || env.smtpUser || "",
      // Don't expose password
      hasPassword: !!(runtimeSmtpConfig?.pass || (env.smtpPass && env.smtpPass !== "INSERISCI_APP_PASSWORD_QUI")),
    };
  }),

  // Set SMTP configuration at runtime
  setSmtp: publicQuery
    .input(
      z.object({
        host: z.string().default("smtp.gmail.com"),
        port: z.string().default("587"),
        user: z.string().email(),
        pass: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      runtimeSmtpConfig = {
        host: input.host,
        port: input.port,
        user: input.user,
        pass: input.pass,
      };
      return { success: true };
    }),
});

// Export for email.ts to use
export function getRuntimeSmtpConfig() {
  return runtimeSmtpConfig;
}
