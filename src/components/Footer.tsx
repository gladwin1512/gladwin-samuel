import React from 'react';
import { ShieldAlert, BookOpen, ArrowUp, ExternalLink, Scale } from 'lucide-react';

interface FooterProps {
  onOpenSources: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSources }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0F14] border-t border-orange-500/30 pt-12 pb-16 text-xs text-slate-400">
      {/* Saffron accent stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-amber-400 to-[#138808] mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-slate-950 font-black">
                <ShieldAlert className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-black tracking-tight text-white text-base">
                TWO PARALLEL INDIAS (2014–PRESENT)
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-lg">
              Public record comparison between lawmaker wealth and citizen economic indicators (2014–Present).
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-orange-400">
              <Scale className="w-3.5 h-3.5" />
              <span>Public Interest Transparency Initiative</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Primary Data Citations
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              <li>• Association for Democratic Reforms (ADR)</li>
              <li>• Election Commission of India (ECI Form 26)</li>
              <li>• Reserve Bank of India (RBI Bulletin)</li>
              <li>• Periodic Labour Force Survey (PLFS, MoSPI)</li>
              <li>• International Labour Organization (ILO) 2024</li>
              <li>• Petroleum Planning & Analysis Cell (PPAC)</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Verification & Methodology
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Every data point on this dashboard is cited directly from official publications or sworn legal affidavits.
            </p>
            <button
              onClick={onOpenSources}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-[#FF9933] border border-orange-500/30 text-xs font-bold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Open Citation Dossier
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <div>
            <span>© 2014–2026 Two Parallel Indias Audit. Verifiable public domain data.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSources}
              className="hover:text-orange-400 transition-colors"
            >
              Legal & Sources
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
