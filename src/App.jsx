import React, { useState, useEffect } from 'react';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Icons
const Globe = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const Search = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const Building = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>);
const Users = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>);
const Check = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>);
const Plus = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const Trash = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const Loader = ({ className }) => (<svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>);
const Palette = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>);
const Link = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
const XIcon = ({ className, ...props }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const Heart = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const RotateCcw = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>);
const Star = ({ className, filled }) => (<svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const Mail = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const Phone = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const DollarSign = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
const Shield = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const Edit3 = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>);
const Zap = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const AlertCircle = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const Briefcase = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const Award = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>);
const Copy = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const Send = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const ArrowRight = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const Share2 = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>);
const ExternalLink = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
const Clock = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);

// Platform icon via Google S2 Favicon API
const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
const PlatformIcon = ({ domain, size = 20, className }) => (
  <img src={favicon(domain)} width={size} height={size} className={className} alt="" style={{ borderRadius: 3, display: 'block' }} />
);

const SOCIAL_PLATFORMS = [
  // Social Media
  { id: 'twitter', domain: 'x.com', label: 'Twitter/X', group: 'Social' },
  { id: 'linkedin', domain: 'linkedin.com', label: 'LinkedIn', group: 'Social' },
  { id: 'facebook', domain: 'facebook.com', label: 'Facebook', group: 'Social' },
  { id: 'instagram', domain: 'instagram.com', label: 'Instagram', group: 'Social' },
  { id: 'threads', domain: 'threads.net', label: 'Threads', group: 'Social' },
  { id: 'bluesky', domain: 'bsky.app', label: 'Bluesky', group: 'Social' },
  { id: 'tiktok', domain: 'tiktok.com', label: 'TikTok', group: 'Social' },
  // Content
  { id: 'youtube', domain: 'youtube.com', label: 'YouTube', group: 'Content' },
  { id: 'medium', domain: 'medium.com', label: 'Medium', group: 'Content' },
  { id: 'substack', domain: 'substack.com', label: 'Substack', group: 'Content' },
  { id: 'podcast', domain: 'podcasts.apple.com', label: 'Podcast', group: 'Content' },
  { id: 'pinterest', domain: 'pinterest.com', label: 'Pinterest', group: 'Content' },
  { id: 'dribbble', domain: 'dribbble.com', label: 'Dribbble', group: 'Content' },
  // Developer / Tech
  { id: 'github', domain: 'github.com', label: 'GitHub', group: 'Developer' },
  { id: 'producthunt', domain: 'producthunt.com', label: 'Product Hunt', group: 'Developer' },
  { id: 'discord', domain: 'discord.com', label: 'Discord', group: 'Developer' },
  { id: 'slack', domain: 'slack.com', label: 'Slack Community', group: 'Developer' },
  { id: 'reddit', domain: 'reddit.com', label: 'Reddit', group: 'Developer' },
  // Review / Directory
  { id: 'g2', domain: 'g2.com', label: 'G2', group: 'Reviews' },
  { id: 'capterra', domain: 'capterra.com', label: 'Capterra', group: 'Reviews' },
  { id: 'trustpilot', domain: 'trustpilot.com', label: 'Trustpilot', group: 'Reviews' },
  { id: 'glassdoor', domain: 'glassdoor.com', label: 'Glassdoor', group: 'Reviews' },
  { id: 'yelp', domain: 'yelp.com', label: 'Yelp', group: 'Reviews' },
  { id: 'bbb', domain: 'bbb.org', label: 'BBB', group: 'Reviews' },
  // Business / Reference
  { id: 'crunchbase', domain: 'crunchbase.com', label: 'Crunchbase', group: 'Business' },
  { id: 'wikipedia', domain: 'wikipedia.org', label: 'Wikipedia', group: 'Business' },
  { id: 'googlebiz', domain: 'business.google.com', label: 'Google Business', group: 'Business' },
  { id: 'angellist', domain: 'wellfound.com', label: 'Wellfound', group: 'Business' },
  // App Stores
  { id: 'appstore', domain: 'apple.com', label: 'App Store', group: 'Apps' },
  { id: 'playstore', domain: 'play.google.com', label: 'Play Store', group: 'Apps' },
];

const COMPLIANCE_BADGES = [
  { id: 'soc2', label: 'SOC 2', desc: 'Type II' },
  { id: 'gdpr', label: 'GDPR', desc: 'Compliant' },
  { id: 'hipaa', label: 'HIPAA', desc: 'Compliant' },
  { id: 'ccpa', label: 'CCPA', desc: 'Compliant' },
  { id: 'iso27001', label: 'ISO 27001', desc: 'Certified' },
  { id: 'pci', label: 'PCI DSS', desc: 'Level 1' },
];

// Empty fallback data - no fake/invented info, only structure
const generateEmptyFallback = (domain) => {
  const name = domain.replace(/\.(com|io|co|net|org).*/, '').replace(/^www\./, '');
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    domain, name: cap,
    data: {
      usp: '', icp: '', tone: '', about: '', features: [], integrations: [],
      pricing: [], limitations: [], techStack: [], support: '', contact: [],
      founders: [], compliance: [], reviews: [], caseStudies: [],
      social: {}, contentThemes: [], segments: [], partnerships: [],
      roadmap: '', funding: '', teamSize: '', guarantees: '', changelog: '',
    },
    blogPosts: [],
  };
};

// === REUSABLE UI COMPONENTS ===

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-stone-200 rounded-full h-2">
    <div className="bg-stone-800 h-2 rounded-full transition-all" style={{ width: `${(current/total)*100}%` }}/>
  </div>
);

const TextBlock = ({ label, value, onChange, icon: Icon, multiline }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-5 h-5 text-stone-400" />}
        <h3 className="font-semibold text-stone-800 text-sm">{label}</h3>
        <button onClick={() => { if (editing) onChange(draft); setEditing(!editing); }} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg">
          {editing ? <Check className="w-4 h-4 text-emerald-500" /> : <Edit3 className="w-4 h-4" />}
        </button>
      </div>
      {editing ? (multiline
        ? <textarea value={draft} onChange={e => setDraft(e.target.value)} className="w-full p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-stone-300 focus:outline-none" rows={4} />
        : <input value={draft} onChange={e => setDraft(e.target.value)} className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-stone-300 focus:outline-none" />
      ) : (
        <p className="text-stone-600 text-sm leading-relaxed">{value || <span className="text-stone-400 italic">Not set — click edit</span>}</p>
      )}
    </div>
  );
};

const TagList = ({ label, items, onChange, icon: Icon, suggestions = [] }) => {
  const [input, setInput] = useState('');
  const [showSug, setShowSug] = useState(false);
  const add = (tag) => { if (tag && !items.includes(tag)) onChange([...items, tag]); setInput(''); setShowSug(false); };
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-5 h-5 text-stone-400" />}
        <h3 className="font-semibold text-stone-800 text-sm">{label}</h3>
        <span className="ml-auto text-xs text-stone-400">{items.length}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.map(t => (
          <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm group">
            {t}
            <button onClick={() => onChange(items.filter(item => item !== t))} className="text-stone-400 hover:text-rose-500 opacity-0 group-hover:opacity-100"><XIcon className="w-3.5 h-3.5" /></button>
          </span>
        ))}
      </div>
      <div className="relative">
        <div className="flex gap-2">
          <input value={input} onChange={e => { setInput(e.target.value); setShowSug(true); }} onFocus={() => setShowSug(true)} onBlur={() => setTimeout(() => setShowSug(false), 200)} onKeyDown={e => e.key === 'Enter' && add(input)} placeholder="Add..." className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          <button onClick={() => add(input)} className="px-3 py-2 bg-stone-100 rounded-lg hover:bg-stone-200"><Plus className="w-4 h-4 text-stone-600" /></button>
        </div>
        {showSug && suggestions.filter(s => !items.includes(s) && s.toLowerCase().includes(input.toLowerCase())).length > 0 && (
          <div className="absolute top-full left-0 right-12 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
            {suggestions.filter(s => !items.includes(s) && s.toLowerCase().includes(input.toLowerCase())).map(s => (
              <button key={s} onMouseDown={() => add(s)} className="w-full px-3 py-2 text-left text-sm hover:bg-stone-50">{s}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialLinks = ({ social, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState('');
  const save = (id) => { onChange({ ...social, [id]: draft }); setEditId(null); };
  const groups = ['Social', 'Content', 'Developer', 'Reviews', 'Business', 'Apps'];
  const filledCount = SOCIAL_PLATFORMS.filter(p => social[p.id]).length;
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-stone-400" />
        <h3 className="font-semibold text-stone-800 text-sm">Social & Directory Profiles</h3>
        <span className="ml-auto text-xs text-stone-400">{filledCount} / {SOCIAL_PLATFORMS.length}</span>
      </div>
      <div className="space-y-4">
        {groups.map(group => {
          const platforms = SOCIAL_PLATFORMS.filter(p => p.group === group);
          return (
            <div key={group}>
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">{group}</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map(p => {
                  const val = social[p.id]; const isEd = editId === p.id;
                  return isEd ? (
                    <div key={p.id} className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl border">
                      <PlatformIcon domain={p.domain} size={18} className="flex-shrink-0" />
                      <input value={draft} onChange={e => setDraft(e.target.value)} placeholder={p.label + ' URL or handle'} className="w-44 px-2 py-1 text-sm border rounded focus:outline-none" autoFocus onKeyDown={e => e.key === 'Enter' && save(p.id)} />
                      <button onClick={() => save(p.id)} className="text-emerald-500"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditId(null)} className="text-stone-400"><XIcon className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <button key={p.id} onClick={() => { setEditId(p.id); setDraft(val || ''); }}
                      className={`group/btn relative w-10 h-10 rounded-lg flex items-center justify-center transition-all ${val ? 'bg-stone-800 ring-2 ring-stone-700' : 'bg-white border border-stone-200 hover:border-stone-400'}`}
                      title={p.label + (val ? `: ${val}` : ' — click to add')}>
                      <PlatformIcon domain={p.domain} size={18} className={val ? '' : 'opacity-40 grayscale'} />
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-stone-500 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 pointer-events-none">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ContactInfo = ({ items, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState({ label: '', value: '' });
  const icons = { mail: Mail, briefcase: Briefcase, phone: Phone };
  const save = () => { const next = [...items]; next[editIdx] = { ...next[editIdx], label: draft.label, value: draft.value }; onChange(next); setEditIdx(null); };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const addRow = () => { onChange([...items, { label: 'New Field', value: '', icon: 'mail' }]); setEditIdx(items.length); setDraft({ label: 'New Field', value: '' }); };
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-stone-400" />
        <h3 className="font-semibold text-stone-800 text-sm">Contact Information</h3>
        <button onClick={addRow} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg"><Plus className="w-4 h-4" /></button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const Icon = icons[item.icon] || Mail;
          return editIdx === i ? (
            <div key={i} className="p-3 bg-stone-50 rounded-lg space-y-2">
              <input value={draft.label} onChange={e => setDraft({ ...draft, label: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" placeholder="Label" />
              <input value={draft.value} onChange={e => setDraft({ ...draft, value: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" placeholder="Value" />
              <div className="flex gap-2"><button onClick={save} className="px-3 py-1 bg-stone-800 text-white text-sm rounded">Save</button><button onClick={() => setEditIdx(null)} className="px-3 py-1 text-sm text-stone-500">Cancel</button></div>
            </div>
          ) : (
            <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg group">
              <Icon className="w-5 h-5 text-stone-400 flex-shrink-0" />
              <div className="flex-1 min-w-0"><p className="text-xs text-stone-500">{item.label}</p><p className="text-sm font-medium text-stone-700 truncate">{item.value}</p></div>
              <button onClick={() => { setEditIdx(i); setDraft({ label: item.label, value: item.value }); }} className="p-1 text-stone-400 hover:text-stone-600 opacity-0 group-hover:opacity-100"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(i)} className="p-1 text-stone-400 hover:text-rose-500 opacity-0 group-hover:opacity-100"><Trash className="w-3.5 h-3.5" /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ComplianceBadges = ({ compliance, onChange }) => (
  <div className="bg-white rounded-xl border border-stone-200 p-5">
    <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-stone-400" /><h3 className="font-semibold text-stone-800 text-sm">Compliance & Certifications</h3></div>
    <div className="grid grid-cols-3 gap-2">
      {COMPLIANCE_BADGES.map(b => {
        const on = compliance.includes(b.id);
        return (<button key={b.id} onClick={() => onChange(on ? compliance.filter(c => c !== b.id) : [...compliance, b.id])} className={`p-3 rounded-xl border-2 text-left transition-all ${on ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 bg-stone-50 opacity-50 hover:opacity-80'}`}><div className="flex items-center gap-2"><Shield className={`w-4 h-4 ${on ? 'text-emerald-600' : 'text-stone-400'}`} /><div><p className={`font-semibold text-xs ${on ? 'text-emerald-700' : 'text-stone-500'}`}>{b.label}</p><p className="text-xs text-stone-400">{b.desc}</p></div></div></button>);
      })}
    </div>
  </div>
);

const ReviewScores = ({ reviews, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState({});
  const save = () => { const next = [...reviews]; next[editIdx] = draft; onChange(next); setEditIdx(null); };
  const addReview = () => { onChange([...reviews, { platform: 'New', score: '0', count: '0' }]); setEditIdx(reviews.length); setDraft({ platform: 'New', score: '0', count: '0' }); };
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4"><Star className="w-5 h-5 text-stone-400" /><h3 className="font-semibold text-stone-800 text-sm">Review Scores</h3><button onClick={addReview} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg"><Plus className="w-4 h-4" /></button></div>
      <div className="grid grid-cols-2 gap-3">
        {reviews.map((r, i) => editIdx === i ? (
          <div key={i} className="p-4 bg-stone-50 rounded-xl space-y-2">
            <input value={draft.platform} onChange={e => setDraft({ ...draft, platform: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Platform" />
            <div className="flex gap-2"><input value={draft.score} onChange={e => setDraft({ ...draft, score: e.target.value })} className="w-20 px-2 py-1 border rounded text-sm" placeholder="Score" /><input value={draft.count} onChange={e => setDraft({ ...draft, count: e.target.value })} className="flex-1 px-2 py-1 border rounded text-sm" placeholder="# reviews" /></div>
            <div className="flex gap-2"><button onClick={save} className="px-3 py-1 bg-stone-800 text-white text-sm rounded">Save</button><button onClick={() => setEditIdx(null)} className="text-sm text-stone-500">Cancel</button></div>
          </div>
        ) : (
          <div key={i} className="p-4 bg-stone-50 rounded-xl group cursor-pointer" onClick={() => { setEditIdx(i); setDraft(r); }}>
            <div className="flex items-center justify-between"><p className="text-xs font-medium text-stone-500 uppercase tracking-wide">{r.platform}</p><Edit3 className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100" /></div>
            <div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-bold text-stone-800">{r.score}</span><span className="text-stone-400">/5</span></div>
            <div className="flex gap-0.5 mt-1">{[1,2,3,4,5].map(s => <Star key={s} filled={s <= Math.round(parseFloat(r.score))} className={`w-4 h-4 ${s <= Math.round(parseFloat(r.score)) ? 'text-amber-400' : 'text-stone-300'}`} />)}</div>
            <p className="text-xs text-stone-500 mt-1">{r.count} reviews</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingCards = ({ pricing, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState({});
  const save = () => { const next = [...pricing]; next[editIdx] = draft; onChange(next); setEditIdx(null); };
  const addTier = () => { onChange([...pricing, { tier: 'New Tier', price: '0', period: '/month', features: ['Feature 1'] }]); };
  const removeTier = (i) => onChange(pricing.filter((_, idx) => idx !== i));
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4"><DollarSign className="w-5 h-5 text-stone-400" /><h3 className="font-semibold text-stone-800 text-sm">Pricing</h3><button onClick={addTier} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg"><Plus className="w-4 h-4" /></button></div>
      <div className="grid grid-cols-3 gap-3">
        {pricing.map((plan, i) => editIdx === i ? (
          <div key={i} className="p-4 rounded-xl border-2 border-stone-300 space-y-2">
            <input value={draft.tier} onChange={e => setDraft({ ...draft, tier: e.target.value })} className="w-full px-2 py-1 border rounded text-sm font-medium" />
            <div className="flex gap-1"><input value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} className="w-20 px-2 py-1 border rounded text-sm" /><input value={draft.period} onChange={e => setDraft({ ...draft, period: e.target.value })} className="flex-1 px-2 py-1 border rounded text-sm" /></div>
            <textarea value={(draft.features || []).join('\n')} onChange={e => setDraft({ ...draft, features: e.target.value.split('\n') })} className="w-full px-2 py-1 border rounded text-sm" rows={3} placeholder="One feature per line" />
            <div className="flex gap-2"><button onClick={save} className="px-3 py-1 bg-stone-800 text-white text-sm rounded">Save</button><button onClick={() => setEditIdx(null)} className="text-sm text-stone-500">Cancel</button></div>
          </div>
        ) : (
          <div key={i} className={`p-4 rounded-xl border-2 group relative ${plan.tier === 'Pro' ? 'border-stone-800 bg-stone-50' : 'border-stone-200'}`}>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1">
              <button onClick={() => { setEditIdx(i); setDraft(plan); }} className="p-1 bg-white rounded shadow text-stone-500 hover:text-stone-700"><Edit3 className="w-3 h-3" /></button>
              <button onClick={() => removeTier(i)} className="p-1 bg-white rounded shadow text-stone-400 hover:text-rose-500"><Trash className="w-3 h-3" /></button>
            </div>
            <p className="font-semibold text-stone-800">{plan.tier}</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}<span className="text-sm font-normal text-stone-500">{plan.period}</span></p>
            <ul className="mt-3 space-y-1">{(plan.features || []).map(f => <li key={f} className="text-sm text-stone-600 flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const FounderCards = ({ founders, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState({});
  const save = () => { const next = [...founders]; next[editIdx] = draft; onChange(next); setEditIdx(null); };
  const addFounder = () => { onChange([...founders, { name: 'New Person', role: 'Role', background: 'Background' }]); };
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-stone-400" /><h3 className="font-semibold text-stone-800 text-sm">Founders & Leadership</h3><button onClick={addFounder} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg"><Plus className="w-4 h-4" /></button></div>
      <div className="grid grid-cols-2 gap-3">
        {founders.map((f, i) => editIdx === i ? (
          <div key={i} className="p-3 bg-stone-50 rounded-xl space-y-2">
            <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} className="w-full px-2 py-1 border rounded text-sm font-medium" placeholder="Name" />
            <input value={draft.role} onChange={e => setDraft({ ...draft, role: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Role" />
            <input value={draft.background} onChange={e => setDraft({ ...draft, background: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Background" />
            <div className="flex gap-2"><button onClick={save} className="px-3 py-1 bg-stone-800 text-white text-sm rounded">Save</button><button onClick={() => setEditIdx(null)} className="text-sm text-stone-500">Cancel</button></div>
          </div>
        ) : (
          <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl group cursor-pointer" onClick={() => { setEditIdx(i); setDraft(f); }}>
            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-lg flex-shrink-0">{f.name.charAt(0)}</div>
            <div className="flex-1 min-w-0"><p className="font-semibold text-stone-800 text-sm">{f.name}</p><p className="text-xs text-stone-500">{f.role}</p><p className="text-xs text-stone-400 truncate">{f.background}</p></div>
            <Edit3 className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

const LimitationsList = ({ items, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState('');
  const [newItem, setNewItem] = useState('');
  const save = () => { const next = [...items]; next[editIdx] = draft; onChange(next); setEditIdx(null); };
  const add = () => { if (newItem) { onChange([...items, newItem]); setNewItem(''); } };
  return (
    <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
      <div className="flex items-center gap-2 mb-4"><AlertCircle className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-amber-800 text-sm">Known Limitations</h3></div>
      <ul className="space-y-2 mb-3">
        {items.map((item, i) => editIdx === i ? (
          <li key={i} className="flex gap-2"><input value={draft} onChange={e => setDraft(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" autoFocus onKeyDown={e => e.key === 'Enter' && save()} /><button onClick={save} className="text-emerald-500"><Check className="w-4 h-4" /></button></li>
        ) : (
          <li key={i} className="flex items-start gap-2 text-sm text-amber-900 group">
            <span className="text-amber-500 mt-0.5">•</span><span className="flex-1">{item}</span>
            <button onClick={() => { setEditIdx(i); setDraft(item); }} className="p-0.5 opacity-0 group-hover:opacity-100 text-amber-600"><Edit3 className="w-3 h-3" /></button>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-0.5 opacity-0 group-hover:opacity-100 text-amber-600 hover:text-rose-500"><Trash className="w-3 h-3" /></button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2"><input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Add limitation..." className="flex-1 px-3 py-1.5 border border-amber-300 rounded-lg text-sm bg-white focus:outline-none" /><button onClick={add} className="px-3 py-1.5 bg-amber-200 text-amber-800 rounded-lg text-sm hover:bg-amber-300">Add</button></div>
    </div>
  );
};

const CaseStudies = ({ items, onChange }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft] = useState({ company: '', result: '', industry: '', link: '' });
  const save = () => { const next = [...items]; next[editIdx] = { ...draft }; onChange(next); setEditIdx(null); };
  const add = () => { onChange([...items, { company: 'New Company', result: 'Result', industry: 'Industry', link: '' }]); };
  const remove = (i) => { onChange(items.filter((_, idx) => idx !== i)); if (editIdx === i) setEditIdx(null); };
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4"><Award className="w-5 h-5 text-stone-400" /><h3 className="font-semibold text-stone-800 text-sm">Case Studies</h3><button onClick={add} className="ml-auto p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg"><Plus className="w-4 h-4" /></button></div>
      <div className="space-y-2">
        {items.map((cs, i) => editIdx === i ? (
          <div key={i} className="p-3 bg-stone-50 rounded-lg space-y-2">
            <input value={draft.company || ""} onChange={e => setDraft({ ...draft, company: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Company" />
            <input value={draft.result || ""} onChange={e => setDraft({ ...draft, result: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Result" />
            <input value={draft.industry || ""} onChange={e => setDraft({ ...draft, industry: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="Industry" />
            <div className="flex items-center gap-1.5"><Link className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" /><input value={draft.link || ""} onChange={e => setDraft({ ...draft, link: e.target.value })} className="w-full px-2 py-1 border rounded text-sm" placeholder="https://..." /></div>
            <div className="flex gap-2"><button onClick={save} className="px-3 py-1 bg-stone-800 text-white text-sm rounded">Save</button><button onClick={() => setEditIdx(null)} className="text-sm text-stone-500">Cancel</button></div>
          </div>
        ) : (
          <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg group">
            <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center text-stone-500 font-bold text-sm flex-shrink-0">{(cs.company || '?').charAt(0)}</div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { setEditIdx(i); setDraft(cs); }}>
              <p className="font-medium text-stone-800 text-sm">{cs.company}</p>
              <p className="text-xs text-emerald-600">{cs.result}</p>
              {cs.link && <a href={cs.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-xs text-blue-500 hover:underline truncate block mt-0.5">{cs.link}</a>}
            </div>
            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded flex-shrink-0">{cs.industry}</span>
            <button onClick={() => { setEditIdx(i); setDraft(cs); }} className="p-1 text-stone-400 opacity-0 group-hover:opacity-100"><Edit3 className="w-3.5 h-3.5" /></button>
            <button onClick={() => remove(i)} className="p-1 text-stone-400 hover:text-rose-500 opacity-0 group-hover:opacity-100"><Trash className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tinder Card
const TinderCard = ({ post, onSwipe, style, isActive }) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleStart = (cx) => { if (!isActive) return; setStartX(cx); setIsDragging(true); };
  const handleMove = (cx) => { if (!isDragging || !isActive) return; setOffsetX(cx - startX); };
  const handleEnd = () => { if (!isDragging || !isActive) return; setIsDragging(false); if (offsetX > 120) onSwipe('right'); else if (offsetX < -120) onSwipe('left'); setOffsetX(0); };
  const rot = isActive ? offsetX * 0.08 : 0;
  return (
    <div className="absolute w-full h-full select-none" style={{ ...style, transform: `${style?.transform||''} translateX(${isActive?offsetX:0}px) rotate(${rot}deg)`, transition: isDragging ? 'none' : 'transform 0.3s', cursor: isActive ? 'grab' : 'default' }}
      onMouseDown={e => handleStart(e.clientX)} onMouseMove={e => handleMove(e.clientX)} onMouseUp={handleEnd} onMouseLeave={handleEnd}
      onTouchStart={e => handleStart(e.touches[0].clientX)} onTouchMove={e => handleMove(e.touches[0].clientX)} onTouchEnd={handleEnd}>
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border">
        {isActive && <>
          <div className="absolute top-6 left-6 z-20 px-4 py-2 border-4 border-emerald-500 rounded-xl -rotate-12 pointer-events-none" style={{ opacity: Math.max(0, offsetX/100) }}><span className="text-emerald-500 font-black text-3xl">LIKE</span></div>
          <div className="absolute top-6 right-6 z-20 px-4 py-2 border-4 border-rose-500 rounded-xl rotate-12 pointer-events-none" style={{ opacity: Math.max(0, -offsetX/100) }}><span className="text-rose-500 font-black text-3xl">NOPE</span></div>
        </>}
        <div className="h-44 bg-stone-200 relative"><img src={post.image} alt="" className="w-full h-full object-cover" draggable={false} /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-4 left-4 right-4"><p className="text-white/70 text-sm">{post.date}</p><h3 className="text-white font-bold text-xl">{post.title}</h3></div></div>
        <div className="p-4 border-b"><p className="text-stone-600 text-sm">{post.description}</p></div>
        <div className="p-4 h-48 overflow-y-auto"><p className="text-xs text-stone-400 uppercase font-semibold mb-2">Content Preview</p><p className="text-stone-700 text-sm whitespace-pre-line">{post.body}</p></div>
      </div>
    </div>
  );
};

const StyleSelection = ({ blogPosts, onComplete, likedPosts, setLikedPosts }) => {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(null);
  const swipe = (dir) => {
    setExiting({ dir, i: idx });
    setTimeout(() => { if (dir === 'right') setLikedPosts(p => [...p, blogPosts[idx]]); if (idx >= blogPosts.length - 1) setDone(true); else setIdx(i => i + 1); setExiting(null); }, 300);
  };
  useEffect(() => { if (typeof window === 'undefined') return; const h = e => { if (done) return; if (e.key === 'ArrowLeft') swipe('left'); if (e.key === 'ArrowRight') swipe('right'); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [idx, done]);
  if (done) return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-emerald-600" /></div>
      <h3 className="text-2xl font-bold mb-2">Done! Liked {likedPosts.length} posts</h3>
      {likedPosts.length > 0 && <div className="max-w-md mx-auto mb-6 text-left">{likedPosts.map(p => <div key={p.id} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg mb-2"><svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span className="text-sm">{p.title}</span></div>)}</div>}
      <div className="flex gap-3 justify-center">
        <button onClick={() => { setIdx(0); setLikedPosts([]); setDone(false); }} className="px-4 py-2 border rounded-lg flex items-center gap-2"><RotateCcw className="w-4 h-4" />Redo</button>
        <button onClick={onComplete} className="px-6 py-2 bg-stone-800 text-white rounded-lg font-medium">Continue</button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="mb-6"><div className="flex justify-between text-sm mb-2"><span className="text-stone-600">Reviewing posts</span><span className="font-semibold">{idx+1} / {blogPosts.length}</span></div><ProgressBar current={idx+1} total={blogPosts.length} /></div>
      <div className="relative h-[520px] w-full max-w-md mx-auto mb-8">
        {blogPosts.map((p, i) => { if (i < idx || i > idx + 1) return null; const active = i === idx; const ex = exiting?.i === i; let s = {}; if (ex) s = { transform: `translateX(${exiting.dir==='right'?500:-500}px) rotate(${exiting.dir==='right'?30:-30}deg)`, opacity: 0, zIndex: 10 }; else if (active) s = { zIndex: 10 }; else s = { transform: 'scale(0.95) translateY(20px)', zIndex: 5, opacity: 0.7 }; return <TinderCard key={p.id} post={p} onSwipe={swipe} style={s} isActive={active && !ex} />; })}
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={() => swipe('left')} className="w-16 h-16 rounded-full bg-white border-2 border-rose-200 flex items-center justify-center text-rose-500 hover:scale-110 transition-all shadow-lg"><XIcon className="w-8 h-8" strokeWidth={3} /></button>
        <button onClick={() => swipe('right')} className="w-16 h-16 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-emerald-500 hover:scale-110 transition-all shadow-lg"><Heart className="w-8 h-8" /></button>
      </div>
      <p className="text-center text-stone-400 text-sm mt-4">Drag or ← → keys</p>
    </div>
  );
};


// === COMPETITOR READ-ONLY VIEW (for comparison) ===
const CompetitorReadOnly = ({ data, competitorName }) => {
  if (!data) return <p className="text-stone-500 text-center py-8">No data available for this competitor</p>;
  
  const ReadOnlySection = ({ label, icon: Icon, children }) => (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-stone-400" />}
        <h4 className="font-medium text-stone-700 text-sm">{label}</h4>
      </div>
      {children}
    </div>
  );

  const TagDisplay = ({ items }) => (
    <div className="flex flex-wrap gap-1.5">
      {(items || []).slice(0, 8).map((item, i) => (
        <span key={i} className="px-2 py-1 bg-stone-100 text-stone-600 rounded text-xs">{item}</span>
      ))}
      {(items || []).length > 8 && <span className="px-2 py-1 text-stone-400 text-xs">+{items.length - 8} more</span>}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header info */}
      <div className="bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl p-4 border">
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Competitor Analysis</p>
        <h3 className="font-semibold text-stone-800 text-lg">{competitorName}</h3>
        {data.industry && <span className="inline-block mt-2 px-2 py-0.5 bg-stone-200 text-stone-600 rounded text-xs">{data.industry}</span>}
      </div>

      {/* Key Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <ReadOnlySection label="Unique Selling Proposition" icon={Zap}>
          <p className="text-sm text-stone-600">{data.usp || 'Not available'}</p>
        </ReadOnlySection>
        <ReadOnlySection label="About" icon={Building}>
          <p className="text-sm text-stone-600">{data.about || 'Not available'}</p>
        </ReadOnlySection>
      </div>

      {/* Features & Integrations */}
      <div className="grid md:grid-cols-2 gap-4">
        <ReadOnlySection label="Features" icon={Zap}>
          <TagDisplay items={data.features} />
        </ReadOnlySection>
        <ReadOnlySection label="Integrations" icon={Link}>
          <TagDisplay items={data.integrations} />
        </ReadOnlySection>
      </div>

      {/* Pricing Summary */}
      {data.pricing && data.pricing.length > 0 && (
        <ReadOnlySection label="Pricing Tiers" icon={DollarSign}>
          <div className="flex flex-wrap gap-3">
            {data.pricing.map((tier, i) => (
              <div key={i} className="bg-stone-50 rounded-lg px-3 py-2 border">
                <p className="font-medium text-stone-700 text-sm">{tier.tier}</p>
                <p className="text-stone-800 font-semibold">${tier.price}<span className="text-stone-400 text-xs">{tier.period}</span></p>
              </div>
            ))}
          </div>
        </ReadOnlySection>
      )}

      {/* Reviews & Compliance */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.reviews && data.reviews.length > 0 && (
          <ReadOnlySection label="Review Scores" icon={Star}>
            <div className="flex flex-wrap gap-2">
              {data.reviews.map((r, i) => (
                <div key={i} className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-amber-500" filled />
                  <span className="text-sm font-medium text-stone-700">{r.score}</span>
                  <span className="text-xs text-stone-500">on {r.platform}</span>
                </div>
              ))}
            </div>
          </ReadOnlySection>
        )}
        {data.compliance && data.compliance.length > 0 && (
          <ReadOnlySection label="Compliance" icon={Shield}>
            <div className="flex flex-wrap gap-1.5">
              {data.compliance.map((c, i) => (
                <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs uppercase">{c}</span>
              ))}
            </div>
          </ReadOnlySection>
        )}
      </div>

      {/* Target & Tech */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.icp && (
          <ReadOnlySection label="Target Customer" icon={Users}>
            <p className="text-sm text-stone-600">{data.icp}</p>
          </ReadOnlySection>
        )}
        {data.techStack && data.techStack.length > 0 && (
          <ReadOnlySection label="Tech Stack" icon={Zap}>
            <TagDisplay items={data.techStack} />
          </ReadOnlySection>
        )}
      </div>

      <p className="text-xs text-stone-400 text-center pt-2">This is read-only competitor data for comparison purposes</p>
    </div>
  );
};

// === DATA REVIEW (used by client in step 3) ===
const DataReview = ({ clientData, compData, competitors, activeTab, setActiveTab, updateField }) => {
  const d = activeTab === 'client' ? clientData?.data : compData[activeTab]?.data;
  const isClient = activeTab === 'client';
  const currentCompetitor = competitors.find(c => c.domain === activeTab);
  
  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab('client')} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'client' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'}`}>{clientData.name}<span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-emerald-100 text-emerald-700">You</span></button>
        {competitors.map(c => (<button key={c.domain} onClick={() => setActiveTab(c.domain)} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === c.domain ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'}`}>{c.name}</button>))}
      </div>
      
      {/* Show editable form ONLY for client, read-only for competitors */}
      {isClient && d && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <TextBlock label="Unique Selling Proposition" value={d.usp} onChange={v => updateField('usp', v)} icon={Zap} multiline />
            <TextBlock label="About" value={d.about} onChange={v => updateField('about', v)} icon={Building} multiline />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <TextBlock label="Ideal Customer Profile" value={d.icp} onChange={v => updateField('icp', v)} icon={Users} multiline />
            <TextBlock label="Tone of Voice" value={d.tone} onChange={v => updateField('tone', v)} icon={Palette} multiline />
            <TextBlock label="Support Hours" value={d.support} onChange={v => updateField('support', v)} icon={Briefcase} multiline />
          </div>
          <SocialLinks social={d.social} onChange={v => updateField('social', v)} />
          <div className="grid md:grid-cols-2 gap-6">
            <ContactInfo items={d.contact} onChange={v => updateField('contact', v)} />
            <FounderCards founders={d.founders} onChange={v => updateField('founders', v)} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TagList label="Features" items={d.features} onChange={v => updateField('features', v)} icon={Zap} suggestions={['Analytics','Reporting','API','Webhooks','Mobile App','Offline Mode','White-label']} />
            <TagList label="Integrations" items={d.integrations} onChange={v => updateField('integrations', v)} icon={Link} suggestions={['Salesforce','HubSpot','Slack','Zapier','Jira','Notion','Asana','Monday']} />
          </div>
          <PricingCards pricing={d.pricing} onChange={v => updateField('pricing', v)} />
          <div className="grid md:grid-cols-2 gap-6">
            <ComplianceBadges compliance={d.compliance} onChange={v => updateField('compliance', v)} />
            <ReviewScores reviews={d.reviews} onChange={v => updateField('reviews', v)} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <CaseStudies items={d.caseStudies} onChange={v => updateField('caseStudies', v)} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <LimitationsList items={d.limitations} onChange={v => updateField('limitations', v)} />
            <TagList label="Tech Stack" items={d.techStack} onChange={v => updateField('techStack', v)} icon={Zap} suggestions={['React','Vue','Angular','Node.js','Python','Go','AWS','GCP','Azure','Kubernetes','Docker']} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TextBlock label="Funding" value={d.funding} onChange={v => updateField('funding', v)} icon={DollarSign} multiline />
            <TextBlock label="Team Size" value={d.teamSize} onChange={v => updateField('teamSize', v)} icon={Users} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TextBlock label="Guarantees & SLAs" value={d.guarantees} onChange={v => updateField('guarantees', v)} icon={Shield} multiline />
            <TextBlock label="Roadmap" value={d.roadmap} onChange={v => updateField('roadmap', v)} icon={Zap} multiline />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TagList label="Customer Segments" items={d.segments} onChange={v => updateField('segments', v)} icon={Users} suggestions={['SaaS','FinTech','Healthcare','E-commerce','Enterprise','SMB','Education']} />
            <TagList label="Content Themes" items={d.contentThemes} onChange={v => updateField('contentThemes', v)} icon={Palette} suggestions={['Product updates','Thought leadership','Case studies','Tutorials','Industry news']} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TagList label="Partnerships" items={d.partnerships} onChange={v => updateField('partnerships', v)} icon={Award} suggestions={['AWS Partner','Google Partner','Salesforce AppExchange','Microsoft Partner']} />
            <TextBlock label="Product Updates / Changelog" value={d.changelog} onChange={v => updateField('changelog', v)} icon={Zap} multiline />
          </div>
        </div>
      )}
      
      {/* Read-only view for competitors */}
      {!isClient && (
        <CompetitorReadOnly data={d} competitorName={currentCompetitor?.name || activeTab} />
      )}
    </div>
  );
};


// === MAIN APP ===
export default function OnboardingApp() {
  // mode: 'admin' (BTA team) or 'client' (shared link)
  const [mode, setMode] = useState('admin');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState('');
  const [clientData, setClientData] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const [compData, setCompData] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComp, setNewComp] = useState('');
  const [activeTab, setActiveTab] = useState('client');
  const [customUrls, setCustomUrls] = useState(['']);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sitemapData, setSitemapData] = useState(null); // Scraped sitemap/llms.txt data

  // Client flow steps: 1=Competitors, 2=Style, 3=DataReview, 4=Submit
  const [clientStep, setClientStep] = useState(1);

  // Admin: crawl domain - FAST version (no blog scraping yet)
  const crawl = async () => {
    if (!domain) return;
    setLoading(true);
    setLoadMsg('Analyzing company with AI...');
    
    try {
      // Only call onboard API - this does the AI analysis and discovers competitors
      const onboardResponse = await fetch(`${API_URL}/api/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      
      if (!onboardResponse.ok) {
        throw new Error('Server error on onboard');
      }
      
      const result = await onboardResponse.json();
      console.log('[Frontend] AI Analysis result:', result);
      
      // Extract competitors from AI response
      const aiCompetitors = result.data?.competitors || [];
      const formattedCompetitors = aiCompetitors.map(c => ({
        domain: c.domain,
        name: c.name || c.domain.replace(/\.(com|io|net|org).*/, ''),
        reason: c.reason || ''
      }));
      
      console.log('[Frontend] AI-discovered competitors:', formattedCompetitors);
      
      // Merge API response with required frontend structure
      // Blog posts will be fetched later in client flow (step 2)
      const clientData = {
        domain: result.domain,
        name: result.name || result.data?.name,
        data: {
          ...result.data,
          // Ensure all required fields exist with defaults
          social: result.data?.social || {},
          contact: result.data?.contact || [],
          founders: result.data?.founders || [],
          pricing: result.data?.pricing || [],
          features: result.data?.features || [],
          integrations: result.data?.integrations || [],
          compliance: result.data?.compliance || [],
          reviews: result.data?.reviews || [],
          caseStudies: result.data?.caseStudies || [],
          limitations: result.data?.limitations || [],
          techStack: result.data?.techStack || [],
          segments: result.data?.segments || [],
          contentThemes: result.data?.contentThemes || [],
          partnerships: result.data?.partnerships || [],
        },
        blogPosts: [] // Will be fetched in client step 2
      };
      
      setClientData(clientData);
      
      // Use AI-discovered competitors, fallback to defaults if none found
      if (formattedCompetitors.length > 0) {
        setCompetitors(formattedCompetitors);
      } else {
        console.log('[Frontend] No competitors found by AI, client can add manually');
        setCompetitors([]);
      }
      
      // Create real form link via API
      try {
        const formRes = await fetch(`${API_URL}/api/form/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain, clientName: result.name || domain })
        });
        if (formRes.ok) {
          const formData = await formRes.json();
          setShareLink(`${window.location.origin}/form/${formData.token}`);
        }
      } catch (e) {
        console.warn('Form link creation failed:', e.message);
      }

    } catch (error) {
      console.error('Error crawling domain:', error);
      alert(`Failed to analyze ${domain}. Please check the domain and try again.`);
    }
    
    setLoading(false);
  };
  
  // Fetch blog posts AND sitemap data for the client (called when entering step 2)
  const fetchBlogPosts = async () => {
    if (!clientData?.domain) return;
    
    setLoading(true);
    setLoadMsg('Scraping blog posts and sitemap...');
    
    try {
      // Fetch blogs and sitemap in parallel
      const [blogsResponse, sitemapResponse] = await Promise.all([
        fetch(`${API_URL}/api/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: clientData.domain, limit: 20 })
        }),
        fetch(`${API_URL}/api/sitemap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: clientData.domain })
        })
      ]);
      
      // Handle sitemap data
      if (sitemapResponse.ok) {
        const sitemapResult = await sitemapResponse.json();
        console.log('[Frontend] Sitemap data:', sitemapResult);
        setSitemapData(sitemapResult);
      }
      
      if (blogsResponse.ok) {
        const blogsResult = await blogsResponse.json();
        const blogPosts = blogsResult.blogPosts || [];
        console.log(`[Frontend] Fetched ${blogPosts.length} real blog posts`);
        
        if (blogPosts.length > 0) {
          setClientData(prev => ({ ...prev, blogPosts }));
        } else {
          // Fallback to mock if no posts found
          console.log('[Frontend] No blog posts found, using mock data');
          setClientData(prev => ({ ...prev, blogPosts: generateEmptyFallback(clientData.domain).blogPosts }));
        }
      }
    } catch (error) {
      console.error('Blog scraping failed:', error);
      setClientData(prev => ({ ...prev, blogPosts: generateEmptyFallback(clientData.domain).blogPosts }));
    }
    
    setLoading(false);
  };

  // Admin: launch client view to preview
  const openClientView = () => {
    setMode('client');
    setClientStep(1);
  };

  // Client: crawl competitors AND fetch blog posts for step 2
  const crawlComps = async () => {
    setLoading(true);
    
    // Step 1: Analyze competitors (if any)
    if (competitors.length > 0) {
      for (const c of competitors) {
        setLoadMsg(`Analyzing competitor: ${c.name}...`);
        
        try {
          const response = await fetch(`${API_URL}/api/onboard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain: c.domain })
          });
          
          if (response.ok) {
            const result = await response.json();
            const compClientData = {
              domain: result.domain,
              name: result.name || result.data?.name,
              data: {
                ...result.data,
                social: result.data?.social || {},
                contact: result.data?.contact || [],
                founders: result.data?.founders || [],
                pricing: result.data?.pricing || [],
                features: result.data?.features || [],
                integrations: result.data?.integrations || [],
                compliance: result.data?.compliance || [],
                reviews: result.data?.reviews || [],
                caseStudies: result.data?.caseStudies || [],
                limitations: result.data?.limitations || [],
                techStack: result.data?.techStack || [],
                segments: result.data?.segments || [],
                contentThemes: result.data?.contentThemes || [],
                partnerships: result.data?.partnerships || [],
              }
            };
            setCompData(p => ({ ...p, [c.domain]: compClientData }));
          } else {
            // Fallback to mock data
            setCompData(p => ({ ...p, [c.domain]: generateEmptyFallback(c.domain) }));
          }
        } catch (error) {
          console.error(`Error analyzing ${c.domain}:`, error);
          // Fallback to mock data
          setCompData(p => ({ ...p, [c.domain]: generateEmptyFallback(c.domain) }));
        }
      }
    }
    
    // Step 2: Fetch blog posts for the client (needed for style selection)
    setLoadMsg('Scraping your blog posts for style selection...');
    try {
      const blogsResponse = await fetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: clientData.domain, limit: 20 })
      });
      
      if (blogsResponse.ok) {
        const blogsResult = await blogsResponse.json();
        const blogPosts = blogsResult.blogPosts || [];
        console.log(`[Frontend] Fetched ${blogPosts.length} real blog posts`);
        
        if (blogPosts.length > 0) {
          setClientData(prev => ({ ...prev, blogPosts }));
        } else {
          console.log('[Frontend] No blog posts found, using mock data');
          setClientData(prev => ({ ...prev, blogPosts: generateEmptyFallback(clientData.domain).blogPosts }));
        }
      } else {
        setClientData(prev => ({ ...prev, blogPosts: generateEmptyFallback(clientData.domain).blogPosts }));
      }
    } catch (error) {
      console.error('Blog scraping failed:', error);
      setClientData(prev => ({ ...prev, blogPosts: generateEmptyFallback(clientData.domain).blogPosts }));
    }
    
    setLoading(false);
    setClientStep(2);
  };

  // Client: submit to Airtable
  const handleSubmit = async () => {
    setLoading(true);
    setLoadMsg('Submitting to BTA...');
    
    try {
      const response = await fetch(`${API_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientData,
          competitors,
          likedPosts,
          customUrls: customUrls.filter(u => u.trim() !== ''),
          compData,
          sitemapData
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('[Frontend] Submission successful:', result);
        setSubmitted(true);
      } else {
        const error = await response.json();
        console.error('[Frontend] Submission failed:', error);
        alert(`Submission failed: ${error.details || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('[Frontend] Submission error:', error);
      alert('Failed to submit. Please check your connection and try again.');
    }
    
    setLoading(false);
  };

  const updateField = (field, value) => {
    if (activeTab === 'client') {
      setClientData(prev => ({ ...prev, data: { ...prev.data, [field]: value } }));
    } else {
      setCompData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], data: { ...prev[activeTab].data, [field]: value } } }));
    }
  };

  const copyLink = () => {
    try { navigator.clipboard?.writeText(shareLink); } catch(e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CLIENT_STEPS = [
    { n: 1, l: 'Competitors' },
    { n: 2, l: 'Style' },
    { n: 3, l: 'Data Review' },
    { n: 4, l: 'Submit' },
  ];

  // ========== ADMIN MODE ==========
  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-stone-100">
        <header className="bg-white border-b sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center"><span className="text-white font-bold">B</span></div>
            <div><h1 className="font-semibold text-stone-800">Be The Answer</h1><p className="text-stone-500 text-xs">Client Onboarding</p></div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">
          {!clientData ? (
            // Step: Enter domain
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border">
                  <Globe className="w-10 h-10 text-stone-600" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800 mb-3">New Client</h2>
                <p className="text-stone-500 text-lg">Enter their domain to create an onboarding workspace</p>
              </div>
              <div className="bg-white rounded-2xl border p-8 shadow-sm">
                <label className="text-sm font-medium text-stone-700 mb-2 block">Client Website</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === 'Enter' && crawl()} placeholder="example.com" className="w-full pl-10 pr-4 py-3.5 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-stone-300" />
                  </div>
                  <button onClick={crawl} disabled={!domain || loading} className="px-8 py-3.5 bg-stone-800 text-white rounded-xl disabled:bg-stone-300 font-medium text-lg">
                    {loading ? <Loader className="w-5 h-5" /> : 'Create'}
                  </button>
                </div>
                {loading && <div className="mt-5 p-4 bg-stone-50 rounded-xl flex items-center gap-3"><Loader className="w-5 h-5 text-stone-600" /><span className="text-stone-600">{loadMsg}</span></div>}
              </div>
            </div>
          ) : (
            // Done: Show share link + created clients
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Check className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800 mb-3">Client Created</h2>
                <p className="text-stone-500 text-lg">Share this link with <span className="font-semibold text-stone-700">{clientData.name}</span> so they can complete onboarding</p>
              </div>

              {/* Share Link Card */}
              <div className="bg-white rounded-2xl border p-8 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-5 h-5 text-stone-600" />
                  <h3 className="font-semibold text-stone-800">Onboarding Link</h3>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 p-3.5 bg-stone-50 rounded-xl text-sm text-stone-600 font-mono truncate border">{shareLink}</div>
                  <button onClick={copyLink} className={`px-5 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-stone-800 text-white hover:bg-stone-700'}`}>
                    {copied ? <><Check className="w-4 h-4" />Copied</> : <><Copy className="w-4 h-4" />Copy</>}
                  </button>
                </div>
                <p className="text-sm text-stone-500">The client will fill out a form with their company info, competitors, and content preferences. Data goes directly to Airtable.</p>
              </div>

              {/* What they'll see */}
              <div className="bg-white rounded-2xl border p-8 shadow-sm mb-6">
                <h3 className="font-semibold text-stone-800 mb-4">What the client will do</h3>
                <div className="space-y-3">
                  {CLIENT_STEPS.map(s => (
                    <div key={s.n} className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl">
                      <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center text-sm font-semibold text-stone-600">{s.n}</div>
                      <span className="font-medium text-stone-700">{s.l}</span>
                      <span className="text-sm text-stone-400 ml-auto">
                        {s.n === 1 && 'Confirm + add competitors'}
                        {s.n === 2 && 'Swipe blog posts they like'}
                        {s.n === 3 && 'Review & edit all crawled data'}
                        {s.n === 4 && 'Submit everything back to you'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex gap-3">
                <button onClick={openClientView} className="flex-1 px-5 py-3.5 bg-white border-2 border-stone-800 text-stone-800 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-50">
                  <ExternalLink className="w-5 h-5" />
                  Preview Client View
                </button>
                <button onClick={() => { setClientData(null); setDomain(''); setShareLink(''); setCompetitors([]); setCompData({}); setLikedPosts([]); }} className="flex-1 px-5 py-3.5 bg-stone-800 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Client
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ========== CLIENT MODE ==========
  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center px-6">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-3">All Done!</h2>
          <p className="text-stone-500 text-lg mb-8">Your data has been submitted to the Be The Answer team. They'll review everything and follow up shortly.</p>
          <div className="bg-white rounded-2xl border p-6 text-left">
            <h3 className="font-medium text-stone-800 mb-3">Summary</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between py-2 border-b border-stone-100"><span className="text-stone-500">Your company</span><span className="font-medium">{clientData?.name}</span></div>
              <div className="flex justify-between py-2 border-b border-stone-100"><span className="text-stone-500">Competitors analyzed</span><span className="font-medium">{competitors.length}</span></div>
              <div className="flex justify-between py-2 border-b border-stone-100"><span className="text-stone-500">Liked content styles</span><span className="font-medium">{likedPosts.length}</span></div>
              <div className="flex justify-between py-2"><span className="text-stone-500">Data sections reviewed</span><span className="font-medium text-emerald-600">All complete</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Client Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center"><span className="text-white font-bold">B</span></div>
            <div>
              <h1 className="font-semibold text-stone-800">Welcome, {clientData?.name || 'Client'}</h1>
              <p className="text-stone-500 text-xs">Complete your onboarding — powered by Be The Answer</p>
            </div>
          </div>
          {mode === 'client' && (
            <button onClick={() => setMode('admin')} className="text-xs text-stone-400 hover:text-stone-600 px-3 py-1.5 rounded border border-stone-200 hover:border-stone-300">
              ← Back to Admin
            </button>
          )}
        </div>
      </header>

      {/* Client Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          {CLIENT_STEPS.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${clientStep > s.n ? 'bg-emerald-500 text-white' : clientStep === s.n ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-500'}`}>
                  {clientStep > s.n ? <Check className="w-4 h-4" /> : s.n}
                </div>
                <span className={`text-sm hidden sm:block ${clientStep >= s.n ? 'text-stone-800' : 'text-stone-400'}`}>{s.l}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-px ${clientStep > s.n ? 'bg-emerald-500' : 'bg-stone-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Client Step 1: Competitors */}
        {clientStep === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Your Competitors</h2>
              <p className="text-stone-500">We detected these competitors. Confirm, remove, or add more.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-medium mb-4">Detected Competitors</h3>
                {competitors.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg mb-2">
                    <div className="flex items-center gap-3"><Building className="w-5 h-5 text-stone-400" /><div><p className="font-medium">{c.name}</p><p className="text-xs text-stone-400">{c.domain}</p></div></div>
                    <button onClick={() => setCompetitors(competitors.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-rose-500"><Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                {competitors.length === 0 && <p className="text-stone-400 text-sm italic p-3">No competitors yet</p>}
              </div>
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-medium mb-4">Add Competitor</h3>
                <div className="flex gap-2">
                  <input value={newComp} onChange={e => setNewComp(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newComp) { setCompetitors([...competitors, { domain: newComp, name: newComp.replace(/\..*/, '') }]); setNewComp(''); } }} placeholder="competitor.com" className="flex-1 px-4 py-2 border rounded-lg" />
                  <button onClick={() => { if (newComp) { setCompetitors([...competitors, { domain: newComp, name: newComp.replace(/\..*/, '') }]); setNewComp(''); } }} className="px-4 py-2 bg-stone-100 rounded-lg hover:bg-stone-200">Add</button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button onClick={crawlComps} disabled={!competitors.length || loading} className="px-8 py-3 bg-stone-800 text-white rounded-xl disabled:bg-stone-300 font-medium flex items-center gap-2">
                {loading ? loadMsg : <><span>Analyze {competitors.length} Competitors</span><ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>
          </div>
        )}

        {/* Client Step 2: Style */}
        {clientStep === 2 && clientData && (
          <div>
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"><Palette className="w-8 h-8 text-stone-600" /></div>
              <h2 className="text-2xl font-bold mb-2">Content Style</h2>
              <p className="text-stone-500">Swipe right on blog posts whose style you'd like us to replicate</p>
            </div>
            <div className="bg-white rounded-xl border p-6 mb-6">
              <StyleSelection blogPosts={clientData.blogPosts} onComplete={() => setClientStep(3)} likedPosts={likedPosts} setLikedPosts={setLikedPosts} />
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4"><Link className="w-5 h-5 text-stone-400" /><h4 className="font-medium text-sm">Custom Reference URLs</h4></div>
              {customUrls.map((u, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={u} onChange={e => { const a = [...customUrls]; a[i] = e.target.value; setCustomUrls(a); }} placeholder="https://example.com/blog-post-you-like" className="flex-1 p-3 border rounded-lg text-sm" />
                  {customUrls.length > 1 && <button onClick={() => setCustomUrls(customUrls.filter((_, idx) => idx !== i))} className="p-3 text-stone-400 hover:text-rose-500"><Trash className="w-4 h-4" /></button>}
                </div>
              ))}
              <button onClick={() => setCustomUrls([...customUrls, ''])} className="flex items-center gap-2 text-sm text-stone-600 mt-1"><Plus className="w-4 h-4" />Add URL</button>
            </div>
          </div>
        )}

        {/* Client Step 3: Data Review */}
        {clientStep === 3 && clientData && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Review Your Data</h2>
              <p className="text-stone-500">We gathered this from your website. Edit anything that's incorrect or incomplete.</p>
            </div>
            <DataReview clientData={clientData} compData={compData} competitors={competitors} activeTab={activeTab} setActiveTab={setActiveTab} updateField={updateField} />
            <div className="mt-8 flex justify-center">
              <button onClick={() => setClientStep(4)} className="px-8 py-3 bg-stone-800 text-white rounded-xl font-medium flex items-center gap-2">
                Looks Good <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Client Step 4: Submit */}
        {clientStep === 4 && clientData && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"><Send className="w-8 h-8 text-stone-600" /></div>
              <h2 className="text-2xl font-bold mb-2">Ready to Submit</h2>
              <p className="text-stone-500">Review your summary and submit to the Be The Answer team</p>
            </div>

            <div className="bg-white rounded-2xl border p-6 mb-6 shadow-sm">
              <h3 className="font-medium text-stone-800 mb-4">Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Your company</span><span className="font-medium">{clientData.name}</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Domain</span><span className="font-medium">{clientData.domain}</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Competitors</span><span className="font-medium">{competitors.length} analyzed</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Content styles liked</span><span className="font-medium">{likedPosts.length} posts</span></div>
                <div className="flex justify-between py-3 border-b border-stone-100"><span className="text-stone-500">Features listed</span><span className="font-medium">{clientData.data?.features?.length || 0}</span></div>
                <div className="flex justify-between py-3"><span className="text-stone-500">Integrations</span><span className="font-medium">{clientData.data?.integrations?.length || 0}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6 mb-6 shadow-sm">
              <h3 className="font-medium text-stone-800 mb-4">Anything else?</h3>
              <textarea placeholder="Add any additional notes, context, or specific requests for the BTA team..." rows={4} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-300" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setClientStep(3)} disabled={loading} className="flex-1 py-3.5 border-2 rounded-xl font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-50">
                ← Back to Review
              </button>
              <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3.5 bg-stone-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-700 disabled:bg-stone-400">
                {loading ? <><Loader className="w-5 h-5" />{loadMsg}</> : <><Send className="w-5 h-5" />Submit to BTA</>}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
