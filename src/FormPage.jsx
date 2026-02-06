import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Loader = ({ className }) => (
  <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

export default function FormPage({ token }) {
  const [status, setStatus] = useState('loading'); // loading | ready | submitting | done | error
  const [formInfo, setFormInfo] = useState(null);
  const [form, setForm] = useState({
    name: '',
    about: '',
    usp: '',
    icp: '',
    tone: '',
    industry: '',
    features: '',
    integrations: '',
    socialTwitter: '',
    socialLinkedin: '',
    socialInstagram: '',
    competitors: '',
    blogUrls: '',
    notes: '',
  });

  useEffect(() => {
    fetch(`${API_URL}/api/form/${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          setFormInfo(data);
          setForm(prev => ({ ...prev, name: data.clientName || '' }));
          setStatus('ready');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [token]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const payload = {
        name: form.name,
        about: form.about,
        usp: form.usp,
        icp: form.icp,
        tone: form.tone,
        industry: form.industry,
        features: form.features.split(',').map(s => s.trim()).filter(Boolean),
        integrations: form.integrations.split(',').map(s => s.trim()).filter(Boolean),
        social: {
          twitter: form.socialTwitter || null,
          linkedin: form.socialLinkedin || null,
          instagram: form.socialInstagram || null,
        },
        competitors: form.competitors.split(',').map(s => s.trim()).filter(Boolean).map(domain => ({
          domain, name: domain.replace(/\.(com|io|net|org).*/, ''), reason: 'Client-provided'
        })),
        customUrls: form.blogUrls.split('\n').map(s => s.trim()).filter(Boolean),
        notes: form.notes,
      };

      const response = await fetch(`${API_URL}/api/form/${token}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('done');
      } else {
        const err = await response.json();
        console.error('Submit failed:', err);
        setStatus('ready');
        alert('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('ready');
      alert('Connection error. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-stone-400" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Form Not Found</h1>
          <p className="text-stone-500">This form link has expired or is invalid.</p>
        </div>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Thank You!</h1>
          <p className="text-stone-500">Your information has been submitted successfully. The BTA team will review it shortly.</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1";

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Client Onboarding</h1>
          <p className="text-stone-500">
            Hi <span className="font-medium text-stone-700">{formInfo?.clientName}</span>, please fill out the form below so we can better understand your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Basics */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-stone-800">Company Info</h2>

            <div>
              <label className={labelClass}>Company Name</label>
              <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>About Your Company</label>
              <textarea value={form.about} onChange={e => handleChange('about', e.target.value)} rows={3} className={inputClass} placeholder="What does your company do? (2-3 sentences)" />
            </div>

            <div>
              <label className={labelClass}>Industry</label>
              <input type="text" value={form.industry} onChange={e => handleChange('industry', e.target.value)} className={inputClass} placeholder="e.g. SaaS, FinTech, E-commerce" />
            </div>

            <div>
              <label className={labelClass}>Unique Selling Proposition (USP)</label>
              <input type="text" value={form.usp} onChange={e => handleChange('usp', e.target.value)} className={inputClass} placeholder="What makes you different?" />
            </div>

            <div>
              <label className={labelClass}>Ideal Customer Profile (ICP)</label>
              <textarea value={form.icp} onChange={e => handleChange('icp', e.target.value)} rows={2} className={inputClass} placeholder="Who is your ideal customer?" />
            </div>

            <div>
              <label className={labelClass}>Brand Tone</label>
              <input type="text" value={form.tone} onChange={e => handleChange('tone', e.target.value)} className={inputClass} placeholder="e.g. Professional, Friendly, Bold" />
            </div>
          </div>

          {/* Product */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-stone-800">Product Details</h2>

            <div>
              <label className={labelClass}>Key Features <span className="text-stone-400 font-normal">(comma-separated)</span></label>
              <textarea value={form.features} onChange={e => handleChange('features', e.target.value)} rows={2} className={inputClass} placeholder="Feature A, Feature B, Feature C" />
            </div>

            <div>
              <label className={labelClass}>Integrations <span className="text-stone-400 font-normal">(comma-separated)</span></label>
              <input type="text" value={form.integrations} onChange={e => handleChange('integrations', e.target.value)} className={inputClass} placeholder="Slack, Salesforce, HubSpot" />
            </div>
          </div>

          {/* Social & Online Presence */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-stone-800">Online Presence</h2>

            <div>
              <label className={labelClass}>Twitter/X</label>
              <input type="text" value={form.socialTwitter} onChange={e => handleChange('socialTwitter', e.target.value)} className={inputClass} placeholder="@handle" />
            </div>

            <div>
              <label className={labelClass}>LinkedIn</label>
              <input type="text" value={form.socialLinkedin} onChange={e => handleChange('socialLinkedin', e.target.value)} className={inputClass} placeholder="linkedin.com/company/..." />
            </div>

            <div>
              <label className={labelClass}>Instagram</label>
              <input type="text" value={form.socialInstagram} onChange={e => handleChange('socialInstagram', e.target.value)} className={inputClass} placeholder="@handle" />
            </div>
          </div>

          {/* Competitors & Content */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-stone-800">Competitors & Content</h2>

            <div>
              <label className={labelClass}>Competitors <span className="text-stone-400 font-normal">(comma-separated domains)</span></label>
              <input type="text" value={form.competitors} onChange={e => handleChange('competitors', e.target.value)} className={inputClass} placeholder="competitor1.com, competitor2.com" />
            </div>

            <div>
              <label className={labelClass}>Blog/Content URLs you like <span className="text-stone-400 font-normal">(one per line)</span></label>
              <textarea value={form.blogUrls} onChange={e => handleChange('blogUrls', e.target.value)} rows={3} className={inputClass} placeholder={"https://example.com/blog/post-1\nhttps://example.com/blog/post-2"} />
            </div>

            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea value={form.notes} onChange={e => handleChange('notes', e.target.value)} rows={3} className={inputClass} placeholder="Anything else you'd like us to know?" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 bg-stone-800 text-white rounded-xl font-medium text-lg hover:bg-stone-700 disabled:bg-stone-400 flex items-center justify-center gap-2 transition-colors"
          >
            {status === 'submitting' ? (
              <><Loader className="w-5 h-5" /> Submitting...</>
            ) : (
              'Submit Information'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
