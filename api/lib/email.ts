import nodemailer from "nodemailer";
import { env } from "./env";
import { getRuntimeSmtpConfig } from "../routers/config";

// Singleton transporter
let transporter: nodemailer.Transporter | null = null;
let lastConfig: string | null = null;

function getSmtpSettings() {
  // 1. Check runtime config (set via /setup page)
  const runtime = getRuntimeSmtpConfig();
  if (runtime) {
    return {
      host: runtime.host,
      port: Number(runtime.port),
      user: runtime.user,
      pass: runtime.pass,
    };
  }
  // 2. Check env config
  if (env.smtpUser && env.smtpPass && env.smtpPass !== "INSERISCI_APP_PASSWORD_QUI") {
    return {
      host: env.smtpHost || "smtp.gmail.com",
      port: Number(env.smtpPort || 587),
      user: env.smtpUser,
      pass: env.smtpPass,
    };
  }
  return null;
}

function getTransporter(): nodemailer.Transporter | null {
  const settings = getSmtpSettings();
  if (!settings) return null;

  const configKey = `${settings.host}:${settings.port}:${settings.user}:${settings.pass}`;
  if (!transporter || lastConfig !== configKey) {
    transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: false,
      requireTLS: true,
      auth: {
        user: settings.user,
        pass: settings.pass,
      },
    });
    lastConfig = configKey;
  }
  return transporter;
}

export function isEmailConfigured(): boolean {
  return !!getSmtpSettings();
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    return {
      success: false,
      error: "SMTP_NOT_CONFIGURED: Configure in /setup or set env vars",
    };
  }

  const mailer = getTransporter();
  if (!mailer) {
    return { success: false, error: "TRANSPORT_ERROR" };
  }

  const settings = getSmtpSettings();
  if (!settings) return { success: false, error: "NO_SETTINGS" };

  try {
    await mailer.sendMail({
      from: `"CAIS Website" <${settings.user}>`,
      to: "caponi.ai.studio@gmail.com",
      replyTo: data.email,
      subject: `[CAIS Contact] Nuovo messaggio da ${data.name}`,
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; background: #0e0918; color: #d1cece; padding: 32px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #fd8925; font-size: 24px; margin: 0;">CAIS - Strategic AI Consulting</h1>
            <p style="color: #9d9797; font-size: 13px; margin-top: 8px;">Nuovo messaggio dal form di contatto</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; background: #1a1624; border-radius: 12px; overflow: hidden;">
            <tr><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46; font-weight: 600; color: #ffffff; width: 100px;">Nome:</td><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46;">${data.name}</td></tr>
            <tr><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46; font-weight: 600; color: #ffffff;">Email:</td><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46;"><a href="mailto:${data.email}" style="color: #077ac7;">${data.email}</a></td></tr>
            <tr><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46; font-weight: 600; color: #ffffff;">Telefono:</td><td style="padding: 14px 20px; border-bottom: 1px solid #3e3a46;">${data.phone || "Non fornito"}</td></tr>
            <tr><td style="padding: 14px 20px; font-weight: 600; color: #ffffff; vertical-align: top;">Messaggio:</td><td style="padding: 14px 20px; color: #d1cece;">${data.message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <p style="text-align: center; color: #6b6780; font-size: 11px; margin-top: 24px;">
            Ricevuto il ${new Date().toLocaleString('it-IT')}<br/>
            CAIS - Strategic AI Consulting
          </p>
        </div>
      `,
      text: `Nuovo messaggio da ${data.name}\nEmail: ${data.email}\nTelefono: ${data.phone || "N/A"}\n\nMessaggio:\n${data.message}`,
    });
    return { success: true };
  } catch (err: any) {
    console.error("Email send error:", err.message || err);
    return { success: false, error: err.message || "UNKNOWN_ERROR" };
  }
}
