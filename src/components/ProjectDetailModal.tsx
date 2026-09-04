import React, { useEffect, useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  onClose,
  onInquireSimilar 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Slider */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-900 overflow-hidden rounded-t-3xl">
          <img
            src={images[activeImageIndex]}
            alt={`${project.title} gallery preview`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Tag & Title in image */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                Status: {project.status}
              </span>
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.location}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8 text-left">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Contract Value
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#1A2434]">
                {project.value}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Project Duration
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#1A2434]">
                {project.duration}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Completion Year
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#1A2434]">
                {project.year}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Principal Client
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 mt-1">
                {project.client}
              </span>
            </div>
          </div>

          {/* Project Detailed Narrative */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Project Overview & Delivery Scope
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Key Deliverables & Milestones */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Key Deliverables & Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onInquireSimilar(project.title);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#1A2434] hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
