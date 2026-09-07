import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CorePillarsGrid } from './components/CorePillarsGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { EstimatorSection } from './components/EstimatorSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ServiceScopeModal } from './components/ServiceScopeModal';
import { QuoteModal } from './components/QuoteModal';
import { DatabasePortalModal } from './components/DatabasePortalModal';
import { testFirestoreConnection } from './lib/firebase';
import { ProjectItem, ServiceItem } from './types';
import { CORE_SERVICES } from './data/content';

export default function App() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServiceForScope, setSelectedServiceForScope] = useState<ServiceItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isDbPortalOpen, setIsDbPortalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('Project Management');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  React.useEffect(() => {
    // Validate Firestore connection on boot as mandated by skill guidelines
    testFirestoreConnection();
  }, []);

  // Handlers
  const handleOpenQuoteModal = (serviceName?: string, customMessage?: string) => {
    if (serviceName) setPrefilledService(serviceName);
    if (customMessage) setPrefilledMessage(customMessage);
    setIsQuoteModalOpen(true);
  };

  const handleNavigateToServiceDetail = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const servicesSec = document.getElementById('services');
      if (servicesSec) servicesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireSimilarProject = (projectTitle: string) => {
    setSelectedProject(null);
    handleOpenQuoteModal(
      'Project Management',
      `Inquiry referencing case study: ${projectTitle}. We would like to discuss delivering a project with similar scope and requirements.`
    );
    // Smooth scroll to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEstimatorQuoteRequest = (details: {
    type: string;
    sizeSqm: number;
    pillars: string[];
    timeline: string;
    estRange: string;
  }) => {
    const message = `Feasibility Parameters:
- Classification: ${details.type}
- Gross Floor Area: ${details.sizeSqm.toLocaleString()} sqm
- Required Pillars: ${details.pillars.join(', ')}
- Indicative Budget: ${details.estRange}
- Target Timeline: ${details.timeline}

Please prepare a formal feasibility review and arrange an introductory conference call.`;

    handleOpenQuoteModal('Turnkey All Four Pillars', message);
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Top Navigation */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner with headline, subhead summarizing 4 pillars, intro, trust metrics & quick pillars */}
        <Hero
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onNavigateToService={handleNavigateToServiceDetail}
        />

        {/* 4 Core Pillars Overview Card Grid */}
        <CorePillarsGrid
          onSelectService={(srv) => setSelectedServiceForScope(srv)}
          onNavigateToServiceDetail={handleNavigateToServiceDetail}
        />

        {/* Why Choose Us & Trust Metrics Section */}
        <WhyChooseUs />

        {/* Comprehensive Services Section (Dedicated sub-sections for each of the 4 pillars) */}
        <ServicesSection
          onOpenQuoteForService={(serviceName) => handleOpenQuoteModal(serviceName)}
          onOpenScopeModal={(srv) => setSelectedServiceForScope(srv)}
        />

        {/* Projects / Portfolio Filterable Gallery */}
        <PortfolioSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Feasibility & Cost Estimator */}
        <EstimatorSection
          onRequestQuoteWithScope={handleEstimatorQuoteRequest}
        />

        {/* About Us (History, Mission, Core Values, Leadership Team, Accreditations, Licensing & FAQ) */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Client Testimonials Slider */}
        <TestimonialsSection />

        {/* Contact Us (Form with Validation, Offices, Map, Socials, CTA) */}
        <ContactSection
          initialSubject={prefilledService}
          initialMessage={prefilledMessage}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenDatabasePortal={() => setIsDbPortalOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireSimilar={handleInquireSimilarProject}
      />

      <ServiceScopeModal
        service={selectedServiceForScope}
        onClose={() => setSelectedServiceForScope(null)}
        onInquire={(srvTitle) => {
          setSelectedServiceForScope(null);
          handleOpenQuoteModal(srvTitle);
        }}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefilledService={prefilledService}
        prefilledMessage={prefilledMessage}
      />

      <DatabasePortalModal
        isOpen={isDbPortalOpen}
        onClose={() => setIsDbPortalOpen(false)}
      />
    </div>
  );
}
