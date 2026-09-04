import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Compass, 
  HardHat, 
  Boxes, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Layers,
  PhoneCall
} from 'lucide-react';
import { CORE_SERVICES, COMPANY_INFO } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenQuoteForService: (serviceName: string) => void;
  onOpenScopeModal: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenQuoteForService,
  onOpenScopeModal 
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);

  const getIcon = (id: string, className = "w-6 h-6") => {
    switch (id) {
      case 'project-management':
        return <ClipboardCheck className={className} />;
      case 'project-development':
        return <Compass className={className} />;
      case 'building-services':
        return <HardHat className={className} />;
      case 'building-procurement':
        return <Boxes className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const selectedService = CORE_SERVICES.find(s => s.id === activeServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background architectural lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Core Service Pillars
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Delivering end-to-end certainty through disciplined project management, astute development planning, high-specification building, and commercial procurement.
          </p>
        </div>

        {/* Tabbed Pillar Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {CORE_SERVICES.map((service, index) => {
            const isSelected = service.id === activeServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 flex flex-col justify-between space-y-3 border ${
                  isSelected
                    ? 'bg-[#1A2434] border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                id={`tab-pillar-${service.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-amber-400'}`}>
                    {getIcon(service.id, "w-5 h-5")}
                  </div>
                  <span className={`text-[11px] font-bold uppercase ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                    Pillar 0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold truncate">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {service.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Spotlight */}
        <div className="bg-[#1A2434] border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-md">
                  {getIcon(selectedService.id, "w-7 h-7")}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Comprehensive Scope
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-slate-200 leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {/* Bullet list of key deliverables */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Key Deliverables & Specifications:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.keyDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-200 font-medium leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Step Process Timeline Preview */}
              <div className="space-y-3 pt-4 border-t border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delivery Methodology:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedService.process.map((p, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                      <span className="text-[10px] font-black text-amber-500 block">{p.step}</span>
                      <span className="text-xs font-bold text-white block truncate">{p.title}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs for this service */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuoteForService(selectedService.title)}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2"
                  id={`quote-service-${selectedService.id}`}
                >
                  <span>Inquire for {selectedService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenScopeModal(selectedService)}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-600 transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View Full Deliverables Doc</span>
                </button>
              </div>

            </div>

            {/* Right Image / Spec Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-800 aspect-4/3">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2434] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#1A2434]/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold">Standard of Execution</span>
                    <span className="text-slate-300">ISO 9001 Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Audited trade contractors, rigorous milestone check-ins, and open-book progress reporting.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Immediate Tender Inquiries</span>
                  <span className="text-slate-400">{COMPANY_INFO.tendersEmail}</span>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 font-bold transition-colors flex items-center space-x-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Anchor targets for each individual service for smooth scrolling */}
        <div className="pt-16 space-y-16">
          {CORE_SERVICES.map((srv) => (
            <div key={srv.slug} id={srv.slug} className="scroll-mt-28"></div>
          ))}
        </div>

      </div>
    </section>
  );
};
