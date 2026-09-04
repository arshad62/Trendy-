import React from 'react';
import { 
  ShieldCheck, 
  BadgeDollarSign, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Award, 
  HardHat, 
  FileCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { STATS, WHY_CHOOSE_US_POINTS } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-amber-500" />;
      case 'BadgeDollarSign':
        return <BadgeDollarSign className="w-8 h-8 text-amber-500" />;
      case 'ClockCheck':
        return <Clock className="w-8 h-8 text-amber-500" />;
      case 'Layers':
        return <Layers className="w-8 h-8 text-amber-500" />;
      default:
        return <Award className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Construction & Engineering Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              {/* Main Construction Photo */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural engineers on site reviewing plans"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#1A2434] text-white p-5 rounded-2xl shadow-2xl border border-slate-700 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-amber-500 text-slate-950 rounded-xl font-black">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-amber-400 block">
                      Zero LTI
                    </span>
                    <span className="text-xs text-slate-300 font-medium leading-tight block">
                      100% Safety Compliance Across All Active Sites
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Quality Assurance Pill */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold text-slate-900">
                  ISO 9001 & ISO 45001 Certified
                </span>
              </div>
            </div>

            {/* Quick Credentials Summary */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Institutional Credentials
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>VBA Unlimited Builder</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Open-Book Accounting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Master Builders Member</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Comprehensive Insurance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Us Content & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                <span>The Trendy Constructions Standard</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Why Industry Leaders Choose Trendy Constructions
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                In an industry where delays, budget blowouts, and fractured communication are all too common, Trendy Constructions Pty Ltd operates as a disciplined, transparent delivery partner. We protect client capital and safeguard construction quality at every step.
              </p>
            </div>

            {/* 4 Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_CHOOSE_US_POINTS.map((point, index) => (
                <div 
                  key={index}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400/80 hover:shadow-md transition-all duration-200 space-y-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 w-fit border border-slate-200 group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors">
                    {getIcon(point.icon)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 3-4 Key Stat Highlights Bar */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 text-white shadow-md">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">150+</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Delivered Projects</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 text-white shadow-md">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">20+ Yrs</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Tier-1 Experience</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 text-white shadow-md">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">98%</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">On-Time Completion</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
