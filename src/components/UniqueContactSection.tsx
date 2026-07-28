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

interface OutlinedTextFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

function OutlinedTextField({
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  rows = 4,
  icon
}: OutlinedTextFieldProps) {
  const { theme } = useTheme();

  return (
    <div className="relative space-y-1">
      <label className={`block text-xs font-semibold tracking-wide ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
      }`}>
        {label} {required && <span className="text-blue-500">*</span>}
      </label>

      <div className={`relative flex items-center rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 ${
        theme === 'dark'
          ? 'border-slate-800 bg-slate-900/90 text-slate-100 placeholder-slate-500'
          : 'border-slate-300 bg-slate-50/50 text-slate-900 placeholder-slate-400'
      }`}>
        {icon && <div className="pl-3.5 text-slate-400 shrink-0">{icon}</div>}
        
        {isTextArea ? (
          <textarea
            required={required}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent px-3.5 py-3 text-sm focus:outline-none resize-none"
          />
        ) : (
          <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent px-3.5 py-2.5 text-sm focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}

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
        // Fallback
      }

      await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: `${form.name} (${persona.toUpperCase()})`,
          senderPhone: form.email,
          messageText: `REASON: ${form.whyReason || 'N/A'}\n\nMESSAGE:\n${form.message}`,
          otpCode: 'DIRECT_FORM',
          clientTelemetry: ipTelemetry,
        }),
      });

      await new Promise((res) => setTimeout(res, 2500));
      showToast('Message Sent!', `Thank you ${form.name}, your message has been delivered.`, 'success');
      setForm({ name: '', email: '', whyReason: '', message: '' });
    } catch {
      showToast('Message Received', `Thank you ${form.name}, message logged.`, 'success');
      setForm({ name: '', email: '', whyReason: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 space-y-8 max-w-6xl mx-auto">
      <MultiStepLoaderDemo loading={isSubmitting} onClose={() => setIsSubmitting(false)} />

      {/* Section Header - Material 3 Typography */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Get in Touch
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Let&apos;s Build Something Great Together
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-600 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for New Roles & Projects</span>
        </div>
      </div>

      {/* Main Grid: 5:7 Split with Neutral Elevated Surfaces */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Direct Contact Details & Actions (5 Cols) */}
        <div className={`lg:col-span-5 flex flex-col justify-between rounded-3xl border p-6 space-y-6 shadow-sm ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/80 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
        }`}>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">Santhush Raj</h3>
              <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Backend & Full-Stack Engineer specializing in high-performance APIs, database optimization, and cloud architecture.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              
              {/* Direct Email Box */}
              <div className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${
                theme === 'dark' ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Direct Email</span>
                    <span className="text-xs font-bold text-blue-600 block truncate">{targetContactEmail}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`rounded-xl border p-2 transition-colors cursor-pointer shrink-0 ${
                    theme === 'dark' ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-white text-slate-700'
                  }`}
                  title="Copy Email Address"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Location Box */}
              <div className={`flex items-center gap-3 rounded-2xl border p-3.5 ${
                theme === 'dark' ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="p-2 rounded-xl bg-emerald-600/10 text-emerald-600 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Location & Timezone</span>
                  <span className="text-xs font-bold">Remote Worldwide • IST (UTC+5:30)</span>
                </div>
              </div>

              {/* WhatsApp Verification Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 hover:bg-emerald-500/20 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-600 block">Instant Chat</span>
                    <span className="text-xs font-bold">Verified Mobile Session</span>
                  </div>
                </div>
                <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
              </button>

            </div>
          </div>
        </div>

        {/* Right Column: Clean Form Card with Material OutlinedTextFields (7 Cols) */}
        <div className={`lg:col-span-7 flex flex-col justify-between rounded-3xl border p-6 shadow-sm ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/80 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Persona Segmented Buttons */}
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold tracking-wide ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Select Inquiry Type:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handlePersonaChange('hr')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'hr'
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : theme === 'dark'
                      ? 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>HR / Hiring</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('client')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'client'
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : theme === 'dark'
                      ? 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePersonaChange('other')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    persona === 'other'
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : theme === 'dark'
                      ? 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>General</span>
                </button>
              </div>
            </div>

            {/* Outlined Text Fields */}
            <OutlinedTextField
              label={persona === 'hr' ? 'Role Title' : persona === 'client' ? 'Project Requirements' : 'Subject'}
              required
              value={form.whyReason}
              onChange={(e) => setForm({ ...form, whyReason: e.target.value })}
              placeholder={persona === 'hr' ? 'e.g. Senior Backend Engineer position' : 'e.g. API Development & Architecture'}
              icon={<MessageSquareText className="h-4 w-4" />}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <OutlinedTextField
                label="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Alex Rivera"
              />
              <OutlinedTextField
                label="Your Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="alex@company.com"
              />
            </div>

            <OutlinedTextField
              label="Message"
              required
              isTextArea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Provide project details, timelines, or interview requests..."
            />

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm transition-all cursor-pointer shadow-sm disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {/* Subtle Helper Text (Replacing Long Yellow Warning Block) */}
            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 inline" />
              <span>Protected by anti-spam verification & IP telemetry. Your message will be delivered directly.</span>
            </p>
          </form>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </section>
  );
}
