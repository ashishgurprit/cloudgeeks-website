import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'Custom App Development',
    budget: '< $5k'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // TODO: Replace with actual webhook URL (Zapier/Make.com)
    // const webhookUrl = 'https://hooks.zapier.com/hooks/catch/...';
    // await fetch(webhookUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    // Simulation for now
    setTimeout(() => {
      setFormStatus('success');
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({ name: '', company: '', email: '', interest: 'Custom App Development', budget: '< $5k' });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-hero-gradient relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-electric-violet/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
            Ready to <span className="text-gradient">digitize your workflow?</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Tell us about your project. Our automation system will triage your request and connect you with the right architect immediately.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors placeholder-gray-600"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email (Business)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors placeholder-gray-600"
                placeholder="john@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">I am interested in</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors [&>option]:bg-charcoal"
                >
                  <option>Custom App Development</option>
                  <option>CRM & Marketing Automation</option>
                  <option>Google Workspace Setup</option>
                  <option>General Consultancy</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Budget Range (Optional)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition-colors [&>option]:bg-charcoal"
                >
                  <option>&lt; $5k</option>
                  <option>$5k - $20k</option>
                  <option>$20k - $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="w-full bg-accent-gradient text-white font-bold py-4 rounded-xl shadow-lg shadow-electric-violet/25 hover:shadow-electric-violet/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === 'idle' && (
                <>Initialize Enquiry <Send className="w-5 h-5" /></>
              )}
              {formStatus === 'submitting' && (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              )}
              {formStatus === 'success' && (
                <><CheckCircle className="w-5 h-5" /> Received. Check your inbox.</>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Your data is secure. We'll respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
