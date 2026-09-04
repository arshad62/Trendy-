import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ChevronRight,
  HardHat,
  ClipboardCheck,
  Compass,
  Boxes
} from 'lucide-react';
import { COMPANY_INFO, STATS, CORE_SERVICES } from '../data/content';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onNavigateToService: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onNavigateToService }) => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getServicePillarIcon = (id: string) => {
    switch (id) {
      case 'project-management':
        return <ClipboardCheck className="w-5 h-5 text-amber-400" />;
      case 'project-development':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'building-services':
        return <HardHat className="w-5 h-5 text-amber-400" />;
      case 'building-procurement':
        return <Boxes className="w-5 h-5 text-amber-400" />;
      default:
        return <Building2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#101826] overflow-hidden text-white">
      {/* Background Architectural Image with Engineered Dark Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=2000&q=85"
          alt="Modern commercial construction site in Australia"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform motion-safe:animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1420] via-[#101826]/90 to-[#101826]/75"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#101826]/60 to-[#101826]"></div>
        {/* Subtle architectural grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Trust badge pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/35 text-slate-200 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                Builder Licence : {COMPANY_INFO.builderLicence}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">Trendy Constructions Pty Ltd</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Building Excellence, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Delivering Trust.
              </span>
            </h1>

            {/* 4 Pillars Header Line */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/70 w-fit">
              <span>Project Management</span>
              <span className="text-slate-500">|</span>
              <span>Project Development</span>
              <span className="text-slate-500">|</span>
              <span>Building Services</span>
              <span className="text-slate-500">|</span>
              <span>Building Procurement</span>
            </div>

            {/* Subheading summarizing the 4 Core Services */}
            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Specialized end-to-end expertise in <strong className="text-amber-300 font-semibold">Project Management</strong>, <strong className="text-amber-300 font-semibold">Project Development</strong>, <strong className="text-amber-300 font-semibold">Building Services</strong>, and disciplined <strong className="text-amber-300 font-semibold">Building Procurement</strong> for commercial, government, and premier residential assets.
            </p>

            {/* Brief Intro Paragraph about the company */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Trendy Constructions Pty Ltd provides institutional discipline, rigorous safety management, and transparent financial stewardship across every phase of the construction lifecycle. We partner with property developers, institutional asset holders, and discerning clients to turn complex projects into on-time, zero-defect reality.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-500 hover:to-amber-600 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group"
                id="hero-get-quote-btn"
              >
                <span>Get a Quote / Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
              </button>

              <button
                onClick={() => scrollTo('#projects')}
                className="px-6 py-4 text-base font-semibold text-white hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 hover:border-amber-500/50 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-md"
                id="hero-view-projects-btn"
              >
                <span>Explore Portfolio</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>ISO 9001 & ISO 45001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Master Builders Member</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero Lost-Time Injury Record</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Pillar Navigator Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#1A2434]/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/70 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
                    Our Core Capabilities
                  </span>
                  <h2 className="text-lg font-bold text-white">The Four Pillars</h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                  Turnkey
                </span>
              </div>

              <div className="space-y-3">
                {CORE_SERVICES.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => onNavigateToService(service.slug)}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 transition-all duration-200 flex items-start space-x-3 group"
                    id={`hero-pillar-${service.id}`}
                  >
                    <div className="p-2 rounded-lg bg-slate-900/80 text-amber-400 border border-slate-700/70 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {getServicePillarIcon(service.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {service.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/70 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Office Phone:</span>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-amber-400 hover:underline">
                    Ph: {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <a href={`tel:${COMPANY_INFO.mobileRaw}`} className="font-bold text-amber-400 hover:underline">
                    Mob: {COMPANY_INFO.mobile}
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Direct Email:</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400/90 hover:underline truncate max-w-[200px]">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Performance & Trust Stats Highlights Banner */}
        <div className="mt-14 pt-10 border-t border-slate-800/90 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-4 sm:p-5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
