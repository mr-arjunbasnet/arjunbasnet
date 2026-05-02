import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM}>`,
      replyTo: email,
      to: process.env.SMTP_TO || "mr.arjunbasnet@gmail.com",
      subject: `[arjun-basnet.com.np] ${subject} — from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #FAFAF8; border: 1px solid #E2DDD6; border-radius: 12px;">
          <p style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #737373; margin: 0 0 8px;">New contact message</p>
          <h2 style="font-size: 20px; color: #111111; margin: 0 0 24px; font-weight: 600;">${subject}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #F2EEE8; border-radius: 6px 6px 0 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #737373;">From</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #E2DDD6; border-top: none; border-radius: 0 0 6px 6px; font-size: 14px; color: #111111;">${name} &lt;${email}&gt;</td>
            </tr>
          </table>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; background: #F2EEE8; border-radius: 6px 6px 0 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #737373;">Message</td>
            </tr>
            <tr>
              <td style="padding: 16px; border: 1px solid #E2DDD6; border-top: none; border-radius: 0 0 6px 6px; font-size: 14px; color: #111111; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="margin: 24px 0 0; font-size: 11px; color: #BBBBBB; text-align: center;">Sent via arjun-basnet.com.np contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email directly." },
      { status: 500 }
    );
  }
}
