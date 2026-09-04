import React, { useState } from 'react';
import { 
  Shield, 
  HeartHandshake, 
  Award, 
  Users, 
  CheckCircle2, 
  Building2, 
  Linkedin, 
  GraduationCap, 
  Briefcase,
  Target,
  Compass,
  FileBadge,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  CalendarClock,
  Phone,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  CORE_VALUES, 
  LEADERSHIP_TEAM, 
  ACCREDITATIONS,
  FAQ_ITEMS
} from '../data/content';
import { TeamMember, FAQItem } from '../types';

interface AboutSectionProps {
  onOpenQuoteModal?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-licensing');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Licensing & Compliance', 'Insurance & Protection', 'Project Timelines', 'Process & Procurement'];

  const filteredFaqs = selectedCategory === 'All' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(faq => faq.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-500" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-500" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-500" />;
      default:
        return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Company History / Mission / Vision Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span>About Trendy Constructions Pty Ltd</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              An Established Foundation of Quality, Governance, and Delivery Certainty
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Founded to meet the growing need for institutional-grade project management in the mid-size commercial and bespoke residential sectors, <strong>Trendy Constructions Pty Ltd</strong> has evolved into one of Australia's most dependable construction partners.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              We operate under an integrated four-pillar framework that consolidates management, feasibility planning, on-site construction delivery, and bulk supply chain procurement. By removing the friction between architects, trade contractors, and financial institutions, we give developers and commercial clients absolute certainty of outcome.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-2">
                <div className="flex items-center space-x-2 text-[#0F172A]">
                  <Target className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-sm">Our Mission</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To deliver uncompromising structural excellence and transparent cost governance on every project, safeguarding client capital through disciplined methodology.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-2">
                <div className="flex items-center space-x-2 text-[#0F172A]">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-sm">Our Vision</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be Australia's most trusted mid-tier construction and development advisory, recognized for digital innovation, safety leadership, and enduring architectural value.
                </p>
              </div>
            </div>

            {/* Quick Registration Facts */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-bold text-slate-900 block">Licensed & Registered Australian Builder</span>
                <span className="text-slate-600">Builder Licence: {COMPANY_INFO.builderLicence} • ABN {COMPANY_INFO.abn}</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Head Office: Riverwood, NSW 2210, Australia</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px]">
                Licence: {COMPANY_INFO.builderLicence}
              </span>
            </div>

          </div>

          {/* Right Column: Visual Brand Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-3/4">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=600&q=80"
                    alt="Commercial building site inspection"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-[#1A2434] text-white">
                  <span className="text-2xl font-black text-amber-400 block">100%</span>
                  <span className="text-xs text-slate-300 font-medium">
                    Compliant with National Construction Code (NCC) & Australian Standards
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 rounded-2xl bg-amber-500 text-slate-950">
                  <span className="text-2xl font-black block">25+ Yrs</span>
                  <span className="text-xs font-semibold">
                    Executive Construction Expertise across Victoria & NSW
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-3/4">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
                    alt="Structural engineering blueprints and construction site"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600">
              The Guiding Philosophy
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Our Core Company Values
            </h4>
            <p className="text-sm text-slate-600">
              Every site directive, trade contract, and client conversation is anchored by these foundational principles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-lg transition-all duration-200 space-y-3 group"
              >
                <div className="p-3 rounded-xl bg-slate-50 w-fit border border-slate-200 group-hover:bg-amber-50 group-hover:border-amber-400 transition-colors">
                  {getValueIcon(val.icon)}
                </div>
                <h5 className="text-lg font-bold text-[#0F172A] group-hover:text-amber-600 transition-colors">
                  {val.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Team Section */}
        <div className="space-y-10 pt-6 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Executive Leadership
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Experienced Construction Leaders
            </h4>
            <p className="text-sm text-slate-600">
              Direct, hands-on involvement from senior directors with decades of proven tier-1 delivery credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                id={`team-member-${member.id}`}
              >
                {/* Photo with gradient overlay */}
                <div className="relative h-64 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image network fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback initials avatar if image doesn't load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#1A2434] flex flex-col items-center justify-center p-4 text-center -z-10">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 text-2xl font-black mb-2">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-white font-bold text-sm">{member.name}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2434] via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      {member.experience}
                    </span>
                    <h5 className="text-lg font-bold text-white leading-tight">
                      {member.name}
                    </h5>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                      {member.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.roleDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                    <div className="flex items-start space-x-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{member.qualifications}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations & Licensing Badges */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Statutory Compliance & Industry Affiliations
            </h4>
            <h5 className="text-xl font-bold text-[#1A2434]">
              Accreditations, Certifications & Licensing
            </h5>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ACCREDITATIONS.map((acc) => (
              <div 
                key={acc.id}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400 transition-colors flex flex-col justify-between space-y-2 text-center items-center"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <FileBadge className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-slate-900 leading-tight">
                    {acc.title}
                  </h6>
                  <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                    {acc.code}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {acc.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div id="about-faq" className="space-y-10 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1A2434] tracking-tight">
                Common Building Inquiries & Due Diligence
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Clear, transparent answers addressing our New South Wales builder licensing, multi-tier insurance protections, standard construction timelines, and procurement governance.
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>NSW Fair Trading Lic: <strong className="text-slate-900">{COMPANY_INFO.builderLicence}</strong></span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`faq-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A2434] text-amber-400 shadow-sm border border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Accordion Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    id={`faq-card-${faq.id}`}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-amber-400/80 bg-white shadow-md'
                        : 'border-slate-200/90 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      id={`faq-trigger-${faq.id}`}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none group"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {faq.category}
                          </span>
                          {faq.highlight && (
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-800 border border-amber-500/30">
                              {faq.highlight}
                            </span>
                          )}
                        </div>
                        <h5 className={`text-base sm:text-lg font-bold transition-colors ${
                          isOpen ? 'text-[#1A2434]' : 'text-slate-900 group-hover:text-amber-700'
                        }`}>
                          {faq.question}
                        </h5>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#1A2434] text-amber-400 rotate-180'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div 
                        id={`faq-body-${faq.id}`} 
                        className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 text-slate-600 text-sm leading-relaxed"
                      >
                        <div className="whitespace-pre-line space-y-2 pt-2">
                          {faq.answer}
                        </div>

                        {faq.id === 'faq-licensing' && (
                          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
                            <span className="font-semibold text-amber-950">
                              Official NSW Licence Number: <strong className="font-mono text-amber-900">184663C</strong>
                            </span>
                            <span className="text-[11px] font-medium text-amber-800">
                              Entity: Trendy Constructions Pty Ltd (ABN 48 612 890 341)
                            </span>
                          </div>
                        )}

                        {faq.id === 'faq-insurance' && (
                          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-700">
                            <span className="font-semibold text-slate-900">
                              Need a formal Certificate of Currency for your project files?
                            </span>
                            <a 
                              href={`mailto:${COMPANY_INFO.email}?subject=Insurance%20Certificate%20Request%20-%20Licence%20184663C`}
                              className="text-amber-700 hover:text-amber-800 font-bold underline text-xs"
                            >
                              Request via Email
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Contact & Consultation Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Assistance Card */}
              <div className="p-6 rounded-3xl bg-[#1A2434] text-white border border-slate-800 space-y-5 shadow-lg">
                <div className="space-y-1 border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Direct Assistance
                  </span>
                  <h5 className="text-lg font-bold text-white">
                    Have a Specific Question?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our directors and senior project managers are ready to review your preliminary plans or discuss tender specifications.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2.5">
                    <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Office Direct:</span>
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-white hover:text-amber-400 transition-colors">
                        Ph: {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Direct Mobile:</span>
                      <a href={`tel:${COMPANY_INFO.mobileRaw}`} className="font-bold text-white hover:text-amber-400 transition-colors">
                        Mob: {COMPANY_INFO.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Direct Email:</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-white hover:text-amber-400 transition-colors break-all">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    id="faq-quote-modal-btn"
                    onClick={() => {
                      if (onOpenQuoteModal) {
                        onOpenQuoteModal();
                      } else {
                        const contactEl = document.getElementById('contact');
                        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <span>Request a Quote / Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Head Office Address Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-900 block">
                  Registered Headquarters:
                </span>
                <p className="leading-relaxed">
                  {COMPANY_INFO.address}
                </p>
                <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Licence: <strong className="text-slate-800">{COMPANY_INFO.builderLicence}</strong></span>
                  <span>ABN: <strong className="text-slate-800">{COMPANY_INFO.abn}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
