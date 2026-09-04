import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  ClipboardCheck,
  FileSpreadsheet
} from 'lucide-react';

interface EstimatorSectionProps {
  onRequestQuoteWithScope: (details: {
    type: string;
    sizeSqm: number;
    pillars: string[];
    timeline: string;
    estRange: string;
  }) => void;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({ onRequestQuoteWithScope }) => {
  const [projectType, setProjectType] = useState<'Commercial' | 'Residential' | 'Industrial' | 'Government'>('Commercial');
  const [sizeSqm, setSizeSqm] = useState<number>(1200);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([
    'Project Management',
    'Building Services',
    'Building Procurement'
  ]);

  const togglePillar = (pillar: string) => {
    if (selectedPillars.includes(pillar)) {
      if (selectedPillars.length > 1) {
        setSelectedPillars(selectedPillars.filter(p => p !== pillar));
      }
    } else {
      setSelectedPillars([...selectedPillars, pillar]);
    }
  };

  // Dynamic estimate calculations based on typical Australian industry benchmarks
  const getRatePerSqm = () => {
    switch (projectType) {
      case 'Commercial':
        return 2400;
      case 'Residential':
        return 3200;
      case 'Industrial':
        return 1450;
      case 'Government':
        return 2800;
      default:
        return 2200;
    }
  };

  const baseRate = getRatePerSqm();
  const pillarMultiplier = 0.7 + (selectedPillars.length * 0.1);
  const totalMin = Math.round((sizeSqm * baseRate * pillarMultiplier * 0.9) / 10000) * 10000;
  const totalMax = Math.round((sizeSqm * baseRate * pillarMultiplier * 1.15) / 10000) * 10000;

  const getEstimatedDuration = () => {
    if (sizeSqm < 800) return '6 – 9 Months';
    if (sizeSqm < 2500) return '10 – 14 Months';
    return '14 – 20 Months';
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConsultationRequest = () => {
    onRequestQuoteWithScope({
      type: projectType,
      sizeSqm,
      pillars: selectedPillars,
      timeline: getEstimatedDuration(),
      estRange: `${formatCurrency(totalMin)} – ${formatCurrency(totalMax)}`,
    });
  };

  return (
    <section id="estimator" className="py-24 bg-[#F8FAFC] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Feasibility Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Commercial Project Scope & Budget Estimator
          </h2>
          <p className="text-base text-slate-600">
            Configure your development parameters to generate an indicative timeline and capital benchmark for review with our senior quantity surveyors.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                1. Select Asset Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Commercial', 'Residential', 'Industrial', 'Government'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      projectType === type
                        ? 'bg-[#0F172A] text-amber-400 border-[#0F172A] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Approximate Gross Floor Area (GFA)
                </label>
                <span className="text-sm font-extrabold text-[#1A2434] bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-300">
                  {sizeSqm.toLocaleString()} sqm
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={sizeSqm}
                onChange={(e) => setSizeSqm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>200 sqm (Fitout/Boutique)</span>
                <span>5,000 sqm (Mid-Rise)</span>
                <span>10,000+ sqm (Major Facility)</span>
              </div>
            </div>

            {/* Step 3: Required Core Pillars */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Required Services Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Project Management', sub: 'Scheduling, Risk & Contract Admin' },
                  { name: 'Project Development', sub: 'Feasibility, Approvals & Design' },
                  { name: 'Building Services', sub: 'Turnkey Construction & Fitouts' },
                  { name: 'Building Procurement', sub: 'Strategic Tendering & Sourcing' },
                ].map((pillar) => {
                  const isChecked = selectedPillars.includes(pillar.name);
                  return (
                    <div
                      key={pillar.name}
                      onClick={() => togglePillar(pillar.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        isChecked 
                          ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-xs' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold block text-slate-900">{pillar.name}</span>
                        <span className="text-[11px] text-slate-500 block leading-tight">{pillar.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-400">
                <FileSpreadsheet className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Feasibility Projection</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                  Indicative Construction Budget
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight mt-1">
                  {formatCurrency(totalMin)} – {formatCurrency(totalMax)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  *Excludes statutory authority fees and land holding costs. AUD ex-GST.
                </p>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-3 pt-4 border-t border-slate-700/80 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Asset Classification:</span>
                  <span className="font-bold text-white">{projectType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Floor Footprint:</span>
                  <span className="font-bold text-white">{sizeSqm.toLocaleString()} sqm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Projected Delivery Window:</span>
                  <span className="font-bold text-amber-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getEstimatedDuration()}</span>
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Selected Pillars:</span>
                  <span className="font-bold text-slate-200">{selectedPillars.length} of 4</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700 space-y-3">
              <button
                onClick={handleConsultationRequest}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
                id="estimator-submit-quote-btn"
              >
                <span>Request Detailed Tender Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Our commercial directors provide formal QS appraisals within 48 business hours.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
