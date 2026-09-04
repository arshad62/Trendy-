import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  HardHat, 
  ClipboardCheck, 
  Compass, 
  Boxes 
} from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledMessage?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefilledService = 'Project Management',
  prefilledMessage = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: prefilledService,
    projectType: 'Commercial',
    budgetRange: '$1M – $5M',
    notes: prefilledMessage
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, service: prefilledService }));
    }
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, notes: prefilledMessage }));
    }
  }, [prefilledService, prefilledMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setQuoteRef(`TC-TNDR-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal Dialog */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#1A2434] text-white rounded-t-3xl relative">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <span>Trendy Constructions Pty Ltd</span>
            <span>•</span>
            <span className="text-amber-300">Licence : {COMPANY_INFO.builderLicence}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Request a Consultation / Quote
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Project Management | Project Development | Building Services | Building Procurement
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 text-left">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#1A2434]">
                Tender Request Logged
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your consultation request has been routed directly to our commercial estimating division.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl inline-block text-xs font-bold text-amber-900">
                Tender Reference: <span className="font-mono text-amber-800">{quoteRef}</span>
              </div>
              <div className="space-y-1 text-xs text-slate-500">
                <p>We will acknowledge receipt and coordinate an initial conference call within 24 hours.</p>
                <p className="pt-1 text-[11px] text-slate-600">
                  Direct enquiries: <span className="font-semibold text-slate-900">Ph: {COMPANY_INFO.phone}</span> | <span className="font-semibold text-slate-900">Mob: {COMPANY_INFO.mobile}</span> | <span className="font-semibold text-slate-900">{COMPANY_INFO.email}</span>
                </p>
              </div>
              <div>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#1A2434] text-amber-400 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com.au"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+61 400 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Asset Classification
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Residential">Multi-Residential / Luxury</option>
                    <option value="Industrial">Industrial / Logistics</option>
                    <option value="Government">Government / Institutional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Primary Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {CORE_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Turnkey All Four Pillars">Turnkey (All 4 Pillars)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Under $500k">Under $500k (Boutique Fitout)</option>
                    <option value="$500k – $1.5M">$500k – $1.5M</option>
                    <option value="$1.5M – $5M">$1.5M – $5M</option>
                    <option value="$5M – $15M">$5M – $15M</option>
                    <option value="$15M+">$15M+ (Major Development)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Project Notes / Location / Timeline
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the site location, current design stage (schematic, DA approved, IFC), or key milestones..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Tender Request...</span>
                  ) : (
                    <>
                      <span>Transmit Tender Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
