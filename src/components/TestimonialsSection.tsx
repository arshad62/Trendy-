import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Building, 
  CheckCircle2 
} from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-[#101826] text-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Commercial Developers & Asset Leaders
          </h2>
          <p className="text-base text-slate-300">
            Read how our four-pillar approach delivers cost predictability, proactive scheduling, and superior construction quality.
          </p>
        </div>

        {/* Carousel Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A2434] border border-slate-700/90 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            
            {/* Large Quote Icon */}
            <div className="absolute top-6 right-8 text-amber-500/20 pointer-events-none">
              <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-100 font-normal leading-relaxed italic">
                "{current.quote}"
              </blockquote>

              {/* Client Info & Project Tag */}
              <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/50 bg-slate-800 flex-shrink-0">
                    <img
                      src={current.avatar}
                      alt={current.clientName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {current.clientName}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium">
                      {current.role} • {current.company}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Delivered Project:
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    {current.project}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-700/60">
              <div className="flex items-center space-x-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-colors"
                  aria-label="Previous testimonial"
                  id="testimonial-prev-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-colors"
                  aria-label="Next testimonial"
                  id="testimonial-next-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
