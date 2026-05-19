import nodemailer from "nodemailer";
import { env } from "../lib/env";

const transporter = nodemailer.createTransport({
  host: env.smtpHost || "smtp.gmail.com",
  port: Number(env.smtpPort || 587),
  secure: false,
  auth: {
    user: env.smtpUser || "",
    pass: env.smtpPass || "",
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  if (!env.smtpUser || !env.smtpPass) {
    console.warn("SMTP not configured. Email not sent.");
    return { success: false, error: "SMTP not configured" };
  }

  try {
    await transporter.sendMail({
      from: `"CAIS Website" <${env.smtpUser}>`,
      to: "caponi.ai.studio@gmail.com",
      subject: `Nuovo contatto da ${data.name}`,
      html: `
        <div style="font-family: Inter, sans-serif; color: #0B1120; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22D3EE; font-family: 'Space Grotesk', sans-serif;">Nuovo Messaggio dal Sito CAIS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: 600; border-bottom: 1px solid #eee;">Nome:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; border-bottom: 1px solid #eee;">Telefono:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.phone || "Non fornito"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Messaggio:</td><td style="padding: 8px 0;">${data.message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
        </div>
      `,
      text: `Nuovo messaggio da ${data.name}\nEmail: ${data.email}\nTelefono: ${data.phone || "N/A"}\n\nMessaggio:\n${data.message}`,
    });
    return { success: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, error: String(err) };
  }
}
