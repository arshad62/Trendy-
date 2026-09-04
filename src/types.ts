export type ProjectCategory = 'All' | 'Commercial' | 'Residential' | 'Industrial' | 'Government';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  keyDeliverables: string[];
  scopeItems: string[];
  process: { step: string; title: string; desc: string }[];
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Industrial' | 'Government';
  location: string;
  year: string;
  value: string;
  duration: string;
  status: 'Completed' | 'In Progress';
  client: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  image: string;
  gallery: string[];
  featured: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  role: string;
  project: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleDescription: string;
  experience: string;
  qualifications: string;
  image: string;
  fallbackImage?: string;
  linkedInUrl?: string;
}

export interface AccreditationBadge {
  id: string;
  title: string;
  code: string;
  issuer: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Licensing & Compliance' | 'Insurance & Protection' | 'Project Timelines' | 'Process & Procurement';
  highlight?: string;
}
