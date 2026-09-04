import React from 'react';
import { 
  ArrowUp, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Linkedin, 
  Facebook, 
  Instagram, 
  ArrowRight,
  HardHat
} from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/content';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b111d] text-slate-400 border-t border-slate-800 relative">
      {/* Floating Back to Top Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute right-6 -top-6">
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xl transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Scroll back to top of page"
            id="back-to-top-btn"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl border border-amber-400/30">
                T
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-white text-lg tracking-tight uppercase">
                    Trendy
                  </span>
                  <span className="font-light text-amber-400 text-lg tracking-wider uppercase">
                    Constructions
                  </span>
                </div>
                <p className="text-[10px] text-amber-400/90 tracking-widest uppercase font-semibold">
                  Pty Ltd • Builder Licence : {COMPANY_INFO.builderLicence}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Project Management | Project Development | Building Services | Building Procurement.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline}. Delivering institutional project management, commercial building delivery, feasibility planning, and supply chain procurement with proven fiscal discipline.
            </p>

            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <p className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-amber-400 font-bold">Builder Licence : {COMPANY_INFO.builderLicence}</span>
                <span>•</span>
                <span className="text-slate-300">ABN {COMPANY_INFO.abn}</span>
              </p>
              <p className="text-slate-500">Master Builders Association Member • ISO 9001 / ISO 45001</p>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Profile"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Four Core Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Four Core Pillars
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(`#${s.slug}`);
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center space-x-1.5 group"
                  >
                    <span className="text-slate-600 group-hover:text-amber-500">›</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="text-xs text-amber-400 hover:underline font-bold flex items-center space-x-1"
                >
                  <span>Request Tender Package</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Our Firm', href: '#about' },
                { name: 'Portfolio & Case Studies', href: '#projects' },
                { name: 'Client Testimonials', href: '#testimonials' },
                { name: 'Cost & Scope Estimator', href: '#estimator' },
                { name: 'Contact & Tender Enquiries', href: '#contact' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center space-x-1.5 group"
                  >
                    <span className="text-slate-600 group-hover:text-amber-500">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Summary */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Contact Summary
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <div>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                      Ph: {COMPANY_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_INFO.mobileRaw}`} className="hover:text-amber-400 transition-colors">
                      Mob: {COMPANY_INFO.mobile}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block">Hours:</span>
                <span className="text-slate-300 font-medium">{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Notice */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {COMPANY_INFO.copyright}
          </p>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="text-amber-400/90 font-medium">Builder Licence : {COMPANY_INFO.builderLicence}</span>
            <span>•</span>
            <span>NSW 2210 Australia</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Engagement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
