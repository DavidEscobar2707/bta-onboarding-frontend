import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

// Icons (same as App.jsx)
const Check = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>);
const Loader = ({ className }) => (<svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>);
const Building = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>);
const Trash = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const Plus = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const ArrowRight = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const Send = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const Link = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);

const STEPS = [
  { n: 1, l: 'Company Info' },
  { n: 2, l: 'Competitors' },
  { n: 3, l: 'Content & Style' },
  { n: 4, l: 'Submit' },
];

export default function FormPage({ token }) {
  const [status, setStatus] = useState('loading');
  const [formInfo, setFormInfo] = useState(null);
  const [step, setStep] = useState(1);

  // Step 1: Company info
  const [form, setForm] = useState({
    name: '', about: '', usp: '', icp: '', tone: '', industry: '',
    features: '', integrations: '',
    socialTwitter: '', socialLinkedin: '', socialInstagram: '',
    notes: '',
  });

  // Step 2: Competitors
  const [competitors, setCompetitors] = useState([]);
  const [newComp, setNewComp] = useState('');

  // Step 3: Content URLs
  const [customUrls, setCustomUrls] = useState(['']);

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

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const addCompetitor = () => {
    if (!newComp) return;
    setCompetitors([...competitors, { domain: newComp, name: newComp.replace(/\..*/, '') }]);
    setNewComp('');
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      const payload = {
        name: form.name, about: form.about, usp: form.usp, icp: form.icp,
        tone: form.tone, industry: form.industry,
        features: form.features.split(',').map(s => s.trim()).filter(Boolean),
        integrations: form.integrations.split(',').map(s => s.trim()).filter(Boolean),
        social: { twitter: form.socialTwitter || null, linkedin: form.socialLinkedin || null, instagram: form.socialInstagram || null },
        competitors: competitors.map(c => ({ domain: c.domain, name: c.name, reason: 'Client-provided' })),
        customUrls: customUrls.filter(u => u.trim() !== ''),
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
        setStatus('ready');
        alert('Failed to submit. Please try again.');
      }
    } catch {
      setStatus('ready');
      alert('Connection error. Please try again.');
    }
  };

  // Loading
  if (status === 'loading') {
    return (<div className="min-h-screen bg-stone-50 flex items-center justify-center"><Loader className="w-8 h-8 text-stone-400" /></div>);
  }

  // Error
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="text-rose-500 text-2xl">!</span></div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Form Not Found</h1>
          <p className="text-stone-500">This link has expired or is invalid.</p>
        </div>
      </div>
    );
  }

  // Done
  if (status === 'done') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><Check className="w-10 h-10 text-emerald-600" /></div>
          <h1 className="text-3xl font-bold text-stone-800 mb-3">Thank You!</h1>
          <p className="text-stone-500 text-lg">Your information has been submitted successfully. The Be The Answer team will review it shortly.</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1";

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header - matches client preview */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <img src={favicon(formInfo?.domain)} className="w-10 h-10 rounded-lg" alt="" />
          <div>
            <h1 className="font-semibold text-stone-800">Welcome, {formInfo?.clientName || 'Client'}</h1>
            <p className="text-stone-500 text-xs">Complete your onboarding — powered by Be The Answer</p>
          </div>
        </div>
      </header>

      {/* Step indicator - matches client preview */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > s.n ? 'bg-emerald-500 text-white' : step === s.n ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-500'}`}>
                  {step > s.n ? <Check className="w-4 h-4" /> : s.n}
                </div>
                <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-stone-800' : 'text-stone-400'}`}>{s.l}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-px ${step > s.n ? 'bg-emerald-500' : 'bg-stone-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Tell Us About Your Company</h2>
              <p className="text-stone-500">Help us understand your business so we can create the best content strategy.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-stone-800">Basics</h3>
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>About Your Company</label>
                  <textarea value={form.about} onChange={e => handleChange('about', e.target.value)} rows={3} className={inputClass} placeholder="What does your company do? (2-3 sentences)" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Industry</label>
                    <input type="text" value={form.industry} onChange={e => handleChange('industry', e.target.value)} className={inputClass} placeholder="e.g. SaaS, FinTech" />
                  </div>
                  <div>
                    <label className={labelClass}>Brand Tone</label>
                    <input type="text" value={form.tone} onChange={e => handleChange('tone', e.target.value)} className={inputClass} placeholder="e.g. Professional, Bold" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Unique Selling Proposition (USP)</label>
                  <input type="text" value={form.usp} onChange={e => handleChange('usp', e.target.value)} className={inputClass} placeholder="What makes you different?" />
                </div>
                <div>
                  <label className={labelClass}>Ideal Customer Profile (ICP)</label>
                  <textarea value={form.icp} onChange={e => handleChange('icp', e.target.value)} rows={2} className={inputClass} placeholder="Who is your ideal customer?" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-stone-800">Product</h3>
                <div>
                  <label className={labelClass}>Key Features <span className="text-stone-400 font-normal">(comma-separated)</span></label>
                  <textarea value={form.features} onChange={e => handleChange('features', e.target.value)} rows={2} className={inputClass} placeholder="Feature A, Feature B, Feature C" />
                </div>
                <div>
                  <label className={labelClass}>Integrations <span className="text-stone-400 font-normal">(comma-separated)</span></label>
                  <input type="text" value={form.integrations} onChange={e => handleChange('integrations', e.target.value)} className={inputClass} placeholder="Slack, Salesforce, HubSpot" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                <h3 className="font-semibold text-stone-800">Online Presence</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Twitter/X</label>
                    <input type="text" value={form.socialTwitter} onChange={e => handleChange('socialTwitter', e.target.value)} className={inputClass} placeholder="@handle" />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input type="text" value={form.socialLinkedin} onChange={e => handleChange('socialLinkedin', e.target.value)} className={inputClass} placeholder="URL or handle" />
                  </div>
                  <div>
                    <label className={labelClass}>Instagram</label>
                    <input type="text" value={form.socialInstagram} onChange={e => handleChange('socialInstagram', e.target.value)} className={inputClass} placeholder="@handle" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-stone-800 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-stone-700">
                Next: Competitors <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Competitors */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Your Competitors</h2>
              <p className="text-stone-500">Add companies you compete with so we can analyze their content strategy.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-medium mb-4">Your Competitors</h3>
                {competitors.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                      <img src={favicon(c.domain)} className="w-6 h-6 rounded" alt="" />
                      <div><p className="font-medium">{c.name}</p><p className="text-xs text-stone-400">{c.domain}</p></div>
                    </div>
                    <button onClick={() => setCompetitors(competitors.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-rose-500"><Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                {competitors.length === 0 && <p className="text-stone-400 text-sm italic p-3">No competitors yet</p>}
              </div>
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-medium mb-4">Add Competitor</h3>
                <div className="flex gap-2">
                  <input value={newComp} onChange={e => setNewComp(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCompetitor()} placeholder="competitor.com" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300" />
                  <button onClick={addCompetitor} className="px-4 py-2 bg-stone-100 rounded-lg hover:bg-stone-200">Add</button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <button onClick={() => setStep(1)} className="px-8 py-3 border-2 rounded-xl font-medium text-stone-600 hover:bg-stone-50">
                ← Back
              </button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-stone-800 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-stone-700">
                Next: Content <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Content & Style */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Content & Style Preferences</h2>
              <p className="text-stone-500">Share content you like so we can match your preferred style.</p>
            </div>

            <div className="bg-white rounded-xl border p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><Link className="w-5 h-5 text-stone-400" /><h3 className="font-medium">Reference URLs</h3></div>
              <p className="text-sm text-stone-500 mb-4">Add blog posts, articles, or pages whose style you'd like us to replicate.</p>
              {customUrls.map((u, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={u} onChange={e => { const a = [...customUrls]; a[i] = e.target.value; setCustomUrls(a); }} placeholder="https://example.com/blog-post-you-like" className="flex-1 p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
                  {customUrls.length > 1 && <button onClick={() => setCustomUrls(customUrls.filter((_, idx) => idx !== i))} className="p-3 text-stone-400 hover:text-rose-500"><Trash className="w-4 h-4" /></button>}
                </div>
              ))}
              <button onClick={() => setCustomUrls([...customUrls, ''])} className="flex items-center gap-2 text-sm text-stone-600 mt-2 hover:text-stone-800"><Plus className="w-4 h-4" />Add URL</button>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="font-medium mb-4">Additional Notes</h3>
              <textarea value={form.notes} onChange={e => handleChange('notes', e.target.value)} rows={4} className={inputClass} placeholder="Any specific requests, context, or preferences for the BTA team..." />
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button onClick={() => setStep(2)} className="px-8 py-3 border-2 rounded-xl font-medium text-stone-600 hover:bg-stone-50">
                ← Back
              </button>
              <button onClick={() => setStep(4)} className="px-8 py-3 bg-stone-800 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-stone-700">
                Review & Submit <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Submit */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"><Send className="w-8 h-8 text-stone-600" /></div>
              <h2 className="text-2xl font-bold mb-2">Ready to Submit</h2>
              <p className="text-stone-500">Review your summary and submit to the Be The Answer team</p>
            </div>

            <div className="bg-white rounded-2xl border p-6 mb-6 shadow-sm">
              <h3 className="font-medium text-stone-800 mb-4">Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Company</span><span className="font-medium">{form.name || '—'}</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Industry</span><span className="font-medium">{form.industry || '—'}</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Competitors</span><span className="font-medium">{competitors.length} added</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Reference URLs</span><span className="font-medium">{customUrls.filter(u => u.trim()).length} added</span></div>
                <div className="flex justify-between py-3"><span className="text-stone-500">Features</span><span className="font-medium">{form.features.split(',').filter(s => s.trim()).length} listed</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} disabled={status === 'submitting'} className="flex-1 py-3.5 border-2 rounded-xl font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-50">
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={status === 'submitting'} className="flex-1 py-3.5 bg-stone-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-700 disabled:bg-stone-400">
                {status === 'submitting' ? <><Loader className="w-5 h-5" /> Submitting...</> : <><Send className="w-5 h-5" />Submit to BTA</>}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
