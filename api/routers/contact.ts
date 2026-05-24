import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import { sendContactEmail, isEmailConfigured } from "../lib/email";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
        email: z.string().email("Inserisci un indirizzo email valido"),
        phone: z.string().min(8, "Il numero di telefono è troppo corto").optional().or(z.literal("")),
        message: z.string().min(10, "Il messaggio deve contenere almeno 10 caratteri"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        message: input.message,
      });

      // Try to send email notification
      let emailResult = { sent: false, error: null as string | null };
      if (isEmailConfigured()) {
        const emailResponse = await sendContactEmail(input);
        emailResult = { sent: emailResponse.success, error: emailResponse.error || null };
      } else {
        emailResult = { sent: false, error: "SMTP_NOT_CONFIGURED" };
      }

      return {
        success: true,
        id: Number(result[0].insertId),
        emailSent: emailResult.sent,
        emailError: emailResult.error,
      };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),

  // Health check endpoint for email configuration
  emailStatus: publicQuery.query(() => {
    return {
      configured: isEmailConfigured(),
      message: isEmailConfigured()
        ? "SMTP is configured and ready to send emails"
        : "SMTP is NOT configured. Add SMTP_USER and SMTP_PASS to your .env file",
    };
  }),
});
