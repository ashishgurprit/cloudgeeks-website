/**
 * Cloudflare Worker for CloudGeeks Website Form Submission
 * Handles contact form submissions with Turnstile spam protection
 */

interface Env {
  TURNSTILE_SECRET_KEY: string;
  MAUTIC_URL: string;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  interest: string;
  budget: string;
  source?: string;
  timestamp?: string;
}

interface RequestBody {
  turnstileToken: string;
  formData: FormData;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      // Parse request body
      const body: RequestBody = await request.json();
      const { turnstileToken, formData } = body;

      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ success: false, error: 'Missing Turnstile token' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Verify Turnstile token
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        }
      );

      const turnstileResult = await turnstileResponse.json<{ success: boolean }>();

      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Spam protection verification failed. Please try again.',
          }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Submit to Mautic (Form ID: 45 for CloudGeeks)
      const mauticData = new URLSearchParams();
      mauticData.append('mauticform[formId]', '45');
      mauticData.append('mauticform[name]', formData.name);
      mauticData.append('mauticform[company]', formData.company);
      mauticData.append('mauticform[email]', formData.email);
      mauticData.append('mauticform[interest]', formData.interest);
      mauticData.append('mauticform[budget]', formData.budget);
      mauticData.append('mauticform[source]', formData.source || 'cloudgeeks-website');
      mauticData.append('mauticform[return]', '');
      mauticData.append('mauticform[messenger]', '1');

      const mauticResponse = await fetch(
        `${env.MAUTIC_URL}/form/submit?formId=45`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: mauticData.toString(),
        }
      );

      if (!mauticResponse.ok) {
        console.error('Mautic submission failed:', await mauticResponse.text());
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to submit form. Please try again or contact us directly.',
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Success response
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form submitted successfully!',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Internal server error. Please try again later.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
