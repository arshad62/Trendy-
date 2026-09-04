import React from 'react';
import { 
  ClipboardCheck, 
  Compass, 
  HardHat, 
  Boxes, 
  ArrowRight, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { CORE_SERVICES } from '../data/content';
import { ServiceItem } from '../types';

interface CorePillarsGridProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateToServiceDetail: (slug: string) => void;
}

export const CorePillarsGrid: React.FC<CorePillarsGridProps> = ({ 
  onSelectService, 
  onNavigateToServiceDetail 
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'project-management':
        return <ClipboardCheck className="w-7 h-7 text-amber-500" />;
      case 'project-development':
        return <Compass className="w-7 h-7 text-amber-500" />;
      case 'building-services':
        return <HardHat className="w-7 h-7 text-amber-500" />;
      case 'building-procurement':
        return <Boxes className="w-7 h-7 text-amber-500" />;
      default:
        return <Layers className="w-7 h-7 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>The Four Strategic Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Integrated Construction & Project Expertise
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Four specialized divisions operating with seamless synergy. From early municipal feasibility through to physical build and strategic materials procurement, we provide end-to-end accountability.
          </p>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:-translate-y-1"
              id={`service-card-${service.id}`}
            >
              {/* Card Image Header Preview */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2434] via-[#1A2434]/40 to-transparent"></div>
                <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-[#1A2434]/90 border border-slate-700/80 text-amber-400 backdrop-blur-md shadow-md">
                  {getIcon(service.id)}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Pillar 0{index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables preview list */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.keyDeliverables.slice(0, 3).map((deliv, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center space-x-1 group/btn"
                    id={`learn-more-${service.id}`}
                  >
                    <span>Full Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigateToServiceDetail(service.slug)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Deep Dive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pillar Integration Callout Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-[#1A2434] text-white border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">
              Need a unified turnkey delivery for your next commercial project?
            </h4>
            <p className="text-sm text-slate-300">
              Eliminate communication gaps between architects, project managers, and trade procurement.
            </p>
          </div>
          <button
            onClick={() => onNavigateToServiceDetail('project-management')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap flex items-center space-x-2"
          >
            <span>Explore Comprehensive Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
