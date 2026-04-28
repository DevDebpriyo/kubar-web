import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Configurable recipient email ──────────────────────────── */
const RECIPIENT_EMAIL =
  process.env.CONTACT_FORM_RECIPIENT_EMAIL || "ghosalsasti@gmail.com";

/* ─── Request body shape ────────────────────────────────────── */
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  category: string;
}

/* ─── Category display labels ───────────────────────────────── */
const categoryLabels: Record<string, string> = {
  bank: "Bank",
  fintech: "Fintech",
  nbfc: "NBFC",
  b2b_marketplace: "B2B Marketplace",
  b2b_platform: "B2B Platform",
  erp: "ERP",
  other: "Other",
};

/* ─── Build a premium HTML email ────────────────────────────── */
function buildEmailHTML(data: ContactFormData): string {
  const categoryDisplay =
    categoryLabels[data.category] || data.category || "Not specified";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#04040c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" style="background:#04040c;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="max-width:600px;background:#0a0a14;border-radius:16px;border:1px solid rgba(212,146,12,0.2);overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(212,146,12,0.15) 0%,rgba(59,130,246,0.08) 100%);padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#f0b429;letter-spacing:-0.02em;">
                📬 New Contact Form Submission
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5);">
                Submitted via kubar.tech/contact
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <!-- Full Name -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Full Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:600;">
                      ${data.fullName}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Email -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Email Address
                    </p>
                    <a href="mailto:${data.email}" style="font-size:16px;color:#3b82f6;font-weight:500;text-decoration:none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Phone -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Phone Number
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">
                      ${data.phone || "Not provided"}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Company Name -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);font-weight:600;">
                      Company Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">
                      ${data.companyName}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Category -->
              <table role="presentation" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(212,146,12,0.06);border-radius:12px;border:1px solid rgba(212,146,12,0.15);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(212,146,12,0.7);font-weight:600;">
                      Organization Category
                    </p>
                    <p style="margin:0;font-size:16px;color:#f0b429;font-weight:600;">
                      ${categoryDisplay}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply CTA -->
              <table role="presentation" width="100%" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your inquiry to Kubar Labs" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#f5bc35 0%,#d4920c 100%);border-radius:8px;color:#080602;font-size:14px;font-weight:600;text-decoration:none;">
                      Reply to ${data.fullName.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">
                This email was sent from the Kubar Labs contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── POST handler ──────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // Basic validation
    if (!body.fullName || !body.email || !body.companyName || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create transporter — uses env vars for SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build email
    const categoryDisplay =
      categoryLabels[body.category] || body.category || "Not specified";

    const mailOptions = {
      from: `"Kubar Labs Contact Form" <${process.env.SMTP_USER || "noreply@kubar.tech"}>`,
      to: RECIPIENT_EMAIL,
      replyTo: body.email,
      subject: `New Contact: ${body.fullName} from ${body.companyName} [${categoryDisplay}]`,
      html: buildEmailHTML(body),
      text: `New Contact Form Submission\n\nFull Name: ${body.fullName}\nEmail: ${body.email}\nPhone: ${body.phone || "Not provided"}\nCompany: ${body.companyName}\nCategory: ${categoryDisplay}\n\nSubmitted via kubar.tech/contact`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // In development, return success anyway so the UI flow works
    // (SMTP credentials won't be set up yet)
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "DEV MODE: Email sending failed (likely missing SMTP credentials). Returning success for UI testing."
      );
      return NextResponse.json(
        {
          success: true,
          message: "Message received (dev mode - email not actually sent)",
          dev: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
