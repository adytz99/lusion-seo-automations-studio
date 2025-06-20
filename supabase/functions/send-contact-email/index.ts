
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
      <h2>Mesaj nou de pe site-ul IziWeb</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nu a fost furnizat'}</p>
        <p><strong>Buget:</strong> ${budget || 'Nu a fost specificat'}</p>
        
        <h3>Mesaj:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Trimis pe ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
        </p>
      </div>
    `;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "IziWeb Contact <contact@iziweb.ro>",
      to: ["contact@iziweb.ro"],
      reply_to: email,
      subject: `Mesaj nou de pe site - ${name}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email trimis cu succes!",
        emailId: emailResponse.data?.id 
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
