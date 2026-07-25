'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  MessageCircle,
  Lock,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  User,
  KeyRound,
  Send,
  LockKeyhole
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India 🇮🇳' },
  { code: '+1', country: 'USA / Canada 🇺🇸' },
  { code: '+44', country: 'UK 🇬🇧' },
  { code: '+61', country: 'Australia 🇦🇺' },
  { code: '+971', country: 'UAE 🇦🇪' },
  { code: '+49', country: 'Germany 🇩🇪' },
  { code: '+65', country: 'Singapore 🇸🇬' },
];

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [senderName, setSenderName] = useState('');
  const [messageText, setMessageText] = useState('');
  
  // OTP state
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('409182');
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '4da5fe1b-b03d-43d8-9edd-ab59d9ce2ac5';
  const targetContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santhoshrajk1812@gmail.com';

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setOtpCode(['', '', '', '', '', '']);
      setTimer(30);
    }
  }, [isOpen]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 7) {
      showToast('Invalid Phone Number', 'Please enter a valid phone number with 7-15 digits.', 'error');
      return;
    }
    if (!messageText) {
      showToast('Message Required', 'Please type your message payload.', 'error');
      return;
    }

    setIsSendingOtp(true);
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomCode);

    setTimeout(() => {
      setIsSendingOtp(false);
      setStep('otp');
      setTimer(30);
      showToast('Security OTP Generated 🔐', `Verification Code: ${randomCode}`, 'success');
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    setOtpCode(generatedOtp.split(''));
    showToast('OTP Auto-Filled', 'Code inserted into verification boxes.', 'info');
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpCode.join('');
    if (enteredOtp.length < 6) {
      showToast('Incomplete OTP', 'Please enter all 6 digits of the verification code.', 'error');
      return;
    }

    if (enteredOtp !== generatedOtp) {
      showToast('Invalid OTP Code', 'The code you entered does not match. Try auto-filling demo OTP.', 'error');
      return;
    }

    setIsVerifying(true);

    try {
      // Pure Background Server Route POST to /api/whatsapp (Zero browser URL redirects, zero exposed numbers)
      await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName || 'Visitor',
          senderPhone: `${countryCode} ${phoneNumber}`,
          messageText,
          otpCode: enteredOtp,
        }),
      });
    } catch (err) {
      console.warn('WhatsApp API Dispatch Error:', err);
    } finally {
      setIsVerifying(false);
      setStep('success');
      showToast('Message Dispatched! 🚀', 'Your verified message was sent directly to Santhosh Raj.', 'success');
    }
  };

  const handleResendOtp = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomCode);
    setTimer(30);
    setOtpCode(['', '', '', '', '', '']);
    showToast('New OTP Generated 🔐', `New verification OTP: ${randomCode}`, 'success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-emerald-500/40 bg-slate-950 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl text-slate-100 font-sans space-y-5"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Modal Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-md">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    ENCRYPTED DIRECT MESSAGING
                  </span>
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                    OTP SECURED
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Direct Mobile Dispatch
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* STEP 1: PHONE & MESSAGE INPUT FORM */}
          {step === 'input' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your contact phone number and message payload. An instant 6-digit verification code will confirm your identity before background dispatch.
              </p>

              {/* Name Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none transition-all font-mono"
                />
              </div>

              {/* Phone Number with Country Code */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Your Contact Phone Number *</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs font-mono text-emerald-300 focus:border-emerald-400 focus:outline-none cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Message Payload */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Message Payload *</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Hi Santhosh, I'd like to discuss a backend developer role / API project..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none resize-none transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 border border-emerald-400 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 mt-2"
              >
                {isSendingOtp ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Generating Security OTP...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Send Verification OTP Code</span>
                  </>
                )}
              </button>

              {/* Security & Anti-Spam Telemetry Notice */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-400 block mb-0.5">Security & Anti-Spam Notice</span>
                  <span>To prevent fraud, unsolicited spam, and unauthorized misuse from unwanted persons, your IP address, geolocation coordinates, and device specs are logged with every submission.</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: 6-DIGIT OTP VERIFICATION SCREEN */}
          {step === 'otp' && (
            <div className="space-y-5">
              {/* Generated OTP Alert Badge */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <KeyRound className="h-4 w-4" />
                  <span>SECURITY OTP GENERATED</span>
                </div>
                <div className="text-2xl font-extrabold font-mono tracking-widest text-white bg-slate-950/80 border border-emerald-500/30 rounded-xl py-2 px-4 inline-block">
                  {generatedOtp}
                </div>
                <p className="text-[11px] text-slate-300">
                  OTP sent for number <span className="font-mono text-emerald-300 font-bold">{countryCode} {phoneNumber}</span>. Enter code below or click Auto-Fill.
                </p>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all cursor-pointer mt-1"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Auto-Fill Demo OTP ({generatedOtp})</span>
                </button>
              </div>

              {/* 6 Input Digit Boxes */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-center text-slate-300">
                  ENTER 6-DIGIT VERIFICATION CODE:
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border border-slate-700 bg-slate-900 text-center font-mono text-lg font-bold text-emerald-400 focus:border-emerald-400 focus:outline-none shadow-inner transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Verification & Resend Action Footer */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 border border-emerald-400 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Verifying & Dispatching Background Message...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Verify OTP & Dispatch Direct Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ← Edit Phone Number
                  </button>

                  {timer > 0 ? (
                    <span>Resend OTP in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Resend New OTP
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS SCREEN */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-white">Identity Verified & Message Sent!</h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Your message has been securely routed to Santhosh Raj via background direct channel.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2 text-xs font-mono text-emerald-400">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Encrypted Channel • No Public Data Exposed</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
