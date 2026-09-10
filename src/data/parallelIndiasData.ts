export interface KPICard {
  id: string;
  title: string;
  metric: string;
  subtext: string;
  source: string;
  sourceBadge: string;
  category: 'politician' | 'debt' | 'unemployment' | 'cost';
}

export interface DivergenceYearData {
  year: string;
  mpWealthIndex: number; // 2014 = 100
  ruralRealWageIndex: number; // 2014 = 100
  householdSavingsPctGDP: number; // % of GDP
  avgBjpMpWealthCr: number; // Crores
  ruralDailyWageRealINR: number; // Real wage in INR
  inflationCpi: number; // %
}

export interface PriceSqueezeItem {
  id: string;
  commodity: string;
  category: 'Energy & Fuel' | 'Food Staples' | 'Household Finance';
  unit: string;
  price2014: number;
  price2024: number;
  percentageHike: number;
  description: string;
  source: string;
  sourceBadge: string;
}

export interface PoliticianAffidavit {
  id: string;
  name: string;
  constituency: string;
  state: string;
  portfolio: string;
  assets2014Cr: number;
  assets2019Cr: number;
  assets2024Cr: number;
  tenYearGrowthCr: number;
  tenYearGrowthPct: number;
  source: string;
  affidavitUrl?: string;
  highlightTag?: string;
}

export interface JobMetric {
  title: string;
  promised: string;
  actual: string;
  gapText: string;
  source: string;
}

export const HERO_KPIS: KPICard[] = [
  {
    id: 'kpi-mp-assets',
    title: 'MP Asset Growth',
    metric: '+108.5%',
    subtext: 'Average declared wealth jump of re-elected MPs (from ₹14.2 Cr to ₹29.6 Cr).',
    source: 'ADR India — 2019 & 2024 Re-contesting MP Reports',
    sourceBadge: 'ADR India',
    category: 'politician',
  },
  {
    id: 'kpi-household-debt',
    title: 'Household Debt',
    metric: '18.4% of GDP',
    subtext: 'Personal debt surged while net savings dropped to a 47-year low (5.2% of GDP).',
    source: 'Reserve Bank of India (RBI Bulletin 2023-2024)',
    sourceBadge: 'RBI',
    category: 'debt',
  },
  {
    id: 'kpi-youth-unemployment',
    title: 'Graduate Joblessness',
    metric: '29.1%',
    subtext: 'Nearly 1 in 3 young graduates is unemployed; youth make up 83% of jobless workforce.',
    source: 'ILO India Employment Report 2024 & PLFS',
    sourceBadge: 'ILO / PLFS',
    category: 'unemployment',
  },
  {
    id: 'kpi-lpg-contrast',
    title: 'LPG Cooking Gas',
    metric: '+169% Hike',
    subtext: 'Domestic 14.2kg cylinder rose from ₹410 (May 2014) to ₹1,103 peak.',
    source: 'Petroleum Planning & Analysis Cell (PPAC)',
    sourceBadge: 'PPAC',
    category: 'cost',
  },
];

export const DIVERGENCE_TIMELINE: DivergenceYearData[] = [
  {
    year: '2014',
    mpWealthIndex: 100,
    ruralRealWageIndex: 100,
    householdSavingsPctGDP: 7.4,
    avgBjpMpWealthCr: 14.2,
    ruralDailyWageRealINR: 278,
    inflationCpi: 6.4,
  },
  {
    year: '2016',
    mpWealthIndex: 132,
    ruralRealWageIndex: 102.5,
    householdSavingsPctGDP: 7.6,
    avgBjpMpWealthCr: 18.7,
    ruralDailyWageRealINR: 285,
    inflationCpi: 4.9,
  },
  {
    year: '2018',
    mpWealthIndex: 168,
    ruralRealWageIndex: 103.8,
    householdSavingsPctGDP: 7.1,
    avgBjpMpWealthCr: 23.9,
    ruralDailyWageRealINR: 288,
    inflationCpi: 3.9,
  },
  {
    year: '2019',
    mpWealthIndex: 195,
    ruralRealWageIndex: 104.2,
    householdSavingsPctGDP: 7.8,
    avgBjpMpWealthCr: 27.7,
    ruralDailyWageRealINR: 290,
    inflationCpi: 3.7,
  },
  {
    year: '2020',
    mpWealthIndex: 215,
    ruralRealWageIndex: 102.1,
    householdSavingsPctGDP: 11.5, // Forced lockdown saving spike
    avgBjpMpWealthCr: 30.5,
    ruralDailyWageRealINR: 284,
    inflationCpi: 6.6,
  },
  {
    year: '2022',
    mpWealthIndex: 254,
    ruralRealWageIndex: 101.4,
    householdSavingsPctGDP: 5.3, // Crash in savings
    avgBjpMpWealthCr: 36.1,
    ruralDailyWageRealINR: 282,
    inflationCpi: 6.7,
  },
  {
    year: '2024',
    mpWealthIndex: 296,
    ruralRealWageIndex: 101.9,
    householdSavingsPctGDP: 5.2, // 47-year historic bottom
    avgBjpMpWealthCr: 42.0,
    ruralDailyWageRealINR: 283,
    inflationCpi: 5.4,
  },
];

export const COMMODITY_SQUEEZE_DATA: PriceSqueezeItem[] = [
  {
    id: 'lpg',
    commodity: 'Cooking Gas (14.2kg LPG)',
    category: 'Energy & Fuel',
    unit: '₹ per Cylinder (Delhi)',
    price2014: 410,
    price2024: 1103,
    percentageHike: 169,
    description: 'Direct household kitchen cost nearly tripled.',
    source: 'Petroleum Planning & Analysis Cell (PPAC)',
    sourceBadge: 'PPAC',
  },
  {
    id: 'petrol-excise',
    commodity: 'Petrol Union Excise Duty',
    category: 'Energy & Fuel',
    unit: '₹ per Litre (Union Tax)',
    price2014: 9.48,
    price2024: 19.90,
    percentageHike: 110,
    description: 'Excise taxes collected over ₹32 Lakh Cr from fuel.',
    source: 'Ministry of Petroleum, Lok Sabha Q&A',
    sourceBadge: 'Lok Sabha',
  },
  {
    id: 'diesel-excise',
    commodity: 'Diesel Union Excise Duty',
    category: 'Energy & Fuel',
    unit: '₹ per Litre (Freight Lifeline)',
    price2014: 3.56,
    price2024: 15.80,
    percentageHike: 344,
    description: 'Diesel excise hike pushed up freight and food transport costs.',
    source: 'Ministry of Petroleum Tariffs',
    sourceBadge: 'MoPNG',
  },
  {
    id: 'mustard-oil',
    commodity: 'Mustard Cooking Oil',
    category: 'Food Staples',
    unit: '₹ per Litre',
    price2014: 75,
    price2024: 155,
    percentageHike: 107,
    description: 'Basic daily cooking oil doubled in price.',
    source: 'Dept of Consumer Affairs (PMD)',
    sourceBadge: 'DoCA',
  },
  {
    id: 'tur-dal',
    commodity: 'Tur / Arhar Dal',
    category: 'Food Staples',
    unit: '₹ per Kg (Retail)',
    price2014: 74,
    price2024: 172,
    percentageHike: 132,
    description: 'Essential protein staple surged past ₹170/kg.',
    source: 'Dept of Consumer Affairs',
    sourceBadge: 'DoCA',
  },
  {
    id: 'household-savings',
    commodity: 'Net Household Savings',
    category: 'Household Finance',
    unit: '% of National GDP',
    price2014: 7.4,
    price2024: 5.2,
    percentageHike: -29.7,
    description: 'Household financial savings dropped to a 47-year low.',
    source: 'Reserve Bank of India Bulletin',
    sourceBadge: 'RBI',
  },
  {
    id: 'unsecured-loans',
    commodity: 'Unsecured Personal Debt',
    category: 'Household Finance',
    unit: '₹ Lakh Crore',
    price2014: 1.93,
    price2024: 14.85,
    percentageHike: 669,
    description: 'Surge in credit card and emergency borrowing to meet expenses.',
    source: 'RBI Bank Credit Deployment',
    sourceBadge: 'RBI',
  },
];

export const POLITICIAN_AFFIDAVITS: PoliticianAffidavit[] = [
  {
    id: 'rajiv-chandrasekhar',
    name: 'Rajeev Chandrasekhar',
    constituency: 'Thiruvananthapuram (ex-RS)',
    state: 'Karnataka / Kerala',
    portfolio: 'MoS Electronics & IT / Skill Development',
    assets2014Cr: 28.14, // 2018 RS baseline
    assets2019Cr: 65.00,
    assets2024Cr: 680.02,
    tenYearGrowthCr: 651.88,
    tenYearGrowthPct: 2316,
    source: 'ECI Form 26 Affidavits (2018 RS & 2024 LS), ADR India',
    highlightTag: 'Tech Conglomerate Stakeholder',
  },
  {
    id: 'scindia',
    name: 'Jyotiraditya Scindia',
    constituency: 'Guna',
    state: 'Madhya Pradesh',
    portfolio: 'Union Cabinet Minister (Civil Aviation / Telecom)',
    assets2014Cr: 32.64,
    assets2019Cr: 374.56,
    assets2024Cr: 424.70,
    tenYearGrowthCr: 392.06,
    tenYearGrowthPct: 1201,
    source: 'ADR India Analysis of Election Affidavits 2014, 2020 RS, 2024 LS',
    highlightTag: 'Royal Estates & High Liquidity',
  },
  {
    id: 'amit-shah',
    name: 'Amit Shah',
    constituency: 'Gandhinagar',
    state: 'Gujarat',
    portfolio: 'Union Home Minister & Minister of Cooperation',
    assets2014Cr: 11.15, // Gujarat MLA affidavit
    assets2019Cr: 40.32,
    assets2024Cr: 65.67,
    tenYearGrowthCr: 54.52,
    tenYearGrowthPct: 489,
    source: 'ADR Candidate Disclosures & Election Commission of India Affidavits',
    highlightTag: 'Listed Equities & Immovable Assets',
  },
  {
    id: 'poonamben-maadam',
    name: 'Poonamben Maadam',
    constituency: 'Jamnagar',
    state: 'Gujarat',
    portfolio: 'Member of Parliament (Lok Sabha)',
    assets2014Cr: 29.80,
    assets2019Cr: 42.71,
    assets2024Cr: 147.28,
    tenYearGrowthCr: 117.48,
    tenYearGrowthPct: 394,
    source: 'ADR Lok Sabha Repeat Candidate Reports',
    highlightTag: 'High Real Estate Expansion',
  },
  {
    id: 'nishikant-dubey',
    name: 'Nishikant Dubey',
    constituency: 'Godda',
    state: 'Jharkhand',
    portfolio: 'Member of Parliament (Lok Sabha)',
    assets2014Cr: 15.70,
    assets2019Cr: 37.52,
    assets2024Cr: 78.25,
    tenYearGrowthCr: 62.55,
    tenYearGrowthPct: 398,
    source: 'ADR India Analysis of Re-contesting MPs',
    highlightTag: 'Tripled in 10 Years',
  },
  {
    id: 'brij-bhushan',
    name: 'Brij Bhushan & Karan Bhushan',
    constituency: 'Kaiserganj',
    state: 'Uttar Pradesh',
    portfolio: 'Former WFI Chief / MP Family Seat',
    assets2014Cr: 10.15,
    assets2019Cr: 21.72,
    assets2024Cr: 50.21,
    tenYearGrowthCr: 40.06,
    tenYearGrowthPct: 394,
    source: 'ECI Affidavits & National Election Watch',
    highlightTag: 'Land Holdings & Educational Trusts',
  },
  {
    id: 'pralhad-joshi',
    name: 'Pralhad Joshi',
    constituency: 'Dharwad',
    state: 'Karnataka',
    portfolio: 'Union Minister (Parliamentary Affairs, Consumer Affairs)',
    assets2014Cr: 4.24,
    assets2019Cr: 12.44,
    assets2024Cr: 21.10,
    tenYearGrowthCr: 16.86,
    tenYearGrowthPct: 397,
    source: 'ADR Lok Sabha Affidavits',
    highlightTag: 'Quadrupled Net Worth',
  },
  {
    id: 'hema-malini',
    name: 'Hema Malini',
    constituency: 'Mathura',
    state: 'Uttar Pradesh',
    portfolio: 'Member of Parliament (Lok Sabha)',
    assets2014Cr: 178.46,
    assets2019Cr: 250.82,
    assets2024Cr: 278.93,
    tenYearGrowthCr: 100.47,
    tenYearGrowthPct: 56,
    source: 'ADR Candidate Disclosures 2014, 2019, 2024',
    highlightTag: 'Consolidated High Net Worth',
  },
  {
    id: 'anurag-thakur',
    name: 'Anurag Singh Thakur',
    constituency: 'Hamirpur',
    state: 'Himachal Pradesh',
    portfolio: 'Union Minister (ex-Information & Broadcasting / Sports)',
    assets2014Cr: 4.58,
    assets2019Cr: 10.68,
    assets2024Cr: 15.85,
    tenYearGrowthCr: 11.27,
    tenYearGrowthPct: 246,
    source: 'ADR India Sworn Affidavit Ledger',
    highlightTag: 'Substantial Equity Holdings',
  },
  {
    id: 'smriti-irani',
    name: 'Smriti Zubin Irani',
    constituency: 'Amethi',
    state: 'Uttar Pradesh',
    portfolio: 'Former Union Minister (Women & Child Dev / Textiles)',
    assets2014Cr: 4.91,
    assets2019Cr: 11.11,
    assets2024Cr: 17.38,
    tenYearGrowthCr: 12.47,
    tenYearGrowthPct: 254,
    source: 'ADR Lok Sabha Repeat Candidate Reports',
    highlightTag: 'Declared Real Estate & Investments',
  },
  {
    id: 'piyush-goyal',
    name: 'Piyush Goyal',
    constituency: 'Mumbai North',
    state: 'Maharashtra',
    portfolio: 'Union Minister of Commerce & Industry',
    assets2014Cr: 30.34, // 2016 RS filing
    assets2019Cr: 95.37,
    assets2024Cr: 110.95,
    tenYearGrowthCr: 80.61,
    tenYearGrowthPct: 265,
    source: 'ECI Affidavits 2016, 2022, 2024, ADR India',
    highlightTag: 'Extensive Commercial Portfolios',
  },
  {
    id: 'mansukh-mandaviya',
    name: 'Mansukh Mandaviya',
    constituency: 'Porbandar',
    state: 'Gujarat',
    portfolio: 'Union Minister (Labor & Employment, Youth Affairs)',
    assets2014Cr: 1.82, // 2018 RS filing baseline
    assets2019Cr: 6.20,
    assets2024Cr: 15.84,
    tenYearGrowthCr: 14.02,
    tenYearGrowthPct: 770,
    source: 'ECI Affidavits, ADR India',
    highlightTag: 'Agricultural & Movable Expansion',
  },
  {
    id: 'narendra-modi',
    name: 'Narendra Modi',
    constituency: 'Varanasi',
    state: 'Uttar Pradesh',
    portfolio: 'Prime Minister of India',
    assets2014Cr: 1.65,
    assets2019Cr: 2.51,
    assets2024Cr: 3.02,
    tenYearGrowthCr: 1.37,
    tenYearGrowthPct: 83,
    source: 'ECI Form 26 Sworn Affidavits 2014, 2019, 2024',
    highlightTag: 'SBI Bank Fixed Deposits Only',
  },
];

export const YOUTH_EMPLOYMENT_DATA = {
  headlineStat: '82.9% of Unemployed in India are Youths',
  source: 'ILO India Employment Report 2024',
  targetPromise: '2 Crore Jobs / Year (20 Crore in 10 Yrs)',
  actualFormalDelivery: '< 1.2 Crore total formal manufacturing additions in 10 years.',
  paperLeaksCount: '48+ Major Exam Paper Leaks',
  aspirantsAffected: '3.4+ Crore Aspirants Impacted',
  keyMetrics: [
    {
      metric: '29.1%',
      label: 'Graduate Youth Jobless Rate',
      subtext: 'Nearly 1 in 3 young college graduates in India is unemployed.',
      badge: 'PLFS / ILO',
    },
    {
      metric: '3.4 Crore',
      label: 'Candidates Affected by Leaks',
      subtext: '48+ state and national exams canceled or delayed.',
      badge: 'Audits',
    },
    {
      metric: '58.4%',
      label: 'Unpaid / Informal Family Work',
      subtext: 'Employment rise driven largely by unpaid domestic work.',
      badge: 'MoSPI PLFS',
    },
    {
      metric: '₹283/day',
      label: 'Real Rural Daily Wage',
      subtext: 'Adjusted for inflation, rural wages remained stagnant.',
      badge: 'RBI / Labour',
    },
  ],
};
