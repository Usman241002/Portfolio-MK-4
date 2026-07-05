import { transporter } from "../utils/mailer.js";
import {
  adminEmailHtml,
  confirmationEmailHtml,
} from "../utils/email-templates.js";

export async function handleContact(ctx) {
  const { name, email, message } = ctx.request.body;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    ctx.status = 400;
    ctx.body = { error: "name, email and message are required" };
    return;
  }

  try {
    // 1. Admin notification
    await transporter.sendMail({
      from: '"Portfolio Contact" <contact@ukhalid.dev>',
      to: "ukhalid428@gmail.com",
      subject: `New message from ${name}`,
      html: adminEmailHtml({ name, email, message }),
    });

    // 2. Confirmation to sender
    await transporter.sendMail({
      from: '"Usman Khalid" <contact@ukhalid.dev>',
      to: email,
      subject: "Got your message — Usman Khalid",
      html: confirmationEmailHtml({ name, email, message }),
    });

    ctx.status = 200;
    ctx.body = { success: true };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "Email failed" };
  }
}
