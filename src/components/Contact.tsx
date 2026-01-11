import { useState, useRef } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

// Cloudflare Worker endpoint for form submission
const FORM_SUBMIT_URL = 'https://cloudgeeks-form.ashish-ganda.workers.dev';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'Custom App Development',
    budget: '< $5k'
  });
  const turnstileRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // Get Turnstile token
      const turnstileToken = (window as any).turnstile?.getResponse(turnstileRef.current);

      if (!turnstileToken) {
        setErrorMessage('Please complete the spam verification.');
        setFormStatus('error');
        return;
      }

      // Submit to Cloudflare Worker
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turnstileToken,
          formData: {
            ...formData,
            source: 'cloudgeeks-website',
            timestamp: new Date().toISOString(),
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({ name: '', company: '', email: '', interest: 'Custom App Development', budget: '< $5k' });
          if ((window as any).turnstile && turnstileRef.current) {
            (window as any).turnstile.reset(turnstileRef.current);
          }
        }, 3000);
      } else {
        setErrorMessage(result.error || 'Failed to submit form. Please try again.');
        setFormStatus('error');
        // Reset Turnstile on error
        if ((window as any).turnstile && turnstileRef.current) {
          (window as any).turnstile.reset(turnstileRef.current);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setFormStatus('error');
      // Reset Turnstile on error
      if ((window as any).turnstile && turnstileRef.current) {
        (window as any).turnstile.reset(turnstileRef.current);
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#e8eef4] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-slate-800 mb-6">
            Ready to <span className="text-gradient">digitize your workflow?</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Tell us about your project. Our automation system will triage your request and connect you with the right architect immediately.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors placeholder-slate-400"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email (Business)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors placeholder-slate-400"
                placeholder="john@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">I am interested in</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                >
                  <option>Custom App Development</option>
                  <option>CRM & Marketing Automation</option>
                  <option>Google Workspace Setup</option>
                  <option>General Consultancy</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Budget Range (Optional)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                >
                  <option>&lt; $5k</option>
                  <option>$5k - $20k</option>
                  <option>$20k - $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            </div>

            {/* Cloudflare Turnstile Widget */}
            <div
              ref={turnstileRef}
              className="cf-turnstile"
              data-sitekey="0x4AAAAAACL6iirwP7c-dYYc"
              data-theme="light"
            ></div>

            {/* Error message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full bg-slate-800 hover:bg-violet-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === 'idle' && (
                <>Initialize Enquiry <Send className="w-5 h-5" /></>
              )}
              {formStatus === 'error' && (
                <>Try Again <Send className="w-5 h-5" /></>
              )}
              {formStatus === 'submitting' && (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              )}
              {formStatus === 'success' && (
                <><CheckCircle className="w-5 h-5" /> Received. Check your inbox.</>
              )}
            </button>

            <p className="text-center text-xs text-slate-500 mt-4">
              Your data is secure. We'll respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
