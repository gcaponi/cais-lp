import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contacts } from "@db/schema";
import { sendContactEmail } from "../lib/email";

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
      const emailResult = await sendContactEmail(input);
      return { success: true, id: Number(result[0].insertId), emailSent: emailResult.success };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});
