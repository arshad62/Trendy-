import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  HardHat, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck,
  Compass,
  Boxes,
  Calculator
} from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/content';

interface NavbarProps {
  onOpenQuoteModal: (serviceId?: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, activeSection: propActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('home');

  const activeSection = propActiveSection || internalActiveSection;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple scroll spy to detect current section
      const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'estimator', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setInternalActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { 
      name: 'Services', 
      href: '#services', 
      id: 'services',
      hasDropdown: true 
    },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Cost Estimator', href: '#estimator', id: 'estimator' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'project-management':
        return <ClipboardCheck className="w-5 h-5 text-amber-500" />;
      case 'project-development':
        return <Compass className="w-5 h-5 text-amber-500" />;
      case 'building-services':
        return <HardHat className="w-5 h-5 text-amber-500" />;
      case 'building-procurement':
        return <Boxes className="w-5 h-5 text-amber-500" />;
      default:
        return <HardHat className="w-5 h-5 text-amber-500" />;
    }
  };

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`bg-[#0f172a] text-slate-300 text-xs border-b border-slate-800/80 transition-all duration-300 ${isScrolled ? 'hidden py-0' : 'py-2 px-4 sm:px-8'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-amber-400">Builder Licence: {COMPANY_INFO.builderLicence}</span>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:inline text-slate-300">ABN {COMPANY_INFO.abn}</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Riverwood, NSW 2210 • Australia</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5 ml-auto">
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`} 
              className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors font-medium text-slate-200"
              id="top-bar-phone-link"
              title="Call Office: 02 8502 9080"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Ph: {COMPANY_INFO.phone}</span>
            </a>
            <a 
              href={`tel:${COMPANY_INFO.mobileRaw}`} 
              className="hidden md:flex items-center space-x-1.5 hover:text-amber-400 transition-colors font-medium text-slate-200"
              id="top-bar-mobile-link"
              title="Call Mobile: 0451 444 609"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Mob: {COMPANY_INFO.mobile}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hidden sm:flex items-center space-x-1.5 hover:text-amber-400 transition-colors text-slate-300"
              id="top-bar-email-link"
              title="Email: trendyconstructions@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1A2434]/98 shadow-xl shadow-slate-950/30 backdrop-blur-md py-3.5 border-b border-slate-700/60' 
            : 'bg-[#1A2434]/95 backdrop-blur-sm py-4 border-b border-slate-700/40'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center space-x-3 group text-left"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200 border border-amber-400/30">
              <div className="relative flex flex-col items-center justify-center">
                <span className="font-extrabold text-slate-950 text-xl tracking-tighter leading-none">T</span>
                <span className="w-4 h-0.5 bg-slate-950 rounded-full mt-0.5"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-white text-lg sm:text-xl tracking-tight uppercase">
                  Trendy
                </span>
                <span className="font-light text-amber-400 text-lg sm:text-xl tracking-wider uppercase">
                  Constructions
                </span>
              </div>
              <p className="text-[10px] text-amber-400/90 tracking-widest uppercase font-semibold">
                Pty Ltd • Lic: {COMPANY_INFO.builderLicence}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.id} 
                    className="relative group"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                        isActive 
                          ? 'text-amber-400 bg-slate-800/80 font-semibold' 
                          : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/50'
                      }`}
                      id="nav-services-dropdown-btn"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Services Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 ${
                        isServicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="bg-[#1A2434] border border-slate-700/80 rounded-xl shadow-2xl p-2.5 backdrop-blur-xl">
                        <div className="px-3 py-1.5 mb-1 border-b border-slate-700/60 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                            Our Four Core Pillars
                          </span>
                          <span className="text-[10px] text-slate-400">Institutional Delivery</span>
                        </div>
                        {CORE_SERVICES.map((service) => (
                          <a
                            key={service.id}
                            href={`#${service.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollTo(`#${service.slug}`);
                            }}
                            className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group/item"
                            id={`dropdown-${service.id}`}
                          >
                            <div className="p-2 rounded-md bg-slate-800 group-hover/item:bg-amber-500/20 group-hover/item:text-amber-400 transition-colors text-amber-500">
                              {getServiceIcon(service.id)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover/item:text-amber-400 flex items-center">
                                {service.title}
                                <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-150 text-amber-400" />
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {service.subtitle}
                              </p>
                            </div>
                          </a>
                        ))}
                        <div className="mt-2 pt-2 border-t border-slate-700/60 px-2 pb-1">
                          <button
                            onClick={() => scrollTo('#services')}
                            className="w-full text-center py-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center space-x-1"
                          >
                            <span>View Detailed Pillars Overview</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'text-amber-400 bg-slate-800/80 font-semibold shadow-inner' 
                      : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/50'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => scrollTo('#estimator')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition-colors"
              title="Estimate Project Budget"
              id="nav-estimator-btn"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Cost Estimator</span>
            </button>
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
              id="nav-quote-cta-btn"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-md shadow-sm"
              id="mobile-quote-btn"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              id="nav-mobile-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#1A2434] border-b border-slate-700 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-slate-800 text-amber-400 font-semibold'
                      : 'text-slate-200 hover:bg-slate-800/60 hover:text-amber-400'
                  }`}
                  id={`mobile-nav-${link.id}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Core Pillars Sub-links */}
            <div className="pt-2 pb-2 border-t border-slate-700/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Core Services
              </span>
              <div className="grid grid-cols-2 gap-2 px-1">
                {CORE_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(`#${s.slug}`)}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-left text-xs font-medium text-slate-300 hover:text-amber-400"
                  >
                    {getServiceIcon(s.id)}
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-lg shadow text-center flex items-center justify-center space-x-2"
                id="mobile-menu-cta-quote"
              >
                <span>Request a Consultation / Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex flex-col items-center space-y-1.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center space-x-1 hover:text-amber-400">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ph: {COMPANY_INFO.phone}</span>
                  </a>
                  <span>•</span>
                  <a href={`tel:${COMPANY_INFO.mobileRaw}`} className="flex items-center space-x-1 hover:text-amber-400">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mob: {COMPANY_INFO.mobile}</span>
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400">
                    {COMPANY_INFO.email}
                  </a>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">Lic. {COMPANY_INFO.builderLicence}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
