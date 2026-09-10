import React from 'react';
import { X, BookOpen, ExternalLink, CheckCircle2, ShieldAlert, FileText, Database } from 'lucide-react';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sources = [
    {
      domain: 'Politician Assets & Affidavits',
      sourceName: 'Association for Democratic Reforms (ADR) & National Election Watch',
      document: 'Lok Sabha 2014, 2019, 2024 Re-contesting MP Reports & MyNeta Database',
      citation: 'ADR Analysis of Form 26 sworn affidavits submitted under oath by candidates to the Election Commission of India (ECI). Covers movable assets, cash, bank balances, corporate shares, and real estate valuation.',
      urlBadge: 'myneta.info / adrindia.org',
    },
    {
      domain: 'Household Debt & Net Financial Savings',
      sourceName: 'Reserve Bank of India (RBI)',
      document: 'RBI Bulletin (September 2023, December 2023, April 2024) & Financial Stability Reports',
      citation: 'Official estimates showing Net Financial Assets of Indian Households dipping to 5.2%–5.3% of GDP (a 47-year low since 1976-77) accompanied by rapid escalation in gross financial liabilities and personal credit to 18.4% of GDP.',
      urlBadge: 'rbi.org.in Publications',
    },
    {
      domain: 'Youth Unemployment & Wage Growth',
      sourceName: 'International Labour Organization (ILO) & MoSPI',
      document: 'India Employment Report 2024 (ILO/IHD) & Periodic Labour Force Survey (PLFS)',
      citation: 'Joint research confirming that educated youth (secondary or higher) account for 82.9% of the total unemployed youth population, with graduate youth unemployment remaining around 29.1% for ages under 25.',
      urlBadge: 'ilo.org / mospi.gov.in',
    },
    {
      domain: 'Cooking Gas (LPG) & Petroleum Excise',
      sourceName: 'Petroleum Planning & Analysis Cell (PPAC) & MoPNG',
      document: 'Historical Price Notifications & Lok Sabha Parliamentary Questions (No. 1294 & 2408)',
      citation: 'Official Union Ministry records tracking retail prices of non-subsidized 14.2kg domestic LPG cylinder in Delhi (₹410.00 in May 2014 vs ₹1,103.00 peak in 2023) and central excise duty tariffs on petrol and diesel generating >₹32 Lakh Crore between 2014 and 2024.',
      urlBadge: 'ppac.gov.in / sansad.in',
    },
    {
      domain: 'Essential Food Commodities',
      sourceName: 'Department of Consumer Affairs (Price Monitoring Division)',
      document: 'Daily Retail and Wholesale Price Ledgers (2014–2024)',
      citation: 'Government price tracking for 22 essential commodities including Tur/Arhar dal, Mustard edible oil, and common staples across 550+ reporting centers in India.',
      urlBadge: 'consumeraffairs.nic.in',
    },
    {
      domain: 'Recruitment Exam Cancellations',
      sourceName: 'Public Record Investigative Audits',
      document: 'State Assembly Question Answers & Investigative Ledgers (Indian Express / The Hindu)',
      citation: 'Audit of 48+ major recruitment examination paper leaks and cancellations across central and state recruiting bodies (NEET-UG, UGC-NET, UP Police, Bihar BPSC, Rajasthan REET) impacting over 3.4 crore registered candidates.',
      urlBadge: 'Public Judicial Filings',
    },
    {
      domain: '29 States & Districts Manifesto Verification',
      sourceName: 'Official Election Manifestos & Gazette Records',
      document: 'BJP Sankalp Patra 2014, 2019, 2024 & State Manifestos (2021 Bengal, Assam, Tamil Nadu, Kerala, Delhi)',
      citation: 'Pledges audited against Comptroller and Auditor General (CAG) performance audits, Central Pollution Control Board (CPCB) river metrics, Ministry of Housing (DDA) data, and parliamentary questions.',
      urlBadge: 'cag.gov.in / cpcb.nic.in',
    },
    {
      domain: 'Corporate Loan Write-Offs & Tax Cuts',
      sourceName: 'Reserve Bank of India (RBI) & Ministry of Finance',
      document: 'RBI Scheduled Commercial Banks NPA Write-Off Bulletins & Lok Sabha Unstarred Question No. 2026',
      citation: 'Official empirical disclosures confirming ₹15.3 Lakh Crore in corporate bad loans written off over 10 years with an average IBC haircut exceeding 82%, plus exchequer revenue forgone of ₹1.84 Lakh Cr annually following the 2019 corporate tax rate cut.',
      urlBadge: 'rbi.org.in / sansad.in',
    },
    {
      domain: 'Taxpayer Infrastructure Privatization',
      sourceName: 'Airports Authority of India (AAI) & AERA',
      document: 'AAI Annual Accounts, Airport Concession Agreements & AERA Tariff Orders',
      citation: 'Audited records of ₹66,495+ Crore in public taxpayer capital invested in modernizing brownfield airports (Ahmedabad, Lucknow, Mangaluru, Jaipur, Guwahati, Thiruvananthapuram) and port sidings before 50-year private concessions with subsequent User Development Fee (UDF) hikes of up to 280%.',
      urlBadge: 'aai.aero / aera.gov.in',
    },
    {
      domain: 'Delhi Per Capita Income & Income Percentiles',
      sourceName: 'Planning Department (Govt of NCT of Delhi) & EAC-PM',
      document: 'Delhi Economic Survey 2023-24 & State of Inequality in India Report',
      citation: 'Official per capita annual income of Delhi (₹4,44,760) used to benchmark MP wealth ratios, and national income distribution percentiles derived from NSSO/Periodic Labour Force Survey (PLFS) and World Inequality Lab (WID) microdata.',
      urlBadge: 'delhiplanning.delhi.gov.in / eacpm.gov.in',
    },
    {
      domain: 'Citizenship Renunciation & Exodus',
      sourceName: 'Ministry of External Affairs (MEA)',
      document: 'Lok Sabha Questions (No. 1133, 441, 562) & Rajya Sabha (No. 1384)',
      citation: 'Official written disclosures by External Affairs Minister Dr. S. Jaishankar confirming over 1.85 Million (18.5+ Lakh) Indian citizens formally renounced their Indian citizenship between 2014 and 2023-24, reaching an all-time peak of 2,25,620 in 2022.',
      urlBadge: 'sansad.in / mea.gov.in',
    },
    {
      domain: 'UN, WHO & International Benchmarks',
      sourceName: 'UNDP, WHO, UN FAO, RSF & Henley & Partners',
      document: 'UNDP HDR 2024, WHO Global Health Observatory, Global Hunger Index 2024, RSF Press Freedom Index & Henley Passport Index 2024',
      citation: 'Multilateral audits verifying India’s rankings: UN HDI 134/193, Global Hunger Index 105/127 (world’s highest child wasting at 18.7%), WHO public health spending suppressed at 1.35% of GDP (48.2% out-of-pocket medical expense), RSF Press Freedom 159/180, and Henley Passport Index 82nd (0 developed nations visa-free).',
      urlBadge: 'undp.org / who.int / globalhungerindex.org / rsf.org / henleyglobal.com',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0F141C] border border-orange-500/40 p-6 sm:p-8 shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Database className="w-6 h-6 text-[#FF9933]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Public Datasets & Verification Methodology
              </h2>
              <p className="text-xs text-slate-300">
                100% Empiric and Publicly Verifiable Government & Judicial Records
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Methodology statement */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-orange-500/20 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block font-mono text-[11px] mb-1 text-orange-400">
            OBJECTIVITY & CITATION STANDARD:
          </strong>
          All politician net worth figures shown on this platform are derived strictly from sworn legal affidavits (ECI Form 26)
          submitted under oath by the candidates themselves. Economic figures are sourced directly from the Reserve Bank of India,
          the Ministry of Statistics (MoSPI), the Ministry of Petroleum, and the International Labour Organization (ILO).
        </div>

        {/* Source Cards */}
        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/40 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#FFB347] uppercase tracking-wider font-mono">
                  {src.domain}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {src.urlBadge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{src.sourceName}</h3>
              <p className="text-xs font-semibold text-slate-300 mb-2 font-mono">{src.document}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{src.citation}</p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Non-partisan public interest data audit</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold transition-colors"
          >
            Close Citation Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
