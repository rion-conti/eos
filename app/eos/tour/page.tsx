"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Clock, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductTourPage() {
  // Video player DOM ref and interactive state tracker
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  // Dynamic timestamps to skip to specific sections of the moving video stream
  const chapters = [
    { title: "Platform Architecture Overview", time: 0 },
    { title: "Building Conditional Pipelines", time: 12 },
    { title: "IT Asset Provisioning Sync", time: 28 },
    { title: "Analytics & Executive Velocity", time: 45 },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const jumpToTime = (seconds: number, index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setActiveChapter(index);
    if (!isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 antialiased selection:bg-teal-500 selection:text-white flex flex-col justify-between">
      
      {/* 1. STICKY TOP NAVIGATION BAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/eos" className="inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-teal-400">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <span className="bg-linear-to-br from-teal-400 to-emerald-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              EOS
            </span>
          </div>
        </div>
      </header>

      {/* 2. CORE THEATRICAL ROW CONTENT AREA */}
      <main className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12 items-start flex-1">
        
        {/* LEFT COLUMN: THE MOVEMENT VIDEO CONTROLLER FRAME */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
            
            {/* REAL INTERACTIVE VIDEO STREAM SOURCE */}
            <video
              ref={videoRef}
              src="https://googleapis.com"
              className="w-full h-full object-cover"
              loop
              autoPlay
              muted={isMuted}
              playsInline
            />

            {/* CUSTOM CUSTOM OVERLAY OVERRIDES (Appears when hovering) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              
              {/* Top Banner Tag */}
              <div className="flex justify-between items-center">
                <span className="bg-teal-500/90 backdrop-blur-sm text-xs text-white font-bold px-2.5 py-1 rounded-md tracking-wide flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 animate-pulse" /> Live Product Stream
                </span>
                <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 1:05 HD
                </span>
              </div>

              {/* Bottom Row Player Core Settings Utility Buttons */}
              <div className="flex items-center justify-between bg-slate-950/60 backdrop-blur-md p-3 rounded-lg border border-white/5">
                <div className="flex items-center space-x-3">
                  <Button size="icon" variant="ghost" onClick={togglePlay} className="h-8 w-8 text-white hover:bg-white/10">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={toggleMute} className="h-8 w-8 text-white hover:bg-white/10">
                    {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => { if(videoRef.current) videoRef.current.currentTime = 0 }} className="h-8 w-8 text-white hover:bg-white/10" title="Restart">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleFullscreen} className="h-8 w-8 text-white hover:bg-white/10">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ACCOMPANYING LOWER METADATA DESCRIPTIONS */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">EOS Interactive Product Tour</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Watch a deep-dive architecture showcase of the Enterprise Onboarding System. This live video details execution logic across automated cloud platform instances, cross-system APIs, and internal operations dashboard parameters.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: CHAPTER NAVIGATOR & CALL TO ACTION CARD */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-slate-950 border-slate-800 text-slate-100">
            <div className="p-6 border-b border-slate-800 flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-400" />
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-400">Tour Blueprint Chapters</h2>
            </div>
            <CardContent className="p-3 space-y-1">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => jumpToTime(chapter.time, index)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center justify-between group ${
                    activeChapter === index 
                      ? "bg-linear-to-r from-teal-950 to-emerald-950 text-teal-300 border border-teal-500/30 font-semibold" 
                      : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                  }`}
                >
                  <span className="truncate pr-2">{index + 1}. {chapter.title}</span>
                  <span className="font-mono text-xs opacity-60 shrink-0 group-hover:text-teal-400 transition-colors">
                    {chapter.time < 10 ? `0:0${chapter.time}` : `0:${chapter.time}`}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* LOWER FIXED IMMEDIATE ACQUISITION VALUE CARD */}
          <div className="bg-linear-to-br from-teal-900/40 to-emerald-950/40 border border-teal-500/20 rounded-xl p-6 text-center space-y-4">
            <h3 className="font-bold text-base">Want an environment built for your pipeline?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We can host a live private sandboxed runtime session with your technical teams to demonstrate native integrations.
            </p>
            <Link href="/eos/request-demo" className="block">
              <Button className="w-full bg-linear-to-r from-teal-600 to-emerald-800 text-white font-semibold shadow-md hover:from-teal-700 hover:to-emerald-900">
                Schedule Live Workspace Setup
              </Button>
            </Link>
          </div>
        </div>

      </main>

      {/* 3. MINIMAL THEATER THEME FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500 w-full mt-12">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 Enterprise Onboarding System. Video demo represents true user interfaces.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-400">Documentation Blueprint</Link>
            <Link href="#" className="hover:text-slate-400">Security Parameters</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
