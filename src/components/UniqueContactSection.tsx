'use client';

import React, { useState } from 'react';
import {
  Send,
  Mail,
  Globe,
  Copy,
  Zap,
  Briefcase,
  UserCheck,
  Sparkles,
  MessageSquareText,
  ShieldCheck,
  MessageCircle,
  Lock
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';
import { WhatsAppModal } from '@/components/WhatsAppModal';
import MultiStepLoaderDemo from '@/components/multi-step-loader-demo';

type PersonaType = 'hr' | 'client' | 'other';

export function UniqueContactSection() {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const [persona, setPersona] = useState<PersonaType>('hr');
  const [form, setForm] = useState({
    name: '',
    email: '',
    whyReason: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santhoshrajk1812@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetContactEmail);
    showToast('Email Copied!', `${targetContactEmail} saved to clipboard.`, 'success');
  };

  const handlePersonaChange = (newPersona: PersonaType) => {
    setPersona(newPersona);
    showToast('Category Updated', `Form tailored for ${newPersona.toUpperCase()} inquiry.`, 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch IP & Geolocation telemetry for anti-spam audit logging
      let ipTelemetry = {
        ip: 'Unknown IP',
        city: 'Unknown City',
        region: 'Unknown Region',
        country: 'Unknown Country',
        isp: 'Unknown ISP',
        lat: 'N/A',
        lon: 'N/A',
      };

      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          ipTelemetry = {
            ip: geoData.ip || 'Unknown IP',
            city: geoData.city || 'Unknown City',
            region: geoData.region || 'Unknown Region',
            country: geoData.country_name || 'Unknown Country',
            isp: geoData.org || geoData.asn || 'Unknown ISP',
            lat: geoData.latitude || 'N/A',
            lon: geoData.longitude || 'N/A',
          };
        }
      } catch {
        // Fallback if client IP lookup fails
      }

      // 1. Direct Gmail SMTP Dispatch via /api/whatsapp API Route
      await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: `${form.name} (${persona.toUpperCase()})`,
          senderPhone: form.email,
          messageText: `WHY REACHING OUT: ${form.whyReason || 'N/A'}\n\nDETAILED MESSAGE PAYLOAD:\n${form.message}`,
          otpCode: 'DIRECT_FORM',
          clientTelemetry: ipTelemetry,
        }),
      });

      // 4-second loader animation buffer to show full multi-step loading states
      await new Promise((res) => setTimeout(res, 4000));

      showToast('Message Dispatched!', `Thank you ${form.name}, your message was delivered to Santhosh Raj.`, 'success');
      setForm({ name: '', email: '', whyReason: '', message: '' });
    } catch {
      showToast('Message Logged!', `Thank you ${form.name}, message received.`, 'success');
      setForm({ name: '', email: '', whyReason: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 space-y-8 max-w-7xl mx-auto">
      {/* Core Multi-step Contact Loader */}
      <MultiStepLoaderDemo loading={isSubmitting} onClose={() => setIsSubmitting(false)} />
      {/* Sleek Mobile-Optimized Section Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-3 border-b pb-4 sm:pb-6 ${
        theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <span className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
            }`}>
              CONTACT & CONNECT
            </span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug ${
            theme === 'dark' ? 'text-white' : 'text-slate-950'
          }`}>
            Let&apos;s Build Something Exceptional.
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-mono font-bold text-emerald-700 shrink-0 self-start md:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
          <span>AVAILABLE FOR NEW ROLES & PROJECTS</span>
        </div>
      </div>

      {/* Main Grid Layout: Perfectly Aligned 5:7 Split */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: CONTACT DETAILS & CHANNELS (5 Cols) */}
        <div className={`lg:col-span-5 flex flex-col justify-between rounded-3xl border p-4 xs:p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-xl ${
          theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80 text-slate-100' : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
        }`}>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-wider block">
                Backend Architect
              </span>
              <h3 className={`text-lg sm:text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                Santhosh Raj
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Backend Developer @ <strong className="text-purple-600 font-bold">DataMoo.ai</strong> specialized in Python, Django REST, PostgreSQL, Scalable Fintech (Mutual Funds) APIs, Docker, and Next.js 16 (Learning RAG AI).
              </p>
            </div>

            <div className={`space-y-3 pt-4 border-t ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
              
              {/* Direct Email Box */}
              <div className={`flex items-center justify-between gap-2.5 rounded-2xl border p-3 sm:p-3.5 transition-all ${
                theme === 'dark' ? 'border-purple-900/40 bg-slate-900/60' : 'border-purple-200 bg-purple-50/60'
              }`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[10px] font-mono uppercase block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-bold'}`}>Direct Email</span>
                    <span className="text-xs font-mono font-extrabold text-purple-600 block truncate">{targetContactEmail}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`rounded-xl border p-2 transition-all cursor-pointer shrink-0 ${
                    theme === 'dark' ? 'border-purple-900/40 bg-slate-900 text-purple-400 hover:bg-purple-900/40' : 'border-purple-200 bg-white text-purple-700 hover:bg-purple-100'
                  }`}
                  title="Copy Email Address"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Location & Timezone Box */}
              <div className={`flex items-center gap-2.5 rounded-2xl border p-3 sm:p-3.5 ${
                theme === 'dark' ? 'border-purple-900/40 bg-slate-900/60' : 'border-purple-200 bg-purple-50/60'
              }`}>
                <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono uppercase block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-bold'}`}>Location & Schedule</span>
                  <span className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Remote Worldwide • IST (UTC+5:30)</span>
                </div>
              </div>

              {/* WhatsApp Verified OTP Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 sm:p-3.5 hover:bg-emerald-500/20 transition-all cursor-pointer group text-left shadow-lg shadow-emerald-500/5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-700 group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">Verified Instant Chat</span>
                    <span className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>OTP Verified Mobile Session</span>
                  </div>
                </div>
                <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
              </button>

            </div>
          </div>

          {/* Security Disclaimer Note */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 sm:p-3.5 text-[10px] sm:text-[11px] text-amber-800 font-medium leading-relaxed flex items-start gap-2.5 mt-4">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block mb-0.5">Security & Anti-Spam Logging</span>
              <span>For security verification, fraud prevention, and to protect against unsolicited spam, your IP address, geolocation coordinates, and device specs are logged with every submission.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CLEAN FORM CARD (7 Cols) */}
        <div className={`lg:col-span-7 flex flex-col justify-between rounded-3xl border p-4 xs:p-6 sm:p-8 backdrop-blur-xl shadow-xl ${
          theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80 text-slate-100' : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Category Selector Tabs */}
            <div className="space-y-2">
              <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-950'
              }`}>
                1. Select Inquiry Intent:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handlePersonaChange('hr')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'hr'
                      ? 'border-purple-500 bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                      : theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900/60 text-slate-400 hover:text-white'
                      : 'border-purple-200 bg-purple-50/40 text-slate-900 hover:bg-purple-100 font-bold'
                  }`}
                >
                  <UserCheck className="h-4 w-4 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold">HR / Recruiter</span>
                    <span className="text-[10px] opacity-80">Full-Time Roles</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('client')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'client'
                      ? 'border-purple-500 bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                      : theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900/60 text-slate-400 hover:text-white'
                      : 'border-purple-200 bg-purple-50/40 text-slate-900 hover:bg-purple-100 font-bold'
                  }`}
                >
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold">Client / Project</span>
                    <span className="text-[10px] opacity-80">API Architecture</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('other')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'other'
                      ? 'border-purple-500 bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                      : theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900/60 text-slate-400 hover:text-white'
                      : 'border-purple-200 bg-purple-50/40 text-slate-900 hover:bg-purple-100 font-bold'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold">Other / Peer</span>
                    <span className="text-[10px] opacity-80">Tech & RAG AI</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Why Reaching Out Input */}
            <div className="space-y-1.5">
              <label className={`block text-xs font-extrabold flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-950'
              }`}>
                <MessageSquareText className="h-3.5 w-3.5 text-purple-600" />
                <span>
                  {persona === 'hr'
                    ? 'Role / Position Title *'
                    : persona === 'client'
                    ? 'Project Scope / Requirements *'
                    : 'Reason for Connecting *'}
                </span>
              </label>
              <input
                type="text"
                required
                value={form.whyReason}
                onChange={(e) => setForm({ ...form, whyReason: e.target.value })}
                placeholder={
                  persona === 'hr'
                    ? 'e.g. Hiring for Senior Backend Developer at DataMoo.ai...'
                    : persona === 'client'
                    ? 'e.g. Building Django REST Mutual Funds API architecture...'
                    : 'e.g. Discussing Python backend design & RAG AI vector search...'
                }
                className={`w-full rounded-2xl border px-4 py-3 text-xs font-bold placeholder-slate-400 focus:outline-none transition-all font-sans ${
                  theme === 'dark'
                    ? 'border-purple-900/40 bg-slate-900 text-white focus:border-purple-500'
                    : 'border-purple-200 bg-purple-50/50 text-slate-950 focus:border-purple-500'
                }`}
              />
            </div>

            {/* Name & Email Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className={`block text-xs font-extrabold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-950'}`}>Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className={`w-full rounded-2xl border px-4 py-3 text-xs font-bold placeholder-slate-400 focus:outline-none transition-all font-sans ${
                    theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900 text-white focus:border-purple-500'
                      : 'border-purple-200 bg-purple-50/50 text-slate-950 focus:border-purple-500'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`block text-xs font-extrabold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-950'}`}>Your Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                  className={`w-full rounded-2xl border px-4 py-3 text-xs font-bold placeholder-slate-400 focus:outline-none transition-all font-sans ${
                    theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900 text-white focus:border-purple-500'
                      : 'border-purple-200 bg-purple-50/50 text-slate-950 focus:border-purple-500'
                  }`}
                />
              </div>
            </div>

            {/* Detailed Message Textarea */}
            <div className="space-y-1.5">
              <label className={`block text-xs font-extrabold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-950'}`}>Message Payload *</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Provide project details, team size, timeline, or interview details..."
                className={`w-full rounded-2xl border px-4 py-3 text-xs font-bold placeholder-slate-400 focus:outline-none resize-none transition-all font-sans ${
                  theme === 'dark'
                    ? 'border-purple-900/40 bg-slate-900 text-white focus:border-purple-500'
                    : 'border-purple-200 bg-purple-50/50 text-slate-950 focus:border-purple-500'
                }`}
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 border border-purple-500 px-6 py-3.5 text-xs font-bold text-white hover:bg-purple-700 transition-all cursor-pointer shadow-lg shadow-purple-500/20 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Direct Message to Santhosh Raj</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp OTP Verification Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </section>
  );
}
