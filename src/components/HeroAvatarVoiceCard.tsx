'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  UserCheck,
  Briefcase,
  Layers,
  Radio
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';

interface VoiceTopic {
  id: string;
  title: string;
  targetSection: string;
  shortDesc: string;
  icon: React.ReactNode;
  script: string;
}

const VOICE_TOPICS: VoiceTopic[] = [
  {
    id: 'bio',
    title: '30s Voice Introduction',
    targetSection: '#about',
    shortDesc: 'Backend Developer @ DataMoo.ai',
    icon: <UserCheck className="h-4 w-4 text-cyan-400" />,
    script:
      "Hello! I am Santhosh Raj, Backend Developer at DataMoo.ai and Full-Stack Systems Engineer. I specialize in Python, Django REST Framework, scalable APIs, PostgreSQL database tuning, and Fintech Mutual Fund transaction engines. Currently, I am actively engineering RAG AI systems!"
  },
  {
    id: 'stack',
    title: 'Tech Stack & Production Tools',
    targetSection: '#skills',
    shortDesc: 'Django, React, Next.js, Docker & AWS',
    icon: <Layers className="h-4 w-4 text-blue-400" />,
    script:
      "My tech stack spans Python, Django, Flask, PostgreSQL, MySQL, MongoDB, React, Next.js 16, TypeScript, Docker, Gunicorn, Nginx, AWS, Render, Vercel, and modern styling with Tailwind CSS and Material UI."
  },
  {
    id: 'projects',
    title: 'Fintech & Production Systems',
    targetSection: '#projects',
    shortDesc: 'Mutual Funds API engines & web apps',
    icon: <Briefcase className="h-4 w-4 text-emerald-400" />,
    script:
      "Explore my production engineering work! From scalable Fintech mutual fund processing APIs and JWT-secured authentication pipelines to full-stack Next.js dashboards and automated deployment pipelines."
  },
  {
    id: 'rag_ai',
    title: 'RAG AI & Autonomous Agents',
    targetSection: '#sql-lab',
    shortDesc: 'Currently learning & building RAG AI',
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
    script:
      "I am currently deep-diving into RAG AI systems, vector embeddings, and autonomous LLM workflows. I build intelligent query pipelines that retrieve context from enterprise documents and codebases!"
  }
];

export function HeroAvatarVoiceCard() {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [selectedTopic, setSelectedTopic] = useState<VoiceTopic>(VOICE_TOPICS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentCaption, setCurrentCaption] = useState<string>('');

  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Male Voice engine
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synthRef.current = synth;

      const pickMaleVoice = () => {
        const voices = synth.getVoices();
        if (!voices.length) return;

        const maleKeywords = ['david', 'mark', 'guy', 'george', 'james', 'richard', 'ryan', 'alex', 'daniel', 'male', 'google us english', 'natural'];
        const femaleKeywords = ['zira', 'samantha', 'victoria', 'karen', 'fiona', 'veena', 'jenny', 'aria', 'female'];

        const maleCandidate = voices.find((v) => {
          const nameLower = v.name.toLowerCase();
          const isFemale = femaleKeywords.some((fk) => nameLower.includes(fk));
          if (isFemale) return false;
          return maleKeywords.some((mk) => nameLower.includes(mk));
        }) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

        setMaleVoice(maleCandidate);
      };

      pickMaleVoice();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = pickMaleVoice;
      }
    }

    return () => {
      if (synthRef.current) {
        try {
          synthRef.current.cancel();
        } catch {
          // cleanup
        }
      }
    };
  }, []);

  // Play Speech & Trigger WalkingBot Section Travel in Background
  const playSpeech = (topic: VoiceTopic = selectedTopic) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech Not Supported', 'Your browser does not support Web Speech API.', 'error');
      return;
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;

    try {
      if (synth.paused) synth.resume();
      synth.cancel();
    } catch {
      // ignore
    }

    if (isMuted) setIsMuted(false);

    const utterance = new SpeechSynthesisUtterance(topic.script);
    utterance.rate = 1.0;
    utterance.pitch = 0.95; // Male voice resonance

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentCaption(topic.script);
      showToast('Playing Voice Narration', `Playing ${topic.title}...`, 'info');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentCaption('');
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;

    setTimeout(() => {
      try {
        synth.speak(utterance);
      } catch (err) {
        console.warn('Speech error:', err);
      }
    }, 50);
  };

  const pauseOrResumeSpeech = () => {
    if (!synthRef.current) return;
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        playSpeech(selectedTopic);
      }
    }
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setCurrentCaption('');
    }
  };

  const toggleMute = () => {
    if (isPlaying) {
      if (isMuted) {
        setIsMuted(false);
        if (synthRef.current?.paused) synthRef.current.resume();
      } else {
        setIsMuted(true);
        synthRef.current?.pause();
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl border p-4 xs:p-5 md:p-7 shadow-xl backdrop-blur-2xl transition-all duration-300 overflow-hidden ${theme === 'dark'
        ? 'border-purple-900/40 bg-slate-950/85 text-slate-100'
        : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
        }`}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Header Badge */}
      <div className={`flex items-center justify-between border-b pb-3 mb-5 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
        }`}>
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-purple-600" />
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
            }`}>
            Interactive Voice Companion
          </span>
        </div>

        {/* Live Equalizer Pulse */}
        <div className="flex items-center gap-1 h-3.5">
          {[40, 80, 30, 90, 50, 70].map((h, i) => (
            <motion.span
              key={i}
              className={`w-0.5 rounded-full ${isPlaying ? 'bg-purple-600' : theme === 'dark' ? 'bg-slate-700' : 'bg-purple-200'}`}
              animate={{
                height: isPlaying ? [`${h * 0.2}%`, `${h}%`, `${h * 0.3}%`] : '20%'
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5 + (i % 3) * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT: Clean Profile Image + Voice Topic List */}
      <div className="grid gap-6 sm:grid-cols-12 items-center">
        {/* PROFILE PHOTO CARD (5 Cols) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Pulsing Glow when Voice is Active */}
            <div
              className={`absolute -inset-1.5 rounded-2xl transition-all duration-500 blur-md ${isPlaying
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80 animate-pulse'
                : 'bg-purple-500/20 opacity-30'
                }`}
            />

            {/* Profile Photo */}
            <div className="relative h-36 w-36 xs:h-44 xs:w-44 sm:h-48 sm:w-48 overflow-hidden rounded-2xl border-2 border-purple-500 bg-slate-900 shadow-xl">
              <img
                src="/profile.png"
                alt="Santhosh Raj"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop';
                }}
              />

              {/* Status Badge */}
              <div className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-slate-950/85 border border-purple-500/40 rounded-xl py-1 px-2 text-center">
                <span className="text-xs font-mono font-bold text-purple-300 flex items-center justify-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-purple-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span>Santhosh Raj</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VOICE TOPICS LIST & CONTROLS (7 Cols) */}
        <div className="sm:col-span-7 space-y-3">

          {/* Clean Topic Buttons */}
          <div className="space-y-2">
            {VOICE_TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    playSpeech(topic);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${isSelected
                    ? theme === 'dark'
                      ? 'border-purple-500/60 bg-purple-500/20 text-white shadow-sm'
                      : 'border-purple-400 bg-purple-100 text-slate-950 font-bold shadow-sm'
                    : theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-900/40 text-slate-300 hover:border-purple-700 hover:bg-slate-900/80'
                      : 'border-purple-200 bg-purple-50/40 text-slate-900 font-bold hover:bg-purple-100/60'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg border ${isSelected
                      ? 'border-purple-500 bg-purple-600 text-white'
                      : theme === 'dark' ? 'border-purple-900/40 bg-slate-950 text-purple-400' : 'border-purple-200 bg-white text-purple-700'
                      }`}>
                      {topic.icon}
                    </div>
                    <div>
                      <span className={`text-xs sm:text-xs font-extrabold block ${theme === 'dark' ? 'text-white' : 'text-slate-950'
                        }`}>{topic.title}</span>
                      {/* <span className={`text-xs block font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>{topic.shortDesc}</span> */}
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isSelected && isPlaying ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-xs shadow-sm">
                        <Pause className="h-3 w-3 fill-current" />
                      </span>
                    ) : (
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${theme === 'dark'
                        ? 'border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/30'
                        : 'border-purple-300 bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}>
                        <Play className="h-3 w-3 fill-current ml-0.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Captions Output */}
          {currentCaption && (
            <div className={`p-3 rounded-xl border text-xs font-mono font-medium animate-pulse ${theme === 'dark' ? 'border-purple-500/40 bg-purple-950/40 text-purple-300' : 'border-purple-200 bg-purple-50 text-purple-900'
              }`}>
              <span className="font-bold block text-[10px] uppercase tracking-wider mb-1">Live Narration Caption:</span>
              &ldquo;{currentCaption}&rdquo;
            </div>
          )}

          {/* Main Action Bar */}
          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={() => (isPlaying ? pauseOrResumeSpeech() : playSpeech(selectedTopic))}
              className="flex items-center gap-2 rounded-xl bg-purple-600 border border-purple-500 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-all cursor-pointer shadow-md shadow-purple-500/20"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span>Pause Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Play Male Voice</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={stopSpeech}
                disabled={!isPlaying}
                className={`rounded-xl border p-2 disabled:opacity-30 transition-all cursor-pointer ${theme === 'dark'
                  ? 'border-purple-900/40 bg-slate-900/60 text-slate-400 hover:text-white'
                  : 'border-purple-200 bg-purple-50 text-slate-700 hover:bg-purple-100'
                  }`}
                title="Stop Speech"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={toggleMute}
                className={`rounded-xl border p-2 transition-all cursor-pointer ${theme === 'dark'
                  ? 'border-purple-900/40 bg-slate-900/60 text-slate-400 hover:text-white'
                  : 'border-purple-200 bg-purple-50 text-slate-700 hover:bg-purple-100'
                  }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-3.5 w-3.5 text-rose-500" /> : <Volume2 className="h-3.5 w-3.5 text-purple-600" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
