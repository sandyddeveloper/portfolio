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
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '4da5fe1b-b03d-43d8-9edd-ab59d9ce2ac5';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetContactEmail);
    showToast('Email Copied! 📋', `${targetContactEmail} saved to clipboard.`, 'success');
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

      const userAgentStr = typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown Browser';

      const payloadData = {
        access_key: web3FormsKey,
        name: form.name,
        email: form.email,
        subject: `[Portfolio Inquiry + IP METADATA] ${form.name} (${persona.toUpperCase()}) - ${ipTelemetry.city}, ${ipTelemetry.country}`,
        message: `PERSONA CATEGORY: ${persona.toUpperCase()}\nWHY REACHING OUT: ${form.whyReason || 'N/A'}\n\nDETAILED MESSAGE PAYLOAD:\n${form.message}\n\n--- SENDER IP TELEMETRY & GEOLOCATION METADATA ---\nIP ADDRESS: ${ipTelemetry.ip}\nLOCATION: ${ipTelemetry.city}, ${ipTelemetry.region}, ${ipTelemetry.country}\nLAT/LON COORDINATES: ${ipTelemetry.lat}, ${ipTelemetry.lon}\nISP / NETWORK PROVIDER: ${ipTelemetry.isp}\nUSER-AGENT DEVICE: ${userAgentStr}\nANTISPAM AUDIT NOTE: IP address & device metadata recorded for security audit logging to prevent unsolicited spam.`,
        from_name: 'Santhosh Raj Portfolio (IP Logged)',
        replyto: form.email,
        botcheck: false,
        _autoresponse: `Hello ${form.name},\n\nThank you for reaching out! I have received your inquiry regarding "${form.whyReason || 'Portfolio Inquiry'}" and will respond within 24 hours.\n\nBest regards,\nSanthosh Raj\nBackend Developer @ DataMoo.ai`
      };

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

      showToast('Message Dispatched! 🚀', `Thank you ${form.name}, your message was delivered to Santhosh Raj.`, 'success');
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
      {/* Sleek Mobile-Optimized Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-800/80 pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              CONTACT & CONNECT
            </span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
            Let&apos;s Build Something Exceptional.
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-mono font-medium text-emerald-400 shrink-0 self-start md:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AVAILABLE FOR NEW ROLES & PROJECTS</span>
        </div>
      </div>

      {/* Main Grid Layout: Perfectly Aligned 5:7 Split */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: CONTACT DETAILS & CHANNELS (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/60 p-4 xs:p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-xl">
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Backend Architect
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Santhosh Raj
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Backend Developer @ <strong className="text-cyan-300 font-semibold">DataMoo.ai</strong> specialized in Python, Django REST, PostgreSQL, Scalable Fintech (Mutual Funds) APIs, Docker, and Next.js 16 (Learning RAG AI).
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              
              {/* Direct Email Box */}
              <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-3.5 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Direct Email</span>
                    <span className="text-xs font-mono font-bold text-cyan-300 block truncate">{targetContactEmail}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all cursor-pointer shrink-0"
                  title="Copy Email Address"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Location & Timezone Box */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Location & Schedule</span>
                  <span className="text-xs font-semibold text-white">Remote Worldwide • IST (UTC+5:30)</span>
                </div>
              </div>

              {/* WhatsApp Verified OTP Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 sm:p-3.5 hover:bg-emerald-500/20 transition-all cursor-pointer group text-left shadow-lg shadow-emerald-500/5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Verified Instant Chat</span>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300">OTP Verified Mobile Session</span>
                  </div>
                </div>
                <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
              </button>

            </div>
          </div>

          {/* Security Disclaimer Note */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-3.5 text-[10px] sm:text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2.5 mt-4">
            <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-400 block mb-0.5">Security & Anti-Spam Logging</span>
              <span>For security verification, fraud prevention, and to protect against unsolicited spam from unwanted persons, your IP address, geolocation coordinates, and device specs are logged with every submission.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CLEAN FORM CARD (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/60 p-4 xs:p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Category Selector Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                1. Select Inquiry Intent:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handlePersonaChange('hr')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'hr'
                      ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <UserCheck className={`h-4 w-4 shrink-0 ${persona === 'hr' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs font-bold">HR / Recruiter</span>
                    <span className="text-[10px] text-slate-400">Full-Time Roles</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('client')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'client'
                      ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Briefcase className={`h-4 w-4 shrink-0 ${persona === 'client' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs font-bold">Client / Project</span>
                    <span className="text-[10px] text-slate-400">API Architecture</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('other')}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    persona === 'other'
                      ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Sparkles className={`h-4 w-4 shrink-0 ${persona === 'other' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs font-bold">Other / Peer</span>
                    <span className="text-[10px] text-slate-400">Tech & RAG AI</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Why Reaching Out Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MessageSquareText className="h-3.5 w-3.5 text-cyan-400" />
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
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-all font-sans"
              />
            </div>

            {/* Name & Email Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Your Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-all font-sans"
                />
              </div>
            </div>

            {/* Detailed Message Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Message Payload *</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Provide project details, team size, timeline, or interview details..."
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none transition-all font-sans"
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 border border-cyan-400 px-6 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50 mt-2"
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
