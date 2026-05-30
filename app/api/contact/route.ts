import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { SITE } from "@/content/Site";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  tag: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Server configuration error: Missing API Key" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const formData = await req.formData();
    const rawData = Object.fromEntries(formData.entries());

    // Validate data
    const result = contactFormSchema.safeParse(rawData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error },
        { status: 400 }
      );
    }

    const { name, email, message, tag } = result.data;

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [SITE.contact.email],
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Tag: ${tag || "N/A"}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
