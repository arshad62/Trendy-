import React, { useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Clock,
  Layers
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceScopeModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
}

export const ServiceScopeModal: React.FC<ServiceScopeModalProps> = ({ 
  service, 
  onClose, 
  onInquire 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#1A2434] text-white rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Service Scope Document
          </span>
          <h3 id="modal-service-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            {service.title}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {service.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 text-left">
          
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Operational Scope
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Itemized Deliverables */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Itemized Specifications & Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyDeliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Step Lifecycle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Structured 4-Stage Execution Framework
            </h4>
            <div className="space-y-2">
              {service.process.map((p, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#1A2434] text-amber-400 text-xs font-black">
                    {p.step}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">{p.title}</h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Guarantee Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-800 flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">AS/NZS & ISO 9001 Quality Guaranteed</span>
              <span>All works overseen by certified quantity surveyors, registered commercial builders, and OH&S supervisors.</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onInquire(service.title);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>Inquire for {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
