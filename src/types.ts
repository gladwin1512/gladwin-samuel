export interface KPICardData {
  id: string;
  label: string;
  value: string;
  subtext: string;
  source: string;
  sourceUrl?: string;
  category: 'wealth' | 'income' | 'market';
  highlightColor: 'rose' | 'amber' | 'emerald' | 'cyan';
}

export interface WealthDistributionSegment {
  name: string;
  share: number; // percentage
  populationCount: string;
  avgWealthPerAdult: string;
  color: string;
  description: string;
}

export interface SectorShareItem {
  name: string;
  share2014: number;
  sharePresent: number;
  color: string;
  status: 'dominant' | 'acquired' | 'declining' | 'new';
}

export interface SectorData {
  sector: string;
  yearA: string;
  yearB: string;
  description: string;
  source: string;
  metricLabel: string;
  hhiA: number;
  hhiB: number;
  hhiStatusA: string;
  hhiStatusB: string;
  items: SectorShareItem[];
  keyInsight: string;
}

export interface TaxTrendYear {
  fiscalYear: string;
  corporateTaxPct: number; // effective standard base rate
  corporateTaxCollection: number; // in Lakh Crores ₹
  personalIncomeTaxCollection: number; // in Lakh Crores ₹
  gstCollection: number; // in Lakh Crores ₹
  note?: string;
}

export interface PoliticianAssetRecord {
  id: string;
  name: string;
  party: string;
  state: string;
  constituency: string;
  house: 'Lok Sabha' | 'Rajya Sabha' | 'Vidhan Sabha';
  year1: number;
  year2: number;
  assets1Cr: number; // in Crores ₹
  assets2Cr: number; // in Crores ₹
  growthCr: number;
  growthPercent: number;
  source: string;
}

export interface DataSourceCitation {
  id: string;
  title: string;
  publisher: string;
  year: string;
  leadAuthors?: string;
  keyFinding: string;
  officialDoc: string;
  accessUrl: string;
}

export type ManifestoStatus = 'Fulfilled' | 'Broken';

export type ManifestoCategory =
  | 'Economy/Jobs'
  | 'Agriculture'
  | 'Infrastructure'
  | 'Social Welfare'
  | 'Governance'
  | 'Ideological';

export interface VerificationBadge {
  type: 'CAG Report' | 'Parliament Q&A' | 'PIB Factcheck' | 'ADR India' | 'RBI Bulletin' | 'CPCB Data' | 'NSSO/PLFS';
  document: string;
  citation: string;
  linkUrl?: string;
}

export interface ManifestoPromise {
  id: string;
  title: string;
  manifestoYear: number;
  category: ManifestoCategory;
  status: ManifestoStatus;
  originalPledge: string;
  groundReality: string;
  officialMetric: string;
  verification: VerificationBadge;
  isBigTicket?: boolean;
}

export interface StateTerritoryAudit {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  region: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'Central' | 'Union Territory';
  electionYear: number;
  capital: string;
  totalSeats: number;
  bjpSeats: number;
  mpMlaAssetGrowthPct: number;
  youthUnemploymentRatePct: number;
  lpgCylinderPriceHikePct: number;
  topLawmakerSample: {
    name: string;
    constituency: string;
    wealthJumpPct: number;
    currentWealthCr: number;
    crimeCases: number;
  };
  promises: ManifestoPromise[];
}

export interface TaxpayerLossRecord {
  id: string;
  category: 'Bank Write-Off' | 'Corporate Tax Cut' | 'Bank Fraud & Fugitives' | 'Tax Burden Shift';
  title: string;
  amountLostCr: number; // in ₹ Crores
  amountLabel: string;
  officialSource: string;
  sourceDoc: string;
  description: string;
  consequences: string;
  yearRange: string;
}

export interface StateRepresentativeAudit {
  id: string;
  constituency: string;
  mpName: string;
  party: string;
  tenure: string;
  votersRepresented: string; // e.g. "21.4 Lakh"
  populationRepresented: string; // e.g. "30.5 Lakh"
  declaredAssetsCr: number; // in ₹ Crore
  previousAssetsCr: number;
  wealthGrowthPct: number;
  avgCitizenAnnualIncome: number; // Avg income
  wealthToCitizenIncomeRatio: number; // MP wealth / citizen annual income
  yearsOfWorkNeededForCitizen: number; // how many years of 100% saved income
  primaryDeclaredAssets: string[];
  affidavitSource: string;
}

export interface PrivatizedInfrastructureItem {
  id: string;
  assetName: string;
  type: 'Airport' | 'Port' | 'Highway / Expressway' | 'Telecom / PSU';
  state: string;
  publicMoneyInvestedCr: number; // Taxpayer / AAI / NHAI investment before handover
  publicMoneyLabel: string;
  privateOperator: string;
  ultimateBeneficiary: string;
  handoverYear: number;
  concessionPeriodYears: number;
  userImpact: string;
  passengerFeeHikePct?: number;
  officialSource: string;
  details: string;
}

export interface ServiceSectorShiftMetric {
  sector: string;
  shareOfWorkforcePct: number;
  shareOfGdpPct: number;
  averageMonthlyWage: string;
  jobSecurityStatus: string;
  keyChallenge: string;
}

export interface CitizenshipRenunciationYear {
  year: number;
  count: number;
  formattedCount: string;
  sourceQuestion: string;
  keyContext: string;
}

export interface GlobalIndexAuditItem {
  id: string;
  name: string;
  publishingBody: string;
  unWhoAffiliation: 'UN Agency' | 'WHO' | 'Global Multilateral' | 'Academic / Think Tank';
  category: 'Human Development & Hunger' | 'Health & Environment' | 'Democracy & Freedom' | 'Gender & Society';
  rank2014?: string;
  latestRank: string;
  totalCountries: number;
  percentileRank: number; // 0 = best, 100 = bottom
  statusCategory: 'Critical / Serious' | 'Very Low / Warning' | 'Stagnant' | 'Declining';
  keyFinding: string;
  comparisonWithNeighbors: string;
  officialReportDoc: string;
  citationUrl?: string;
}

export interface PassportMobilityAudit {
  rank2024: number;
  previousRank2014: number;
  visaFreeCount: number;
  developedNationsVisaFree: number;
  usVisaWaitDays: string;
  schengenRejectionRate: string;
  sourceDoc: string;
  hnwiExodus2023: number;
  usCbpEncounters2023: number;
}

