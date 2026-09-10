import React, { useState, useMemo } from 'react';
import {
  Mic,
  Video,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Newspaper
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type RhetoricMedium = 'Rally Speech' | 'Interview' | 'Public Address' | 'Policy Announcement';
export type RhetoricStatus = 'Broken' | 'Political Rhetoric / Jumla' | 'Unmet Deadline' | 'Contrary Reality';

export interface RhetoricClaim {
  id: string;
  title: string;
  year: number;
  medium: RhetoricMedium;
  status: RhetoricStatus;
  claimText: string;
  realityText: string;
  sourceContext: string;
  citationType: 'RBI' | 'NSSO' | 'Global Index' | 'Market Data' | 'Fact Check' | 'Official Statement';
  citationDoc: string;
}

const RHETORIC_CLAIMS: RhetoricClaim[] = [
  {
    id: 'r1',
    title: '₹15 Lakh in Every Account',
    year: 2013,
    medium: 'Rally Speech',
    status: 'Political Rhetoric / Jumla',
    claimText: 'Stated in a 2013 rally that if all the black money stored in foreign banks was brought back, every poor Indian could get ₹15 to ₹20 lakh in their bank accounts.',
    realityText: 'In 2015, Union Home Minister Amit Shah clarified in a TV interview that the statement was a "political jumla" (idiom/gimmick) and money would not actually be deposited into individual accounts.',
    sourceContext: '2013 Kanker Rally (Chhattisgarh) | 2015 TV Interview',
    citationType: 'Official Statement',
    citationDoc: 'Home Minister Amit Shah Interview (ABP News, 2015)'
  },
  {
    id: 'r2',
    title: 'World Standing in Line for Indian Visa',
    year: 2005,
    medium: 'Public Address',
    status: 'Contrary Reality',
    claimText: 'Stated multiple times over the years that soon Americans and the world would be queuing up outside Indian consulates seeking visas to work in India.',
    realityText: 'Passport Index rankings show Indian passport mobility lagging globally (often ranked in the 80s). There are persistent outbound migration surges, brain drain, and massive, years-long wait times for Indian citizens seeking US/overseas visas.',
    sourceContext: 'Various speeches dating back to 2005 as Gujarat CM, reiterated implicitly later.',
    citationType: 'Global Index',
    citationDoc: 'Henley Passport Index | US State Dept Visa Wait Times'
  },
  {
    id: 'r3',
    title: 'Ending Black Money in 50 Days (Demonetisation)',
    year: 2016,
    medium: 'Policy Announcement',
    status: 'Broken',
    claimText: '"Give me 50 days... if I am wrong, punish me however you want." Claimed sudden demonetisation of ₹500/₹1000 notes would wipe out illicit wealth, counterfeit currency, and terrorism funding.',
    realityText: 'The RBI confirmed in its annual report that over 99.3% of the banned notes successfully returned to the banking system, meaning almost no "black money" was extinguished as predicted. Counterfeit notes and cash in circulation have since hit record highs.',
    sourceContext: 'November 2016 National Address | Goa Speech',
    citationType: 'RBI',
    citationDoc: 'RBI Annual Report 2017-18'
  },
  {
    id: 'r4',
    title: '₹1 = $1 / Rupee Strengthening',
    year: 2013,
    medium: 'Rally Speech',
    status: 'Contrary Reality',
    claimText: 'Sharply criticized the UPA government over the falling rupee (which fell to ~₹60-68/USD), suggesting strong leadership would strengthen the currency and equating the falling Rupee to the nation\'s prestige.',
    realityText: 'The USD/INR exchange rate depreciated steadily during the NDA tenure, crossing ₹83–₹84 per USD. The narrative shifted from "national prestige" to "global headwinds".',
    sourceContext: 'Pre-2014 Election Rallies',
    citationType: 'Market Data',
    citationDoc: 'Historical Forex Data (RBI Reference Rate)'
  },
  {
    id: 'r5',
    title: 'Doubling Farmers\' Income by 2022',
    year: 2016,
    medium: 'Rally Speech',
    status: 'Unmet Deadline',
    claimText: 'Announced a concrete national deadline to double the income of Indian farmers by the year 2022.',
    realityText: 'Government reports and NSSO data confirm the target was substantially missed. While some nominal income grew due to inflation, real incomes stagnated or grew marginally. Farmer protests over MSP guarantees erupted in 2020-21 and 2024.',
    sourceContext: 'Bareilly Rally 2016 | Independence Day Addresses',
    citationType: 'NSSO',
    citationDoc: 'NSSO SAS 2018-19 | Parliamentary Committee Reports'
  }
];

export const RhetoricVsReality: React.FC = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedMedium, setSelectedMedium] = useState<RhetoricMedium | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredClaims = useMemo(() => {
    return RHETORIC_CLAIMS.filter((claim) => {
      if (selectedYear !== 'ALL' && claim.year !== selectedYear) return false;
      if (selectedMedium !== 'ALL' && claim.medium !== selectedMedium) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = claim.title.toLowerCase().includes(q);
        const matchClaim = claim.claimText.toLowerCase().includes(q);
        const matchReality = claim.realityText.toLowerCase().includes(q);
        if (!matchTitle && !matchClaim && !matchReality) return false;
      }
      return true;
    });
  }, [selectedYear, selectedMedium, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getStatusColor = (status: RhetoricStatus) => {
    if (status === 'Political Rhetoric / Jumla') return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    if (status === 'Contrary Reality') return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    return 'text-red-500 bg-red-500/10 border-red-500/30';
  };

  const getStatusIcon = (status: RhetoricStatus) => {
    if (status === 'Political Rhetoric / Jumla') return <AlertTriangle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  const getMediumIcon = (medium: RhetoricMedium) => {
    if (medium === 'Interview') return <Video className="w-4 h-4" />;
    if (medium === 'Policy Announcement') return <Newspaper className="w-4 h-4" />;
    return <Mic className="w-4 h-4" />;
  };

  return (
    <section id="rhetoric-tracker" className="py-20 bg-[#0B0F14] border-t border-slate-800/50 relative overflow-hidden">
      
      {/* Decorative gradient background elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
      <div className="absolute -left-40 top-40 w-80 h-80 bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <Mic className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold tracking-wide text-red-400 uppercase">
              Rhetoric vs. Reality
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-100 font-serif">
            Speech & Viral Claim Tracker
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
            An interactive archive documenting major verbal claims, rally promises, and political rhetoric, contrasted directly with official data and on-ground realities.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-red-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search statements (e.g., 15 Lakh, Demonetisation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-950/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all sm:text-sm"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-40 flex items-center bg-slate-950/50 border border-slate-700 rounded-xl px-3 py-3 hover:border-slate-600 transition-colors">
                <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                  className="w-full bg-transparent text-slate-200 text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="ALL">All Years</option>
                  <option value="2005">Pre-2014</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2016">2016</option>
                </select>
              </div>

              <div className="relative w-full sm:w-48 flex items-center bg-slate-950/50 border border-slate-700 rounded-xl px-3 py-3 hover:border-slate-600 transition-colors">
                <Mic className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <select
                  value={selectedMedium}
                  onChange={(e) => setSelectedMedium(e.target.value as any)}
                  className="w-full bg-transparent text-slate-200 text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="ALL">All Mediums</option>
                  <option value="Rally Speech">Rally Speech</option>
                  <option value="Public Address">Public Address</option>
                  <option value="Interview">Interview</option>
                  <option value="Policy Announcement">Policy Announcement</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
              <Mic className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No claims found matching your filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('ALL');
                  setSelectedMedium('ALL');
                }}
                className="mt-4 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredClaims.map((claim) => {
              const isExpanded = expandedId === claim.id;
              
              return (
                <div 
                  key={claim.id}
                  className={`bg-slate-900/50 border ${isExpanded ? 'border-red-500/30' : 'border-slate-800'} rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/30 group`}
                >
                  {/* Card Header (Clickable) */}
                  <div 
                    onClick={() => toggleExpand(claim.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="flex items-center text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700/50">
                          {claim.year}
                        </span>
                        <span className="flex items-center text-slate-300 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700/50">
                          {getMediumIcon(claim.medium)}
                          <span className="ml-1.5">{claim.medium}</span>
                        </span>
                        <span className={`flex items-center px-2 py-1 rounded-md border ${getStatusColor(claim.status)}`}>
                          {getStatusIcon(claim.status)}
                          <span className="ml-1.5">{claim.status}</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
                        "{claim.title}"
                      </h3>
                    </div>
                    
                    <div className="shrink-0 flex items-center justify-end">
                      <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'}`}>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/50">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          
                          {/* The Claim */}
                          <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 relative">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                              <Mic className="w-16 h-16 text-slate-500" />
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">The Claim</div>
                            <p className="text-slate-300 text-sm leading-relaxed relative z-10 italic">
                              "{claim.claimText}"
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-800">
                              <div className="text-xs text-slate-500">Source Context:</div>
                              <div className="text-sm font-medium text-slate-400 mt-1">{claim.sourceContext}</div>
                            </div>
                          </div>

                          {/* The Reality */}
                          <div className="bg-red-950/20 p-5 rounded-xl border border-red-900/30 relative">
                            <div className="text-xs font-bold text-red-400/80 uppercase tracking-wider mb-2">Ground Reality</div>
                            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                              {claim.realityText}
                            </p>
                            
                            {/* Expandable Citation Drawer element within the card */}
                            <div className="mt-6">
                              <div className="flex items-center p-3 rounded-lg bg-[#0B0F14] border border-slate-800/80">
                                <ExternalLink className="w-4 h-4 text-slate-500 mr-3 shrink-0" />
                                <div>
                                  <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">Verified Citation</div>
                                  <div className="text-xs text-slate-300 font-medium">
                                    <span className="text-red-400">{claim.citationType}</span>: {claim.citationDoc}
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
