"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(values: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["nevooronni@gmail.com"],
      subject: `New Contact Form Submission from ${values.name}`,
      replyTo: values.email,
      text: `
        Name: ${values.name}
        Email: ${values.email}
        Company: ${values.company || "N/A"}
        
        Message:
        ${values.message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Send email error:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
