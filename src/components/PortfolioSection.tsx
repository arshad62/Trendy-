import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Filter,
  Layers,
  Clock,
  Eye
} from 'lucide-react';
import { PROJECTS } from '../data/content';
import { ProjectItem, ProjectCategory } from '../types';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = ['All', 'Commercial', 'Residential', 'Industrial', 'Government'];

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#F8FAFC] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span>Track Record of Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Featured & Recent Projects
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Explore our landmark commercial fit-outs, luxury multi-residential developments, automated industrial distribution centers, and public infrastructure works across Australia.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const count = cat === 'All' 
                ? PROJECTS.length 
                : PROJECTS.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#0F172A] text-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                  id={`filter-cat-${cat.toLowerCase()}`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              id={`project-card-${project.id}`}
            >
              {/* Project Image & Category Pill */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Category & Status Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-[#1A2434]/90 backdrop-blur-md text-amber-400 text-[11px] font-extrabold tracking-wider uppercase border border-amber-500/30">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'Completed' 
                      ? 'bg-emerald-500/90 text-white' 
                      : 'bg-amber-500/90 text-slate-950'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Quick info over image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <span className="font-bold text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                    {project.value}
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#1A2434] group-hover:text-amber-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Client: <span className="text-slate-700 font-semibold">{project.client}</span>
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Deliverables snippet */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Scope Highlights:
                  </span>
                  <div className="space-y-1 text-xs text-slate-600">
                    {project.deliverables.slice(0, 2).map((d, i) => (
                      <div key={i} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.duration}</span>
                    </span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1A2434] hover:text-amber-400 text-slate-800 text-xs font-bold transition-all flex items-center space-x-1.5 group/btn"
                    id={`view-details-${project.id}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-500 group-hover/btn:text-amber-400" />
                    <span>View Details</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Stats Bar */}
        <div className="mt-16 p-8 rounded-2xl bg-[#1A2434] text-white border border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-amber-400">$450M+</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Capital Value Managed</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Statutory Sign-Off Rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400">Zero</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Defects at Handover</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400">14+ Days</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Avg. Early Handover</div>
          </div>
        </div>

      </div>
    </section>
  );
};
