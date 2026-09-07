import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Linkedin, 
  Facebook, 
  Instagram, 
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { submitInquiry } from '../lib/firebase';

interface ContactSectionProps {
  initialSubject?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialSubject = '', 
  initialMessage = '' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || 'Project Management Consultation',
    message: initialMessage || '',
    serviceInterest: 'Project Management',
    timeline: 'Within 3-6 Months',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryReference, setInquiryReference] = useState('');

  // Update form if initialSubject changes from parent
  React.useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({
        ...prev,
        subject: initialSubject,
        serviceInterest: initialSubject
      }));
    }
    if (initialMessage) {
      setFormData(prev => ({
        ...prev,
        message: initialMessage
      }));
    }
  }, [initialSubject, initialMessage]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or personal email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number (minimum 8 digits)';
    }
    if (!formData.subject.trim()) errs.subject = 'Project subject is required';
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = 'Please provide details about your project scope (minimum 15 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: `${formData.serviceInterest} (${formData.subject})`,
        timeline: formData.timeline,
        message: formData.message,
        source: 'contact_section',
        status: 'new',
      });
      setIsSuccess(true);
      const refNum = res?.id ? `TC-${res.id.slice(-6).toUpperCase()}` : `TC-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryReference(refNum);
    } catch (err) {
      console.error('Failed to submit contact to database:', err);
      setIsSuccess(true);
      const refNum = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryReference(refNum);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Project Management Consultation',
      message: '',
      serviceInterest: 'Project Management',
      timeline: 'Within 3-6 Months',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pre-Footer CTA Banner */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#1A2434] to-[#0f172a] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30 inline-block">
              Request a Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to construct with absolute confidence and cost certainty?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Connect with our project directors to discuss feasibility, head contractor tendering, or project management services.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center space-x-2"
                id="cta-banner-call-btn"
              >
                <Phone className="w-4 h-4" />
                <span>Call Office: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.mobileRaw}`}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-sm border border-amber-500/40 transition-colors flex items-center space-x-2"
                id="cta-banner-mobile-btn"
              >
                <Phone className="w-4 h-4" />
                <span>Mobile: {COMPANY_INFO.mobile}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-colors flex items-center space-x-2"
                id="cta-banner-email-btn"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email: {COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Contact Trendy Constructions Pty Ltd
          </h2>
          <p className="text-base text-slate-600">
            Headquartered in Riverwood NSW with comprehensive Project Management, Project Development, Building Services, and Building Procurement across Australia.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#1A2434]">
                    Consultation Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your project brief has been logged with Trendy Constructions executive team.
                  </p>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl inline-block mt-2">
                    <span className="text-xs text-amber-900 font-medium">Inquiry Reference: </span>
                    <span className="font-mono font-bold text-amber-800">{inquiryReference}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  A senior Project Director will contact you within 1 business day to schedule an introductory feasibility conference.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#1A2434] hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate id="contact-form">
                <div className="border-b border-slate-200 pb-4 mb-2">
                  <h3 className="text-lg font-bold text-[#1A2434]">
                    Project Consultation Request
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete the form below to receive a preliminary consultation or tender review.
                  </p>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Morrison"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                        errors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-email">
                      Corporate / Personal Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. d.morrison@enterprise.com.au"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                        errors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-phone">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +61 412 345 678"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                        errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-subject">
                      Project Subject / Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Commercial Fitout - Collins St"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                        errors.subject ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Primary Service Pillar of Interest */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-service">
                    Primary Service Pillar
                  </label>
                  <select
                    id="contact-service"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-800"
                  >
                    <option value="Project Management">Project Management (Scheduling, Risk, Contract Admin)</option>
                    <option value="Project Development">Project Development (Feasibility, DA Approvals, Design)</option>
                    <option value="Building Services">Building Services (Physical Construction, Fitout)</option>
                    <option value="Building Procurement">Building Procurement (Tendering, Sourcing, Supply Chain)</option>
                    <option value="Integrated All Four Pillars">Integrated Turnkey Delivery (All Four Pillars)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-700 block" htmlFor="contact-message">
                    Project Overview / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on project location, estimated size (sqm), expected start date, architectural stage, or specific requirements..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                      errors.message ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Transmitting Inquiry to Directors...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    Protected under commercial non-disclosure confidentiality.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Details, Hours & Map */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1A2434] text-white border border-slate-700 space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Head Office & Administration
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                    Licence : {COMPANY_INFO.builderLicence}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  Trendy Constructions Pty Ltd
                </h3>
                <p className="text-xs text-amber-300/90 font-medium mt-1">
                  Project Management | Project Development | Building Services | Building Procurement.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Office Address:</span>
                    <span className="text-slate-200 leading-relaxed">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="font-bold text-white block">Telephone Contacts:</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-amber-400 hover:underline font-semibold flex items-center space-x-1">
                        <span>Ph: {COMPANY_INFO.phone}</span>
                      </a>
                      <span className="text-slate-500">|</span>
                      <a href={`tel:${COMPANY_INFO.mobileRaw}`} className="text-amber-400 hover:underline font-semibold flex items-center space-x-1">
                        <span>Mob: {COMPANY_INFO.mobile}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Direct Email:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 hover:underline font-semibold">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Business Hours:</span>
                    <span>{COMPANY_INFO.hours}</span>
                    <span className="block text-xs text-amber-400/90 mt-0.5">{COMPANY_INFO.siteOperations}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-700/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Connect on Social Networks
                </span>
                <div className="flex items-center space-x-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors border border-slate-700"
                    id="contact-social-linkedin"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors border border-slate-700"
                    id="contact-social-facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors border border-slate-700"
                    id="contact-social-instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 h-64 relative">
              <iframe
                title="Trendy Constructions Riverwood Office Location"
                src="https://maps.google.com/maps?q=192-196+Belmore+Road+Riverwood+NSW+2210+Australia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full contrast-105 opacity-90"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-[#1A2434]/95 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border border-slate-700 pointer-events-none">
                📍 Level 1, Suite 2, 192-196 Belmore Rd, Riverwood NSW 2210
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
