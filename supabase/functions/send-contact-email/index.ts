
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  budget: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, budget, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", { name, email, budget });

    // Create email content
    const emailContent = `
Mesaj nou de pe site-ul web:

Nume: ${name}
Email: ${email}
Telefon: ${phone || 'Nu a fost furnizat'}
Buget: ${budget || 'Nu a fost specificat'}

Mesaj:
${message}

---
Trimis pe ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
    `.trim();

    // Send email using SMTP
    const emailData = {
      from: "contact@iziweb.ro",
      to: "contact@iziweb.ro",
      subject: `Mesaj nou de pe site - ${name}`,
      text: emailContent,
      smtp: {
        host: "mail.iziweb.ro",
        port: 465,
        secure: true,
        auth: {
          user: Deno.env.get("SMTP_USERNAME"),
          pass: Deno.env.get("SMTP_PASSWORD")
        }
      }
    };

    // Using a simple SMTP implementation
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "contact@iziweb.ro",
        to: ["contact@iziweb.ro"],
        subject: `Mesaj nou de pe site - ${name}`,
        text_body: emailContent,
        custom_headers: [
          {
            header: "Reply-To",
            value: email
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`SMTP error: ${response.statusText}`);
    }

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email trimis cu succes!" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
